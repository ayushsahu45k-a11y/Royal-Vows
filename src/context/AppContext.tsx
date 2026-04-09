import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Venue } from '../data/mockData';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  getDoc
} from 'firebase/firestore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppContextType {
  user: User | null;
  loading: boolean;
  compareList: Venue[];
  addToCompare: (venue: Venue) => void;
  removeFromCompare: (id: string) => void;
  savedVenues: Venue[];
  toggleSaved: (venue: Venue) => void;
  recentlyViewed: Venue[];
  addToRecentlyViewed: (venue: Venue) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<Venue[]>([]);
  const [savedVenues, setSavedVenues] = useState<Venue[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Venue[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Initialize user profile in Firestore if it doesn't exist
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then((docSnap) => {
          if (!docSnap.exists()) {
            setDoc(userRef, {
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email,
              role: 'user',
              createdAt: Timestamp.now(),
              avatar: user.photoURL || ''
            }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`));
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore listener for saved venues
  useEffect(() => {
    if (!user) {
      setSavedVenues([]);
      return;
    }

    const path = `users/${user.uid}/saved_venues`;
    const q = query(collection(db, path), orderBy('savedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // In a real app, we'd fetch the full venue details here or have them in the doc
      // For this demo, we'll map the IDs back to our mock data
      const savedIds = snapshot.docs.map(doc => doc.data().venueId);
      // This is a bit inefficient but works for mock data
      import('../data/mockData').then(({ venues }) => {
        const saved = venues.filter(v => savedIds.includes(v.id));
        setSavedVenues(saved);
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [user]);

  const addToCompare = (venue: Venue) => {
    if (compareList.length < 3 && !compareList.find(v => v.id === venue.id)) {
      setCompareList([...compareList, venue]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(v => v.id !== id));
  };

  const toggleSaved = async (venue: Venue) => {
    if (!user) {
      // Handle unauthenticated state - maybe show login modal
      return;
    }

    const path = `users/${user.uid}/saved_venues`;
    const venueRef = doc(db, path, venue.id);

    try {
      if (savedVenues.find(v => v.id === venue.id)) {
        await deleteDoc(venueRef);
      } else {
        await setDoc(venueRef, {
          userId: user.uid,
          venueId: venue.id,
          savedAt: Timestamp.now()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${path}/${venue.id}`);
    }
  };

  const addToRecentlyViewed = (venue: Venue) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(v => v.id !== venue.id);
      return [venue, ...filtered].slice(0, 10);
    });
  };

  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(q => q !== query);
      return [query, ...filtered].slice(0, 5);
    });
  };

  return (
    <AppContext.Provider value={{ 
      user,
      loading,
      compareList, 
      addToCompare, 
      removeFromCompare, 
      savedVenues, 
      toggleSaved,
      recentlyViewed,
      addToRecentlyViewed,
      searchHistory,
      addToSearchHistory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
