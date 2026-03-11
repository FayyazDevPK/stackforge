import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOOLS = [
  {
    cat: "Code Editor", icon: "💻", color: "#4FC3F7",
    items: [
      { name: "VS Code", desc: "Most popular code editor. Free, fast, with thousands of extensions.", link: "https://code.visualstudio.com", badge: "Recommended" },
      { name: "Cursor", desc: "AI-powered code editor built on VS Code. Great for AI-assisted coding.", link: "https://cursor.sh", badge: "AI" },
      { name: "WebStorm", desc: "Powerful IDE by JetBrains. Best for large JavaScript/TypeScript projects.", link: "https://www.jetbrains.com/webstorm", badge: "" },
    ]
  },
  {
    cat: "Frontend", icon: "⚛️", color: "#81C784",
    items: [
      { name: "Vite", desc: "Lightning-fast build tool. Best way to start any frontend project.", link: "https://vitejs.dev", badge: "Recommended" },
      { name: "React DevTools", desc: "Browser extension to inspect React component trees and state.", link: "https://react.dev/learn/react-developer-tools", badge: "" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework. Build modern UIs without writing CSS files.", link: "https://tailwindcss.com", badge: "Popular" },
      { name: "Storybook", desc: "Build and test UI components in isolation. Great for design systems.", link: "https://storybook.js.org", badge: "" },
      { name: "Figma", desc: "Design tool for creating UI mockups and prototypes before coding.", link: "https://figma.com", badge: "Design" },
    ]
  },
  {
    cat: "Backend", icon: "🔧", color: "#FFB74D",
    items: [
      { name: "Postman", desc: "Test and document REST APIs. Essential for backend development.", link: "https://postman.com", badge: "Recommended" },
      { name: "TablePlus", desc: "Beautiful GUI for PostgreSQL, MySQL, MongoDB. View and edit data.", link: "https://tableplus.com", badge: "" },
      { name: "Redis", desc: "In-memory data store for caching, sessions, and pub/sub messaging.", link: "https://redis.io", badge: "" },
      { name: "Prisma", desc: "Next-gen ORM for Node.js. Type-safe database access with auto-migrations.", link: "https://prisma.io", badge: "Popular" },
      { name: "Hoppscotch", desc: "Open-source Postman alternative. Lightweight and fast API tester.", link: "https://hoppscotch.io", badge: "Free" },
    ]
  },
  {
    cat: "Deployment", icon: "🚀", color: "#F06292",
    items: [
      { name: "Vercel", desc: "Best platform for deploying Next.js apps. Free tier is very generous.", link: "https://vercel.com", badge: "Recommended" },
      { name: "Railway", desc: "Deploy backends, databases, and full stack apps with zero config.", link: "https://railway.app", badge: "Popular" },
      { name: "Netlify", desc: "Great for static sites and JAMstack apps. Easy CI/CD from GitHub.", link: "https://netlify.com", badge: "" },
      { name: "Docker", desc: "Containerize your app so it runs the same everywhere — dev to prod.", link: "https://docker.com", badge: "" },
      { name: "GitHub Actions", desc: "Automate testing and deployment with CI/CD pipelines on every push.", link: "https://github.com/features/actions", badge: "" },
    ]
  },
  {
    cat: "AI & LLM", icon: "🤖", color: "#CE93D8",
    items: [
      { name: "OpenAI Playground", desc: "Test GPT-4 prompts, adjust temperature, and explore the API live.", link: "https://platform.openai.com/playground", badge: "Recommended" },
      { name: "LangChain", desc: "Framework for building LLM-powered apps, agents, and RAG pipelines.", link: "https://langchain.com", badge: "Popular" },
      { name: "Pinecone", desc: "Managed vector database for storing and querying AI embeddings.", link: "https://pinecone.io", badge: "" },
      { name: "Hugging Face", desc: "Hub for open-source AI models. Browse, test, and deploy models free.", link: "https://huggingface.co", badge: "Free" },
      { name: "LangSmith", desc: "Debug, trace, and monitor your LangChain apps in production.", link: "https://smith.langchain.com", badge: "" },
    ]
  },
  {
    cat: "Automation", icon: "⚙️", color: "#80DEEA",
    items: [
      { name: "n8n", desc: "Open-source workflow automation. Self-host or use cloud. Very powerful.", link: "https://n8n.io", badge: "Recommended" },
      { name: "Make.com", desc: "Visual automation builder. Connects 1000+ apps with no code.", link: "https://make.com", badge: "Popular" },
      { name: "Zapier", desc: "Easiest automation tool. Great for beginners and quick integrations.", link: "https://zapier.com", badge: "" },
      { name: "Pipedream", desc: "Developer-focused automation with code steps. Free tier is generous.", link: "https://pipedream.com", badge: "Dev" },
    ]
  },
  {
    cat: "Productivity", icon: "🧠", color: "#58a6ff",
    items: [
      { name: "Notion", desc: "All-in-one workspace for notes, docs, project tracking, and wikis.", link: "https://notion.so", badge: "" },
      { name: "Excalidraw", desc: "Free whiteboard for sketching system designs and UI wireframes.", link: "https://excalidraw.com", badge: "Free" },
      { name: "Linear", desc: "Fast and elegant project management tool. Loved by dev teams.", link: "https://linear.app", badge: "" },
      { name: "Loom", desc: "Record your screen and share quick video explanations with your team.", link: "https://loom.com", badge: "" },
      { name: "Warp", desc: "AI-powered terminal. Faster than regular terminals with autocomplete.", link: "https://warp.dev", badge: "AI" },
    ]
  },
  {
    cat: "Learning", icon: "📚", color: "#3fb950",
    items: [
      { name: "MDN Web Docs", desc: "The definitive reference for HTML, CSS, and JavaScript. Bookmark it.", link: "https://developer.mozilla.org", badge: "Essential" },
      { name: "roadmap.sh", desc: "Visual roadmaps for every dev role — frontend, backend, DevOps, and more.", link: "https://roadmap.sh", badge: "" },
      { name: "CSS Tricks", desc: "Articles, guides and almanac for all things CSS and frontend.", link: "https://css-tricks.com", badge: "" },
      { name: "JavaScript.info", desc: "Best free JavaScript tutorial — from basics to advanced topics.", link: "https://javascript.info", badge: "Free" },
      { name: "DevDocs", desc: "All API documentation in one place with offline support.", link: "https://devdocs.io", badge: "Free" },
    ]
  },
];

const BADGE_COLOR = { Recommended: "#3fb950", Popular: "#58a6ff", AI: "#CE93D8", Free: "#81C784", Design: "#F06292", Dev: "#FFB74D", Essential: "#f79d65" };

export default function Tools() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activecat, setActivecat] = useState("All");

  const cats = ["All", ...TOOLS.map(t => t.cat)];

  const filtered = TOOLS
    .filter(group => activecat === "All" || group.cat === activecat)
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

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
        .cat-btn { background: #161b22; border: 1px solid #21262d; color: #8b949e; font-family: inherit; font-size: 12px; padding: 5px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .cat-btn:hover { border-color: #30363d; color: #e6edf3; }
        .cat-btn.active { border-color: #58a6ff; color: #58a6ff; background: #58a6ff11; }
        .tool-card { background: #161b22; border: 1px solid #21262d; border-radius: 10px; padding: 16px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.2s; cursor: pointer; text-decoration: none; }
        .tool-card:hover { border-color: #58a6ff33; transform: translateY(-1px); box-shadow: 0 4px 20px #00000033; }
        .search-input { background: #161b22; border: 1px solid #21262d; border-radius: 8px; padding: 9px 14px 9px 36px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; width: 100%; max-width: 280px; transition: border-color 0.2s; }
        .search-input:focus { border-color: #58a6ff; }
        .search-input::placeholder { color: #484f58; }
        .badge { display: inline-block; padding: 1px 7px; border-radius: 4px; font-size: 10px; font-weight: 700; }
        .tools-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        @media (max-width: 900px) { .tools-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) {
          .top-bar-pad { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .filter-row { flex-wrap: wrap; }
          .search-input { max-width: 100% !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Tools</span>
        </div>
      </div>

      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#81C784", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// devtools.registry.json</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Tools & Resources</h1>
          <p style={{ color: "#8b949e", fontSize: 13 }}>Every tool a full stack developer needs — curated, categorized, and linked.</p>
        </div>

        {/* Sponsored banner */}
        <div style={{ background: "#1f6feb11", border: "1px solid #1f6feb33", borderRadius: 10, padding: "14px 20px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1f6feb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🐙</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3" }}>GitHub Copilot — AI pair programmer</div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>Free for students · <span style={{ color: "#58a6ff" }}>Sponsored</span></div>
            </div>
          </div>
          <a href="https://github.com/features/copilot" target="_blank" rel="noreferrer" style={{ background: "#1f6feb", border: "none", color: "white", borderRadius: 6, padding: "7px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", textDecoration: "none", fontWeight: 600 }}>Try Free →</a>
        </div>

        {/* Filters + Search */}
        <div className="filter-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button key={c} className={`cat-btn${activecat === c ? " active" : ""}`} onClick={() => setActivecat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#484f58", fontSize: 13 }}>🔍</span>
            <input className="search-input" placeholder="Search tools..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Tool groups */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#484f58" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div>No tools match your search</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {filtered.map(group => (
              <div key={group.cat}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 22 }}>{group.icon}</span>
                  <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: group.color }}>{group.cat}</h2>
                  <div style={{ flex: 1, height: 1, background: "#21262d" }} />
                  <span style={{ fontSize: 11, color: "#484f58" }}>{group.items.length} tools</span>
                </div>

                {/* Tools grid */}
                <div className="tools-grid">
                  {group.items.map(tool => (
                    <a key={tool.name} href={tool.link} target="_blank" rel="noreferrer" className="tool-card">
                      {/* Icon placeholder */}
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: group.color + "22", border: `1px solid ${group.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, color: group.color, fontWeight: 700 }}>
                        {tool.name.charAt(0)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>{tool.name}</span>
                          {tool.badge && (
                            <span className="badge" style={{ background: BADGE_COLOR[tool.badge] + "22", color: BADGE_COLOR[tool.badge] }}>{tool.badge}</span>
                          )}
                        </div>
                        <p style={{ fontSize: 12, color: "#8b949e", lineHeight: 1.6 }}>{tool.desc}</p>
                      </div>
                      <span style={{ fontSize: 14, color: "#8b949e", flexShrink: 0, alignSelf: "center" }}>→</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}