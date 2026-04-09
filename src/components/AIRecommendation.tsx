import { motion } from 'motion/react';
import { Sparkles, Star, MapPin, IndianRupee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Venue } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { useMemo } from 'react';
import { venues } from '../data/mockData';

interface AIRecommendationProps {
  type: 'personalized' | 'best-match';
  currentVenueId?: string;
  limit?: number;
}

export function AIRecommendation({ type, currentVenueId, limit = 4 }: AIRecommendationProps) {
  const { recentlyViewed, searchHistory } = useAppContext();

  const recommendedVenues = useMemo(() => {
    if (type === 'best-match' && currentVenueId) {
      const current = venues.find(v => v.id === currentVenueId);
      if (!current) return [];

      return venues
        .filter(v => v.id !== currentVenueId)
        .map(v => {
          let score = 0;
          if (v.city === current.city) score += 5;
          if (v.type === current.type) score += 3;
          const priceDiff = Math.abs(v.pricePerPlate - current.pricePerPlate);
          if (priceDiff < 500) score += 2;
          return { venue: v, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.venue);
    }

    // Personalized based on history
    if (recentlyViewed.length > 0) {
      const lastViewed = recentlyViewed[0];
      return venues
        .filter(v => !recentlyViewed.some(rv => rv.id === v.id))
        .map(v => {
          let score = 0;
          if (v.type === lastViewed.type) score += 3;
          if (v.city === lastViewed.city) score += 2;
          if (searchHistory.some(sh => v.city.toLowerCase().includes(sh.toLowerCase()))) score += 5;
          return { venue: v, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.venue);
    }

    // Fallback to top rated
    return venues.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }, [type, currentVenueId, recentlyViewed, searchHistory, limit]);

  if (recommendedVenues.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose/10 rounded-xl flex items-center justify-center border border-gold/20">
            <Sparkles className="w-6 h-6 text-rose" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
              {type === 'personalized' ? 'Recommended for You' : 'Best Matches for Your Wedding'}
            </h2>
            <p className="text-sm text-gray-500">AI-curated based on your preferences</p>
          </div>
        </div>
        <Link to="/venues" className="text-rose font-medium hover:text-wine transition-colors flex items-center gap-1 group">
          Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedVenues.map((venue, idx) => (
          <motion.div
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gold/10 hover:border-gold/30"
          >
            <Link to={`/venue/${venue.id}`} className="block relative h-48 overflow-hidden">
              <img 
                src={venue.images[0]} 
                alt={venue.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 right-3 glass px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-900">
                <Star className="w-3 h-3 text-gold fill-gold" />
                {venue.rating}
              </div>
              <div className="absolute bottom-3 left-3 bg-rose text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold" />
                AI MATCH
              </div>
            </Link>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-rose transition-colors">{venue.name}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                <MapPin className="w-3 h-3" />
                {venue.city}, {venue.state}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                <div className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                  <IndianRupee className="w-3 h-3 text-gold" />
                  {venue.pricePerPlate}
                </div>
                <Link 
                  to={`/venue/${venue.id}`}
                  className="text-xs font-bold text-rose hover:text-wine transition-colors flex items-center gap-1"
                >
                  Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
