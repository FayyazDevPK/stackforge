import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DEFAULT_LESSON = {
  title: "React Router v6",
  duration: "30 min",
  type: "video",
};

const DEFAULT_COURSE = {
  title: "Frontend Development",
  color: "#81C784",
  phase: "02",
};

const NOTES_PLACEHOLDER = `// Your notes for this lesson...\n\n- Key point 1\n- Key point 2\n`;

const RESOURCES = [
  { label: "Official React Router Docs", url: "#" },
  { label: "Lesson Cheatsheet (PDF)", url: "#" },
  { label: "Starter Code on GitHub", url: "#" },
];

export default function LessonPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const lesson = location.state?.lesson || DEFAULT_LESSON;
  const course = location.state?.course || DEFAULT_COURSE;

  const [tab, setTab] = useState("overview");
  const [notes, setNotes] = useState(NOTES_PLACEHOLDER);
  const [done, setDone] = useState(false);

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
        .tab-btn { background: none; border: none; font-family: inherit; font-size: 13px; cursor: pointer; padding: 8px 16px; border-bottom: 2px solid transparent; transition: all 0.2s; color: #8b949e; }
        .tab-btn.active { color: #58a6ff; border-bottom-color: #58a6ff; }
        .tab-btn:hover { color: #e6edf3; }
        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 8px; cursor: pointer; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-success { background: linear-gradient(135deg, #3fb950, #238636); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 8px; cursor: pointer; }
        .notes-area { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 14px; color: #c9d1d9; font-family: inherit; font-size: 13px; resize: vertical; outline: none; line-height: 1.7; min-height: 200px; }
        .notes-area:focus { border-color: #30363d; }
        .resource-link { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #161b22; border: 1px solid #21262d; border-radius: 8px; cursor: pointer; transition: border-color 0.2s; text-decoration: none; }
        .resource-link:hover { border-color: #58a6ff44; }
        @media (max-width: 768px) {
          .player-layout { flex-direction: column !important; }
          .sidebar-panel { width: 100% !important; border-left: none !important; border-top: 1px solid #21262d !important; }
          .top-bar-pad { padding: 0 16px !important; }
          .content-pad { padding: 20px 16px !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <button className="back-btn" onClick={() => navigate("/courses")}>← Courses</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontSize: 11, color: "#8b949e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Phase {course.phase} · {course.title}
          </span>
        </div>
        <button
          className={done ? "btn-success" : "btn-primary"}
          onClick={() => { setDone(!done); }}
          style={{ flexShrink: 0 }}
        >
          {done ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>

      {/* Layout */}
      <div className="player-layout" style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Video Area */}
          <div style={{ background: "#010409", aspectRatio: "16/9", maxHeight: 480, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            {/* Fake video player */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#21262d", border: "2px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                <span style={{ fontSize: 24, color: course.color }}>▶</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>{lesson.title}</div>
                <div style={{ fontSize: 12, color: "#8b949e" }}>{lesson.duration} · {lesson.type}</div>
              </div>
              <div style={{ fontSize: 11, color: "#484f58", marginTop: 8 }}>
                🎬 Video will play here when you connect your content
              </div>
            </div>

            {/* Video Controls Bar */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, #0d1117cc)", padding: "20px 16px 12px", display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ background: "none", border: "none", color: "#e6edf3", cursor: "pointer", fontSize: 16 }}>▶</button>
              <div style={{ flex: 1, height: 3, background: "#30363d", borderRadius: 2, cursor: "pointer", position: "relative" }}>
                <div style={{ width: "35%", height: "100%", background: course.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 11, color: "#8b949e", whiteSpace: "nowrap" }}>10:30 / 30:00</span>
              <button style={{ background: "none", border: "none", color: "#8b949e", cursor: "pointer", fontSize: 13 }}>⛶</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="content-pad" style={{ padding: "0 24px" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #21262d", marginBottom: 24 }}>
              {["overview", "notes", "resources"].map(t => (
                <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {tab === "overview" && (
              <div style={{ paddingBottom: 40 }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{lesson.title}</h2>
                <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "#8b949e" }}>⏱ {lesson.duration}</span>
                  <span style={{ fontSize: 12, color: "#8b949e" }}>📚 Phase {course.phase}</span>
                  <span style={{ fontSize: 12, color: course.color }}>● {course.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.8, marginBottom: 20 }}>
                  In this lesson you'll learn how to use React Router v6 to navigate between pages in your React app.
                  We'll cover routes, links, nested routing, dynamic params, and the new hooks like <code style={{ color: "#58a6ff", background: "#58a6ff11", padding: "1px 6px", borderRadius: 4 }}>useNavigate</code> and <code style={{ color: "#58a6ff", background: "#58a6ff11", padding: "1px 6px", borderRadius: 4 }}>useParams</code>.
                </p>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 12, color: "#e6edf3" }}>What you'll learn</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Setting up React Router v6", "Creating routes with <Routes> and <Route>", "Using <Link> and <NavLink>", "Dynamic routes with useParams", "Programmatic navigation with useNavigate", "Nested routes and layouts"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#c9d1d9" }}>
                      <span style={{ color: "#3fb950", flexShrink: 0 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes Tab */}
            {tab === "notes" && (
              <div style={{ paddingBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700 }}>Your Notes</h3>
                  <span style={{ fontSize: 11, color: "#484f58" }}>Auto-saved</span>
                </div>
                <textarea
                  className="notes-area"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                />
              </div>
            )}

            {/* Resources Tab */}
            {tab === "resources" && (
              <div style={{ paddingBottom: 40 }}>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Lesson Resources</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {RESOURCES.map(r => (
                    <a key={r.label} href={r.url} className="resource-link">
                      <span style={{ fontSize: 13, color: "#e6edf3" }}>📎 {r.label}</span>
                      <span style={{ fontSize: 12, color: "#58a6ff" }}>Open →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — Next lessons */}
        <div className="sidebar-panel" style={{ width: 300, borderLeft: "1px solid #21262d", background: "#161b22", overflowY: "auto" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #21262d" }}>
            <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: "0.08em", textTransform: "uppercase" }}>Phase {course.phase} · {course.title}</div>
          </div>
          {[
            { id: 1, title: "React Fundamentals", done: true },
            { id: 2, title: "JSX & Components", done: true },
            { id: 3, title: "Props & State", done: true },
            { id: 4, title: "React Hooks Deep Dive", done: true },
            { id: 5, title: "useEffect & Async", done: true },
            { id: 6, title: "React Router v6", done: false, active: true },
            { id: 7, title: "State Mgmt w/ Zustand", done: false },
            { id: 8, title: "TypeScript for React", done: false },
            { id: 9, title: "Tailwind CSS Mastery", done: false },
            { id: 10, title: "Next.js 14 App Router", done: false },
          ].map(l => (
            <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 20px", borderBottom: "1px solid #21262d11", cursor: "pointer", background: l.active ? "#21262d" : "transparent", borderLeft: l.active ? `3px solid ${course.color}` : "3px solid transparent", transition: "background 0.15s" }}
              onClick={() => navigate(`/courses/2-${l.id}`)}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: l.done ? "#3fb95022" : l.active ? "#21262d" : "#0d1117", border: `1px solid ${l.done ? "#3fb95055" : "#30363d"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, color: l.done ? "#3fb950" : "#8b949e" }}>
                {l.done ? "✓" : l.active ? "▶" : l.id}
              </div>
              <span style={{ fontSize: 12, color: l.active ? "#e6edf3" : l.done ? "#8b949e" : "#c9d1d9", textDecoration: l.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}