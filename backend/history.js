const { supabase } = require('./supabase.js');

async function saveSummary({ user_id, input_text, output_summary, mode }) {
  const { data, error } = await supabase
    .from('summaries')
    .insert([{ user_id, input_text, output_summary, mode }]);

  if (error) throw error;
  return data;
}

async function getHistory(user_id) {
  const { data, error } = await supabase
    .from('summaries')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { saveSummary, getHistory };
