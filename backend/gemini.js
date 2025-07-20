require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Create the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the model to use
const modelName = "gemini-1.5-flash"; // Or "gemini-1.5-pro", adjust if needed

// Function to generate text based on mode
async function getSummary(text, mode = "basic") {
  const prompts = {
    basic: `Summarize the following text clearly and concisely, preserving its core message::\n\n${text}`,
    explain5: `Explain the following in simple and easy-to-understand language, using everyday examples if needed:\n\n${text}`,
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
