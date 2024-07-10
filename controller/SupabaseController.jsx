import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://xucdwiguarigytxidmew.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2R3aWd1YXJpZ3l0eGlkbWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1ODk4NzksImV4cCI6MjAyOTE2NTg3OX0.xFy3ra_v2Vgbc5EX3kkOaeDRj9QLMxSwVkY5Mkq3C6M'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
