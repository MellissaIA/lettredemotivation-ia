import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "Stripe key missing" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { credits, price } = req.body;
    const amount = Math.round(parseFloat(String(price).replace(",", ".")) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: credits + " credit" + (credits > 1 ? "s" : "") + " LettreMotiv-IA",
            description: "Generez " + credits + " lettre" + (credits > 1 ? "s" : "") + " de motivation avec IA",
          },
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
    return res.status(500).json({ error: error.message });
  }
}
