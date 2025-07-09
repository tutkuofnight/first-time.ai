import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig()

export const supabase = createClient(config.supabaseUrl as string, config.supabaseKey as string);