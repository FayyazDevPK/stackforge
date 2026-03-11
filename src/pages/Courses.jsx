import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PHASES = [
  {
    id: 1, phase: "01", title: "Foundations", color: "#4FC3F7", free: true, progress: 100,
    lessons: [
      { id: "1-1", title: "How the Web Works", type: "video", duration: "18 min", done: true },
      { id: "1-2", title: "HTML5 Structure & Semantics", type: "video", duration: "24 min", done: true },
      { id: "1-3", title: "CSS3 — Selectors & Box Model", type: "video", duration: "30 min", done: true },
      { id: "1-4", title: "Flexbox & Grid Layout", type: "video", duration: "28 min", done: true },
      { id: "1-5", title: "JavaScript ES6+ Basics", type: "video", duration: "45 min", done: true },
      { id: "1-6", title: "DOM Manipulation", type: "video", duration: "32 min", done: true },
      { id: "1-7", title: "Git & GitHub Basics", type: "video", duration: "22 min", done: true },
      { id: "1-8", title: "Terminal & Command Line", type: "video", duration: "18 min", done: true },
      { id: "1-9", title: "Foundations Quiz", type: "quiz", duration: "15 min", done: true },
      { id: "1-10", title: "Responsive Design Project", type: "project", duration: "2 hrs", done: true },
      { id: "1-11", title: "Code Review & Feedback", type: "video", duration: "20 min", done: true },
      { id: "1-12", title: "Phase 1 Certificate", type: "cert", duration: "—", done: true },
    ],
  },
  {
    id: 2, phase: "02", title: "Frontend Development", color: "#81C784", free: true, progress: 60,
    lessons: [
      { id: "2-1", title: "React 18 — Components & JSX", type: "video", duration: "35 min", done: true },
      { id: "2-2", title: "Props, State & Re-rendering", type: "video", duration: "28 min", done: true },
      { id: "2-3", title: "React Hooks Deep Dive", type: "video", duration: "40 min", done: true },
      { id: "2-4", title: "useEffect & Async Patterns", type: "video", duration: "32 min", done: true },
      { id: "2-5", title: "React Router v6", type: "video", duration: "25 min", done: true },
      { id: "2-6", title: "State Management with Zustand", type: "video", duration: "30 min", done: true },
      { id: "2-7", title: "TypeScript for React", type: "video", duration: "45 min", done: false },
      { id: "2-8", title: "Tailwind CSS Masterclass", type: "video", duration: "38 min", done: false },
      { id: "2-9", title: "Next.js 14 App Router", type: "video", duration: "50 min", done: false },
      { id: "2-10", title: "Server Components & SSR", type: "video", duration: "35 min", done: false },
      { id: "2-11", title: "Frontend Quiz", type: "quiz", duration: "20 min", done: false },
      { id: "2-12", title: "E-Commerce UI Project", type: "project", duration: "4 hrs", done: false },
      { id: "2-13", title: "Performance & Testing", type: "video", duration: "30 min", done: false },
      { id: "2-14", title: "Code Review Session", type: "video", duration: "25 min", done: false },
      { id: "2-15", title: "Portfolio Update", type: "project", duration: "1 hr", done: false },
      { id: "2-16", title: "Frontend Quiz Final", type: "quiz", duration: "15 min", done: false },
      { id: "2-17", title: "Peer Review", type: "video", duration: "20 min", done: false },
      { id: "2-18", title: "Phase 2 Certificate", type: "cert", duration: "—", done: false },
    ],
  },
  {
    id: 3, phase: "03", title: "Backend Development", color: "#FFB74D", free: false, progress: 0,
    lessons: [
      { id: "3-1", title: "Node.js Runtime & Event Loop", type: "video", duration: "30 min", done: false },
      { id: "3-2", title: "Express.js — Routing & Middleware", type: "video", duration: "35 min", done: false },
      { id: "3-3", title: "REST API Design", type: "video", duration: "28 min", done: false },
      { id: "3-4", title: "PostgreSQL Fundamentals", type: "video", duration: "40 min", done: false },
      { id: "3-5", title: "Prisma ORM", type: "video", duration: "35 min", done: false },
      { id: "3-6", title: "MongoDB & Mongoose", type: "video", duration: "32 min", done: false },
      { id: "3-7", title: "JWT Authentication", type: "video", duration: "38 min", done: false },
      { id: "3-8", title: "OAuth 2.0 & Social Login", type: "video", duration: "30 min", done: false },
      { id: "3-9", title: "File Uploads & S3", type: "video", duration: "25 min", done: false },
      { id: "3-10", title: "Rate Limiting & Validation", type: "video", duration: "22 min", done: false },
      { id: "3-11", title: "Backend Quiz", type: "quiz", duration: "20 min", done: false },
      { id: "3-12", title: "Full Auth API Project", type: "project", duration: "5 hrs", done: false },
      { id: "3-13", title: "API Documentation", type: "video", duration: "20 min", done: false },
      { id: "3-14", title: "Security Best Practices", type: "video", duration: "28 min", done: false },
      { id: "3-15", title: "Error Handling Patterns", type: "video", duration: "22 min", done: false },
      { id: "3-16", title: "Backend Quiz Final", type: "quiz", duration: "15 min", done: false },
      { id: "3-17", title: "Code Review", type: "video", duration: "20 min", done: false },
      { id: "3-18", title: "Performance Tuning", type: "video", duration: "25 min", done: false },
      { id: "3-19", title: "Deployment to Railway", type: "video", duration: "18 min", done: false },
      { id: "3-20", title: "Phase 3 Certificate", type: "cert", duration: "—", done: false },
    ],
  },
  {
    id: 4, phase: "04", title: "Full Stack Integration", color: "#F06292", free: false, progress: 0,
    lessons: [
      { id: "4-1", title: "Connecting Frontend & Backend", type: "video", duration: "35 min", done: false },
      { id: "4-2", title: "Env Variables & Config", type: "video", duration: "20 min", done: false },
      { id: "4-3", title: "Docker & Docker Compose", type: "video", duration: "45 min", done: false },
      { id: "4-4", title: "CI/CD with GitHub Actions", type: "video", duration: "38 min", done: false },
      { id: "4-5", title: "Deploy to Vercel & Railway", type: "video", duration: "30 min", done: false },
      { id: "4-6", title: "AWS EC2, S3 & RDS", type: "video", duration: "50 min", done: false },
      { id: "4-7", title: "Monitoring with Sentry", type: "video", duration: "22 min", done: false },
      { id: "4-8", title: "WebSockets & Real-time", type: "video", duration: "35 min", done: false },
      { id: "4-9", title: "Background Jobs with Bull", type: "video", duration: "28 min", done: false },
      { id: "4-10", title: "Full Stack SaaS Project", type: "project", duration: "6 hrs", done: false },
      { id: "4-11", title: "Full Stack Quiz", type: "quiz", duration: "20 min", done: false },
      { id: "4-12", title: "Scaling & Load Balancing", type: "video", duration: "30 min", done: false },
      { id: "4-13", title: "Security Audit", type: "video", duration: "25 min", done: false },
      { id: "4-14", title: "Code Review", type: "video", duration: "20 min", done: false },
      { id: "4-15", title: "Portfolio Project", type: "project", duration: "3 hrs", done: false },
      { id: "4-16", title: "Phase 4 Certificate", type: "cert", duration: "—", done: false },
    ],
  },
  {
    id: 5, phase: "05", title: "Gen AI & LLMs", color: "#CE93D8", free: false, progress: 0,
    lessons: [
      { id: "5-1", title: "How LLMs Work", type: "video", duration: "30 min", done: false },
      { id: "5-2", title: "OpenAI API — Chat & Embeddings", type: "video", duration: "40 min", done: false },
      { id: "5-3", title: "Prompt Engineering", type: "video", duration: "35 min", done: false },
      { id: "5-4", title: "LangChain Fundamentals", type: "video", duration: "45 min", done: false },
      { id: "5-5", title: "Vector Databases", type: "video", duration: "35 min", done: false },
      { id: "5-6", title: "RAG Pipeline", type: "video", duration: "50 min", done: false },
      { id: "5-7", title: "Streaming in Next.js", type: "video", duration: "28 min", done: false },
      { id: "5-8", title: "Function Calling & Tools", type: "video", duration: "32 min", done: false },
      { id: "5-9", title: "AI Safety & Cost Optimization", type: "video", duration: "25 min", done: false },
      { id: "5-10", title: "RAG Chatbot Project", type: "project", duration: "5 hrs", done: false },
      { id: "5-11", title: "Gen AI Quiz", type: "quiz", duration: "20 min", done: false },
      { id: "5-12", title: "Multi-modal AI Apps", type: "video", duration: "35 min", done: false },
      { id: "5-13", title: "AI App Deployment", type: "video", duration: "25 min", done: false },
      { id: "5-14", title: "Phase 5 Certificate", type: "cert", duration: "—", done: false },
    ],
  },
  {
    id: 6, phase: "06", title: "AI Automation", color: "#80DEEA", free: false, progress: 0,
    lessons: [
      { id: "6-1", title: "n8n Visual Workflow Builder", type: "video", duration: "40 min", done: false },
      { id: "6-2", title: "Make.com Fundamentals", type: "video", duration: "35 min", done: false },
      { id: "6-3", title: "Zapier — Quick Integrations", type: "video", duration: "25 min", done: false },
      { id: "6-4", title: "Webhooks & API Triggers", type: "video", duration: "30 min", done: false },
      { id: "6-5", title: "AI Nodes in n8n", type: "video", duration: "38 min", done: false },
      { id: "6-6", title: "Email & Slack Automations", type: "video", duration: "28 min", done: false },
      { id: "6-7", title: "Scheduling & Cron Jobs", type: "video", duration: "20 min", done: false },
      { id: "6-8", title: "Building AI Agents", type: "video", duration: "50 min", done: false },
      { id: "6-9", title: "AI Onboarding Bot Project", type: "project", duration: "4 hrs", done: false },
      { id: "6-10", title: "Phase 6 Certificate", type: "cert", duration: "—", done: false },
    ],
  },
];

const TYPE_ICON = { video: "▶", project: "🏗️", quiz: "📝", cert: "🏆" };
const TYPE_COLOR = { video: "#58a6ff", project: "#f79d65", quiz: "#CE93D8", cert: "#3fb950" };

export default function Courses() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPro = user?.plan === "pro";

  const [expanded, setExpanded] = useState(1);

  function isUnlocked(phase) {
    return phase.free || isPro;
  }

  const totalLessons = PHASES.reduce((a, p) => a + p.lessons.length, 0);
  const doneLessons = PHASES.reduce((a, p) => a + p.lessons.filter(l => l.done).length, 0);
  const overallPct = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
        .back-btn { background: none; border: none; color: #8b949e; font-family: inherit; font-size: 13px; cursor: pointer; padding: 0; }
        .back-btn:hover { color: #e6edf3; }
        .phase-tab { background: #161b22; border: 1px solid #21262d; border-radius: 10px; padding: 16px 18px; cursor: pointer; transition: all 0.2s; }
        .phase-tab:hover { border-color: #30363d; }
        .phase-tab.active { border-color: var(--phase-color); background: #161b22; }
        .lesson-row { display: flex; align-items: center; gap: 12px; padding: 11px 16px; border-bottom: 1px solid #21262d; transition: background 0.15s; cursor: pointer; }
        .lesson-row:last-child { border-bottom: none; }
        .lesson-row:hover { background: #1c2128; }
        .lesson-row.locked { opacity: 0.45; cursor: default; }
        @media (max-width: 768px) {
          .top-bar { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Courses</span>
        </div>
        {isPro
          ? <span style={{ fontSize: 12, background: "#3fb95022", color: "#3fb950", border: "1px solid #3fb95033", padding: "4px 12px", borderRadius: 20, fontWeight: 700 }}>✦ Pro Active</span>
          : <button style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 12, fontWeight: 700, padding: "7px 16px", borderRadius: 6, cursor: "pointer" }} onClick={() => navigate("/pricing")}>✦ Upgrade to Pro</button>
        }
      </div>

      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// courses.index</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>All Courses</h1>
          <p style={{ color: "#8b949e", fontSize: 13 }}>{doneLessons}/{totalLessons} lessons complete · {overallPct}% overall progress</p>
        </div>

        {/* Overall progress bar */}
        <div style={{ height: 6, background: "#21262d", borderRadius: 3, marginBottom: 28 }}>
          <div style={{ width: `${overallPct}%`, height: "100%", background: "linear-gradient(90deg,#4FC3F7,#81C784)", borderRadius: 3 }} />
        </div>

        {/* Pro banner */}
        {!isPro && (
          <div style={{ background: "#f79d6511", border: "1px solid #f79d6533", borderRadius: 10, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f79d65" }}>🔒 Phases 3–6 are locked</div>
              <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>Upgrade to Pro to unlock Backend, Full Stack, Gen AI & Automation</div>
            </div>
            <button style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "9px 20px", borderRadius: 8, cursor: "pointer" }} onClick={() => navigate("/pricing")}>
              Upgrade to Pro ✦
            </button>
          </div>
        )}

        <div className="main-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>

          {/* Left — Phase list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PHASES.map(phase => {
              const unlocked = isUnlocked(phase);
              const phaseDone = phase.lessons.filter(l => l.done).length;
              const pct = Math.round((phaseDone / phase.lessons.length) * 100);
              return (
                <div
                  key={phase.id}
                  className={`phase-tab${expanded === phase.id ? " active" : ""}`}
                  style={{ "--phase-color": phase.color, borderLeftWidth: 3, borderLeftColor: phase.color, opacity: unlocked ? 1 : 0.7 }}
                  onClick={() => setExpanded(phase.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, color: phase.color, fontWeight: 700 }}>Phase {phase.phase}</span>
                      {!unlocked && <span style={{ fontSize: 10 }}>🔒</span>}
                      {isPro && !phase.free && <span style={{ fontSize: 10, color: "#f79d65" }}>✦</span>}
                    </div>
                    <span style={{ fontSize: 11, color: pct === 100 ? "#3fb950" : "#8b949e" }}>{pct}%</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: expanded === phase.id ? "#e6edf3" : "#c9d1d9" }}>{phase.title}</div>
                  <div style={{ height: 3, background: "#21262d", borderRadius: 2 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: phase.color, borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#8b949e", marginTop: 6 }}>{phaseDone}/{phase.lessons.length} lessons</div>
                </div>
              );
            })}
          </div>

          {/* Right — Lessons */}
          {(() => {
            const phase = PHASES.find(p => p.id === expanded);
            if (!phase) return null;
            const unlocked = isUnlocked(phase);
            const phaseDone = phase.lessons.filter(l => l.done).length;

            return (
              <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
                {/* Phase header */}
                <div style={{ padding: "20px 20px", borderBottom: "1px solid #21262d", background: "#1c2128" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800 }}>{phase.title}</h2>
                        {phase.free
                          ? <span style={{ fontSize: 11, background: "#3fb95022", color: "#3fb950", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>FREE</span>
                          : <span style={{ fontSize: 11, background: "#f79d6522", color: "#f79d65", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>✦ PRO</span>
                        }
                      </div>
                      <div style={{ fontSize: 12, color: "#8b949e" }}>{phaseDone} of {phase.lessons.length} lessons complete</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: phase.color }}>{Math.round((phaseDone / phase.lessons.length) * 100)}%</div>
                      <div style={{ width: 80, height: 4, background: "#21262d", borderRadius: 2, marginTop: 4 }}>
                        <div style={{ width: `${Math.round((phaseDone / phase.lessons.length) * 100)}%`, height: "100%", background: phase.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lock wall for Pro phases when not Pro */}
                {!unlocked && (
                  <div style={{ padding: "32px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>This phase requires Pro</h3>
                    <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 24, lineHeight: 1.7, maxWidth: 360, margin: "0 auto 24px" }}>
                      Upgrade to Pro to access all {phase.lessons.length} lessons in {phase.title} and all other locked phases.
                    </p>
                    <button
                      style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: "13px 32px", borderRadius: 10, cursor: "pointer" }}
                      onClick={() => navigate("/pricing")}
                    >
                      ✦ Upgrade to Pro — $7/mo
                    </button>
                    <div style={{ fontSize: 11, color: "#484f58", marginTop: 12 }}>7-day free trial · Cancel anytime</div>
                  </div>
                )}

                {/* Lesson list */}
                {unlocked && (
                  <div>
                    {phase.lessons.map((lesson, i) => (
                      <div
                        key={lesson.id}
                        className="lesson-row"
                        onClick={() => navigate(`/courses/${lesson.id}`, { state: { lesson, phase } })}
                      >
                        {/* Number */}
                        <div style={{ width: 28, fontSize: 11, color: "#484f58", flexShrink: 0, textAlign: "right" }}>{i + 1}</div>

                        {/* Done indicator */}
                        <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${lesson.done ? "#3fb950" : "#30363d"}`, background: lesson.done ? "#3fb95022" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3fb950", flexShrink: 0 }}>
                          {lesson.done ? "✓" : ""}
                        </div>

                        {/* Type icon */}
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: TYPE_COLOR[lesson.type] + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                          {TYPE_ICON[lesson.type]}
                        </div>

                        {/* Title */}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: lesson.done ? "#8b949e" : "#e6edf3", textDecoration: lesson.done ? "line-through" : "none" }}>{lesson.title}</div>
                        </div>

                        {/* Duration + start */}
                        <div style={{ fontSize: 11, color: "#484f58", flexShrink: 0 }}>{lesson.duration}</div>
                        {!lesson.done && (
                          <div style={{ fontSize: 10, background: "#58a6ff22", color: "#58a6ff", padding: "2px 8px", borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>START</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}