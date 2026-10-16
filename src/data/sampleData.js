// Comprehensive realistic seed data for Krishi Vault demonstration
export const INITIAL_USERS = [
  {
    id: 'user_farmer_1',
    name: 'Ramesh Patil',
    email: 'ramesh.patil@kisan.in',
    phone: '9822014589',
    role: 'farmer',
    preferredLanguage: 'mr',
    location: 'Nashik, Maharashtra',
    crops: ['Onion', 'Soybean', 'Wheat'],
    farmSize: '6.5 Acres',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'user_owner_1',
    name: 'Vikramaditya Deshmukh',
    email: 'vikram.storage@agroholdings.com',
    phone: '9820199421',
    role: 'owner',
    preferredLanguage: 'en',
    location: 'Pune, Maharashtra',
    companyName: 'Sahyadri Agro Logistics & Cold Chain Ltd.',
    gstin: '27AABCS1429E1Z8',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'user_farmer_2',
    name: 'Gurpreet Singh Dhillon',
    email: 'gurpreet.ludhiana@farmer.org',
    phone: '9814088210',
    role: 'farmer',
    preferredLanguage: 'pa',
    location: 'Ludhiana, Punjab',
    crops: ['Wheat', 'Paddy / Basmati', 'Mustard'],
    farmSize: '12 Acres',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80'
  },
  {
    id: 'user_farmer_3',
    name: 'Baldevbhai Patel',
    email: 'baldev.anand@khedut.in',
    phone: '9427051184',
    role: 'farmer',
    preferredLanguage: 'gu',
    location: 'Anand, Gujarat',
    crops: ['Cotton', 'Groundnut', 'Cumin'],
    farmSize: '8 Acres',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
  }
];

export const INITIAL_WAREHOUSES = [
  {
    id: 'wh_nashik_01',
    ownerId: 'user_owner_1',
    name: 'Sahyadri Onion & Multipurpose Agri Vault',
    type: 'onionStorage',
    storageTypeLabel: 'Scientific Onion Chawl & Multipurpose',
    location: 'Lasalgaon, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    address: 'Survey No. 44/2, Mumbai-Agra Highway, Lasalgaon',
    totalCapacity: 1200,
    availableCapacity: 450,
    rentPerMonth: 420, // ₹ per MT per month
    rating: 4.85,
    reviewsCount: 38,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/MH/2023/8891',
    supportedCrops: ['Onion', 'Garlic', 'Potato', 'Maize'],
    facilities: [
      'Forced Air Ventilation & Humidity Control',
      'Solar Backup & 24/7 CCTV Surveillance',
      'Electronic Weighbridge (100 MT)',
      'Scientific Pest Fumigation Protocols',
      'Comprehensive Fire & Theft Insurance',
      'Covered Loading / Unloading Docks'
    ],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Premier WDRA-approved ventilated onion storage complex situated adjacent to the Lasalgaon APMC market. Engineered specifically for reducing post-harvest onion weight loss and sprouting by over 60% compared to traditional field chawls.',
    contactPhone: '+91 98220 14500'
  },
  {
    id: 'wh_ludhiana_02',
    ownerId: 'user_owner_1',
    name: 'Punjab Agri Silos & Grain Terminal',
    type: 'grainSilo',
    storageTypeLabel: 'Galvanized Steel Grain Silo',
    location: 'Khanna, Ludhiana',
    district: 'Ludhiana',
    state: 'Punjab',
    address: 'GT Road, Near Asia Largest Grain Market, Khanna',
    totalCapacity: 3500,
    availableCapacity: 920,
    rentPerMonth: 310,
    rating: 4.92,
    reviewsCount: 52,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/PB/2022/4102',
    supportedCrops: ['Wheat', 'Paddy / Basmati', 'Maize', 'Barley'],
    facilities: [
      'Automated Grain Temperature Cables',
      'In-line Moisture Testing Lab',
      'Mechanical Grain Aeration & Dust Collectors',
      'Weighbridge with Automated RFID Slips',
      'Full Transit & Godown Insurance',
      'Rail Siding Accessibility (1.5 km)'
    ],
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Ultra-modern temperature-controlled galvanized steel silos located right next to Khanna grain market. Ideal for long-term storage of premium Sharbati wheat and Basmati paddy without bag handling losses.',
    contactPhone: '+91 98140 22001'
  },
  {
    id: 'wh_indore_03',
    ownerId: 'user_owner_1',
    name: 'Malwa Central Cold Chain & Seed Vault',
    type: 'coldStorage',
    storageTypeLabel: 'Multi-Chamber Cold Storage (2°C - 8°C)',
    location: 'Sanwer Road, Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    address: 'Sector C, Sanwer Industrial Area, Indore',
    totalCapacity: 2000,
    availableCapacity: 380,
    rentPerMonth: 580,
    rating: 4.78,
    reviewsCount: 29,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/MP/2023/1183',
    supportedCrops: ['Soybean Seeds', 'Potato', 'Pulses', 'Spices', 'Garlic'],
    facilities: [
      'Multi-Chamber Independent Thermostats',
      'German Bitzer Compressors with N+1 Redundancy',
      '100% DG Generator Backup',
      'Pre-cooling Bay for rapid temperature reduction',
      'Forklift and Palletized Racking Systems',
      'Digital Humidity Monitoring'
    ],
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Precision controlled multi-commodity cold store tailored for seed preservation, potato seed tubers, and premium coriander/spice stocks. Maintains 90% relative humidity to avoid dehydration shrinkage.',
    contactPhone: '+91 98270 33810'
  },
  {
    id: 'wh_rajkot_04',
    ownerId: 'user_owner_1',
    name: 'Saurashtra Groundnut & Cotton Dry Godown',
    type: 'dryStorage',
    storageTypeLabel: 'Modern Pre-Engineered Dry Godown',
    location: 'Gondal Highway, Rajkot',
    district: 'Rajkot',
    state: 'Gujarat',
    address: 'Survey 102/B, Gondal Bypas, Rajkot',
    totalCapacity: 2800,
    availableCapacity: 1100,
    rentPerMonth: 340,
    rating: 4.71,
    reviewsCount: 24,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/GJ/2022/9024',
    supportedCrops: ['Groundnut', 'Cotton Bales', 'Castor Seed', 'Sesame'],
    facilities: [
      'PEB Structure with High Plinth Level (anti-flood)',
      'Water-Proof Galvalume Roofing with Polycarbonate Skylights',
      'Rodent-Proof Perimeter Trenching',
      'Certified Fire Hydrant & Sprinkler System',
      'Electronic In-Out Consignment Tracking',
      'Direct Highway Truck Turnaround Parking'
    ],
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Spacious high-ceiling dry godown engineered for safe palletized stacking of groundnut pods and cotton bales. Zero moisture ingress guarantee with 24-hour manned physical security.',
    contactPhone: '+91 94272 55901'
  },
  {
    id: 'wh_dharwad_05',
    ownerId: 'user_owner_1',
    name: 'Karnataka Spice & Pulse Hub',
    type: 'multipurpose',
    storageTypeLabel: 'Ventilated Agri Godown',
    location: 'APMC Yard, Hubli-Dharwad',
    district: 'Dharwad',
    state: 'Karnataka',
    address: 'Plot 15-A, New APMC Industrial Layout, Hubli',
    totalCapacity: 1600,
    availableCapacity: 240,
    rentPerMonth: 390,
    rating: 4.88,
    reviewsCount: 41,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/KA/2021/6510',
    supportedCrops: ['Byadagi Chilli', 'Bengal Gram / Chana', 'Turmeric', 'Maize'],
    facilities: [
      'Chilli Cold Chamber (4°C - 10°C color retention)',
      'Dry Stacking Bays for Pulses',
      'Pest Prevention Nitrogen Purge Capability',
      'Standard Weight & Moisture Verification Counter',
      'Comprehensive Insurance coverage under New India Assurance'
    ],
    images: [
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Renowned storage destination for North Karnataka Byadagi red chillies and pulses. Specialized cold chambers preserve vibrant red color and pungency for up to 10 months without oil bleeding.',
    contactPhone: '+91 98450 67123'
  },
  {
    id: 'wh_agra_06',
    ownerId: 'user_owner_1',
    name: 'Yamuna Valley Cold Storage Complex',
    type: 'coldStorage',
    storageTypeLabel: 'High-Capacity Potato & Fruit Cold Store',
    location: 'Fatehabad Road, Agra',
    district: 'Agra',
    state: 'Uttar Pradesh',
    address: 'KM 14, Fatehabad Road, Agra',
    totalCapacity: 4000,
    availableCapacity: 1450,
    rentPerMonth: 460,
    rating: 4.69,
    reviewsCount: 33,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/UP/2023/3390',
    supportedCrops: ['Potato', 'Carrot', 'Apple', 'Garlic'],
    facilities: [
      'CIPC Sprout Suppressant Fogging System',
      'Computerized Carbon Dioxide Flush & Ventilation',
      'Multi-tier wooden rack scaffolding',
      'Heavy duty 80-tonne weighbridge',
      'CCTV app view access for registered farmers'
    ],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Massive modern cold storage in the heart of the Uttar Pradesh potato belt. Equipped with automatic CO2 exhaust blowers and CIPC fogging to keep table and processing potatoes fresh until off-season.',
    contactPhone: '+91 94122 88120'
  },
  {
    id: 'wh_pune_07',
    ownerId: 'user_owner_1',
    name: 'Baramati Sahakari Agro Logistics Warehouse',
    type: 'multipurpose',
    storageTypeLabel: 'Cooperative Multi-Commodity Shed',
    location: 'MIDC Phase II, Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    address: 'Plot 88, MIDC Baramati, Dist. Pune',
    totalCapacity: 1800,
    availableCapacity: 620,
    rentPerMonth: 360,
    rating: 4.82,
    reviewsCount: 26,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/MH/2022/7711',
    supportedCrops: ['Soybean', 'Jowar', 'Wheat', 'Gram', 'Jaggery'],
    facilities: [
      'Palletized Stacking & Automated Wrapping',
      'Moisture Controlled Ambient Air Blowers',
      'In-house Quality Grading Testing Kit',
      'Dedicated Farmer Rest Lounge & Washrooms',
      'Direct Banking Link for e-NWR Loan Pledge'
    ],
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Farmer-friendly warehouse facility with full support for electronic Negotiable Warehouse Receipts (e-NWR) enabling farmers to avail low-interest bank loans while their grains are stored.',
    contactPhone: '+91 98230 44556'
  },
  {
    id: 'wh_guntur_08',
    ownerId: 'user_owner_1',
    name: 'Andhra Spice Coast Cold Storage',
    type: 'coldStorage',
    storageTypeLabel: 'Controlled Atmosphere Chilli & Turmeric Vault',
    location: 'Narakodur, Guntur',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    address: 'NH-16, Tenali Road Junction, Guntur',
    totalCapacity: 2500,
    availableCapacity: 410,
    rentPerMonth: 590,
    rating: 4.90,
    reviewsCount: 47,
    wdraCertified: true,
    wdraRegNumber: 'WDRA/AP/2021/5012',
    supportedCrops: ['Guntur Sannam Chilli', 'Turmeric', 'Coriander', 'Tobacco'],
    facilities: [
      'Cold Chain 5°C with High RH Retention',
      'Pest-Free Sealed Dehumidified Chambers',
      'Electronic Stock Allocation Barcoding',
      '24/7 Security Patrol & Thermal Fire Sensors',
      'Covered Multi-truck Loading Platform'
    ],
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=800&q=80'
    ],
    status: 'available',
    description: 'Premier facility serving the renowned Guntur chilli export cluster. Offers specialized cold preservation ensuring that red chilli export quality, oleoresin content, and capsicums remain intact.',
    contactPhone: '+91 98480 33441'
  }
];

export const INITIAL_GROUPS = [
  {
    id: 'grp_onion_nashik_01',
    warehouseId: 'wh_nashik_01',
    warehouseName: 'Sahyadri Onion & Multipurpose Agri Vault',
    creatorId: 'user_farmer_1',
    creatorName: 'Ramesh Patil',
    title: 'Kharif Red Onion Shared Bay #4',
    cropType: 'Onion',
    location: 'Lasalgaon, Nashik',
    storageStartDate: '2026-11-01',
    storageEndDate: '2027-03-31',
    durationMonths: 5,
    capacityTarget: 100, // MT
    capacityAllocated: 65, // MT pledged so far
    sharingMode: 'proportional', // 'proportional' or 'equal'
    rentPerMtMonth: 420,
    status: 'open', // 'open', 'almostFull', 'full', 'confirmed'
    description: 'Looking for 3-4 fellow Nashik onion farmers to co-rent Bay #4 (100 MT) for 5 months. Good ventilation will keep our red onions fresh until March when prices rise.',
    members: [
      {
        id: 'mem_1',
        farmerId: 'user_farmer_1',
        farmerName: 'Ramesh Patil',
        farmerPhone: '9822014589',
        requestedCapacity: 40,
        estimatedCost: 84000, // 40 MT * 420 * 5
        joinedAt: '2026-10-10',
        status: 'confirmed'
      },
      {
        id: 'mem_2',
        farmerId: 'user_farmer_sim_1',
        farmerName: 'Dnyaneshwar Shinde',
        farmerPhone: '9823109283',
        requestedCapacity: 25,
        estimatedCost: 52500, // 25 MT * 420 * 5
        joinedAt: '2026-10-12',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'grp_wheat_khanna_02',
    warehouseId: 'wh_ludhiana_02',
    warehouseName: 'Punjab Agri Silos & Grain Terminal',
    creatorId: 'user_farmer_2',
    creatorName: 'Gurpreet Singh Dhillon',
    title: 'Premium Sharbati Wheat Co-Storage Bin 2B',
    cropType: 'Wheat',
    location: 'Khanna, Ludhiana',
    storageStartDate: '2026-11-15',
    storageEndDate: '2027-05-15',
    durationMonths: 6,
    capacityTarget: 200,
    capacityAllocated: 175,
    sharingMode: 'proportional',
    rentPerMtMonth: 310,
    status: 'almostFull',
    description: 'Collaborative silo booking for farmers in Khanna & Samrala. Storing wheat for 6 months to avoid mandi glut and sell to direct flour mill buyers.',
    members: [
      {
        id: 'mem_3',
        farmerId: 'user_farmer_2',
        farmerName: 'Gurpreet Singh Dhillon',
        farmerPhone: '9814088210',
        requestedCapacity: 75,
        estimatedCost: 139500, // 75 * 310 * 6
        joinedAt: '2026-10-05',
        status: 'confirmed'
      },
      {
        id: 'mem_4',
        farmerId: 'user_farmer_sim_2',
        farmerName: 'Harbhajan Singh Gill',
        farmerPhone: '9872019912',
        requestedCapacity: 60,
        estimatedCost: 111600,
        joinedAt: '2026-10-08',
        status: 'confirmed'
      },
      {
        id: 'mem_5',
        farmerId: 'user_farmer_sim_3',
        farmerName: 'Manmohan Preet',
        farmerPhone: '9815044219',
        requestedCapacity: 40,
        estimatedCost: 74400,
        joinedAt: '2026-10-14',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'grp_groundnut_rajkot_03',
    warehouseId: 'wh_rajkot_04',
    warehouseName: 'Saurashtra Groundnut & Cotton Dry Godown',
    creatorId: 'user_farmer_3',
    creatorName: 'Baldevbhai Patel',
    title: 'Saurashtra Groundnut Farmers Cooperative Lot #12',
    cropType: 'Groundnut',
    location: 'Gondal Highway, Rajkot',
    storageStartDate: '2026-11-01',
    storageEndDate: '2027-03-01',
    durationMonths: 4,
    capacityTarget: 150,
    capacityAllocated: 150,
    sharingMode: 'proportional',
    rentPerMtMonth: 340,
    status: 'full',
    description: 'Shared dry storage for GG-20 groundnut pods from Gondal APMC vicinity. 100% capacity pledged; waiting for owner final bay readiness confirmation.',
    members: [
      {
        id: 'mem_6',
        farmerId: 'user_farmer_3',
        farmerName: 'Baldevbhai Patel',
        farmerPhone: '9427051184',
        requestedCapacity: 60,
        estimatedCost: 81600,
        joinedAt: '2026-10-02',
        status: 'confirmed'
      },
      {
        id: 'mem_7',
        farmerId: 'user_farmer_sim_4',
        farmerName: 'Keshubhai Radadiya',
        farmerPhone: '9428091102',
        requestedCapacity: 50,
        estimatedCost: 68000,
        joinedAt: '2026-10-04',
        status: 'confirmed'
      },
      {
        id: 'mem_8',
        farmerId: 'user_farmer_sim_5',
        farmerName: 'Vipulbhai Vaghani',
        farmerPhone: '9825066710',
        requestedCapacity: 40,
        estimatedCost: 54400,
        joinedAt: '2026-10-06',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 'grp_chilli_guntur_04',
    warehouseId: 'wh_guntur_08',
    warehouseName: 'Andhra Spice Coast Cold Storage',
    creatorId: 'user_farmer_sim_6',
    creatorName: 'Siva Rama Krishna Rao',
    title: 'Export Quality Teja Chilli Cold Chamber Share',
    cropType: 'Guntur Sannam Chilli',
    location: 'Narakodur, Guntur',
    storageStartDate: '2026-12-01',
    storageEndDate: '2027-06-01',
    durationMonths: 6,
    capacityTarget: 80,
    capacityAllocated: 30,
    sharingMode: 'equal',
    rentPerMtMonth: 590,
    status: 'open',
    description: 'Equal split cold storage chamber for high-grade dried Teja red chillies. Target 4 farmers sharing 20 MT each to lock in top seasonal export pricing.',
    members: [
      {
        id: 'mem_9',
        farmerId: 'user_farmer_sim_6',
        farmerName: 'Siva Rama Krishna Rao',
        farmerPhone: '9848123987',
        requestedCapacity: 30,
        estimatedCost: 106200,
        joinedAt: '2026-10-15',
        status: 'confirmed'
      }
    ]
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk_sim_01',
    farmerId: 'user_farmer_1',
    farmerName: 'Ramesh Patil',
    warehouseId: 'wh_nashik_01',
    warehouseName: 'Sahyadri Onion & Multipurpose Agri Vault',
    groupId: 'grp_onion_nashik_01',
    cropType: 'Onion',
    allocatedCapacity: 40,
    startDate: '2026-11-01',
    endDate: '2027-03-31',
    durationMonths: 5,
    rentPerMonth: 420,
    totalCost: 84000,
    status: 'active', // 'active', 'pending', 'completed', 'cancelled'
    isGroupBooking: true,
    groupTitle: 'Kharif Red Onion Shared Bay #4',
    createdAt: '2026-10-10T14:30:00Z',
    receiptNumber: 'KV-MH-2026-0041'
  },
  {
    id: 'bk_sim_02',
    farmerId: 'user_farmer_1',
    farmerName: 'Ramesh Patil',
    warehouseId: 'wh_pune_07',
    warehouseName: 'Baramati Sahakari Agro Logistics Warehouse',
    groupId: null,
    cropType: 'Soybean',
    allocatedCapacity: 15,
    startDate: '2026-10-01',
    endDate: '2026-12-31',
    durationMonths: 3,
    rentPerMonth: 360,
    totalCost: 16200,
    status: 'active',
    isGroupBooking: false,
    groupTitle: 'Solo Farmer Bay Reservation',
    createdAt: '2026-09-28T09:15:00Z',
    receiptNumber: 'KV-MH-2026-0019'
  },
  {
    id: 'bk_sim_03',
    farmerId: 'user_farmer_2',
    farmerName: 'Gurpreet Singh Dhillon',
    warehouseId: 'wh_ludhiana_02',
    warehouseName: 'Punjab Agri Silos & Grain Terminal',
    groupId: 'grp_wheat_khanna_02',
    cropType: 'Wheat',
    allocatedCapacity: 75,
    startDate: '2026-11-15',
    endDate: '2027-05-15',
    durationMonths: 6,
    rentPerMonth: 310,
    totalCost: 139500,
    status: 'active',
    isGroupBooking: true,
    groupTitle: 'Premium Sharbati Wheat Co-Storage Bin 2B',
    createdAt: '2026-10-05T11:00:00Z',
    receiptNumber: 'KV-PB-2026-0088'
  },
  {
    id: 'bk_sim_pending_04',
    farmerId: 'user_farmer_sim_7',
    farmerName: 'Mahendra Jagtap',
    farmerPhone: '9822456711',
    warehouseId: 'wh_nashik_01',
    warehouseName: 'Sahyadri Onion & Multipurpose Agri Vault',
    groupId: null,
    cropType: 'Garlic',
    allocatedCapacity: 20,
    startDate: '2026-11-10',
    endDate: '2027-02-10',
    durationMonths: 3,
    rentPerMonth: 420,
    totalCost: 25200,
    status: 'pending',
    isGroupBooking: false,
    groupTitle: 'Direct Farmer Booking Request',
    createdAt: '2026-10-16T10:20:00Z',
    receiptNumber: 'KV-REQ-2026-0104'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_farmer_1',
    title: 'Group Booking Update: Bay #4',
    message: 'Dnyaneshwar Shinde joined your onion storage group (25 MT pledged). 35 MT remaining to fill the bay!',
    type: 'group',
    read: false,
    createdAt: '2026-10-12T16:45:00Z'
  },
  {
    id: 'notif_2',
    userId: 'user_farmer_1',
    title: 'Monthly Storage Statement Ready',
    message: 'Your Baramati Soybean storage receipt KV-MH-2026-0019 for October has been generated.',
    type: 'invoice',
    read: true,
    createdAt: '2026-10-01T08:00:00Z'
  },
  {
    id: 'notif_3',
    userId: 'user_owner_1',
    title: 'New Booking Request Received',
    message: 'Farmer Mahendra Jagtap requested 20 MT Garlic storage at Sahyadri Vault for 3 months.',
    type: 'request',
    read: false,
    createdAt: '2026-10-16T10:20:00Z'
  },
  {
    id: 'notif_4',
    userId: 'user_owner_1',
    title: 'High Occupancy Alert',
    message: 'Punjab Agri Silos is at 74% capacity. Sharbati Wheat group is nearing completion.',
    type: 'system',
    read: false,
    createdAt: '2026-10-15T12:00:00Z'
  }
];
