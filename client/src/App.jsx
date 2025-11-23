import React, { useState, useEffect } from 'react';
import './App.css';
import InsuranceComparison from './components/InsuranceComparison';
import LoanComparison from './components/LoanComparison';
import ContactForm from './components/ContactForm';

function App() {
  const [activeTab, setActiveTab] = useState('insurance');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1>🏦 PesaCompare KE</h1>
            <p className="tagline">Compare & Save on Insurance & Loans</p>
          </div>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Find the Best Deals on Insurance & Loans</h2>
          <p>Compare quotes from multiple providers and save money in minutes</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Providers</p>
            </div>
            <div className="stat">
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>KES 500M</h3>
              <p>Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="tabs-section">
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'insurance' ? 'active' : ''}`}
            onClick={() => setActiveTab('insurance')}
          >
            🚗 Insurance Comparison
          </button>
          <button 
            className={`tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
            onClick={() => setActiveTab('loans')}
          >
            💰 Loan Comparison
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            📞 Contact Us
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <main className="main-content">
        {activeTab === 'insurance' && <InsuranceComparison />}
        {activeTab === 'loans' && <LoanComparison />}
        {activeTab === 'contact' && <ContactForm />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About PesaCompare</h4>
            <p>We help Kenyans find the best financial products and save money.</p>
          </div>
          <div className="footer-section">
            <h4>For Providers</h4>
            <p>Reach pre-qualified customers. <a href="mailto:providers@pesacompare.ke">Contact us</a></p>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PesaCompare KE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
