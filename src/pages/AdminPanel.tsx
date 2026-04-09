import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Search, LayoutDashboard, Users, Calendar, Settings } from 'lucide-react';
import { venues as initialVenues } from '../data/mockData';

export function AdminPanel() {
  const [venues, setVenues] = useState(initialVenues);
  const [activeTab, setActiveTab] = useState<'venues' | 'bookings' | 'users'>('venues');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this venue?')) {
      setVenues(venues.filter(v => v.id !== id));
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your venues, bookings, and users.</p>
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-amber-600/20">
            <Plus className="w-5 h-5" />
            Add New Venue
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <nav className="p-4 space-y-2">
                <button 
                  onClick={() => setActiveTab('venues')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'venues' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Venues
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'bookings' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Calendar className="w-5 h-5" />
                  Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Users className="w-5 h-5" />
                  Users
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'venues' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-900">All Venues</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search venues..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-64" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Venue</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {venues.map(venue => (
                        <tr key={venue.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={venue.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-medium text-gray-900">{venue.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">{venue.city}, {venue.state}</td>
                          <td className="px-6 py-4 text-gray-900 font-medium">₹{venue.pricePerPlate}</td>
                          <td className="px-6 py-4">
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(venue.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Management</h3>
                <p className="text-gray-500">This section is under development. You will be able to manage all customer bookings here.</p>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-500">This section is under development. You will be able to manage all registered users here.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
