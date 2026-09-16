import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
      navigate("/admin/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#075b69] p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[url('/images/loginImage.png')] bg-cover  opacity-25" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            YLPHARMA
          </p>
          <h1 className="mt-8 max-w-xl text-6xl font-bold leading-tight">
            Cumplimiento que sostiene tu negocio.
          </h1>
        </div>
        <div className="relative flex items-center gap-3 text-sm text-cyan-100">
          <ShieldCheck size={20} />
          Gestión segura para equipos farmacéuticos.
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="flex flex-col w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">YLPHARMA</p>
          </div>
          <div className="mb-8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
              <LockKeyhole size={22} />
            </div>
            <h2 className="text-3xl font-bold">
              Acceso administrativo
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Ingresa para administrar noticias, servicios y consultas.
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-slate-200">
                Correo electrónico
              </label>
              <Input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@consultoria.com" className="border-none text-sm border-slate-700 bg-slate-900 text-white placeholder:text-slate-500" required /></div>
            <div className="space-y-2">
              <label htmlFor="login-password" className="text-sm font-medium text-slate-200">
                Contraseña
              </label>
              <div className="relative">
                <Input id="login-password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="border-none text-sm border-slate-700 bg-slate-900 pr-12 text-white placeholder:text-slate-500" placeholder="**********" required />
                <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPassword ?
                    <EyeOff size={18} />
                    :
                    <Eye size={18} />
                  }
                </button>
              </div>
            </div>
            {error ?
              <div role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div> : null
            }
            <Button type="submit" className="h-11 w-full border-none bg-cyan-400 font-semibold text-black hover:bg-cyan-300 cursor-pointer" disabled={loading}>
              {loading ?
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                  Validando...
                </span> : "Iniciar sesión"
              }
            </Button>
          </form>
          <Link to="/" className="mt-6 justify-center md:justify-start inline-flex items-center gap-2 font-semibold text-cyan-700 hover:text-white/80 text-sm">
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}