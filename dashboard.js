const SUPABASE_URL = "https://mrvjwygpojzljcnochnt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmp3eWdwb2p6bGpjbm9jaG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzEwMDEsImV4cCI6MjA3MTk0NzAwMX0.EFZmDNwtVvbJUd70IVZ8WervvroFHd0FsE47afqV-tE";

const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) { document.getElementById("welcomeText").innerText = "Error al cargar usuario"; return; }
    if (!user) { window.location.href = "index.html"; return; }
    const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (profileError) { document.getElementById("welcomeText").innerText = "Error al cargar perfil"; return; }
    document.getElementById("welcomeText").innerText = "Bienvenido, " + profile.full_name + "!";
}

document.addEventListener("DOMContentLoaded", () => {
    loadUser();
    document.getElementById("btnLogout").addEventListener("click", async () => {
        const { error } = await supabase.auth.signOut();
        if (error) alert("Error al cerrar sesión: " + error.message);
        else window.location.href = "index.html";
    });
});

