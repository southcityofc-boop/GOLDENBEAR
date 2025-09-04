
const mercadopago = require("mercadopago");
// Use ACCESS_TOKEN from env
mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: "No items" });
  try {
    const preference = {
      items: items.map((it) => ({
        title: it.title,
        quantity: it.quantity,
        unit_price: Number(it.unit_price) || 0
      })),
      back_urls: {
        success: process.env.MP_BACK_URL || "https://your-domain.com/success",
        failure: process.env.MP_BACK_URL || "https://your-domain.com/failure",
        pending: process.env.MP_BACK_URL || "https://your-domain.com/pending"
      },
      auto_return: "approved"
    };
    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point, preference_id: response.body.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "checkout_error" });
  }
}
