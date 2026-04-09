import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Users, IndianRupee, Star, Check, Calendar, Heart, Share2, Info, Sparkles, ArrowRight } from 'lucide-react';
import { venues } from '../data/mockData';
import { useState, FormEvent, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { AIRecommendation } from '../components/AIRecommendation';

export function VenueDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleSaved, savedVenues, addToCompare, compareList, addToRecentlyViewed } = useAppContext();
  const venue = venues.find(v => v.id === id);
  const [activeImage, setActiveImage] = useState(0);
  
  const isSaved = venue ? savedVenues.some(v => v.id === venue.id) : false;
  const isInCompare = venue ? compareList.some(v => v.id === venue.id) : false;

  useEffect(() => {
    if (venue) {
      addToRecentlyViewed(venue);
    }
  }, [venue]);

  const handleBooking = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const date = formData.get('date');
    const guests = formData.get('guests');
    navigate(`/confirmation?venue=${encodeURIComponent(venue?.name || '')}&date=${date}&guests=${guests}`);
  };

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Venue not found</h2>
          <Link to="/venues" className="text-rose hover:underline">Return to venues</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 bg-ivory dark:bg-gray-950 min-h-screen"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/venues" className="hover:text-gold transition-colors">Venues</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-300">{venue.name}</span>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 h-[50vh] min-h-[400px]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/10"
          >
            <img src={venue.images[activeImage]} alt={venue.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="grid grid-cols-2 gap-4 h-full">
            {venue.images.slice(0, 4).map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:shadow-lg ${activeImage === idx ? 'border-gold' : 'border-transparent'}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`${venue.name} ${idx}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gold/10 mb-8 relative overflow-hidden">
              {/* AI Match Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-gold/20 to-transparent px-6 py-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                <span className="text-[10px] font-bold text-gold tracking-widest uppercase">98% Match for You</span>
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-rose/10 text-rose text-xs font-bold px-3 py-1 rounded-full border border-rose/20 uppercase tracking-wider">
                      {venue.type}
                    </span>
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      {venue.rating} <span className="text-gray-400 font-normal">({venue.reviews} reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2 leading-tight">{venue.name}</h1>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-5 h-5 text-gold" />
                    {venue.location}, {venue.city}, {venue.state}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 rounded-full bg-ivory dark:bg-gray-800 hover:bg-gold/10 text-gray-600 dark:text-gray-300 transition-colors border border-gold/10">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleSaved(venue)}
                    className={`p-3 rounded-full transition-all duration-300 border ${isSaved ? 'bg-rose text-white border-rose shadow-lg shadow-rose/20' : 'bg-ivory dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose/10 hover:text-rose border-gold/10'}`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gold/10 mb-8">
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Price per plate</p>
                  <div className="flex items-center gap-1 font-bold text-xl text-gray-900 dark:text-white">
                    <IndianRupee className="w-5 h-5 text-gold" />
                    {venue.pricePerPlate}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Capacity</p>
                  <div className="flex items-center gap-1 font-bold text-xl text-gray-900 dark:text-white">
                    <Users className="w-5 h-5 text-gold" />
                    {venue.capacity.min}-{venue.capacity.max}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Venue Type</p>
                  <div className="font-bold text-xl text-gray-900 dark:text-white">{venue.type}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Rooms</p>
                  <div className="font-bold text-xl text-gray-900 dark:text-white">Available</div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  The Experience
                  <div className="h-px flex-1 bg-gold/20" />
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{venue.description}</p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  Amenities
                  <div className="h-px flex-1 bg-gold/20" />
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {venue.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 group">
                      <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gold/10 flex flex-wrap gap-4">
                <button 
                  onClick={() => addToCompare(venue)}
                  disabled={isInCompare}
                  className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${isInCompare ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-900 dark:bg-gold text-white hover:bg-black dark:hover:bg-gold-light shadow-xl hover:shadow-gold/20'}`}
                >
                  {isInCompare ? 'In Comparison' : 'Add to Compare'}
                </button>
                <button className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 border-gold/20 text-gray-900 dark:text-white hover:bg-gold/5 transition-all">
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Smart Recommendations */}
            <AIRecommendation type="best-match" currentVenueId={venue.id} />

            {/* Similar Venues Section */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Similar Venues</h2>
                <Link to="/venues" className="text-rose font-bold hover:underline">View All</Link>
              </div>
              <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar">
                {venues
                  .filter(v => v.id !== venue.id && (v.type === venue.type || v.city === venue.city))
                  .slice(0, 6)
                  .map((similarVenue) => (
                    <motion.div
                      key={similarVenue.id}
                      whileHover={{ y: -10 }}
                      className="min-w-[300px] bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gold/10 group"
                    >
                      <Link to={`/venue/${similarVenue.id}`} className="block relative h-48 overflow-hidden">
                        <img 
                          src={similarVenue.images[0]} 
                          alt={similarVenue.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-900">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          {similarVenue.rating}
                        </div>
                      </Link>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{similarVenue.name}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                          <MapPin className="w-3 h-3" />
                          {similarVenue.city}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                          <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                            <IndianRupee className="w-3 h-3 text-gold" />
                            {similarVenue.pricePerPlate}
                          </div>
                          <Link 
                            to={`/venue/${similarVenue.id}`}
                            className="text-xs font-bold text-rose hover:text-wine transition-colors flex items-center gap-1"
                          >
                            View Details <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-2xl border border-gold/10 sticky top-28 overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose via-gold to-rose" />
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">Reserve Your Date</h3>
              <p className="text-sm text-gray-500 mb-8">Get exclusive pricing & availability details instantly.</p>
              
              <form onSubmit={handleBooking} className="space-y-5">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input required name="name" type="text" className="w-full p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                    <input required name="phone" type="tel" className="w-full p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" placeholder="+91" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                    <input required name="email" type="email" className="w-full p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Event Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input required name="date" type="date" className="w-full pl-12 p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                      <input required name="guests" type="number" min={venue.capacity.min} max={venue.capacity.max} className="w-full pl-12 p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" placeholder="Pax" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Message (Optional)</label>
                  <textarea name="message" className="w-full p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all dark:text-white" rows={3} placeholder="Any specific requirements?"></textarea>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full bg-gradient-luxury text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-rose/20 flex items-center justify-center gap-2 group"
                >
                  Check Availability
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900" alt="" />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">12 couples requested today</p>
                </div>
              </form>
            </div>

            {/* AI Suggestion Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gradient-to-br from-gold/10 to-rose/10 rounded-3xl border border-gold/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-16 h-16 text-gold" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-gold" />
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">AI Expert Tip</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">
                "Based on the {venue.type} setting, we recommend booking at least 12 months in advance for peak wedding season (Nov-Feb)."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

