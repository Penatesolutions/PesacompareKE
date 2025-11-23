// Mock data for loan providers
const loanData = [
  {
    id: 1,
    name: "M-Pesa Loan",
    type: "Personal Loan",
    logo_url: "https://via.placeholder.com/100?text=MPesa",
    website: "https://www.m-pesa.co.ke",
    phone: "+254 722 000 000",
    email: "support@m-pesa.co.ke",
    rating: 4.6,
    created_at: "2025-11-23 12:15:36",
    offer_count: 2
  },
  {
    id: 2,
    name: "Equity Bank",
    type: "Personal Loan",
    logo_url: "https://via.placeholder.com/100?text=Equity",
    website: "https://www.equitybank.co.ke",
    phone: "+254 20 3200000",
    email: "info@equitybank.co.ke",
    rating: 4.2,
    created_at: "2025-11-23 12:15:36",
    offer_count: 2
  },
  {
    id: 3,
    name: "KCB Bank",
    type: "Personal Loan",
    logo_url: "https://via.placeholder.com/100?text=KCB",
    website: "https://www.kcbgroup.com",
    phone: "+254 20 3200000",
    email: "info@kcbgroup.com",
    rating: 4.1,
    created_at: "2025-11-23 12:15:36",
    offer_count: 2
  },
  {
    id: 4,
    name: "Safaricom Loans",
    type: "Personal Loan",
    logo_url: "https://via.placeholder.com/100?text=Safaricom",
    website: "https://www.safaricom.co.ke",
    phone: "+254 722 000 000",
    email: "support@safaricom.co.ke",
    rating: 4.3,
    created_at: "2025-11-23 12:15:36",
    offer_count: 2
  },
  {
    id: 5,
    name: "Branch International",
    type: "SME Loan",
    logo_url: "https://via.placeholder.com/100?text=Branch",
    website: "https://www.branchapp.com",
    phone: "+254 722 000 000",
    email: "support@branchapp.com",
    rating: 4.4,
    created_at: "2025-11-23 12:15:36",
    offer_count: 2
  }
];

const offersData = {
  1: [
    {
      id: 1,
      provider_id: 1,
      loan_type: "Personal Loan",
      min_amount: 1000,
      max_amount: 50000,
      interest_rate: 8.5,
      processing_fee: 2.5,
      tenure_months: 12,
      created_at: "2025-11-23 12:15:36"
    },
    {
      id: 2,
      provider_id: 1,
      loan_type: "Personal Loan",
      min_amount: 1000,
      max_amount: 50000,
      interest_rate: 8.5,
      processing_fee: 2.5,
      tenure_months: 24,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  2: [
    {
      id: 3,
      provider_id: 2,
      loan_type: "Personal Loan",
      min_amount: 5000,
      max_amount: 100000,
      interest_rate: 7.5,
      processing_fee: 1.5,
      tenure_months: 12,
      created_at: "2025-11-23 12:15:36"
    },
    {
      id: 4,
      provider_id: 2,
      loan_type: "Personal Loan",
      min_amount: 5000,
      max_amount: 100000,
      interest_rate: 7.5,
      processing_fee: 1.5,
      tenure_months: 24,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  3: [
    {
      id: 5,
      provider_id: 3,
      loan_type: "Personal Loan",
      min_amount: 10000,
      max_amount: 200000,
      interest_rate: 6.5,
      processing_fee: 1.0,
      tenure_months: 12,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  4: [
    {
      id: 6,
      provider_id: 4,
      loan_type: "Personal Loan",
      min_amount: 1000,
      max_amount: 50000,
      interest_rate: 9.0,
      processing_fee: 2.0,
      tenure_months: 12,
      created_at: "2025-11-23 12:15:36"
    }
  ],
  5: [
    {
      id: 7,
      provider_id: 5,
      loan_type: "SME Loan",
      min_amount: 50000,
      max_amount: 500000,
      interest_rate: 12.0,
      processing_fee: 3.0,
      tenure_months: 12,
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
      // Get offers for a specific provider
      const offers = offersData[providerId] || [];
      return res.status(200).json(offers);
    }

    // Get all providers
    return res.status(200).json(loanData);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
