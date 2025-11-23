// Mock data for insurance providers
const insuranceData = [
  {
    id: 1,
    name: "Jubilee Insurance",
    type: "Motor Insurance",
    logo_url: "https://via.placeholder.com/100?text=Jubilee",
    website: "https://jubileeinsurance.co.ke",
    phone: "+254 20 3636000",
    email: "info@jubileeinsurance.co.ke",
    rating: 4.5,
    created_at: "2025-11-23 12:15:36",
    quote_count: 2
  },
  {
    id: 2,
    name: "AXA Insurance",
    type: "Motor Insurance",
    logo_url: "https://via.placeholder.com/100?text=AXA",
    website: "https://www.axa.co.ke",
    phone: "+254 20 3636000",
    email: "info@axa.co.ke",
    rating: 4.3,
    created_at: "2025-11-23 12:15:36",
    quote_count: 2
  },
  {
    id: 3,
    name: "Britam",
    type: "Motor Insurance",
    logo_url: "https://via.placeholder.com/100?text=Britam",
    website: "https://www.britam.com",
    phone: "+254 20 4200000",
    email: "info@britam.com",
    rating: 4.2,
    created_at: "2025-11-23 12:15:36",
    quote_count: 2
  },
  {
    id: 4,
    name: "UAP Old Mutual",
    type: "Motor Insurance",
    logo_url: "https://via.placeholder.com/100?text=UAP",
    website: "https://www.uapoldmutual.com",
    phone: "+254 20 3636000",
    email: "info@uapoldmutual.com",
    rating: 4.1,
    created_at: "2025-11-23 12:15:36",
    quote_count: 2
  },
  {
    id: 5,
    name: "Allianz",
    type: "Motor Insurance",
    logo_url: "https://via.placeholder.com/100?text=Allianz",
    website: "https://www.allianz.co.ke",
    phone: "+254 20 3636000",
    email: "info@allianz.co.ke",
    rating: 4.4,
    created_at: "2025-11-23 12:15:36",
    quote_count: 2
  }
];

const quotesData = {
  1: [
    {
      id: 1,
      provider_id: 1,
      vehicle_type: "Saloon",
      coverage_type: "Third Party",
      annual_premium: 12000,
      monthly_premium: 1000,
      deductible: 500,
      coverage_limit: 500000,
      created_at: "2025-11-23 12:15:36"
    },
    {
      id: 2,
      provider_id: 1,
      vehicle_type: "Saloon",
      coverage_type: "Comprehensive",
      annual_premium: 25000,
      monthly_premium: 2100,
      deductible: 1000,
      coverage_limit: 1000000,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  2: [
    {
      id: 3,
      provider_id: 2,
      vehicle_type: "Saloon",
      coverage_type: "Third Party",
      annual_premium: 11500,
      monthly_premium: 960,
      deductible: 500,
      coverage_limit: 500000,
      created_at: "2025-11-23 12:15:36"
    },
    {
      id: 4,
      provider_id: 2,
      vehicle_type: "Saloon",
      coverage_type: "Comprehensive",
      annual_premium: 24000,
      monthly_premium: 2000,
      deductible: 1000,
      coverage_limit: 1000000,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  3: [
    {
      id: 5,
      provider_id: 3,
      vehicle_type: "Saloon",
      coverage_type: "Third Party",
      annual_premium: 12500,
      monthly_premium: 1040,
      deductible: 500,
      coverage_limit: 500000,
      created_at: "2025-11-23 12:15:36"
    },
    {
      id: 6,
      provider_id: 3,
      vehicle_type: "Saloon",
      coverage_type: "Comprehensive",
      annual_premium: 26000,
      monthly_premium: 2170,
      deductible: 1000,
      coverage_limit: 1000000,
      created_at: "2025-11-23 12:15:36"
    }
  ]
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { providerId } = req.query;

    if (providerId) {
      // Get quotes for a specific provider
      const quotes = quotesData[providerId] || [];
      return res.status(200).json(quotes);
    }

    // Get all providers
    return res.status(200).json(insuranceData);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
