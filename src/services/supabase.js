
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://njjpuiztpwopmfyetfza.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qanB1aXp0cHdvcG1meWV0ZnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNTE2NDcsImV4cCI6MjAxNjgyNzY0N30.wLBgp8_MoSYba_cw_14UWqMZlBbBrDiSMUPn99x9YDs'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;