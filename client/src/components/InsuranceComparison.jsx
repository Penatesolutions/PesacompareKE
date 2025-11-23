import React, { useState, useEffect } from 'react';

function InsuranceComparison() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchInsuranceProviders();
  }, []);

  const fetchInsuranceProviders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/insurance');
      if (!response.ok) throw new Error('Failed to fetch providers');
      const data = await response.json();
      setProviders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load insurance providers. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotes = async (providerId) => {
    try {
      const response = await fetch(`/api/insurance/${providerId}/quotes`);
      if (!response.ok) throw new Error('Failed to fetch quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      console.error(err);
      setQuotes([]);
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    fetchQuotes(provider.id);
  };

  const handleContactProvider = (provider) => {
    window.open(`mailto:${provider.email}?subject=Insurance Inquiry`, '_blank');
  };

  const handleVisitWebsite = (provider) => {
    window.open(provider.website, '_blank');
  };

  if (loading) {
    return <div className="loading">Loading insurance providers...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="comparison-section">
      <h2>🚗 Motor Insurance Comparison</h2>
      <p>Compare quotes from Kenya's top insurance providers and find the best coverage for your vehicle.</p>

      {/* Filter Section */}
      <div className="filter-section" style={{ marginBottom: '2rem', marginTop: '1rem' }}>
        <label htmlFor="coverage-filter">Filter by Coverage Type:</label>
        <select
          id="coverage-filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ marginLeft: '1rem', padding: '0.5rem' }}
        >
          <option value="all">All Coverage Types</option>
          <option value="Third Party">Third Party</option>
          <option value="Comprehensive">Comprehensive</option>
        </select>
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
                {provider.quote_count} quote{provider.quote_count !== 1 ? 's' : ''} available
              </p>
              <button
                className="btn btn-primary btn-small"
                onClick={() => handleProviderClick(provider)}
                style={{ marginBottom: '0.5rem', width: '100%' }}
              >
                View Quotes
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
          <h3>Quotes from {selectedProvider.name}</h3>
          <div className="card">
            <div className="card-header">
              <div className="card-logo">{selectedProvider.name.charAt(0)}</div>
              <div className="card-title">
                <h3>{selectedProvider.name}</h3>
                <p style={{ color: '#6b7280' }}>Contact: {selectedProvider.phone}</p>
              </div>
            </div>

            {quotes.length > 0 ? (
              <div className="card-body">
                {quotes.map((quote) => (
                  <div key={quote.id} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                    <h4 style={{ marginBottom: '1rem', color: '#1f2937' }}>
                      {quote.vehicle_type} - {quote.coverage_type}
                    </h4>
                    <div className="quote-item">
                      <span className="quote-label">Annual Premium:</span>
                      <span className="quote-value">KES {quote.annual_premium?.toLocaleString()}</span>
                    </div>
                    <div className="quote-item">
                      <span className="quote-label">Monthly Premium:</span>
                      <span className="quote-value">KES {quote.monthly_premium?.toLocaleString()}</span>
                    </div>
                    <div className="quote-item">
                      <span className="quote-label">Deductible:</span>
                      <span className="quote-value">KES {quote.deductible?.toLocaleString()}</span>
                    </div>
                    <div className="quote-item">
                      <span className="quote-label">Coverage Limit:</span>
                      <span className="quote-value">KES {quote.coverage_limit?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-primary"
                  onClick={() => handleContactProvider(selectedProvider)}
                >
                  Get Quote Now
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <p>No quotes available for this provider at the moment.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
        <h3>Why Compare with PesaCompare?</h3>
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>✓ Compare quotes from multiple insurers in one place</li>
          <li>✓ Find the best coverage for your budget</li>
          <li>✓ Save time and money on insurance premiums</li>
          <li>✓ Get instant quotes from top-rated providers</li>
          <li>✓ Transparent pricing with no hidden charges</li>
        </ul>
      </div>
    </div>
  );
}

export default InsuranceComparison;
