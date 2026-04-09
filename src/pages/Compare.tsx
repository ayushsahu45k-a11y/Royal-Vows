import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, MapPin, IndianRupee, Users, Star } from 'lucide-react';
import { venues, Venue } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export function Compare() {
  const { compareList, addToCompare, removeFromCompare } = useAppContext();
  const [showSelector, setShowSelector] = useState(false);

  const allAmenities = Array.from(new Set(venues.flatMap(v => v.amenities)));

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Compare Venues</h1>
          <p className="text-gray-600">Compare up to 3 venues side-by-side to find your perfect match.</p>
        </div>

        {compareList.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">No venues selected to compare</h3>
            <button 
              onClick={() => setShowSelector(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Add Venues
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 border-b border-gray-100 w-1/4 align-top bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                    {compareList.length < 3 && (
                      <button 
                        onClick={() => setShowSelector(true)}
                        className="text-amber-600 font-medium hover:text-amber-700 text-sm flex items-center gap-1"
                      >
                        + Add another venue
                      </button>
                    )}
                  </th>
                  {compareList.map(venue => (
                    <th key={venue.id} className="p-6 border-b border-gray-100 w-1/4 align-top relative">
                      <button 
                        onClick={() => removeFromCompare(venue.id)}
                        className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="aspect-video rounded-xl overflow-hidden mb-4">
                        <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{venue.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm font-normal mb-4">
                        <MapPin className="w-4 h-4" />
                        {venue.city}, {venue.state}
                      </div>
                      <Link 
                        to={`/venue/${venue.id}`}
                        className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </th>
                  ))}
                  {/* Empty columns to maintain layout if less than 3 selected */}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <th key={`empty-${i}`} className="p-6 border-b border-gray-100 w-1/4 bg-gray-50/30"></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-6 border-b border-gray-100 font-medium text-gray-900 bg-gray-50/50">Price per Plate</td>
                  {compareList.map(venue => (
                    <td key={venue.id} className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-1 text-gray-900 font-semibold">
                        <IndianRupee className="w-4 h-4" />
                        {venue.pricePerPlate}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <td key={`empty-price-${i}`} className="p-6 border-b border-gray-100 bg-gray-50/30"></td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-gray-100 font-medium text-gray-900 bg-gray-50/50">Capacity</td>
                  {compareList.map(venue => (
                    <td key={venue.id} className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Users className="w-4 h-4 text-gray-400" />
                        {venue.capacity.min} - {venue.capacity.max}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <td key={`empty-cap-${i}`} className="p-6 border-b border-gray-100 bg-gray-50/30"></td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-gray-100 font-medium text-gray-900 bg-gray-50/50">Rating</td>
                  {compareList.map(venue => (
                    <td key={venue.id} className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-1 text-gray-900 font-medium">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {venue.rating} <span className="text-gray-500 font-normal text-sm">({venue.reviews})</span>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <td key={`empty-rate-${i}`} className="p-6 border-b border-gray-100 bg-gray-50/30"></td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-gray-100 font-medium text-gray-900 bg-gray-50/50">Venue Type</td>
                  {compareList.map(venue => (
                    <td key={venue.id} className="p-6 border-b border-gray-100 text-gray-700">
                      {venue.type}
                    </td>
                  ))}
                  {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                    <td key={`empty-type-${i}`} className="p-6 border-b border-gray-100 bg-gray-50/30"></td>
                  ))}
                </tr>
                {/* Amenities */}
                <tr>
                  <td colSpan={4} className="p-6 border-b border-gray-100 font-bold text-gray-900 bg-gray-50">
                    Amenities
                  </td>
                </tr>
                {allAmenities.map(amenity => (
                  <tr key={amenity}>
                    <td className="p-6 border-b border-gray-100 text-gray-700 bg-gray-50/50">{amenity}</td>
                    {compareList.map(venue => (
                      <td key={`${venue.id}-${amenity}`} className="p-6 border-b border-gray-100 text-center">
                        {venue.amenities.includes(amenity) ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    ))}
                    {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                      <td key={`empty-amenity-${amenity}-${i}`} className="p-6 border-b border-gray-100 bg-gray-50/30"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Venue Selector Modal */}
        {showSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Select a Venue to Compare</h3>
                <button onClick={() => setShowSelector(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {venues.filter(v => !compareList.find(sv => sv.id === v.id)).map(venue => (
                    <div 
                      key={venue.id} 
                      onClick={() => {
                        addToCompare(venue);
                        setShowSelector(false);
                      }}
                      className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all items-center"
                    >
                      <img src={venue.images[0]} alt={venue.name} className="w-20 h-20 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{venue.name}</h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{venue.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
