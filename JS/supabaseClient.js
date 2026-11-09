// Cole aqui os dados do seu projeto no Supabase
// (Project Settings > API Keys: "Project URL" e a chave "publishable")
const SUPABASE_URL = "https://egattaqkqvieozztetan.supabase.co";
const SUPABASE_KEY = "sb_publishable_I9e600dV0_LSp01nExvL0w_XsXzDAe2";

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
