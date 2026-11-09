// Cole aqui os dados do seu projeto no Supabase
// (Project Settings > API Keys: "Project URL" e a chave "publishable")
const SUPABASE_URL = "COLE_AQUI_A_PROJECT_URL";
const SUPABASE_KEY = "COLE_AQUI_A_PUBLISHABLE_KEY";

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);
