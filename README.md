# PesaCompare KE - Insurance & Loan Comparison Platform

A modern price comparison website for the Kenyan market, helping consumers find the best deals on motor insurance and personal loans while providing service providers with qualified leads.

## 🎯 Project Overview

**PesaCompare KE** is a free-to-use comparison platform that:
- Allows consumers to compare insurance quotes and loan offers from multiple providers
- Provides service providers (insurers, banks, fintech companies) with pre-qualified leads
- Generates revenue through affiliate commissions and lead generation fees from providers
- Offers a mobile-friendly, intuitive interface for easy comparison

## 📋 Key Features

### For Consumers
- **Insurance Comparison**: Compare motor insurance quotes from 5+ providers
- **Loan Comparison**: Browse personal and SME loan offers with instant calculations
- **Loan Calculator**: Estimate monthly payments based on amount and tenure
- **Provider Ratings**: View ratings and reviews for each provider
- **Direct Contact**: Get quotes directly from providers
- **Mobile-Friendly**: Fully responsive design for mobile and desktop

### For Service Providers
- **Lead Generation**: Access pre-qualified, high-intent customers
- **Easy Integration**: Simple listing and quote management
- **Transparent Pricing**: Clear commission structure
- **Analytics**: Track inquiries and conversions

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
PesaCompareKE/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InsuranceComparison.jsx
│   │   │   ├── LoanComparison.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── dist/ (built files)
├── server/
│   └── index.js
├── db/
│   └── pesacompare.db (SQLite database)
├── package.json
├── vite.config.js
├── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm
- SQLite3

### Installation

1. Clone the repository:
```bash
cd PesaCompareKE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Build for Production

```bash
npm run build
npm run start
```

## 📊 Database Schema

### Tables

**insurance_providers**
- id, name, type, logo_url, website, phone, email, rating, created_at

**insurance_quotes**
- id, provider_id, vehicle_type, coverage_type, annual_premium, monthly_premium, deductible, coverage_limit, created_at

**loan_providers**
- id, name, type, logo_url, website, phone, email, rating, created_at

**loan_offers**
- id, provider_id, loan_type, min_amount, max_amount, interest_rate, processing_fee, tenure_months, created_at

**inquiries**
- id, name, email, phone, inquiry_type, details, created_at

## 🔌 API Endpoints

### Insurance
- `GET /api/insurance` - Get all insurance providers
- `GET /api/insurance/:providerId/quotes` - Get quotes for a specific provider

### Loans
- `GET /api/loans` - Get all loan providers
- `GET /api/loans/:providerId/offers` - Get offers for a specific provider

### Inquiries
- `POST /api/inquiries` - Submit a contact inquiry

## 💼 Business Model

### Revenue Streams

1. **Lead Generation**: Charge providers per qualified lead (e.g., KES 500-2,000 per inquiry)
2. **Affiliate Commissions**: Earn commission on successful conversions (e.g., 5-10% of first premium/loan amount)
3. **Premium Listings**: Offer featured placement for providers (e.g., KES 10,000-50,000/month)
4. **Data & Analytics**: Provide market insights to providers (premium service)

### Provider Value Proposition
- Access to pre-qualified customers actively seeking products
- Transparent, performance-based pricing
- Detailed analytics and conversion tracking
- Easy integration and management

## 🎨 Design Features

- **Modern UI**: Clean, professional design with intuitive navigation
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility**: WCAG-compliant design
- **Fast Performance**: Optimized for quick load times
- **User-Friendly**: Simple comparison and filtering options

## 📱 Supported Products

### Insurance
- Motor Insurance (Third Party, Comprehensive)
- Health Insurance (future)
- Life Insurance (future)
- Travel Insurance (future)

### Loans
- Personal Loans
- SME Business Loans
- Micro-loans (future)
- Car Finance (future)

### Other Services (Planned)
- Mobile/Internet Data Plans
- Solar/Energy Solutions
- Vehicle Servicing

## 🔒 Security & Privacy

- HTTPS encryption for all data transmission
- Secure database with encrypted sensitive information
- GDPR and Kenyan data protection compliance
- User data only shared with selected providers
- No third-party data selling

## 📈 Growth Strategy

1. **Phase 1**: Launch with motor insurance and personal loans
2. **Phase 2**: Add health insurance and SME loans
3. **Phase 3**: Expand to utilities and other services
4. **Phase 4**: Introduce AI-powered recommendations
5. **Phase 5**: Regional expansion to other African countries

## 🤝 Partnership Opportunities

Interested in becoming a provider on PesaCompare KE?

**Contact**: providers@pesacompare.ke

Benefits:
- Reach thousands of qualified customers
- Performance-based pricing model
- Dedicated account management
- Marketing support and co-branding opportunities

## 📞 Support

- **Consumer Support**: info@pesacompare.ke
- **Provider Support**: providers@pesacompare.ke
- **Phone**: +254 722 000 000

## 📄 License

ISC License

## 🙏 Acknowledgments

Built with modern web technologies to serve the Kenyan market and help consumers make better financial decisions.

---

**Made with ❤️ for Kenya's digital financial ecosystem**
