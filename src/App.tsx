/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Venues } from './pages/Venues';
import { VenueDetails } from './pages/VenueDetails';
import { Compare } from './pages/Compare';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { Profile } from './pages/Profile';
import { ScrollToTop } from './components/ScrollToTop';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './components/ThemeProvider';
import { AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venues" element={<Venues />} />
            <Route path="venue/:id" element={<VenueDetails />} />
            <Route path="compare" element={<Compare />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="confirmation" element={<BookingConfirmation />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <ScrollToTop />
          <AnimatedRoutes />
          <Toaster />
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}
