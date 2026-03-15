export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const Stripe = require("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { credits, price } = req.body;
    const amount = Math.round(parseFloat(String(price).replace(",", ".")) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: credits + " credits LettreMotiv-IA" },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: req.headers.origin + "/?success=true&credits=" + credits,
      cancel_url: req.headers.origin + "/?canceled=true",
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}
