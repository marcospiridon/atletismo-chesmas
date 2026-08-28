import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: any = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Atenção: Variáveis VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY em falta! A usar o modo local (localStorage) como salvaguarda.');
} else {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Erro ao inicializar o cliente Supabase:', err);
  }
}

export const supabase = supabaseInstance;
