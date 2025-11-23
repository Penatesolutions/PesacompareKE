import React, { useState, useEffect } from 'react';

function LoanComparison() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTenure, setLoanTenure] = useState(12);

  useEffect(() => {
    fetchLoanProviders();
  }, []);

  const fetchLoanProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/loans');
      if (!response.ok) throw new Error('Failed to fetch providers');
      const data = await response.json();
      setProviders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load loan providers. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async (providerId) => {
    try {
      const response = await fetch(`/api/loans/${providerId}/offers`);
      if (!response.ok) throw new Error('Failed to fetch offers');
      const data = await response.json();
      setOffers(data);
    } catch (err) {
      console.error(err);
      setOffers([]);
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    fetchOffers(provider.id);
  };

  const handleContactProvider = (provider) => {
    window.open(`mailto:${provider.email}?subject=Loan Inquiry`, '_blank');
  };

  const handleVisitWebsite = (provider) => {
    window.open(provider.website, '_blank');
  };

  const calculateMonthlyPayment = (principal, rate, months) => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  if (loading) {
    return <div className="loading">Loading loan providers...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="comparison-section">
      <h2>💰 Personal & Business Loan Comparison</h2>
      <p>Compare loan offers from Kenya's leading digital lenders and find the best rates for your needs.</p>

      {/* Loan Calculator */}
      <div className="card" style={{ marginTop: '1.5rem', marginBottom: '2rem', backgroundColor: '#f0f9ff' }}>
        <h3>Quick Loan Calculator</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div className="form-group">
            <label>Loan Amount (KES)</label>
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
            <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#1e40af' }}>
              KES {loanAmount.toLocaleString()}
            </p>
          </div>
          <div className="form-group">
            <label>Loan Tenure (Months)</label>
            <select
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
              <option value={24}>24 months</option>
              <option value={36}>36 months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="grid">
        {providers.map((provider) => (
          <div key={provider.id} className="card">
            <div className="card-header">
              <div className="card-logo">
                {provider.name.charAt(0)}
              </div>
              <div className="card-title">
                <h3>{provider.name}</h3>
                <div className="card-rating">
                  {'⭐'.repeat(Math.floor(provider.rating))} {provider.rating.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="card-body">
              <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                {provider.offer_count} offer{provider.offer_count !== 1 ? 's' : ''} available
              </p>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                <strong>Type:</strong> {provider.type}
              </p>
              <button
                className="btn btn-primary btn-small"
                onClick={() => handleProviderClick(provider)}
                style={{ marginBottom: '0.5rem', width: '100%' }}
              >
                View Offers
              </button>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-outline btn-small"
                onClick={() => handleContactProvider(provider)}
              >
                Contact
              </button>
              <button
                className="btn btn-secondary btn-small"
                onClick={() => handleVisitWebsite(provider)}
              >
                Website
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Provider Details */}
      {selectedProvider && (
        <div style={{ marginTop: '3rem' }}>
          <h3>Loan Offers from {selectedProvider.name}</h3>
          <div className="card">
            <div className="card-header">
              <div className="card-logo">{selectedProvider.name.charAt(0)}</div>
              <div className="card-title">
                <h3>{selectedProvider.name}</h3>
                <p style={{ color: '#6b7280' }}>Contact: {selectedProvider.phone}</p>
              </div>
            </div>

            {offers.length > 0 ? (
              <div className="card-body">
                {offers.map((offer) => {
                  const isEligible = loanAmount >= offer.min_amount && loanAmount <= offer.max_amount;
                  const monthlyPayment = calculateMonthlyPayment(loanAmount, offer.interest_rate, loanTenure);
                  const totalCost = monthlyPayment * loanTenure + (loanAmount * offer.processing_fee / 100);

                  return (
                    <div
                      key={offer.id}
                      style={{
                        marginBottom: '1.5rem',
                        paddingBottom: '1.5rem',
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: isEligible ? '#f0fdf4' : '#fff',
                        padding: '1rem',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ color: '#1f2937' }}>{offer.loan_type}</h4>
                        {isEligible && (
                          <span style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                            ✓ Eligible
                          </span>
                        )}
                      </div>

                      <div className="quote-item">
                        <span className="quote-label">Interest Rate:</span>
                        <span className="quote-value">{offer.interest_rate}% p.a.</span>
                      </div>
                      <div className="quote-item">
                        <span className="quote-label">Processing Fee:</span>
                        <span className="quote-value">{offer.processing_fee}%</span>
                      </div>
                      <div className="quote-item">
                        <span className="quote-label">Loan Range:</span>
                        <span className="quote-value">
                          KES {offer.min_amount?.toLocaleString()} - {offer.max_amount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="quote-item">
                        <span className="quote-label">Tenure:</span>
                        <span className="quote-value">{offer.tenure_months} months</span>
                      </div>

                      {isEligible && (
                        <>
                          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', borderLeft: '4px solid #0ea5e9' }}>
                            <h5 style={{ marginBottom: '0.5rem', color: '#0c4a6e' }}>For KES {loanAmount.toLocaleString()} over {loanTenure} months:</h5>
                            <div className="quote-item">
                              <span className="quote-label">Monthly Payment:</span>
                              <span className="quote-value">KES {monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="quote-item">
                              <span className="quote-label">Total Cost:</span>
                              <span className="quote-value">KES {totalCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
                <button
                  className="btn btn-primary"
                  onClick={() => handleContactProvider(selectedProvider)}
                >
                  Apply for Loan
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <p>No offers available for this provider at the moment.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
        <h3>Why Compare Loans with PesaCompare?</h3>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>✓ Compare interest rates from multiple lenders instantly</li>
          <li>✓ Transparent loan terms with no hidden charges</li>
          <li>✓ Fast approval process from digital-first lenders</li>
          <li>✓ Loans tailored for individuals and SMEs</li>
          <li>✓ Mobile-friendly application process</li>
        </ul>
      </div>
    </div>
  );
}

export default LoanComparison;
