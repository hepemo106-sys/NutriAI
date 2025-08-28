# EasyMeal Auth Complete
Proyecto completo de EasyMeal con registro, login, logout y dashboard.

## Cómo usar
1. Crear tabla 'profiles' en Supabase:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  date_of_birth date not null,
  created_at timestamptz default now()
);
```

2. Sustituir `SUPABASE_URL` y `SUPABASE_ANON_KEY` en `auth.js` y `dashboard.js` con tus datos de Supabase.  
3. Subir todo a GitHub y desplegar en Vercel.  
4. Acceder a `index.html`, crear cuenta y entrar al dashboard.
