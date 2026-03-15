export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { packId, credits, price } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: credits + " credit" + (credits > 1 ? "s" : "") + " LettreMotiv-IA",
            description: "Generez " + credits + " lettre" + (credits > 1 ? "s" : "") + " de motivation avec l'IA",
          },
          unit_amount: Math.round(parseFloat(price.replace(",", ".")) * 100),
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: req.headers.origin + "/?success=true&credits=" + credits,
      cancel_url: req.headers.origin + "/?canceled=true",
    });
    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
