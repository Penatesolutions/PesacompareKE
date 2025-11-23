import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, '../db/pesacompare.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Insurance providers table
    db.run(`
      CREATE TABLE IF NOT EXISTS insurance_providers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        logo_url TEXT,
        website TEXT,
        phone TEXT,
        email TEXT,
        rating REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insurance quotes table
    db.run(`
      CREATE TABLE IF NOT EXISTS insurance_quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider_id INTEGER NOT NULL,
        vehicle_type TEXT,
        coverage_type TEXT,
        annual_premium REAL,
        monthly_premium REAL,
        deductible REAL,
        coverage_limit REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (provider_id) REFERENCES insurance_providers(id)
      )
    `);

    // Loan providers table
    db.run(`
      CREATE TABLE IF NOT EXISTS loan_providers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        logo_url TEXT,
        website TEXT,
        phone TEXT,
        email TEXT,
        rating REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Loan offers table
    db.run(`
      CREATE TABLE IF NOT EXISTS loan_offers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider_id INTEGER NOT NULL,
        loan_type TEXT,
        min_amount REAL,
        max_amount REAL,
        interest_rate REAL,
        processing_fee REAL,
        tenure_months INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (provider_id) REFERENCES loan_providers(id)
      )
    `);

    // User inquiries table
    db.run(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        inquiry_type TEXT,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed sample data
    seedDatabase();
  });
}

// Seed database with sample data
function seedDatabase() {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM insurance_providers', (err, row) => {
    if (row && row.count === 0) {
      // Insert insurance providers
      const insuranceProviders = [
        ['Jubilee Insurance', 'Motor Insurance', 'https://via.placeholder.com/100?text=Jubilee', 'https://jubileeinsurance.co.ke', '+254 20 3636000', 'info@jubileeinsurance.co.ke', 4.5],
        ['AXA Insurance', 'Motor Insurance', 'https://via.placeholder.com/100?text=AXA', 'https://www.axa.co.ke', '+254 20 3636000', 'info@axa.co.ke', 4.3],
        ['Britam', 'Motor Insurance', 'https://via.placeholder.com/100?text=Britam', 'https://www.britam.com', '+254 20 4200000', 'info@britam.com', 4.2],
        ['UAP Old Mutual', 'Motor Insurance', 'https://via.placeholder.com/100?text=UAP', 'https://www.uapoldmutual.com', '+254 20 3636000', 'info@uapoldmutual.com', 4.1],
        ['Allianz', 'Motor Insurance', 'https://via.placeholder.com/100?text=Allianz', 'https://www.allianz.co.ke', '+254 20 3636000', 'info@allianz.co.ke', 4.4],
      ];

      insuranceProviders.forEach((provider) => {
        db.run(
          'INSERT INTO insurance_providers (name, type, logo_url, website, phone, email, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
          provider
        );
      });

      // Insert loan providers
      const loanProviders = [
        ['M-Pesa Loan', 'Personal Loan', 'https://via.placeholder.com/100?text=MPesa', 'https://www.m-pesa.co.ke', '+254 722 000 000', 'support@m-pesa.co.ke', 4.6],
        ['Equity Bank', 'Personal Loan', 'https://via.placeholder.com/100?text=Equity', 'https://www.equitybank.co.ke', '+254 20 3200000', 'info@equitybank.co.ke', 4.2],
        ['KCB Bank', 'Personal Loan', 'https://via.placeholder.com/100?text=KCB', 'https://www.kcbgroup.com', '+254 20 3200000', 'info@kcbgroup.com', 4.1],
        ['Safaricom Loans', 'Personal Loan', 'https://via.placeholder.com/100?text=Safaricom', 'https://www.safaricom.co.ke', '+254 722 000 000', 'support@safaricom.co.ke', 4.3],
        ['Branch International', 'SME Loan', 'https://via.placeholder.com/100?text=Branch', 'https://www.branchapp.com', '+254 722 000 000', 'support@branchapp.com', 4.4],
      ];

      loanProviders.forEach((provider) => {
        db.run(
          'INSERT INTO loan_providers (name, type, logo_url, website, phone, email, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
          provider
        );
      });

      // Insert insurance quotes
      const quotes = [
        [1, 'Saloon', 'Third Party', 12000, 1000, 500, 500000],
        [1, 'Saloon', 'Comprehensive', 25000, 2100, 1000, 1000000],
        [2, 'Saloon', 'Third Party', 11500, 960, 500, 500000],
        [2, 'Saloon', 'Comprehensive', 24000, 2000, 1000, 1000000],
        [3, 'Saloon', 'Third Party', 12500, 1040, 500, 500000],
        [3, 'Saloon', 'Comprehensive', 26000, 2170, 1000, 1000000],
      ];

      quotes.forEach((quote) => {
        db.run(
          'INSERT INTO insurance_quotes (provider_id, vehicle_type, coverage_type, annual_premium, monthly_premium, deductible, coverage_limit) VALUES (?, ?, ?, ?, ?, ?, ?)',
          quote
        );
      });

      // Insert loan offers
      const offers = [
        [1, 'Personal Loan', 1000, 50000, 8.5, 2.5, 12],
        [1, 'Personal Loan', 1000, 50000, 8.5, 2.5, 24],
        [2, 'Personal Loan', 5000, 100000, 7.5, 1.5, 12],
        [2, 'Personal Loan', 5000, 100000, 7.5, 1.5, 24],
        [3, 'Personal Loan', 10000, 200000, 6.5, 1.0, 12],
        [5, 'SME Loan', 50000, 500000, 12.0, 3.0, 12],
      ];

      offers.forEach((offer) => {
        db.run(
          'INSERT INTO loan_offers (provider_id, loan_type, min_amount, max_amount, interest_rate, processing_fee, tenure_months) VALUES (?, ?, ?, ?, ?, ?, ?)',
          offer
        );
      });

      console.log('Database seeded with sample data');
    }
  });
}

// API Routes

// Get all insurance providers with quotes
app.get('/api/insurance', (req, res) => {
  db.all(
    `SELECT ip.*, COUNT(iq.id) as quote_count 
     FROM insurance_providers ip 
     LEFT JOIN insurance_quotes iq ON ip.id = iq.provider_id 
     GROUP BY ip.id`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Get insurance quotes for a provider
app.get('/api/insurance/:providerId/quotes', (req, res) => {
  const { providerId } = req.params;
  db.all(
    'SELECT * FROM insurance_quotes WHERE provider_id = ?',
    [providerId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Get all loan providers with offers
app.get('/api/loans', (req, res) => {
  db.all(
    `SELECT lp.*, COUNT(lo.id) as offer_count 
     FROM loan_providers lp 
     LEFT JOIN loan_offers lo ON lp.id = lo.provider_id 
     GROUP BY lp.id`,
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Get loan offers for a provider
app.get('/api/loans/:providerId/offers', (req, res) => {
  const { providerId } = req.params;
  db.all(
    'SELECT * FROM loan_offers WHERE provider_id = ?',
    [providerId],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

// Submit inquiry
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, inquiry_type, details } = req.body;
  
  if (!name || !email || !inquiry_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    'INSERT INTO inquiries (name, email, phone, inquiry_type, details) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, inquiry_type, details],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, message: 'Inquiry submitted successfully' });
      }
    }
  );
});

// Serve static files from client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback to index.html for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
