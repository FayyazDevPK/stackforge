import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: 1, title: "Personal Portfolio", phase: "Foundations", difficulty: "Beginner",
    free: true, stars: 1240, duration: "3 days", color: "#4FC3F7",
    tags: ["HTML", "CSS", "JavaScript"],
    desc: "Build a blazing-fast personal portfolio with dark mode, smooth scroll animations, and a contact form.",
    learn: ["Semantic HTML structure", "CSS animations & transitions", "Responsive design", "Form handling with JavaScript"],
    steps: ["Set up project structure", "Build navbar & hero section", "Add projects grid", "Create contact form", "Deploy to GitHub Pages"],
  },
  {
    id: 2, title: "Real-time Chat App", phase: "Frontend", difficulty: "Beginner",
    free: true, stars: 763, duration: "4 days", color: "#81C784",
    tags: ["React", "Socket.io", "CSS"],
    desc: "WhatsApp-style messaging app with real-time updates, chat rooms, and online presence indicators.",
    learn: ["React state & hooks", "WebSocket basics", "Real-time UI updates", "Component composition"],
    steps: ["Set up React project", "Build chat UI", "Add message state", "Style with CSS", "Add room switching"],
  },
  {
    id: 3, title: "URL Shortener + Analytics", phase: "Foundations", difficulty: "Beginner",
    free: true, stars: 534, duration: "2 days", color: "#4FC3F7",
    tags: ["JavaScript", "HTML", "CSS"],
    desc: "Build your own Bitly with click tracking, QR code generation, and a simple analytics dashboard.",
    learn: ["DOM manipulation", "LocalStorage", "Chart.js basics", "URL API"],
    steps: ["Design the UI", "Write shortener logic", "Add click tracking", "Build analytics view", "Generate QR codes"],
  },
  {
    id: 4, title: "E-Commerce Platform", phase: "Frontend", difficulty: "Intermediate",
    free: false, stars: 892, duration: "2 weeks", color: "#81C784",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    desc: "Full-featured online store with product pages, cart, checkout, Stripe payments, and an admin dashboard.",
    learn: ["Next.js App Router", "TypeScript interfaces", "Stripe integration", "State management", "Admin UI patterns"],
    steps: ["Product listing page", "Cart with Zustand", "Checkout flow", "Stripe payments", "Admin dashboard"],
  },
  {
    id: 5, title: "REST API with Auth", phase: "Backend", difficulty: "Intermediate",
    free: false, stars: 671, duration: "1 week", color: "#FFB74D",
    tags: ["Node.js", "Express", "PostgreSQL", "JWT"],
    desc: "Production-grade REST API with JWT authentication, role-based access, rate limiting, and Swagger docs.",
    learn: ["Express routing", "JWT auth flow", "PostgreSQL with Prisma", "Middleware patterns", "API documentation"],
    steps: ["Project setup", "Database schema", "Auth endpoints", "Protected routes", "Swagger docs"],
  },
  {
    id: 6, title: "SaaS Dashboard", phase: "Full Stack", difficulty: "Advanced",
    free: false, stars: 678, duration: "3 weeks", color: "#F06292",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Recharts"],
    desc: "Multi-tenant SaaS dashboard with auth, billing via Stripe, analytics charts, and team management.",
    learn: ["Multi-tenancy patterns", "Subscription billing", "Data visualization", "Role management", "Webhooks"],
    steps: ["Auth & onboarding", "Team workspace", "Billing with Stripe", "Analytics charts", "Settings & roles"],
  },
  {
    id: 7, title: "AI Code Review Bot", phase: "Gen AI", difficulty: "Advanced",
    free: false, stars: 1105, duration: "1 week", color: "#CE93D8",
    tags: ["OpenAI", "GitHub API", "Node.js", "Webhooks"],
    desc: "GitHub bot that automatically reviews pull requests using GPT-4, adds inline comments, and scores code quality.",
    learn: ["OpenAI API", "GitHub webhooks", "Prompt engineering", "Async processing", "Deployment"],
    steps: ["GitHub App setup", "Webhook listener", "OpenAI integration", "Comment system", "Deploy to Railway"],
  },
  {
    id: 8, title: "RAG Document Chat", phase: "Gen AI", difficulty: "Advanced",
    free: false, stars: 889, duration: "1 week", color: "#CE93D8",
    tags: ["LangChain", "Pinecone", "OpenAI", "Next.js"],
    desc: "Chat with your own documents using RAG — upload PDFs and ask questions with AI-powered answers.",
    learn: ["RAG architecture", "Vector embeddings", "Pinecone DB", "LangChain chains", "Streaming responses"],
    steps: ["PDF ingestion", "Chunking & embedding", "Vector storage", "Query pipeline", "Chat UI with streaming"],
  },
  {
    id: 9, title: "Automation Workflow Builder", phase: "AI Automation", difficulty: "Expert",
    free: false, stars: 445, duration: "5 days", color: "#80DEEA",
    tags: ["n8n", "Make.com", "REST APIs", "Webhooks"],
    desc: "Build a no-code automation that connects Gmail, Notion, Slack, and AI to auto-summarize and route emails.",
    learn: ["n8n workflow design", "API integrations", "Webhook triggers", "Conditional logic", "AI nodes"],
    steps: ["n8n setup", "Gmail trigger", "AI summarization", "Notion logging", "Slack notifications"],
  },
];

const ALL_TAGS = ["All", "Beginner", "Intermediate", "Advanced", "Free Only"];
const PHASE_COLORS = {
  "Foundations": "#4FC3F7", "Frontend": "#81C784", "Backend": "#FFB74D",
  "Full Stack": "#F06292", "Gen AI": "#CE93D8", "AI Automation": "#80DEEA"
};
const DIFF_COLOR = { Beginner: "#3fb950", Intermediate: "#f79d65", Advanced: "#f06292", Expert: "#CE93D8" };

export default function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [proModal, setProModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (filter === "Free Only") return p.free && matchSearch;
    if (filter === "Beginner") return p.difficulty === "Beginner" && matchSearch;
    if (filter === "Intermediate") return p.difficulty === "Intermediate" && matchSearch;
    if (filter === "Advanced") return (p.difficulty === "Advanced" || p.difficulty === "Expert") && matchSearch;
    return matchSearch;
  });

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
        .back-btn { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px; padding: 0; }
        .back-btn:hover { color: #e6edf3; }
        .btn-pro { background: linear-gradient(135deg, #f79d65, #f06292); border: none; color: white; font-family: inherit; font-size: 12px; font-weight: 700; padding: 7px 16px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
        .filter-btn { background: #161b22; border: 1px solid #21262d; color: #8b949e; font-family: inherit; font-size: 12px; padding: 6px 14px; border-radius: 20px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .filter-btn:hover { border-color: #30363d; color: #e6edf3; }
        .filter-btn.active { background: #58a6ff22; border-color: #58a6ff; color: #58a6ff; }
        .proj-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden; display: flex; flex-direction: column; }
        .proj-card:hover { border-color: #58a6ff33; transform: translateY(-2px); box-shadow: 0 8px 30px #00000044; }
        .tag-chip { display: inline-block; padding: 2px 8px; background: #21262d; border-radius: 4px; font-size: 11px; color: #8b949e; }
        .search-input { background: #161b22; border: 1px solid #21262d; border-radius: 8px; padding: 9px 14px 9px 36px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; width: 100%; max-width: 280px; transition: border-color 0.2s; }
        .search-input:focus { border-color: #58a6ff; }
        .search-input::placeholder { color: #484f58; }
        .modal-bg { position: fixed; inset: 0; background: #00000099; z-index: 200; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); padding: 16px; overflow-y: auto; }
        .modal { background: #161b22; border: 1px solid #30363d; border-radius: 14px; padding: 28px; max-width: 580px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
        .step-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #21262d22; }
        .step-item:last-child { border-bottom: none; }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .top-bar-pad { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .filter-row { flex-wrap: wrap; }
          .search-input { max-width: 100%; }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Projects</span>
        </div>
        <button className="btn-pro" onClick={() => setProModal(true)}>✦ Upgrade to Pro</button>
      </div>

      {/* Content */}
      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#f79d65", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// projects.library</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Project Library</h1>
          <p style={{ color: "#8b949e", fontSize: 13 }}>Build real-world projects. Add them to your portfolio. Get hired.</p>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {[["9", "Total Projects"], ["3", "Free Projects"], ["6", "Pro Projects"], ["30+", "Hours of Building"]].map(([v, l]) => (
            <div key={l} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 8, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, color: "#58a6ff" }}>{v}</span>
              <span style={{ fontSize: 12, color: "#8b949e" }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="filter-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ALL_TAGS.map(f => (
              <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#484f58", fontSize: 14 }}>🔍</span>
            <input className="search-input" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#484f58" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14 }}>No projects match your search</div>
          </div>
        ) : (
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(p => (
              <div key={p.id} className="proj-card" onClick={() => p.free ? setSelected(p) : setProModal(true)}>
                {/* Top color bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, borderRadius: 2, marginBottom: 16, marginLeft: -20, marginRight: -20, marginTop: -20 }} />

                {/* Badges */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: PHASE_COLORS[p.phase], background: PHASE_COLORS[p.phase] + "18", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{p.phase}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {!p.free && <span style={{ fontSize: 10, background: "#f79d6522", color: "#f79d65", padding: "2px 7px", borderRadius: 10, fontWeight: 700 }}>✦ PRO</span>}
                    <span style={{ fontSize: 10, color: DIFF_COLOR[p.difficulty], background: DIFF_COLOR[p.difficulty] + "22", padding: "2px 7px", borderRadius: 10, fontWeight: 600 }}>● {p.difficulty}</span>
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "#e6edf3", marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.7, marginBottom: 14, flex: 1 }}>{p.desc}</p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {p.tags.map(t => <span key={t} className="tag-chip">{t}</span>)}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid #21262d" }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 11, color: "#8b949e" }}>⏱ {p.duration}</span>
                    <span style={{ fontSize: 11, color: "#8b949e" }}>★ {p.stars.toLocaleString()}</span>
                  </div>
                  <span style={{ fontSize: 12, color: p.free ? "#3fb950" : "#f79d65", fontWeight: 600 }}>
                    {p.free ? "Start Free →" : "🔒 Pro"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 22, cursor: "pointer" }}>×</button>

            {/* Header */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: PHASE_COLORS[selected.phase], background: PHASE_COLORS[selected.phase] + "18", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{selected.phase}</span>
                <span style={{ fontSize: 11, color: DIFF_COLOR[selected.difficulty], background: DIFF_COLOR[selected.difficulty] + "22", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>● {selected.difficulty}</span>
                <span style={{ fontSize: 11, color: "#3fb950", background: "#3fb95022", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>FREE</span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{selected.title}</h2>
              <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.7 }}>{selected.desc}</p>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
              {selected.tags.map(t => <span key={t} className="tag-chip" style={{ fontSize: 12 }}>{t}</span>)}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 20, marginBottom: 20, padding: "12px 16px", background: "#0d1117", borderRadius: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#8b949e" }}>⏱ {selected.duration}</span>
              <span style={{ fontSize: 12, color: "#8b949e" }}>★ {selected.stars.toLocaleString()} stars</span>
            </div>

            {/* What you'll learn */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#e6edf3" }}>What you'll learn</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {selected.learn.map(l => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#c9d1d9" }}>
                    <span style={{ color: "#3fb950", flexShrink: 0 }}>✓</span>{l}
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#e6edf3" }}>Project Steps</h3>
              {selected.steps.map((s, i) => (
                <div key={s} className="step-item">
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#21262d", border: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#58a6ff", flexShrink: 0, fontWeight: 700 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "#c9d1d9", paddingTop: 2 }}>{s}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ width: "100%", padding: "13px", fontSize: 14 }}>
              Start Project →
            </button>
          </div>
        </div>
      )}

      {/* Pro Modal */}
      {proModal && (
        <div className="modal-bg" onClick={() => setProModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setProModal(false)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 22, cursor: "pointer" }}>×</button>
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>✦</div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Unlock All Projects</h2>
              <p style={{ fontSize: 13, color: "#8b949e" }}>Get access to all 9 projects with starter code and step-by-step guides</p>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div style={{ flex: 1, background: "#0d1117", borderRadius: 10, padding: "14px", textAlign: "center", border: "1px solid #30363d" }}>
                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 4 }}>Monthly</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800 }}>$12<span style={{ fontSize: 13, color: "#8b949e" }}>/mo</span></div>
              </div>
              <div style={{ flex: 1, background: "#f79d6511", borderRadius: 10, padding: "14px", textAlign: "center", border: "1px solid #f79d6544", position: "relative" }}>
                <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f79d65,#f06292)", borderRadius: 10, padding: "2px 10px", fontSize: 10, color: "white", fontWeight: 700, whiteSpace: "nowrap" }}>BEST VALUE</div>
                <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 4 }}>Annual</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800 }}>$7<span style={{ fontSize: 13, color: "#8b949e" }}>/mo</span></div>
              </div>
            </div>
            <button className="btn-pro" style={{ width: "100%", padding: "13px", fontSize: 14, borderRadius: 8 }}>Get Pro Access ✦</button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#484f58", marginTop: 10 }}>7-day free trial · Cancel anytime</p>
          </div>
        </div>
      )}
    </div>
  );
}
