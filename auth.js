const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}

function logout() {
  supabaseClient.auth.signOut();
  window.location.href = "index.html";
}
