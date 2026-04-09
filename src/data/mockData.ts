export interface Venue {
  id: string;
  name: string;
  type: 'Palace' | 'Beach' | 'Resort' | 'Banquet' | 'Heritage';
  location: string;
  city: string;
  state: string;
  pricePerPlate: number;
  capacity: { min: number; max: number };
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  description: string;
  featured?: boolean;
}

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'The Taj Mahal Palace',
    type: 'Palace',
    location: 'Apollo Bunder, Colaba',
    city: 'Mumbai',
    state: 'Maharashtra',
    pricePerPlate: 4500,
    capacity: { min: 100, max: 1000 },
    rating: 4.9,
    reviews: 342,
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80'
    ],
    amenities: ['Catering', 'Decor', 'Valet Parking', 'Bridal Room', 'Alcohol Allowed', 'Pool'],
    description: 'Experience the grandeur of a royal wedding at The Taj Mahal Palace. With its iconic architecture and impeccable service, it offers a majestic setting for your special day.',
    featured: true,
  },
  {
    id: 'v2',
    name: 'Umaid Bhawan Palace',
    type: 'Palace',
    location: 'Circuit House Rd, Cantt Area',
    city: 'Jodhpur',
    state: 'Rajasthan',
    pricePerPlate: 6000,
    capacity: { min: 200, max: 800 },
    rating: 5.0,
    reviews: 215,
    images: [
      'https://images.unsplash.com/photo-1590076215667-875d4ef2d71c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80'
    ],
    amenities: ['Catering', 'Decor', 'Valet Parking', 'Bridal Room', 'Accommodation', 'Spa'],
    description: 'A magnificent piece of Rajasthan heritage, Umaid Bhawan Palace is the ultimate destination for a fairy-tale wedding, offering breathtaking views and royal hospitality.',
    featured: true,
  },
  {
    id: 'v3',
    name: 'Taj Exotica Resort & Spa',
    type: 'Beach',
    location: 'Calcaud Benaulim',
    city: 'Goa',
    state: 'Goa',
    pricePerPlate: 3500,
    capacity: { min: 50, max: 500 },
    rating: 4.8,
    reviews: 189,
    images: [
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80'
    ],
    amenities: ['Beachfront', 'Catering', 'Decor', 'Valet Parking', 'Pool', 'DJ Allowed'],
    description: 'Set against the backdrop of the Arabian Sea, Taj Exotica offers a serene and romantic setting for a perfect beach wedding in Goa.',
    featured: true,
  },
  {
    id: 'v4',
    name: 'The Leela Palace',
    type: 'Palace',
    location: 'Diplomatic Enclave, Chanakyapuri',
    city: 'New Delhi',
    state: 'Delhi',
    pricePerPlate: 5000,
    capacity: { min: 150, max: 600 },
    rating: 4.7,
    reviews: 278,
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80'
    ],
    amenities: ['Catering', 'Decor', 'Valet Parking', 'Bridal Room', 'Alcohol Allowed'],
    description: 'A blend of Lutyens architectural grace and Indian royal heritage, The Leela Palace New Delhi is a spectacular venue for grand celebrations.',
  },
  {
    id: 'v5',
    name: 'ITC Grand Chola',
    type: 'Resort',
    location: 'Guindy',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pricePerPlate: 3800,
    capacity: { min: 300, max: 1500 },
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80'
    ],
    amenities: ['Catering', 'Decor', 'Valet Parking', 'Multiple Halls', 'Accommodation'],
    description: 'Inspired by the Chola dynasty, this palatial hotel offers expansive banquet spaces, making it ideal for large-scale, luxurious weddings.',
  },
  {
    id: 'v6',
    name: 'Rambagh Palace',
    type: 'Heritage',
    location: 'Bhawani Singh Rd',
    city: 'Jaipur',
    state: 'Rajasthan',
    pricePerPlate: 5500,
    capacity: { min: 100, max: 1000 },
    rating: 4.9,
    reviews: 412,
    images: [
      'https://images.unsplash.com/photo-1587222318667-31212ce2828d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80'
    ],
    amenities: ['Catering', 'Decor', 'Valet Parking', 'Bridal Room', 'Accommodation', 'Spa'],
    description: 'Known as the "Jewel of Jaipur", Rambagh Palace offers an authentic royal wedding experience with its stunning architecture and lush gardens.',
    featured: true,
  },
  {
    id: 'v7',
    name: 'Kumarakom Lake Resort',
    type: 'Resort',
    location: 'Kumarakom North Post',
    city: 'Kumarakom',
    state: 'Kerala',
    pricePerPlate: 3200,
    capacity: { min: 50, max: 400 },
    rating: 4.7,
    reviews: 145,
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80'
    ],
    amenities: ['Backwaters', 'Catering', 'Decor', 'Houseboats', 'Spa'],
    description: 'Set along the serene backwaters of Kerala, this resort provides a tranquil and picturesque backdrop for an intimate destination wedding.',
  },
  {
    id: 'v8',
    name: 'The Oberoi Udaivilas',
    type: 'Palace',
    location: 'Badi Gorella Mulla Talai',
    city: 'Udaipur',
    state: 'Rajasthan',
    pricePerPlate: 6500,
    capacity: { min: 100, max: 500 },
    rating: 5.0,
    reviews: 520,
    images: [
      'https://images.unsplash.com/photo-1615836245337-f839dff0a153?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80'
    ],
    amenities: ['Lake View', 'Catering', 'Decor', 'Valet Parking', 'Bridal Room', 'Spa'],
    description: 'Located on the banks of Lake Pichola, The Oberoi Udaivilas stands as a symbol of grandeur, offering unparalleled luxury for a majestic wedding.',
  }
];

export const destinations = [
  { name: 'Udaipur', image: 'https://images.unsplash.com/photo-1615836245337-f839dff0a153?auto=format&fit=crop&q=80', venues: 45 },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80', venues: 82 },
  { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80', venues: 63 },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80', venues: 38 },
];
