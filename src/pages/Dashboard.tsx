import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Settings, LogOut, MapPin, IndianRupee } from 'lucide-react';
import { venues } from '../data/mockData';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'saved' | 'bookings' | 'settings'>('saved');

  const savedVenues = [venues[0], venues[2]];
  const bookings = [
    {
      id: 'BKG-1029',
      venue: venues[1],
      date: '2024-11-15',
      guests: 450,
      status: 'Confirmed',
      totalAmount: 2700000
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, John Doe</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'saved' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Heart className="w-5 h-5" />
                  Saved Venues
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'bookings' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link 
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === 'saved' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Venues</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedVenues.map(venue => (
                    <div key={venue.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                      <div className="relative h-48">
                        <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                        <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-pink-500 hover:bg-white transition-colors">
                          <Heart className="w-5 h-5 fill-pink-500" />
                        </button>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{venue.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                          <MapPin className="w-4 h-4" /> {venue.city}, {venue.state}
                        </p>
                        <Link to={`/venue/${venue.id}`} className="block w-full text-center bg-gray-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="space-y-6">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                        <img src={booking.venue.images[0]} alt={booking.venue.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md mb-2 inline-block">
                              {booking.id}
                            </span>
                            <h3 className="font-bold text-xl text-gray-900">{booking.venue.name}</h3>
                          </div>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Event Date</p>
                            <p className="font-medium text-gray-900">{new Date(booking.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Guests</p>
                            <p className="font-medium text-gray-900">{booking.guests} pax</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Total Amount</p>
                            <p className="font-medium text-gray-900 flex items-center">
                              <IndianRupee className="w-3 h-3" /> {booking.totalAmount.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" defaultValue="John" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" defaultValue="Doe" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" defaultValue="john@example.com" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" defaultValue="+91 9876543210" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <button type="button" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
