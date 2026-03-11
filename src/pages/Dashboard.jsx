import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PHASES = [
  { id: 1, phase: "01", title: "Foundations", color: "#4FC3F7", progress: 100, lessons: 12, done: 12, free: true },
  { id: 2, phase: "02", title: "Frontend", color: "#81C784", progress: 60, lessons: 18, done: 11, free: true },
  { id: 3, phase: "03", title: "Backend", color: "#FFB74D", progress: 0, lessons: 20, done: 0, free: false },
  { id: 4, phase: "04", title: "Full Stack", color: "#F06292", progress: 0, lessons: 16, done: 0, free: false },
  { id: 5, phase: "05", title: "Gen AI & LLMs", color: "#CE93D8", progress: 0, lessons: 14, done: 0, free: false },
  { id: 6, phase: "06", title: "AI Automation", color: "#80DEEA", progress: 0, lessons: 10, done: 0, free: false },
];

const RECENT_LESSONS = [
  { id: 1, title: "React Hooks Deep Dive", phase: "Frontend", duration: "28 min", done: true, color: "#81C784" },
  { id: 2, title: "useEffect & Async Patterns", phase: "Frontend", duration: "22 min", done: true, color: "#81C784" },
  { id: 3, title: "React Router v6", phase: "Frontend", duration: "18 min", done: false, color: "#81C784" },
  { id: 4, title: "State Management with Zustand", phase: "Frontend", duration: "32 min", done: false, color: "#81C784" },
];

const ACTIVITY = [
  { day: "Mon", mins: 45 }, { day: "Tue", mins: 30 }, { day: "Wed", mins: 90 },
  { day: "Thu", mins: 20 }, { day: "Fri", mins: 60 }, { day: "Sat", mins: 75 }, { day: "Sun", mins: 10 },
];

const ANNOUNCEMENTS = [
  { icon: "🎉", text: "New: TypeScript crash course added to Phase 2", time: "2h ago" },
  { icon: "🔥", text: "You're on a 5-day streak! Keep it up!", time: "Today" },
  { icon: "📢", text: "Live Q&A session this Friday at 6PM PKT", time: "1d ago" },
];

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", path: "/dashboard" },
  { icon: "🗺️", label: "Roadmap", path: "/roadmap" },
  { icon: "📚", label: "Courses", path: "/courses" },
  { icon: "🏗️", label: "Projects", path: "/projects" },
  { icon: "🧰", label: "Tools", path: "/tools" },
  { icon: "💬", label: "Community", path: "/community" },
  { icon: "💰", label: "Pricing", path: "/pricing" },
  { icon: "👤", label: "Profile & Settings", path: "/profile" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const maxMins = Math.max(...ACTIVITY.map(a => a.mins));

  const displayName = user?.name || "Learner";

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", display: "flex", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
        .sidebar { width: 220px; min-height: 100vh; background: #161b22; border-right: 1px solid #21262d; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; z-index: 200; transition: transform 0.3s; }
        .main-content { margin-left: 220px; flex: 1; min-height: 100vh; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; color: #8b949e; transition: all 0.2s; border: none; background: none; font-family: inherit; width: 100%; text-align: left; }
        .nav-item:hover { background: #21262d; color: #e6edf3; }
        .nav-item.active { background: #21262d; color: #58a6ff; }
        .stat-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 20px; }
        .phase-row { background: #161b22; border: 1px solid #21262d; border-radius: 10px; padding: 16px; transition: all 0.2s; cursor: pointer; }
        .phase-row:hover { border-color: #30363d; }
        .lesson-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #21262d22; cursor: pointer; }
        .lesson-row:last-child { border-bottom: none; }
        .btn-pro { background: linear-gradient(135deg, #f79d65, #f06292); border: none; color: white; font-family: inherit; font-size: 12px; font-weight: 700; padding: 7px 16px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-size: 12px; font-weight: 700; padding: 7px 16px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
        .overlay { display: none; position: fixed; inset: 0; background: #00000088; z-index: 150; }
        .profile-row { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        .profile-row:hover { background: #21262d; }
        .logout-btn { display: flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; color: #8b949e; background: none; border: none; font-family: inherit; width: 100%; text-align: left; transition: all 0.2s; }
        .logout-btn:hover { background: #f0626211; color: #f06262; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .main-content { margin-left: 0; }
          .overlay.show { display: block; }
          .top-bar { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .bottom-grid { grid-template-columns: 1fr !important; }
        }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 20px; height: 2px; background: #e6edf3; border-radius: 2px; }
        @media (max-width: 768px) { .hamburger { display: flex; } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .live { animation: pulse 2s infinite; }
      `}</style>

      {/* Overlay */}
      <div className={`overlay${sidebarOpen ? " show" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div style={{ padding: "18px 20px 12px", borderBottom: "1px solid #21262d" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 20 }}>⬡</span>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15 }}>StackForge</span>
          </div>
        </div>

        {/* User profile — click to go to profile page */}
        <div className="profile-row" style={{ margin: "8px 10px" }} onClick={() => { navigate("/profile"); setSidebarOpen(false); }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</div>
            <div style={{ fontSize: 11, color: user?.plan === "pro" ? "#f79d65" : "#8b949e" }}>{user?.plan === "pro" ? "✦ Pro Plan" : "Free Plan"} · Edit Profile</div>
          </div>
          <span style={{ color: "#484f58", fontSize: 14 }}>›</span>
        </div>

        <div style={{ height: 1, background: "#21262d", margin: "4px 0" }} />

        {/* Nav */}
        <nav style={{ padding: "8px 12px", flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.label} className={`nav-item${activeNav === item.label ? " active" : ""}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false); navigate(item.path); }}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Upgrade CTA — hide if already Pro */}
        {user?.plan !== "pro" && (
          <div style={{ padding: "12px 16px" }}>
            <div style={{ background: "linear-gradient(135deg,#f79d6518,#f0629218)", border: "1px solid #f79d6530", borderRadius: 10, padding: "14px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#f79d65", marginBottom: 4 }}>✦ Upgrade to Pro</div>
              <div style={{ fontSize: 11, color: "#8b949e", marginBottom: 10, lineHeight: 1.5 }}>Unlock all 6 phases & 30+ projects</div>
              <button className="btn-pro" style={{ width: "100%", padding: "8px" }} onClick={() => navigate("/pricing")}>
                Upgrade Now →
              </button>
            </div>
          </div>
        )}
        {user?.plan === "pro" && (
          <div style={{ padding: "12px 16px" }}>
            <div style={{ background: "#3fb95011", border: "1px solid #3fb95033", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#3fb950" }}>✦ Pro Plan Active</div>
              <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>All 6 phases unlocked</div>
            </div>
          </div>
        )}

        {/* Logout */}
        <div style={{ padding: "0 12px 16px" }}>
          <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
            <span>⎋</span> Log Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}><span /><span /><span /></button>
            <span style={{ fontSize: 13, color: "#e6edf3" }}>Good morning, <strong>{displayName}</strong> 👋</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#8b949e" }}>
              <span className="live" style={{ width: 7, height: 7, borderRadius: "50%", background: "#3fb950", display: "inline-block" }} />
              2,841 online
            </div>
            <div onClick={() => navigate("/profile")} title="Profile & Settings"
              style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1100 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// dashboard.overview</div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800 }}>Your Learning Dashboard</h1>
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
            {[
              { label: "Current Phase", value: "02", sub: "Frontend Dev", color: "#81C784", icon: "📍" },
              { label: "Overall Progress", value: "27%", sub: "Phase 2 of 6", color: "#58a6ff", icon: "📈" },
              { label: "Day Streak", value: "5 🔥", sub: "Keep it up!", color: "#f79d65", icon: "⚡" },
              { label: "Lessons Done", value: "23", sub: "out of 90 total", color: "#CE93D8", icon: "✅" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#8b949e" }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Phases */}
          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700 }}>Roadmap Progress</h2>
              <button className="btn-primary" onClick={() => navigate("/courses")}>Continue Learning →</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PHASES.map(p => (
                <div key={p.id} className="phase-row" onClick={() => navigate("/courses")}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: p.progress > 0 ? 10 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: p.color, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>{p.phase}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: p.progress > 0 ? "#e6edf3" : "#8b949e" }}>{p.title}</span>
                      {!p.free && <span style={{ fontSize: 10, background: "#f79d6522", color: "#f79d65", padding: "1px 7px", borderRadius: 10, fontWeight: 700 }}>PRO</span>}
                      {p.progress === 100 && <span style={{ fontSize: 10, background: "#3fb95022", color: "#3fb950", padding: "1px 7px", borderRadius: 10, fontWeight: 700 }}>DONE ✓</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, color: "#8b949e" }}>{p.done}/{p.lessons}</span>
                      {!p.free && (
                        <button className="btn-pro" style={{ fontSize: 10, padding: "3px 10px" }}
                          onClick={e => { e.stopPropagation(); navigate("/pricing"); }}>Unlock ✦</button>
                      )}
                    </div>
                  </div>
                  {p.progress > 0 && (
                    <div style={{ height: 5, background: "#21262d", borderRadius: 3 }}>
                      <div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg,${p.color},${p.color}88)`, borderRadius: 3 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700 }}>Up Next</h2>
                <button onClick={() => navigate("/courses")} style={{ background: "none", border: "none", color: "#58a6ff", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View all →</button>
              </div>
              {RECENT_LESSONS.map(l => (
                <div key={l.id} className="lesson-row" onClick={() => navigate("/courses")}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: l.done ? "#3fb95022" : "#21262d", border: `1px solid ${l.done ? "#3fb95044" : "#30363d"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                    {l.done ? "✓" : "▶"}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: l.done ? "#8b949e" : "#e6edf3", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: l.done ? "line-through" : "none" }}>{l.title}</div>
                    <div style={{ fontSize: 11, color: "#8b949e" }}>{l.phase} · {l.duration}</div>
                  </div>
                  {!l.done && <span style={{ fontSize: 10, background: "#58a6ff22", color: "#58a6ff", padding: "2px 8px", borderRadius: 6, fontWeight: 700, flexShrink: 0 }}>START</span>}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px" }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Weekly Activity</h2>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 60 }}>
                  {ACTIVITY.map(a => (
                    <div key={a.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ width: "100%", background: a.mins > 50 ? "#58a6ff" : "#21262d", borderRadius: 4, height: `${Math.round((a.mins / maxMins) * 52) + 8}px`, border: `1px solid ${a.mins > 50 ? "#58a6ff44" : "#30363d"}` }} />
                      <span style={{ fontSize: 10, color: "#8b949e" }}>{a.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px" }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Announcements</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {ANNOUNCEMENTS.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 10 }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, color: "#c9d1d9", lineHeight: 1.5 }}>{a.text}</div>
                        <div style={{ fontSize: 10, color: "#484f58", marginTop: 2 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}