import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const GOALS = ["Get a dev job", "Freelance", "Build my own product", "Learn for fun"];

export default function Signup() {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", goal: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleStep1(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setError(""); setStep(2);
  }

  async function handleStep2(e) {
    e.preventDefault();
    if (!form.goal) { setError("Please select your goal."); return; }
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.goal);
      navigate("/dashboard");
    } catch (err) {
      setError(friendlyError(err.code));
      setStep(1);
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
      setGoogleLoading(false);
    }
  }

  function friendlyError(code) {
    switch (code) {
      case "auth/email-already-in-use": return "An account with this email already exists.";
      case "auth/invalid-email": return "Invalid email address.";
      case "auth/weak-password": return "Password should be at least 6 characters.";
      default: return "Something went wrong. Please try again.";
    }
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "#f06262", "#f79d65", "#3fb950"];

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
        .social-btn { flex: 1; background: #161b22; border: 1px solid #30363d; color: #e6edf3; font-family: inherit; font-size: 13px; padding: 10px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .social-btn:hover { border-color: #58a6ff; }
        .social-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .link-btn { background: none; border: none; color: #58a6ff; font-family: inherit; font-size: 13px; cursor: pointer; padding: 0; }
        .show-btn { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 12px; cursor: pointer; padding: 0; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); }
        .goal-btn { width: 100%; background: #0d1117; border: 1px solid #30363d; color: #8b949e; font-family: inherit; font-size: 13px; padding: 13px 16px; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s; }
        .goal-btn:hover { border-color: #58a6ff44; color: #e6edf3; }
        .goal-btn.selected { border-color: #58a6ff; color: #58a6ff; background: #58a6ff11; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2px solid #ffffff44; border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        .slide-in { animation: slideIn 0.3s ease; }
      `}</style>

      <nav style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 18 }}>⬡</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15, color: "#e6edf3" }}>StackForge</span>
        </button>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 28 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= s ? "#58a6ff" : "#21262d", color: step >= s ? "white" : "#484f58", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, transition: "all 0.3s" }}>{s}</div>
                {s < 2 && <div style={{ width: 40, height: 2, background: step > s ? "#58a6ff" : "#21262d", transition: "background 0.3s" }} />}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "#3fb950", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>// auth.signup() · step {step} of 2</div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
              {step === 1 ? "Create your account" : "What's your goal?"}
            </h1>
            <p style={{ fontSize: 13, color: "#8b949e" }}>{step === 1 ? "Free forever. No credit card needed." : "We'll personalize your learning path."}</p>
          </div>

          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 14, padding: "32px 28px" }}>
            {step === 1 && (
              <div className="slide-in">
                <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                  <button className="social-btn" onClick={handleGoogle} disabled={googleLoading}>
                    <span>G</span> {googleLoading ? "Redirecting..." : "Google"}
                  </button>
                  <button className="social-btn" disabled><span>⬡</span> GitHub</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: "#21262d" }} />
                  <span style={{ fontSize: 11, color: "#484f58" }}>or sign up with email</span>
                  <div style={{ flex: 1, height: 1, background: "#21262d" }} />
                </div>
                <form onSubmit={handleStep1}>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Full name</label>
                    <input className="input-field" type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Email address</label>
                    <input className="input-field" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input className="input-field" type={showPass ? "text" : "password"} name="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} style={{ paddingRight: 70 }} />
                      <button type="button" className="show-btn" onClick={() => setShowPass(!showPass)}>{showPass ? "Hide" : "Show"}</button>
                    </div>
                  </div>
                  {form.password.length > 0 && (
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 18 }}>
                      {[1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: strength >= i ? strengthColor[strength] : "#21262d", transition: "background 0.3s" }} />)}
                      <span style={{ fontSize: 11, color: strengthColor[strength], marginLeft: 4 }}>{strengthLabel[strength]}</span>
                    </div>
                  )}
                  {error && <div style={{ background: "#f0626222", border: "1px solid #f0626244", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#f06262" }}>⚠ {error}</div>}
                  <button className="btn-primary" type="submit" style={{ marginTop: 6 }}>Continue →</button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="slide-in">
                <form onSubmit={handleStep2}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {GOALS.map(g => (
                      <button key={g} type="button" className={`goal-btn${form.goal === g ? " selected" : ""}`} onClick={() => { setForm({ ...form, goal: g }); setError(""); }}>
                        {form.goal === g ? "✓ " : "○ "}{g}
                      </button>
                    ))}
                  </div>
                  {error && <div style={{ background: "#f0626222", border: "1px solid #f0626244", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#f06262" }}>⚠ {error}</div>}
                  <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? <span className="spinner" /> : "🚀 Start Learning Free"}
                  </button>
                  <button type="button" onClick={() => { setStep(1); setError(""); }} style={{ width: "100%", background: "none", border: "none", color: "#8b949e", fontFamily: "inherit", fontSize: 12, cursor: "pointer", marginTop: 12, padding: "6px 0" }}>← Back</button>
                </form>
              </div>
            )}

            <div style={{ height: 1, background: "#21262d", margin: "24px 0" }} />
            <p style={{ textAlign: "center", fontSize: 13, color: "#8b949e" }}>
              Already have an account? <button className="link-btn" onClick={() => navigate("/login")}>Log in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}