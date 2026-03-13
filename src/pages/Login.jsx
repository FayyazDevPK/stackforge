import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  }

  function friendlyError(code) {
    switch (code) {
      case "auth/user-not-found": return "No account found with this email.";
      case "auth/wrong-password": return "Incorrect password.";
      case "auth/invalid-email": return "Invalid email address.";
      case "auth/too-many-requests": return "Too many attempts. Try again later.";
      case "auth/invalid-credential": return "Invalid email or password.";
      default: return "Something went wrong. Please try again.";
    }
  }

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width: 100%; background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 12px 16px; color: #e6edf3; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #58a6ff; }
        .input-field::placeholder { color: #484f58; }
        .btn-primary { width: 100%; background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-weight: 700; padding: 13px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .social-btn { flex: 1; background: #161b22; border: 1px solid #30363d; color: #e6edf3; font-family: inherit; font-size: 13px; padding: 10px; border-radius: 8px; cursor: pointer; transition: border-color 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .social-btn:hover { border-color: #58a6ff; }
        .social-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .link-btn { background: none; border: none; color: #58a6ff; font-family: inherit; font-size: 13px; cursor: pointer; padding: 0; }
        .link-btn:hover { text-decoration: underline; }
        .show-btn { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 12px; cursor: pointer; padding: 0; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2px solid #ffffff44; border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
      `}</style>

      <nav style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 18 }}>⬡</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15, color: "#e6edf3" }}>StackForge</span>
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>// auth.login()</div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Welcome back</h1>
            <p style={{ fontSize: 13, color: "#8b949e" }}>Log in to continue your learning journey</p>
          </div>

          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 14, padding: "32px 28px" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <button className="social-btn" onClick={handleGoogle} disabled={googleLoading}>
                <span>G</span> {googleLoading ? "Signing in..." : "Google"}
              </button>
              <button className="social-btn" disabled>
                <span>⬡</span> GitHub
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: "#21262d" }} />
              <span style={{ fontSize: 11, color: "#484f58" }}>or continue with email</span>
              <div style={{ flex: 1, height: 1, background: "#21262d" }} />
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Email address</label>
                <input className="input-field" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input className="input-field" type={showPass ? "text" : "password"} name="password" placeholder="••••••••" value={form.password} onChange={handleChange} style={{ paddingRight: 70 }} />
                  <button type="button" className="show-btn" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide" : "Show"}</button>
                </div>
              </div>
              <div style={{ textAlign: "right", marginBottom: 20 }}>
                <button type="button" className="link-btn" style={{ fontSize: 12 }}>Forgot password?</button>
              </div>
              {error && <div style={{ background: "#f0626222", border: "1px solid #f0626244", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#f06262" }}>⚠ {error}</div>}
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Log In →"}
              </button>
            </form>
            <div style={{ height: 1, background: "#21262d", margin: "24px 0" }} />
            <p style={{ textAlign: "center", fontSize: 13, color: "#8b949e" }}>
              Don't have an account? <button className="link-btn" onClick={() => navigate("/signup")}>Sign up free</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}