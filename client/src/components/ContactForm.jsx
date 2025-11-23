import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: 'consumer',
    details: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      const data = await response.json();
      setMessage({
        type: 'success',
        text: 'Thank you! Your inquiry has been submitted successfully. We will contact you soon.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiry_type: 'consumer',
        details: '',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Failed to submit inquiry. Please try again later.',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-section">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>📞 Get in Touch</h2>
        <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
          Have questions? Want to partner with us? We'd love to hear from you!
        </p>

        {/* Contact Info Cards */}
        <div className="grid" style={{ marginBottom: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="card">
            <h4 style={{ marginBottom: '0.5rem' }}>📧 Email</h4>
            <p>
              <a href="mailto:info@pesacompare.ke" style={{ color: '#1e40af', textDecoration: 'none' }}>
                info@pesacompare.ke
              </a>
            </p>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: '0.5rem' }}>📱 Phone</h4>
            <p>
              <a href="tel:+254722000000" style={{ color: '#1e40af', textDecoration: 'none' }}>
                +254 722 000 000
              </a>
            </p>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: '0.5rem' }}>🏢 For Providers</h4>
            <p>
              <a href="mailto:providers@pesacompare.ke" style={{ color: '#1e40af', textDecoration: 'none' }}>
                providers@pesacompare.ke
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h3>Send us a Message</h3>

          {message && (
            <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254 722 000 000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="inquiry_type">Inquiry Type *</label>
              <select
                id="inquiry_type"
                name="inquiry_type"
                value={formData.inquiry_type}
                onChange={handleChange}
                required
              >
                <option value="consumer">Consumer - Looking for quotes</option>
                <option value="provider">Provider - Want to list your products</option>
                <option value="partnership">Partnership - Business opportunity</option>
                <option value="feedback">Feedback - General feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="details">Message *</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: '3rem' }}>
          <h3>Frequently Asked Questions</h3>

          <div className="card" style={{ marginTop: '1rem' }}>
            <h4>How does PesaCompare work?</h4>
            <p>
              PesaCompare is a free comparison platform that helps you find the best insurance and loan products from multiple providers. Simply enter your details, and we'll show you quotes from various companies so you can compare and choose the best option.
            </p>
          </div>

          <div className="card">
            <h4>Is PesaCompare really free?</h4>
            <p>
              Yes! PesaCompare is completely free for consumers. We earn a commission from service providers when you purchase a product through our platform, so there's no cost to you.
            </p>
          </div>

          <div className="card">
            <h4>How do I become a provider on PesaCompare?</h4>
            <p>
              If you're an insurance company, bank, or loan provider interested in reaching pre-qualified customers, contact us at <a href="mailto:providers@pesacompare.ke">providers@pesacompare.ke</a>. We'll discuss how we can help you grow your customer base.
            </p>
          </div>

          <div className="card">
            <h4>Is my personal information safe?</h4>
            <p>
              Yes, we take data security seriously. Your information is encrypted and only shared with the providers you choose to contact. We comply with all Kenyan data protection regulations.
            </p>
          </div>

          <div className="card">
            <h4>How long does it take to get a quote?</h4>
            <p>
              Most quotes are available instantly. You can compare multiple options in just a few minutes. If you need a customized quote, providers will contact you directly within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
