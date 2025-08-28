// URL y ANON_KEY de Supabase
const SUPABASE_URL = "https://mrvjwygpojzljcnochnt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ydmp3eWdwb2p6bGpjbm9jaG50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzEwMDEsImV4cCI6MjA3MTk0NzAwMX0.EFZmDNwtVvbJUd70IVZ8WervvroFHd0FsE47afqV-tE";

// Crear cliente Supabase (correcto para navegador)
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para crear cuenta
async function signup() {
    const fullName = document.getElementById("fullName").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("emailReg").value.trim();
    const password = document.getElementById("passwordReg").value.trim();
    if (!fullName || !dob || !email || !password) return alert("Completa todos los campos.");

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert("Error al registrarte: " + error.message);

    const userId = data.user.id;
    const { error: profileError } = await supabase.from('profiles').insert([{id: userId, full_name: fullName, date_of_birth: dob}]);
    if (profileError) return alert("Error al crear perfil: " + profileError.message);

    alert("Cuenta creada con éxito. Ahora inicia sesión.");
}

// Función para iniciar sesión
async function login() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();
    if (!email || !password) return alert("Debes poner email y contraseña.");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert("Error al iniciar sesión: " + error.message);

    window.location.href = "dashboard.html";
}

// Asignar eventos a los botones
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnSignup").addEventListener("click", signup);
    document.getElementById("btnLogin").addEventListener("click", login);
});


