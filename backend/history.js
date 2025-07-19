const { supabase } = require('./supabase.js');

async function saveSummary({ user_id, input_text, output_summary, mode }) {
  const { data, error } = await supabase
    .from('summaries')
    .insert([{ user_id, input_text, output_summary, mode }]);

  if (error) throw error;
  return data;
}

module.exports = { saveSummary };
