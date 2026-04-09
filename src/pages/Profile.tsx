import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Mail, Phone, MapPin, Camera, Save, Heart, Calendar, ShieldCheck, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { venues } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export function Profile() {
  const { savedVenues, user, loading: authLoading } = useAppContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            location: data.location || '',
            bio: data.bio || '',
            avatar: data.avatar || user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate]);

  const handleSave = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
      });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-24 bg-ivory dark:bg-gray-950 min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-gold/10 sticky top-32">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover border-4 border-gold/20"
                />
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-rose text-white rounded-full flex items-center justify-center shadow-lg hover:bg-wine transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1">{profile.name}</h2>
                <p className="text-gold font-medium text-sm">Premium Member</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="w-5 h-5 text-gold" />
                  <span className="text-sm truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="text-sm">{profile.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-sm">{profile.location || 'Not provided'}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gold/10 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Profile Completion</span>
                  <span className="text-sm font-bold text-gold">85%</span>
                </div>
                <div className="w-full h-2 bg-gold/10 rounded-full overflow-hidden mb-6">
                  <div className="w-[85%] h-full bg-gradient-luxury" />
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose/20 text-rose font-bold text-sm hover:bg-rose/5 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Details Section */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 shadow-xl border border-gold/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Personal Details</h3>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="flex items-center gap-2 text-rose font-bold text-sm hover:text-wine transition-colors"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-ivory dark:bg-gray-800 border border-gold/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{profile.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <p className="text-gray-900 dark:text-white font-medium">{profile.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-ivory dark:bg-gray-800 border border-gold/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full bg-ivory dark:bg-gray-800 border border-gold/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">{profile.location || 'Not provided'}</p>
                  )}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">About Me</label>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full bg-ivory dark:bg-gray-800 border border-gold/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gold resize-none"
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio || 'Tell us about your wedding plans...'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Saved Venues Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Saved Venues</h3>
                <Link to="/venues" className="text-gold font-bold text-sm hover:underline">Browse More</Link>
              </div>

              {savedVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedVenues.map((venue) => (
                    <Link
                      key={venue.id}
                      to={`/venue/${venue.id}`}
                      className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gold/10 hover:shadow-2xl transition-all"
                    >
                      <div className="relative h-48">
                        <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-2 rounded-full text-rose">
                          <Heart className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-serif font-bold text-gray-900 dark:text-white mb-1">{venue.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <MapPin className="w-3 h-3 text-gold" />
                          {venue.city}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-rose font-bold text-sm">₹{venue.pricePerPlate}/plate</span>
                          <span className="flex items-center gap-1 text-xs font-bold text-gold">
                            <Calendar className="w-3 h-3" /> Book Now
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 text-center border border-dashed border-gold/30">
                  <Heart className="w-12 h-12 text-gold/30 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't saved any venues yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
