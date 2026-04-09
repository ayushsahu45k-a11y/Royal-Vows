import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, ArrowRight, Download } from 'lucide-react';

export function BookingConfirmation() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const venueName = queryParams.get('venue') || 'Your Selected Venue';
  const date = queryParams.get('date') || new Date().toISOString().split('T')[0];
  const guests = queryParams.get('guests') || '0';

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Booking Request Sent!</h1>
          <p className="text-gray-600 mb-10">
            Thank you for choosing Royal Vows. Your request for <span className="font-bold text-gray-900">{venueName}</span> has been successfully submitted. Our venue manager will contact you within 24 hours.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Booking Details</h3>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Users className="w-5 h-5 text-amber-600" />
              <span><span className="font-medium">Guests:</span> {guests} pax</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span><span className="font-medium">Venue:</span> {venueName}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Summary
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
