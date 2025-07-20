const express = require('express');
const cors = require('cors');
const { getSummary } = require('./gemini');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/summarize', async (req, res) => {
  const { user_id = 'anon', text } = req.body;

  try {
    const result = await getSummary(text, 'basic');
    res.json({ result }); // Directly send Gemini response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/explain', async (req, res) => {
  const { user_id = 'anon', text } = req.body;

  try {
    const result = await getSummary(text, 'explain5');
    res.json({ result }); // Directly send Gemini response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
