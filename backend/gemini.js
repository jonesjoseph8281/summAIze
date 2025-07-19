require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Create the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the model to use
const modelName = "gemini-1.5-flash"; // Or "gemini-1.5-pro", adjust if needed

// Function to generate text based on mode
async function getSummary(text, mode = "basic") {
  const prompts = {
    basic: `Summarize this in 2 lines:\n\n${text}`,
    explain5: `Explain this as if I'm 5 years old:\n\n${text}`,
  };

  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    const result = await model.generateContent(prompts[mode] || prompts.basic);
    const response = await result.response;
    const output = response.text().trim();

    return output;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("Failed to get response from Gemini: " + err.message);
  }
}

module.exports = { getSummary };
