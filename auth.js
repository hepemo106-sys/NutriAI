// auth.js - EasyMeal completo
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// --- Configuración de Supabase ---
const SUPABASE_URL = "https://mrvjwygpojzljcnochnt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmp3eWdwb2p6bGpjbm9jaG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzEwMDEsImV4cCI6MjA3MTk0NzAwMX0.EFZmDNwtVvbJUd70IVZ8WervvroFHd0FsE47afqV-tE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- Función de registro ---
async function signup() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Debes poner email y contraseña.");
        return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        alert("Error al registrarte: " + error.message);
    } else {
        alert("Cuenta creada con éxito. Por favor inicia sesión.");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    }
}

// --- Función de inicio de sesión ---
async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

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

// --- Función de cierre de sesión ---
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Error al cerrar sesión: " + error.message);
    } else {
        window.location.href = "index.html";
    }
}

// --- Exportar funciones al HTML ---
window.signup = signup;
window.login = login;
window.logout = logout;

}
