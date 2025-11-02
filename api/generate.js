import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product, desc, color } = req.body;
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Token Replicate tidak ditemukan!" });
  }

  const prompt = `Professional product poster for "${product}" — ${desc}, with dominant color ${color}, modern, clean, and aesthetic design, high resolution.`;

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "stability-ai/sdxl",
        input: { prompt, width: 1024, height: 1024 },
      }),
    });

    const data = await response.json();

    if (!data.id) {
      return res.status(500).json({ error: "Gagal memulai proses AI." });
    }

    // polling hasil
    let result;
    do {
      await new Promise((r) => setTimeout(r, 3000));
      const poll = await fetch(`https://api.replicate.com/v1/predictions/${data.id}`, {
        headers: { Authorization: `Token ${token}` },
      });
      result = await poll.json();
    } while (result.status !== "succeeded" && result.status !== "failed");

    if (result.status === "succeeded") {
      res.json({ output: result.output });
    } else {
      res.status(500).json({ error: "Proses gagal, coba lagi." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
