// Store inquiries in memory (in production, use a database)
let inquiries = [];

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

  if (req.method === 'POST') {
    const { name, email, phone, inquiry_type, details } = req.body;

    // Validate required fields
    if (!name || !email || !inquiry_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create inquiry object
    const inquiry = {
      id: inquiries.length + 1,
      name,
      email,
      phone: phone || '',
      inquiry_type,
      details: details || '',
      created_at: new Date().toISOString()
    };

    // Store inquiry
    inquiries.push(inquiry);

    // Log to console (in production, send email or save to database)
    console.log('New inquiry received:', inquiry);

    return res.status(200).json({
      id: inquiry.id,
      message: 'Inquiry submitted successfully'
    });
  }

  if (req.method === 'GET') {
    // Return all inquiries (for admin purposes)
    return res.status(200).json(inquiries);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
