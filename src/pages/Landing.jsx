import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🗺️", title: "Structured Roadmap", desc: "6 phases from zero to job-ready. No guesswork, just a clear path forward." },
  { icon: "🏗️", title: "Real Projects", desc: "Build 30+ portfolio projects with guided walkthroughs and starter code." },
  { icon: "🤖", title: "AI & Automation", desc: "Learn OpenAI, LangChain, n8n, and build AI-powered apps from scratch." },
  { icon: "🧰", title: "Tools Directory", desc: "Every dev tool you need, explained and linked — frontend to deployment." },
  { icon: "💬", title: "Community", desc: "24,000+ learners. Ask questions, share wins, get unstuck fast." },
  { icon: "🏆", title: "Certificates", desc: "Earn verified certificates for each phase to show employers." },
];

const STACK = [
  { label: "HTML & CSS", color: "#f79d65" },
  { label: "JavaScript", color: "#FFD700" },
  { label: "React", color: "#4FC3F7" },
  { label: "Next.js", color: "#e6edf3" },
  { label: "TypeScript", color: "#58a6ff" },
  { label: "Node.js", color: "#3fb950" },
  { label: "PostgreSQL", color: "#81C784" },
  { label: "MongoDB", color: "#81C784" },
  { label: "Docker", color: "#4FC3F7" },
  { label: "OpenAI API", color: "#CE93D8" },
  { label: "LangChain", color: "#CE93D8" },
  { label: "n8n", color: "#f79d65" },
];

const TESTIMONIALS = [
  { name: "Sara M.", role: "Frontend Dev @ Startup", avatar: "S", text: "I went from zero to landing my first dev job in 9 months. The roadmap kept me on track and the projects gave me a real portfolio." },
  { name: "Bilal K.", role: "Freelance Full Stack Dev", avatar: "B", text: "The AI & automation modules alone were worth it. I now automate client workflows and charge premium rates for it." },
  { name: "Amara T.", role: "Junior Dev @ Tech Agency", avatar: "A", text: "The community is incredible. Every question I had was answered within an hour. Felt like I had a whole team behind me." },
];

const STATS = [
  ["24,000+", "Active Learners"],
  ["38 Weeks", "Full Curriculum"],
  ["30+", "Real Projects"],
  ["94%", "Completion Rate"],
];

export default function Landing() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", overflowX: "hidden", width: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; background: #161b22; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }

        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-ghost { background: none; border: 1px solid #30363d; color: #e6edf3; font-family: inherit; font-weight: 600; border-radius: 8px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .btn-ghost:hover { border-color: #58a6ff; color: #58a6ff; }
        .btn-pro { background: linear-gradient(135deg, #f79d65, #f06292); border: none; color: white; font-family: inherit; font-weight: 700; border-radius: 8px; cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
        .btn-pro:hover { opacity: 0.85; }

        .nav-link { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 13px; cursor: pointer; padding: 6px 10px; transition: color 0.2s; white-space: nowrap; }
        .nav-link:hover { color: #e6edf3; }

        .feature-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 24px; transition: all 0.25s; }
        .feature-card:hover { border-color: #58a6ff44; transform: translateY(-2px); }
        .testimonial-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 24px; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0; }

        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .scroll-track { display: flex; gap: 12px; animation: scroll 28s linear infinite; width: max-content; }
        .scroll-wrap { overflow: hidden; width: 100%; }
        .stack-tag { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #161b22; border: 1px solid #21262d; white-space: nowrap; }

        /* Mobile menu */
        .mobile-menu { display: none; flex-direction: column; background: #161b22; border-bottom: 1px solid #21262d; padding: 12px 20px; gap: 4px; }
        .mobile-menu.open { display: flex; }
        .mobile-nav-btn { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 14px; cursor: pointer; padding: 10px 0; text-align: left; border-bottom: 1px solid #21262d22; transition: color 0.2s; }
        .mobile-nav-btn:hover { color: #e6edf3; }

        /* Responsive grid */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .stats-row { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; padding-top: 32px; border-top: 1px solid #21262d; }

        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-row { gap: 28px; }
          .hero-title { font-size: 38px !important; }
          .desktop-nav { display: none !important; }
          .desktop-auth { display: none !important; }
          .hamburger { display: flex !important; }
          .section-pad { padding: 60px 24px !important; }
          .hero-pad { padding: 60px 24px 40px !important; }
          .nav-pad { padding: 0 20px !important; }
          .cta-box { padding: 40px 24px !important; }
          .footer-pad { padding: 24px 20px !important; flex-direction: column; align-items: flex-start !important; gap: 12px !important; }
        }

        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 30px !important; }
          .hero-sub { font-size: 14px !important; }
          .stats-row { gap: 20px; }
          .stat-val { font-size: 24px !important; }
          .cta-title { font-size: 26px !important; }
          .section-title { font-size: 26px !important; }
          .hero-buttons { flex-direction: column; align-items: center; }
          .hero-buttons button { width: 100%; max-width: 320px; }
        }

        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #e6edf3; border-radius: 2px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 60, position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }} className="nav-pad" >

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 20 }}>⬡</span>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 16, color: "#e6edf3" }}>StackForge</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="desktop-nav" style={{ display: "flex", gap: 2 }}>
            {["Roadmap", "Projects", "Tools", "Community", "Pricing"].map(n => (
              <button key={n} className="nav-link" onClick={() => navigate(`/${n.toLowerCase()}`)}>{n}</button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="desktop-auth" style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button className="btn-ghost" style={{ fontSize: 13, padding: "7px 18px" }} onClick={() => navigate("/login")}>Log in</button>
            <button className="btn-primary" style={{ fontSize: 13, padding: "7px 18px" }} onClick={() => navigate("/signup")}>Get Started Free</button>
          </div>

          {/* Hamburger (mobile) */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Roadmap", "Projects", "Tools", "Community", "Pricing"].map(n => (
          <button key={n} className="mobile-nav-btn" onClick={() => { navigate(`/${n.toLowerCase()}`); setMenuOpen(false); }}>{n}</button>
        ))}
        <div style={{ display: "flex", gap: 10, paddingTop: 10 }}>
          <button className="btn-ghost" style={{ fontSize: 13, padding: "8px 18px", flex: 1 }} onClick={() => navigate("/login")}>Log in</button>
          <button className="btn-primary" style={{ fontSize: 13, padding: "8px 18px", flex: 1 }} onClick={() => navigate("/signup")}>Get Started</button>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="hero-pad" style={{ padding: "90px 24px 60px", textAlign: "center", background: "radial-gradient(ellipse at top, #1f6feb18 0%, transparent 60%)", width: "100%" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>

          {/* Badge */}
          <div style={{ display: "inline-block", background: "#1f6feb22", border: "1px solid #1f6feb55", borderRadius: 20, padding: "5px 18px", fontSize: 12, color: "#58a6ff", marginBottom: 28, letterSpacing: "0.06em" }}>
            🚀 38-WEEK FULL STACK CURRICULUM · UPDATED 2025
          </div>

          {/* Headline */}
          <h1 className="hero-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.12, marginBottom: 20 }}>
            Go from <span style={{ color: "#58a6ff" }}>Zero</span> to{" "}
            <span style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Full Stack</span>{" "}
            Developer
          </h1>

          {/* Subheading */}
          <p className="hero-sub" style={{ fontSize: 16, color: "#8b949e", marginBottom: 36, lineHeight: 1.8 }}>
            Master every tool, language, and framework — from HTML to AI automation.
            Real projects. Real skills. Real career outcomes.
          </p>

          {/* Buttons */}
          <div className="hero-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 56, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 15, padding: "14px 32px" }} onClick={() => navigate("/signup")}>
              Start Learning Free →
            </button>
            <button className="btn-ghost" style={{ fontSize: 15, padding: "14px 32px" }} onClick={() => navigate("/pricing")}>
              See Pro Plans
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {STATS.map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div className="stat-val" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, color: "#58a6ff" }}>{val}</div>
                <div style={{ fontSize: 12, color: "#8b949e", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLLING TECH STACK ── */}
      <div style={{ padding: "32px 0", background: "#161b22", borderTop: "1px solid #21262d", borderBottom: "1px solid #21262d", width: "100%" }}>
        <div style={{ fontSize: 11, color: "#8b949e", textAlign: "center", letterSpacing: "0.12em", marginBottom: 18, textTransform: "uppercase" }}>
          // Technologies you'll master
        </div>
        <div className="scroll-wrap">
          <div className="scroll-track">
            {[...STACK, ...STACK].map((s, i) => (
              <span key={i} className="stack-tag" style={{ color: s.color }}>{s.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="section-pad" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>// what_you_get.js</div>
            <h2 className="section-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 10 }}>Everything you need to get hired</h2>
            <p style={{ color: "#8b949e", fontSize: 14 }}>No fluff. No filler. Just the skills employers are looking for.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ fontSize: 30, marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#e6edf3" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="section-pad" style={{ padding: "80px 24px", background: "#161b2244" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 11, color: "#3fb950", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>// success_stories[]</div>
            <h2 className="section-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 800 }}>Learners who made it happen</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testimonial-card">
                <div style={{ fontSize: 28, color: "#58a6ff", marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.8, marginBottom: 18 }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="avatar" style={{ background: `hsl(${t.name.charCodeAt(0) * 40 % 360},50%,30%)`, color: "#e6edf3" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#e6edf3" }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#3fb950" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div className="section-pad" style={{ padding: "80px 24px", textAlign: "center" }}>
        <div className="cta-box" style={{ background: "linear-gradient(135deg,#1f6feb18,#f79d6511)", border: "1px solid #1f6feb44", borderRadius: 20, padding: "56px 40px", maxWidth: 680, margin: "0 auto" }}>
          <h2 className="cta-title" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 14 }}>Ready to start building?</h2>
          <p style={{ color: "#8b949e", fontSize: 14, marginBottom: 28, lineHeight: 1.7 }}>
            Join 24,000+ learners. Free to start. No credit card needed.
          </p>
          <div className="hero-buttons" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ fontSize: 14, padding: "14px 32px" }} onClick={() => navigate("/signup")}>
              Create Free Account →
            </button>
            <button className="btn-pro" style={{ fontSize: 13, padding: "14px 26px" }} onClick={() => navigate("/pricing")}>
              View Pro Plans ✦
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="footer-pad" style={{ borderTop: "1px solid #21262d", padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, maxWidth: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#58a6ff", fontWeight: 700 }}>⬡ StackForge</span>
          <span style={{ color: "#30363d" }}>·</span>
          <span style={{ fontSize: 12, color: "#8b949e" }}>© 2025 All rights reserved</span>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {["Privacy", "Terms", "Contact", "Blog"].map(l => (
            <span key={l} style={{ fontSize: 12, color: "#8b949e", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </div>

    </div>
  );
}