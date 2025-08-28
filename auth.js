import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// --- Configuración Supabase ---
const SUPABASE_URL = "https://mrvjwygpojzljcnochnt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmp3eWdwb2p6bGpjbm9jaG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzEwMDEsImV4cCI6MjA3MTk0NzAwMX0.EFZmDNwtVvbJUd70IVZ8WervvroFHd0FsE47afqV-tE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Crear cuenta ---
async function signup() {
    const fullName = document.getElementById("fullName").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("emailReg").value.trim();
    const password = document.getElementById("passwordReg").value.trim();

    if (!fullName || !dob || !email || !password) {
        alert("Completa todos los campos.");
        return;
    }

    // Crear usuario en auth
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        alert("Error al registrarte: " + error.message);
        return;
    }

    // Crear perfil en tabla 'profiles'
    const userId = data.user.id;
    const { error: profileError } = await supabase.from('profiles').insert([{
        id: userId,
        full_name: fullName,
        date_of_birth: dob
    }]);

    if (profileError) {
        alert("Error al crear perfil: " + profileError.message);
        return;
    }

    alert("Cuenta creada con éxito. Ahora inicia sesión.");
}

// --- Login ---
async function login() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    if (!email || !password) {
        alert("Debes poner email y contraseña.");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Error al iniciar sesión: " + error.message);
    } else {
        window.location.href = "dashboard.html";
    }
}

// --- Logout ---
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) alert("Error al cerrar sesión: " + error.message);
    else window.location.href = "index.html";
}

// Exportar funciones
window.signup = signup;
window.login = login;
window.logout = logout;
