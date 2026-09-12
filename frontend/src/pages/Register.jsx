import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import burger from "../assets/burger1.png";
import { DataContext } from "../Hooks/DataContext";

const Register = () => {
  const { register } = useContext(DataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setMessage("");
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/", { replace: true });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          (error.request
            ? "The server is not running. Start the backend on port 5000 and try again."
            : "Unable to create your account."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden items-center justify-center overflow-hidden bg-[#f5b91e] lg:flex">
          <div className="absolute left-12 top-12 z-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-black/50">Join the family</p>
            <h2 className="mt-2 text-6xl font-black leading-[0.9] text-[#171717]">BUILD.<br />YOUR BITE.</h2>
          </div>
          <img src={burger} alt="BUNBITE burger" className="relative z-10 w-[min(70%,530px)] drop-shadow-[0_35px_25px_rgba(0,0,0,0.3)]" />
          <p className="absolute bottom-10 left-12 text-sm text-[#171717]/60">Your next favorite burger is waiting.</p>
        </section>

        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg">
            <Link to="/" className="mb-7 inline-flex items-center gap-3 text-2xl font-black"> <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5b91e]">🍔</span> BUN<span className="text-[#f5b91e]">BITE</span></Link>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f5b91e]">Create account</p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Welcome to the family.</h1>
            <p className="mt-3 text-white/50">Create your account and get ready for something delicious.</p>

            <form onSubmit={handleSubmit} className="mt-7 rounded-4xl border border-white/10 bg-white/4 p-6 shadow-2xl sm:p-8">
              <label className="block text-sm font-semibold text-white/80">Full name<span className="relative mt-2 block"><User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" /><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Sherif Emad" className="h-14 w-full rounded-xl border border-white/10 bg-white/6 pl-11 pr-4 outline-none focus:border-[#f5b91e]" /></span></label>
              <label className="mt-5 block text-sm font-semibold text-white/80">Email address<span className="relative mt-2 block"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" /><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className="h-14 w-full rounded-xl border border-white/10 bg-white/6 pl-11 pr-4 outline-none focus:border-[#f5b91e]" /></span></label>
              <label className="mt-5 block text-sm font-semibold text-white/80">Password<span className="relative mt-2 block"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" /><input required minLength={6} type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Create a password" className="h-14 w-full rounded-xl border border-white/10 bg-white/6 pl-11 pr-11 outline-none focus:border-[#f5b91e]" /><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
              <label className="mt-5 block text-sm font-semibold text-white/80">Confirm password<span className="relative mt-2 block"><Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" /><input required minLength={6} type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Repeat your password" className="h-14 w-full rounded-xl border border-white/10 bg-white/6 pl-11 pr-11 outline-none focus:border-[#f5b91e]" /><button type="button" aria-label="Toggle confirm password visibility" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
              {message && <p role="alert" className="mt-4 rounded-lg bg-red-500/15 p-3 text-sm text-red-200">{message}</p>}
              <button disabled={submitting} type="submit" className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#f5b91e] font-black text-[#171717] disabled:opacity-60">{submitting ? "Creating account..." : "Create Account"}<ArrowRight size={20} /></button>
              <p className="mt-6 text-center text-sm text-white/40">Already have an account? <Link to="/login" className="font-bold text-[#f5b91e]">Sign in</Link></p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
