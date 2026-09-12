import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import burger from "../assets/burger1.png";
import { DataContext } from "../Hooks/DataContext";

const Login = () => {
  const { login } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const user = await login(form);
      const destination = location.state?.from?.pathname || (user.role === "admin" ? "/dashboard" : "/");
      navigate(destination, { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to sign in. Check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden items-center justify-center overflow-hidden bg-[#f5b91e] lg:flex">
          <div className="absolute left-12 top-12 z-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/50">Welcome back</p>
            <h2 className="mt-2 text-6xl font-black leading-[0.9] text-[#171717]">BITE.<br />REPEAT.</h2>
          </div>
          <img src={burger} alt="Delicious burger" className="relative z-10 w-[min(70%,560px)] drop-shadow-[0_35px_25px_rgba(0,0,0,0.3)]" />
          <p className="absolute bottom-10 left-12 text-sm text-[#171717]/60">Fresh ingredients. Bold flavors.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-10 inline-flex items-center gap-3 text-2xl font-black tracking-tight">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5b91e] text-2xl">🍔</span>
              BUN<span className="text-[#f5b91e]">BITE</span>
            </Link>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f5b91e]">Welcome back</p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Hungry for more?</h1>
            <p className="mt-3 text-white/50">Sign in and get your favorite burger delivered.</p>

            <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl sm:p-8">
              <label className="mb-5 block text-sm font-semibold text-white/80">
                Email address
                <span className="relative mt-2 block">
                  <Mail size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className="h-14 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-4 outline-none focus:border-[#f5b91e]" />
                </span>
              </label>
              <label className="block text-sm font-semibold text-white/80">
                Password
                <span className="relative mt-2 block">
                  <Lock size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input required minLength={6} type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Enter your password" className="h-14 w-full rounded-xl border border-white/10 bg-black/20 pl-12 pr-12 outline-none focus:border-[#f5b91e]" />
                  <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#f5b91e]">
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </span>
              </label>
              {message && <p role="alert" className="mt-4 rounded-lg bg-red-500/15 p-3 text-sm text-red-200">{message}</p>}
              <button disabled={submitting} type="submit" className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#f5b91e] font-black text-[#171717] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? "Signing in..." : "Sign In"}<ArrowRight size={20} />
              </button>
              <p className="mt-7 text-center text-sm text-white/40">Don't have an account? <Link to="/register" className="font-bold text-[#f5b91e]">Create account</Link></p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
