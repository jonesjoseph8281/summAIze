require('dotenv').config();

async function getSummary(text, mode = 'basic') {
  const prompts = {
    basic: `Summarize this in 2 lines:\n\n${text}`,
    explain5: `Explain this as if I'm 5 years old:\n\n${text}`
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompts[mode] || prompts.basic }]
          }
        ]
      })
    }
  );

  const data = await response.json();

  if (data.error) throw new Error(data.error.message);

  return data.candidates[0].content.parts[0].text.trim();
}

module.exports = { getSummary };
