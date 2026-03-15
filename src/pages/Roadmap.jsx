import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PHASES = [
  {
    id: 1, phase: "01", title: "Foundations", color: "#4FC3F7", free: true,
    duration: "6 weeks", level: "Beginner", progress: 0, icon: "🏗️",
    desc: "Learn the building blocks of every website — HTML, CSS, JavaScript, and Git. No experience needed.",
    topics: [
      "How the Web Works (DNS, HTTP, Browsers)",
      "HTML5 Structure & Semantic Elements",
      "CSS3 — Selectors, Box Model, Flexbox",
      "CSS Grid & Responsive Design",
      "JavaScript ES6+ Fundamentals",
      "DOM Manipulation & Events",
      "Git & GitHub — Version Control",
      "Terminal & Command Line Basics",
      "Project: Personal Portfolio Website",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Git", "Terminal"],
  },
  {
    id: 2, phase: "02", title: "Frontend Development", color: "#81C784", free: true,
    duration: "8 weeks", level: "Intermediate", progress: 0, icon: "⚛️",
    desc: "Master React, Next.js and TypeScript — the most in-demand frontend stack at top companies worldwide.",
    topics: [
      "React 18 — Components, Props, State",
      "React Hooks — useState, useEffect, useRef",
      "React Router v6 — Navigation & Params",
      "State Management with Zustand",
      "TypeScript Fundamentals for React",
      "Tailwind CSS — Utility-first Styling",
      "Next.js 14 — App Router & File-based Routing",
      "Server Components & SSR vs CSR",
      "API Routes & Data Fetching Patterns",
      "Performance Optimization & Lazy Loading",
      "Testing with Vitest & Testing Library",
      "Project: E-Commerce UI with Next.js",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
  },
  {
    id: 3, phase: "03", title: "Backend Development", color: "#FFB74D", free: false,
    duration: "8 weeks", level: "Intermediate", progress: 0, icon: "🔧",
    desc: "Build powerful REST APIs and server-side apps. Learn databases, authentication, and production patterns.",
    topics: [
      "Node.js Runtime & Event Loop",
      "Express.js — Routing & Middleware",
      "REST API Design Principles",
      "PostgreSQL — Relational Database Basics",
      "Prisma ORM — Schema & Migrations",
      "MongoDB & Mongoose ODM",
      "JWT Authentication & Refresh Tokens",
      "OAuth 2.0 & Social Login",
      "File Uploads & Cloud Storage (S3)",
      "Rate Limiting, Validation & Error Handling",
      "API Documentation with Swagger",
      "Project: Full Auth API with Prisma",
    ],
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "JWT"],
  },
  {
    id: 4, phase: "04", title: "Full Stack Integration", color: "#F06292", free: false,
    duration: "6 weeks", level: "Advanced", progress: 0, icon: "🚀",
    desc: "Connect frontend and backend into production apps. Learn Docker, CI/CD, and cloud deployment.",
    topics: [
      "Connecting Next.js Frontend to Express API",
      "Environment Variables & Config Management",
      "Docker — Containers & Docker Compose",
      "CI/CD with GitHub Actions",
      "Deployment to Vercel & Railway",
      "AWS Basics — EC2, S3, RDS",
      "Monitoring & Error Tracking (Sentry)",
      "WebSockets & Real-time Features",
      "Background Jobs & Queues (Bull)",
      "Project: Full Stack SaaS App",
    ],
    skills: ["Docker", "GitHub Actions", "AWS", "Vercel", "WebSockets"],
  },
  {
    id: 5, phase: "05", title: "Gen AI & LLMs", color: "#CE93D8", free: false,
    duration: "6 weeks", level: "Advanced", progress: 0, icon: "🤖",
    desc: "Build AI-powered applications using OpenAI, LangChain, vector databases, and RAG pipelines.",
    topics: [
      "How LLMs Work — Tokens, Context, Temperature",
      "OpenAI API — Chat, Embeddings, Vision",
      "Prompt Engineering Best Practices",
      "LangChain — Chains, Agents, Memory",
      "Vector Databases — Pinecone & pgvector",
      "RAG — Retrieval Augmented Generation",
      "Streaming Responses in Next.js",
      "Function Calling & Tool Use",
      "AI Safety, Cost Optimization & Rate Limits",
      "Project: RAG Document Chatbot",
    ],
    skills: ["OpenAI API", "LangChain", "Pinecone", "RAG", "Prompt Eng."],
  },
  {
    id: 6, phase: "06", title: "AI Automation", color: "#80DEEA", free: false,
    duration: "4 weeks", level: "Expert", progress: 0, icon: "⚙️",
    desc: "Automate business workflows with no-code and code tools. Build AI agents that run on autopilot.",
    topics: [
      "n8n — Visual Workflow Builder",
      "Make.com (Integromat) Fundamentals",
      "Zapier — Connecting 5000+ Apps",
      "Webhook Triggers & API Integrations",
      "AI Nodes — OpenAI + Automation",
      "Email, Slack & Notion Automations",
      "Scheduling & Cron-based Workflows",
      "Building Custom AI Agents",
      "Monetizing Automation as a Service",
      "Project: AI-powered Client Onboarding Bot",
    ],
    skills: ["n8n", "Make.com", "Zapier", "AI Agents", "Webhooks"],
  },
];

export default function Roadmap() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPro = user?.plan === "pro";
  const [expanded, setExpanded] = useState(null);

  // A phase is accessible if it's free OR user is Pro
  function isUnlocked(phase) {
    return phase.free || isPro;
  }

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
        .phase-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; overflow: hidden; transition: border-color 0.2s; }
        .phase-card:hover { border-color: #30363d; }
        .phase-header { padding: 20px 22px; cursor: pointer; display: flex; align-items: center; gap: 16px; }
        .skill-tag { display: inline-block; padding: 3px 10px; background: #21262d; border-radius: 4px; font-size: 11px; }
        .topic-item { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid #21262d22; font-size: 13px; color: #c9d1d9; }
        .topic-item:last-child { border-bottom: none; }
        .connector { width: 2px; height: 24px; background: linear-gradient(to bottom, #21262d, transparent); margin: 0 auto; }
        .pill { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @media (max-width: 768px) {
          .phase-header { flex-wrap: wrap; gap: 10px; }
          .page-pad { padding: 16px !important; }
          .top-bar-pad { padding: 0 16px !important; }
          .phase-progress { display: none !important; }
          .phase-skills { display: none !important; }
          .top-bar-right { display: none !important; }
        }
        @media (max-width: 480px) {
          .phase-header { padding: 14px 14px !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden" }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Roadmap</span>
        </div>
        {isPro
          ? <span style={{ fontSize: 12, background: "#3fb95022", color: "#3fb950", border: "1px solid #3fb95033", padding: "4px 12px", borderRadius: 20, fontWeight: 700 }}>✦ Pro Active</span>
          : <button style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 11, fontWeight: 700, padding: "6px 10px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }} onClick={() => navigate("/pricing")}>✦ Pro</button>
        }
      </div>

      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// learning_path.config.js</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Full Stack Roadmap</h1>
          <p style={{ color: "#8b949e", fontSize: 13 }}>6 phases · 90+ lessons · 38 weeks from zero to AI-powered full stack developer</p>
        </div>

        {/* Pro banner if not pro */}
        {!isPro && (
          <div style={{ background: "#f79d6511", border: "1px solid #f79d6533", borderRadius: 10, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f79d65" }}>🔒 Phases 3–6 require Pro</div>
              <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>Upgrade once to unlock everything — Backend, Full Stack, Gen AI & Automation</div>
            </div>
            <button style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "9px 20px", borderRadius: 8, cursor: "pointer" }} onClick={() => navigate("/pricing")}>
              Upgrade to Pro ✦
            </button>
          </div>
        )}

        {/* Overall progress */}
        <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "16px 20px", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, flexWrap: "wrap", gap: 6 }}>
            <span style={{ color: "#8b949e" }}>Overall Progress</span>
            <span style={{ color: "#58a6ff", fontWeight: 600 }}>Phase 1 of 6 · Just starting!</span>
          </div>
          <div style={{ height: 7, background: "#21262d", borderRadius: 4 }}>
            <div style={{ width: "27%", height: "100%", background: "linear-gradient(90deg,#4FC3F7,#81C784)", borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "#484f58" }}>
            <span>Start</span><span>Job Ready 🎯</span>
          </div>
        </div>

        {/* Phases */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {PHASES.map((phase, index) => {
            const isExpanded = expanded === phase.id;
            const unlocked = isUnlocked(phase);

            return (
              <div key={phase.id}>
                <div className="phase-card" style={{ borderLeftWidth: 3, borderLeftColor: phase.color, opacity: unlocked ? 1 : 0.85 }}>

                  <div className="phase-header" onClick={() => setExpanded(isExpanded ? null : phase.id)}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: phase.color + "22", border: `1px solid ${phase.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {unlocked ? phase.icon : "🔒"}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <span style={{ color: phase.color, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>PHASE {phase.phase}</span>
                        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>{phase.title}</span>
                        {phase.free
                          ? <span className="pill" style={{ background: "#23863622", color: "#3fb950" }}>FREE</span>
                          : isPro
                            ? <span className="pill" style={{ background: "#f79d6522", color: "#f79d65" }}>✦ PRO</span>
                            : <span className="pill" style={{ background: "#f0626222", color: "#f06262" }}>🔒 LOCKED</span>
                        }
                        {phase.progress === 100 && <span className="pill" style={{ background: "#3fb95022", color: "#3fb950" }}>DONE ✓</span>}
                      </div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{phase.duration} · {phase.level} · {phase.topics.length} topics</div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                      {phase.progress > 0 && (
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: phase.color, fontWeight: 700 }}>{phase.progress}%</div>
                          <div style={{ width: 56, height: 4, background: "#21262d", borderRadius: 2, marginTop: 4 }}>
                            <div style={{ width: `${phase.progress}%`, height: "100%", background: phase.color, borderRadius: 2 }} />
                          </div>
                        </div>
                      )}
                      <span style={{ color: "#8b949e", fontSize: 18, transform: isExpanded ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>›</span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ borderTop: "1px solid #21262d", padding: "20px 22px" }}>
                      <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.8, marginBottom: 18 }}>{phase.desc}</p>

                      {/* Skills */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                        {phase.skills.map(sk => (
                          <span key={sk} className="skill-tag" style={{ color: phase.color, borderLeft: `2px solid ${phase.color}` }}>{sk}</span>
                        ))}
                      </div>

                      {/* Lock gate — only shown if NOT pro */}
                      {!unlocked && (
                        <div style={{ padding: "14px 18px", background: "#f0626211", border: "1px solid #f0626233", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
                          <div>
                            <div style={{ fontSize: 13, color: "#f06262", fontWeight: 600 }}>🔒 This phase is locked</div>
                            <div style={{ fontSize: 11, color: "#8b949e", marginTop: 3 }}>Upgrade to Pro to access all topics and lessons</div>
                          </div>
                          <button
                            style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8, cursor: "pointer" }}
                            onClick={() => navigate("/pricing")}
                          >
                            Upgrade to Pro ✦
                          </button>
                        </div>
                      )}

                      {/* Topics */}
                      <div>
                        <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Topics covered</div>
                        {phase.topics.map((t, i) => (
                          <div key={i} className="topic-item">
                            <span style={{ color: unlocked ? phase.color : "#484f58", flexShrink: 0, marginTop: 1 }}>
                              {unlocked ? "▸" : "🔒"}
                            </span>
                            <span style={{ color: unlocked ? "#c9d1d9" : "#484f58" }}>{t}</span>
                          </div>
                        ))}
                      </div>

                      {unlocked && (
                        <button
                          style={{ marginTop: 18, width: "100%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "11px", borderRadius: 8, cursor: "pointer" }}
                          onClick={() => navigate("/courses")}
                        >
                          Go to Lessons →
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {index < PHASES.length - 1 && (
                  <div style={{ display: "flex", justifyContent: "center", margin: "2px 0" }}>
                    <div className="connector" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
