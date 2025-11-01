const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const upload = multer({ dest: 'uploads/' });
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// Poster
app.post('/generate/poster', async (req, res) => {
  const { product, desc, color } = req.body;
  const prompt = `Professional product poster: "${product}" - ${desc}, dominant color ${color}, modern, clean, high quality, 1024x1024`;

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: "stability-ai/sdxl:39ed52f2a78e8a2fdd2c97c7c7c404e0c7c8c7c7c7c7c7c7c7c7c7c7c7c7c7",
        input: { prompt, width: 1024, height: 1024 }
      })
    });
    const data = await response.json();
    const predictionId = data.id;

    let result;
    do {
      await new Promise(r => setTimeout(r, 3000));
      const poll = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
      });
      result = await poll.json();
    } while (result.status !== 'succeeded' && result.status !== 'failed');

    if (result.status === 'succeeded') {
      res.json({ image: result.output[0] });
    } else {
      res.status(500).json({ error: 'Gagal generate' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Karikatur
app.post('/generate/karikatur', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image' });

  const style = req.body.style === 'anime' ? 'anime style' : req.body.style === 'sketch' ? 'pencil sketch' : 'cartoon style';

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        version: "fofr/cartoongan:9ee8e8d0b2f0e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8",
        input: { image: `data:image/jpeg;base64,${require('fs').readFileSync(req.file.path, 'base64')}`, style }
      })
    });
    const data = await response.json();
    const predictionId = data.id;

    let result;
    do {
      await new Promise(r => setTimeout(r, 2000));
      const poll = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
      });
      result = await poll.json();
    } while (result.status !== 'succeeded' && result.status !== 'failed');

    if (result.status === 'succeeded') {
      res.json({ image: result.output[0] });
    } else {
      res.status(500).json({ error: 'Gagal karikatur' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
