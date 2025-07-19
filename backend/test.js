const { getSummary } = require('./gemini.js');
const { saveSummary } = require('./history.js');

const text = "The mitochondria is the powerhouse of the cell.";
const user_id = "anon";

async function run() {
  try {
    const summary = await getSummary(text, 'basic');
    console.log('Summary:', summary);

    await saveSummary({ user_id, input_text: text, output_summary: summary, mode: 'basic' });
    console.log('✅ Summary saved in Supabase');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();
