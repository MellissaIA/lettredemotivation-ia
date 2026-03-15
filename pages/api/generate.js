export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, maxTokens } = req.body;

  if (!prompt || !maxTokens) {
    return res.status(400).json({ error: "Missing prompt or maxTokens" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      return res.status(200).json({ text: data.content[0].text });
    } else {
      return res.status(500).json({ error: "AI error", details: JSON.stringify(data) });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
