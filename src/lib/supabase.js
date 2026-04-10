import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gjclzeuoefoapmbhmzhl.supabase.co";
const supabaseKey = "sb_publishable_VT8zMemcFqijDaeU1mANDw_SiqasjjE";

export const supabase = createClient(supabaseUrl, supabaseKey);