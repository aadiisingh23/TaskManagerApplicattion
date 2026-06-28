import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await login(formData);
      toast.success("Welcome back");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-66px)] max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_440px]">
      <section className="hidden lg:block">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-600">Secure workspace</p>
        <h1 className="max-w-xl text-5xl font-bold leading-tight text-slate-950">Plan work with a calmer task board.</h1>
        <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
          Sign in to create tasks, track status, and keep your work list private to your account.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-950">Login</h1>
          <p className="mt-1 text-sm text-slate-500">Enter your details to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200" placeholder="Enter your password" required />
          </div>
          <button type="submit" disabled={isLoading} className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          New here? <Link to="/signup" className="font-semibold text-slate-950 hover:underline">Create an account</Link>
        </p>
      </section>
    </div>
  );
}

export default Login;
