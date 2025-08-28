// Serverless Function - Vercel
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

module.exports = async (req, res) => {
  const origin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const amount = Math.max(1, parseInt(req.body?.amount || '1', 10)); // in EGP
    const currency = process.env.STRIPE_CURRENCY || 'egp';

    const pi = await stripe.paymentIntents.create({
      amount: amount * 100, // subunits
      currency,
      description: 'Pre Ride Plus trip',
      metadata: { source: 'pre-ride-plus' },
      automatic_payment_methods: { enabled: true },
    });

    return res.status(200).json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
