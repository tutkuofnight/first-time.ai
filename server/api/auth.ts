import { supabase } from "@/utils/supabase"

export default defineEventHandler(async (event) => {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google"
  })
  return res
})