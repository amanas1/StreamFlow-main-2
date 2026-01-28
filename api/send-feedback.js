export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { rating, message, userId } = req.body;

  // Email send via Web3Forms (free service)
  const formData = {
    access_key: process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_KEY_HERE',
    subject: `⭐ StreamFlow Feedback: ${rating}/5`,
    from_name: 'StreamFlow App',
    email: 'amanas5535332@gmail.com',
    message: `
Rating: ${'⭐'.repeat(rating)} (${rating}/5)

Message:
${message || 'No message provided'}

User ID: ${userId || 'Anonymous'}
Timestamp: ${new Date().toISOString()}
    `.trim()
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: data.message });
    }
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
