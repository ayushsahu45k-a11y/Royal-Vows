import { motion, useScroll, useTransform } from 'motion/react';
import { Search, MapPin, Users, IndianRupee, Star, ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, useRef } from 'react';
import { venues, destinations } from '../data/mockData';
import { AIRecommendation } from '../components/AIRecommendation';
import { useAppContext } from '../context/AppContext';

export function Home() {
  const navigate = useNavigate();
  const { addToSearchHistory } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery);
    }
    navigate(`/venues?q=${searchQuery}`);
  };

  const categories = [
    { name: 'Palaces', icon: '🏰', count: 12, color: 'from-gold/20 to-rose/20' },
    { name: 'Beaches', icon: '🏖️', count: 8, color: 'from-blue-100 to-rose/20' },
    { name: 'Resorts', icon: '🏨', count: 15, color: 'from-green-100 to-rose/20' },
    { name: 'Heritage', icon: '🏛️', count: 10, color: 'from-amber-100 to-rose/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden bg-ivory dark:bg-gray-950"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: y1, scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Wedding" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-ivory dark:to-gray-950" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="container mx-auto px-4 z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm">Exquisite Celebrations</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
              Your Journey to <br />
              <span className="text-gradient-gold italic">Forever</span> Begins Here
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass p-2 rounded-[2.5rem] shadow-2xl w-full md:w-auto md:min-w-[500px] border-gold/20"
              >
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Where do you want to wed?" 
                      className="w-full pl-14 pr-6 py-5 bg-transparent outline-none text-gray-900 dark:text-white font-medium placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-gradient-luxury text-white px-10 py-5 rounded-[2rem] font-bold hover:shadow-xl hover:shadow-rose/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    Discover
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  to="/login" 
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-6 rounded-[2.5rem] font-bold hover:bg-white/20 transition-all flex items-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                  Sign Up Now
                </Link>
              </motion.div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-bold text-gold">500+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Venues</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-bold text-gold">25+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Cities</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-serif font-bold text-gold">10k+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold">Couples</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Curated Collections</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${cat.color} border border-gold/10 text-center group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500`}
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{cat.icon}</div>
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{cat.count} Handpicked Venues</p>
                <div className="mt-6 w-10 h-10 bg-white dark:bg-gray-800 rounded-full mx-auto flex items-center justify-center shadow-md group-hover:bg-rose group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <div className="container mx-auto px-4">
        <AIRecommendation type="personalized" />
      </div>

      {/* Featured Venues */}
      <section className="py-24 bg-white dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-rose" />
                <span className="text-rose font-bold uppercase tracking-widest text-xs">Most Coveted</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white leading-tight">Featured Destinations for Your Grand Celebration</h2>
            </div>
            <Link to="/venues" className="bg-ivory dark:bg-gray-800 border-2 border-gold/20 px-8 py-4 rounded-2xl font-bold text-gray-900 dark:text-white hover:bg-gold hover:text-white transition-all">
              View All Venues
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {venues.slice(0, 3).map((venue, idx) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px] border-4 border-white dark:border-gray-800"
              >
                <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  {venue.rating}
                </div>

                <div className="absolute bottom-0 left-0 w-full p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-white/80 text-sm font-medium">{venue.city}, {venue.state}</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">{venue.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gold mb-1">Starting from</p>
                      <div className="flex items-center gap-1 text-2xl font-bold">
                        <IndianRupee className="w-5 h-5" />
                        {venue.pricePerPlate}
                      </div>
                    </div>
                    <Link 
                      to={`/venue/${venue.id}`}
                      className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gold hover:text-white transition-all shadow-xl"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Trending Destinations</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From the royal forts of Udaipur to the serene beaches of Goa, find the perfect backdrop for your love story.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-3xl font-serif font-bold mb-2">{dest.name}</h3>
                  <p className="text-sm font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">{dest.venues} Venues</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Suggestion Box - Floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="bg-gradient-luxury p-12 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-gold rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Need Expert Guidance?</h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">Our AI-powered wedding concierge is ready to help you find the perfect venue based on your unique style, budget, and guest list.</p>
            <button className="bg-white text-rose px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gold hover:text-white transition-all shadow-xl flex items-center gap-2 mx-auto group">
              Chat with AI Assistant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
