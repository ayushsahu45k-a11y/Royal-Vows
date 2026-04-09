import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Users, IndianRupee, Star, Filter, X, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { venues } from '../data/mockData';
import { AIRecommendation } from '../components/AIRecommendation';
import { useAppContext } from '../context/AppContext';

export function Venues() {
  const [searchParams] = useSearchParams();
  const { addToSearchHistory, addToCompare, compareList } = useAppContext();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [capacity, setCapacity] = useState<number>(0);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    if (searchQuery) {
      addToSearchHistory(searchQuery);
    }
  }, [searchQuery]);

  const filteredVenues = useMemo(() => {
    return venues
      .filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = !selectedLocation || v.city.toLowerCase() === selectedLocation.toLowerCase();
        const matchesType = !selectedType || v.type === selectedType;
        const matchesPrice = v.pricePerPlate >= priceRange[0] && v.pricePerPlate <= priceRange[1];
        const matchesCapacity = !capacity || v.capacity.max >= capacity;
        return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesCapacity;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'priceLow') return a.pricePerPlate - b.pricePerPlate;
        if (sortBy === 'priceHigh') return b.pricePerPlate - a.pricePerPlate;
        return 0;
      });
  }, [searchQuery, selectedLocation, selectedType, priceRange, capacity, sortBy]);

  const locations = Array.from(new Set(venues.map(v => v.city)));
  const types = Array.from(new Set(venues.map(v => v.type)));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20 bg-ivory dark:bg-gray-950 min-h-screen"
    >
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2">Exquisite Venues</h1>
            <p className="text-gray-500">Discover {filteredVenues.length} premium locations for your celebration</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search venues or cities..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gold/10 focus:ring-2 focus:ring-gold outline-none shadow-sm dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="p-4 rounded-2xl bg-rose text-white hover:bg-wine transition-colors shadow-lg shadow-rose/20 md:hidden"
            >
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* AI Recommendations */}
        <AIRecommendation type="personalized" limit={4} />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 space-y-8 sticky top-28 h-fit">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-sm border border-gold/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white">Filters</h3>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLocation('');
                    setSelectedType('');
                    setPriceRange([0, 10000]);
                    setCapacity(0);
                  }}
                  className="text-xs font-bold text-rose uppercase tracking-widest hover:text-wine transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Location</label>
                  <select 
                    className="w-full p-3 rounded-xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold outline-none text-sm dark:text-white"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Venue Type</label>
                  <div className="space-y-2">
                    {['All', ...types].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type === 'All' ? '' : type)}
                        className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-all ${
                          (type === 'All' && !selectedType) || selectedType === type
                            ? 'bg-rose text-white font-bold shadow-md'
                            : 'bg-ivory dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gold/10'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Price per Plate</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="500"
                    className="w-full accent-gold"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                    <span>₹0</span>
                    <span className="text-rose">Up to ₹{priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Min Capacity</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 500"
                    className="w-full p-3 rounded-xl bg-ivory dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold outline-none text-sm dark:text-white"
                    value={capacity || ''}
                    onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* AI Suggestion Sidebar */}
            <div className="bg-gradient-luxury p-8 rounded-[2rem] text-white relative overflow-hidden group">
              <Sparkles className="w-8 h-8 text-gold mb-4 animate-pulse" />
              <h4 className="font-serif font-bold text-lg mb-2">AI Concierge</h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6">Need a personalized shortlist? Our AI can find your perfect match in seconds.</p>
              <button className="w-full py-3 bg-white text-rose rounded-xl font-bold text-sm hover:bg-gold hover:text-white transition-all">
                Get AI Shortlist
              </button>
            </div>
          </aside>

          {/* Venue Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500 font-medium">Showing <span className="text-gray-900 dark:text-white font-bold">{filteredVenues.length}</span> results</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort by:</span>
                <select 
                  className="bg-transparent border-none text-sm font-bold text-gray-900 dark:text-white focus:ring-0 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Top Rated</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredVenues.map((venue, idx) => {
                  const isInCompare = compareList.some(v => v.id === venue.id);
                  return (
                    <motion.div
                      key={venue.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx % 2) * 0.1 }}
                      className="group bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gold/10 hover:border-gold/30"
                    >
                      <Link to={`/venue/${venue.id}`} className="block relative h-72 overflow-hidden">
                        <img 
                          src={venue.images[0]} 
                          alt={venue.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-bold text-gray-900">
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          {venue.rating}
                        </div>
                        {venue.featured && (
                          <div className="absolute top-6 left-6 bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                            Featured
                          </div>
                        )}
                      </Link>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-1 group-hover:text-rose transition-colors">{venue.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm">
                              <MapPin className="w-4 h-4 text-gold" />
                              {venue.city}, {venue.state}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-6 border-y border-gold/10 mb-6">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price per plate</p>
                            <div className="flex items-center gap-1 font-bold text-lg text-gray-900 dark:text-white">
                              <IndianRupee className="w-4 h-4 text-gold" />
                              {venue.pricePerPlate}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Capacity</p>
                            <div className="flex items-center gap-1 font-bold text-lg text-gray-900 dark:text-white">
                              <Users className="w-4 h-4 text-gold" />
                              {venue.capacity.max}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Link 
                            to={`/venue/${venue.id}`}
                            className="flex-1 bg-ivory dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose hover:text-white transition-all group/btn"
                          >
                            Details
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                          <button 
                            onClick={() => addToCompare(venue)}
                            disabled={isInCompare}
                            className={`px-6 py-4 rounded-2xl font-bold transition-all ${
                              isInCompare 
                                ? 'bg-gold/10 text-gold border border-gold/20' 
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gold/10 hover:bg-gold hover:text-white'
                            }`}
                          >
                            {isInCompare ? 'Added' : 'Compare'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border border-dashed border-gold/30">
                <div className="w-20 h-20 bg-ivory dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">No venues found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLocation('');
                    setSelectedType('');
                    setPriceRange([0, 10000]);
                    setCapacity(0);
                  }}
                  className="bg-rose text-white px-8 py-4 rounded-2xl font-bold hover:bg-wine transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-ivory dark:bg-gray-900 p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif font-bold text-2xl text-gray-900 dark:text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-gold/10">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-150px)] pr-2 scrollbar-hide">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Location</label>
                  <select 
                    className="w-full p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gold/10 focus:ring-2 focus:ring-gold outline-none dark:text-white"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Venue Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['All', ...types].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type === 'All' ? '' : type)}
                        className={`text-center px-4 py-3 rounded-xl text-xs transition-all ${
                          (type === 'All' && !selectedType) || selectedType === type
                            ? 'bg-rose text-white font-bold'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Price per Plate</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="500"
                    className="w-full accent-gold"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-500 mt-2">
                    <span>₹0</span>
                    <span className="text-rose">Up to ₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowFilters(false)}
                className="absolute bottom-8 left-8 right-8 bg-gradient-luxury text-white py-5 rounded-2xl font-bold shadow-xl"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
