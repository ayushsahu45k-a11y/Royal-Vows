import { Heart, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Heart className="w-6 h-6 text-amber-500" />
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                Royal Vows
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Discover and book the most exquisite wedding venues across India. We make your dream wedding a reality with our curated selection of premium locations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/venues" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Browse Venues</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Compare Venues</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Top Destinations</h3>
            <ul className="space-y-4">
              <li><Link to="/venues?location=Udaipur" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Udaipur Palaces</Link></li>
              <li><Link to="/venues?location=Goa" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Goa Beach Resorts</Link></li>
              <li><Link to="/venues?location=Jaipur" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Jaipur Heritage</Link></li>
              <li><Link to="/venues?location=Kerala" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">Kerala Backwaters</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-gold shrink-0" />
                <span>267, Kalpana Nagar, Bhopal, 462022, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span>+91 9005538494</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>ayushsahu.45k@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Royal Vows. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
