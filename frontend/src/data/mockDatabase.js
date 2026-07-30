export const mockListings = [
  {
    id: 'pg-1',
    type: 'pg',
    title: 'Sunrise Premium Student Housing',
    city: 'Bangalore',
    college: 'Christ University',
    gender: 'Boys',
    price: 8500,
    rating: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: ['AC', 'WiFi', 'Laundry', 'Meals Included', 'Gym', 'CCTV'],
    description: 'Premium boys PG located just 5 mins walking distance from Christ University. Fully furnished rooms with high-speed internet, daily housekeeping, and nutritious north/south Indian meals.',
    sharingOptions: [
      { type: 'Single', price: 12000 },
      { type: 'Double', price: 8500 },
      { type: 'Triple', price: 6500 }
    ],
    owner: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      joined: '2021'
    }
  },
  {
    id: 'pg-2',
    type: 'pg',
    title: 'Harmony Girls PG',
    city: 'Pune',
    college: 'Symbiosis International',
    gender: 'Girls',
    price: 9000,
    rating: 4.9,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: ['WiFi', 'Washing Machine', 'Kitchen Access', 'Security Guard', 'Power Backup'],
    description: 'Safe and secure girls PG with 24/7 security. Spacious rooms with attached bathrooms. Cooperative mess system available.',
    sharingOptions: [
      { type: 'Double', price: 9000 },
      { type: 'Triple', price: 7500 }
    ],
    owner: {
      name: 'Meera Sharma',
      phone: '+91 91234 56789',
      joined: '2022'
    }
  },
  {
    id: 'food-1',
    type: 'restaurant',
    title: 'Maa Ki Rasoi Tiffin Service',
    city: 'Bangalore',
    college: 'Christ University',
    cuisine: 'North Indian',
    price: 3500, // Monthly
    rating: 4.7,
    reviews: 210,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: ['Free Delivery', 'Veg Only', 'Customizable Menu', 'Weekend Specials'],
    description: 'Authentic home-cooked North Indian meals delivered straight to your PG. We use low oil and fresh ingredients to keep you healthy.',
    sharingOptions: [
      { type: '2 Meals/Day', price: 3500 },
      { type: '3 Meals/Day', price: 4500 }
    ],
    owner: {
      name: 'Asha Devi',
      phone: '+91 99887 76655',
      joined: '2020'
    }
  },
  {
    id: 'pg-3',
    type: 'pg',
    title: 'Elite Co-ed Living',
    city: 'Delhi',
    college: 'Delhi University (North Campus)',
    gender: 'Co-ed',
    price: 11000,
    rating: 4.6,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1502005097973-f28c0cd07710?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: ['AC', 'WiFi', 'Library/Study Room', 'Game Room', 'Meals Included'],
    description: 'Modern co-living space designed for DU students. Includes a quiet study library, high-speed Wi-Fi, and weekend community events.',
    sharingOptions: [
      { type: 'Single', price: 15000 },
      { type: 'Double', price: 11000 }
    ],
    owner: {
      name: 'Vikram Singh',
      phone: '+91 90000 11111',
      joined: '2023'
    }
  }
];

export const citiesList = ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Delhi', 'Mumbai', 'Kota'];
export const collegesList = [
  'Christ University', 
  'Symbiosis International', 
  'Delhi University (North Campus)', 
  'IIT Bombay', 
  'VIT Vellore',
  'Manipal University'
];
