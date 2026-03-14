import { useState } from "react";
import { useNavigate } from "react-router-dom";

const POSTS = [
  {
    id: 1, user: "sara_dev", avatar: "S", time: "2h ago", tag: "Showcase",
    title: "Just deployed my first full stack SaaS — here's what I learned 🧵",
    body: "After 8 months of learning on StackForge, I finally shipped my first SaaS product. Here are the 5 biggest lessons I learned along the way...",
    replies: 42, likes: 97, views: 412, phase: "Full Stack",
    answers: [
      { user: "bilal_k", avatar: "B", time: "1h ago", text: "This is amazing Sara! What stack did you end up using for auth?", likes: 12 },
      { user: "amara_t", avatar: "A", time: "45m ago", text: "Congrats! This is exactly the kind of post that keeps me motivated. Bookmarked.", likes: 8 },
    ]
  },
  {
    id: 2, user: "0xkaran", avatar: "K", time: "5h ago", tag: "Discussion",
    title: "LangChain vs raw OpenAI SDK in 2025 — which should beginners start with?",
    body: "I've seen a lot of debate about this. LangChain adds abstraction but also complexity. The raw SDK is simple but verbose. What do you all think?",
    replies: 31, likes: 55, views: 289, phase: "Gen AI",
    answers: [
      { user: "dev_zara", avatar: "Z", time: "4h ago", text: "Start with raw OpenAI SDK to understand the fundamentals, then move to LangChain when you need agents or chains.", likes: 24 },
    ]
  },
  {
    id: 3, user: "leila_ui", avatar: "L", time: "1d ago", tag: "Help",
    title: "Tailwind v4 config is confusing me — anyone have a starter template?",
    body: "The new CSS-based config in Tailwind v4 is very different from v3. I'm getting errors when trying to use custom colors. Any help appreciated!",
    replies: 9, likes: 19, views: 134, phase: "Frontend",
    answers: [
      { user: "themaddev", avatar: "T", time: "23h ago", text: "Here's the key change: instead of tailwind.config.js you now use @theme in your CSS. Check the official migration guide.", likes: 15 },
      { user: "sara_dev", avatar: "S", time: "20h ago", text: "I made a starter repo for this! Let me find the link...", likes: 7 },
    ]
  },
  {
    id: 4, user: "themaddev", avatar: "T", time: "2d ago", tag: "Resource",
    title: "Free cheatsheet: Every HTTP status code explained with real examples 📄",
    body: "I made this for myself and thought I'd share. Covers 1xx, 2xx, 3xx, 4xx, and 5xx codes with real-world scenarios for each. PDF download inside.",
    replies: 7, likes: 204, views: 1820, phase: "Foundations",
    answers: []
  },
  {
    id: 5, user: "jaspreet_s", avatar: "J", time: "3d ago", tag: "Help",
    title: "How do I handle JWT refresh tokens in Next.js middleware?",
    body: "I'm building an auth system and struggling with the refresh token flow in Next.js middleware. The token expires and I need to silently refresh it.",
    replies: 14, likes: 28, views: 203, phase: "Backend",
    answers: [
      { user: "0xkaran", avatar: "K", time: "2d ago", text: "Use the next-auth library — it handles token rotation automatically. If you're rolling your own, store the refresh token in an httpOnly cookie.", likes: 19 },
    ]
  },
  {
    id: 6, user: "riya_builds", avatar: "R", time: "4d ago", tag: "Showcase",
    title: "Built a RAG chatbot for my university's FAQ — got an internship offer from it!",
    body: "I used LangChain + Pinecone + Next.js to build a chatbot that answers student questions using the university handbook. Showed it in my interview and got the offer!",
    replies: 38, likes: 156, views: 934, phase: "Gen AI",
    answers: []
  },
];

const TAGS = ["All", "Help", "Showcase", "Discussion", "Resource"];
const TAG_COLOR = { Help: "#FFB74D", Showcase: "#3fb950", Discussion: "#4FC3F7", Resource: "#CE93D8" };
const PHASES = ["All Phases", "Foundations", "Frontend", "Backend", "Full Stack", "Gen AI", "AI Automation"];
const PHASE_COLOR = { Foundations: "#4FC3F7", Frontend: "#81C784", Backend: "#FFB74D", "Full Stack": "#F06292", "Gen AI": "#CE93D8", "AI Automation": "#80DEEA" };

const STATS = [["1", "Members"], ["0", "Posts this week"], ["—", "Questions answered"], ["—", "Avg response time"]];

export default function Community() {
  const navigate = useNavigate();
  const [tag, setTag] = useState("All");
  const [phase, setPhase] = useState("All Phases");
  const [search, setSearch] = useState("");
  const [openPost, setOpenPost] = useState(null);
  const [newPostModal, setNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", tag: "Help", phase: "Foundations" });
  const [reply, setReply] = useState("");
  const [posts, setPosts] = useState(POSTS);
  const [likedPosts, setLikedPosts] = useState({});

  const filtered = posts.filter(p => {
    const matchTag = tag === "All" || p.tag === tag;
    const matchPhase = phase === "All Phases" || p.phase === phase;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchPhase && matchSearch;
  });

  function submitPost() {
    if (!newPost.title.trim()) return;
    const post = {
      id: posts.length + 1,
      user: "fayyaz",
      avatar: "F",
      time: "Just now",
      tag: newPost.tag,
      title: newPost.title,
      body: newPost.body,
      replies: 0,
      likes: 0,
      views: 1,
      phase: newPost.phase,
      answers: [],
    };
    setPosts([post, ...posts]);
    setNewPost({ title: "", body: "", tag: "Help", phase: "Foundations" });
    setNewPostModal(false);
  }

  function submitReply() {
    if (!reply.trim()) return;
    setPosts(posts.map(p => p.id === openPost.id
      ? { ...p, replies: p.replies + 1, answers: [...p.answers, { user: "fayyaz", avatar: "F", time: "Just now", text: reply, likes: 0 }] }
      : p
    ));
    const updated = posts.find(p => p.id === openPost.id);
    setOpenPost({ ...updated, replies: updated.replies + 1, answers: [...updated.answers, { user: "fayyaz", avatar: "F", time: "Just now", text: reply, likes: 0 }] });
    setReply("");
  }

  function toggleLike(postId) {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    setPosts(posts.map(p => p.id === postId
      ? { ...p, likes: likedPosts[postId] ? p.likes - 1 : p.likes + 1 }
      : p
    ));
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
        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 9px 20px; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-ghost { background: none; border: 1px solid #30363d; color: #e6edf3; font-family: inherit; font-size: 13px; font-weight: 600; padding: 9px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-ghost:hover { border-color: #58a6ff; color: #58a6ff; }
        .filter-btn { background: #161b22; border: 1px solid #21262d; color: #8b949e; font-family: inherit; font-size: 12px; padding: 5px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .filter-btn:hover { border-color: #30363d; color: #e6edf3; }
        .filter-btn.active { border-color: #58a6ff; color: #58a6ff; background: #58a6ff11; }
        .post-row { background: #161b22; border: 1px solid #21262d; border-radius: 10px; padding: 18px 20px; cursor: pointer; transition: all 0.2s; }
        .post-row:hover { border-color: #30363d; background: #1c2128; }
        .avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
        .tag-pill { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .search-input { background: #161b22; border: 1px solid #21262d; border-radius: 8px; padding: 8px 14px 8px 36px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; width: 100%; max-width: 260px; transition: border-color 0.2s; }
        .search-input:focus { border-color: #58a6ff; }
        .search-input::placeholder { color: #484f58; }
        .modal-bg { position: fixed; inset: 0; background: #00000099; z-index: 200; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); padding: 16px; overflow-y: auto; }
        .modal { background: #161b22; border: 1px solid #30363d; border-radius: 14px; padding: 28px; max-width: 600px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
        .text-input { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 11px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; transition: border-color 0.2s; }
        .text-input:focus { border-color: #58a6ff; }
        .text-input::placeholder { color: #484f58; }
        .textarea-input { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 11px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; resize: vertical; line-height: 1.7; min-height: 120px; transition: border-color 0.2s; }
        .textarea-input:focus { border-color: #58a6ff; }
        .select-input { background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 10px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; cursor: pointer; }
        .like-btn { background: none; border: 1px solid #21262d; border-radius: 6px; color: #8b949e; font-family: inherit; font-size: 12px; padding: 4px 10px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 5px; }
        .like-btn:hover { border-color: #f06292; color: #f06292; }
        .like-btn.liked { border-color: #f06292; color: #f06292; background: #f0629211; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .live { width: 7px; height: 7px; border-radius: 50%; background: #3fb950; display: inline-block; animation: pulse 2s infinite; }
        @media (max-width: 768px) {
          .top-bar-pad { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .filter-row { flex-wrap: wrap; }
          .search-input { max-width: 100% !important; }
          .post-meta { display: none !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Community</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#8b949e" }}>
            <span className="live" />
            <span>1 online</span>
          </div>
          <button className="btn-primary" onClick={() => setNewPostModal(true)}>+ New Post</button>
        </div>
      </div>

      {/* Content */}
      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#CE93D8", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// community.forum</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Community Forum</h1>
          <p style={{ color: "#8b949e", fontSize: 13 }}>Ask questions, share wins, and learn together</p>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {STATS.map(([v, l]) => (
            <div key={l} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, color: "#58a6ff" }}>{v}</div>
              <div style={{ fontSize: 11, color: "#8b949e", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TAGS.map(t => (
              <button key={t} className={`filter-btn${tag === t ? " active" : ""}`} onClick={() => setTag(t)}>
                {t !== "All" && <span style={{ color: TAG_COLOR[t], marginRight: 4 }}>●</span>}{t}
              </button>
            ))}
            <select className="select-input" value={phase} onChange={e => setPhase(e.target.value)} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 20 }}>
              {PHASES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#484f58", fontSize: 13 }}>🔍</span>
            <input className="search-input" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#484f58" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
              <div>No posts found. Be the first to post!</div>
            </div>
          ) : filtered.map(post => (
            <div key={post.id} className="post-row" onClick={() => setOpenPost(post)}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                {/* Avatar */}
                <div className="avatar" style={{ background: `hsl(${post.user.charCodeAt(0) * 37 % 360},45%,28%)`, color: "#e6edf3" }}>{post.avatar}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <span className="tag-pill" style={{ background: TAG_COLOR[post.tag] + "22", color: TAG_COLOR[post.tag] }}>{post.tag}</span>
                    {post.phase && <span style={{ fontSize: 11, color: PHASE_COLOR[post.phase] || "#8b949e", background: (PHASE_COLOR[post.phase] || "#8b949e") + "18", padding: "1px 7px", borderRadius: 4 }}>{post.phase}</span>}
                    <span style={{ fontSize: 11, color: "#484f58" }}>{post.user} · {post.time}</span>
                  </div>

                  {/* Title */}
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 6, lineHeight: 1.4 }}>{post.title}</div>

                  {/* Body preview */}
                  <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.body}</div>

                  {/* Footer */}
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#8b949e" }}>
                    <span>💬 {post.replies} replies</span>
                    <span style={{ color: likedPosts[post.id] ? "#f06292" : "#8b949e" }}>♡ {post.likes}</span>
                    <span className="post-meta">👁 {post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Detail Modal */}
      {openPost && (
        <div className="modal-bg" onClick={() => setOpenPost(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpenPost(null)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 22, cursor: "pointer" }}>×</button>

            {/* Post header */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span className="tag-pill" style={{ background: TAG_COLOR[openPost.tag] + "22", color: TAG_COLOR[openPost.tag] }}>{openPost.tag}</span>
              {openPost.phase && <span style={{ fontSize: 11, color: PHASE_COLOR[openPost.phase] || "#8b949e", background: (PHASE_COLOR[openPost.phase] || "#8b949e") + "18", padding: "2px 8px", borderRadius: 4 }}>{openPost.phase}</span>}
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 10, lineHeight: 1.4 }}>{openPost.title}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div className="avatar" style={{ background: `hsl(${openPost.user.charCodeAt(0) * 37 % 360},45%,28%)`, color: "#e6edf3", width: 28, height: 28, fontSize: 12 }}>{openPost.avatar}</div>
              <span style={{ fontSize: 12, color: "#8b949e" }}>{openPost.user} · {openPost.time}</span>
            </div>
            <p style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.8, marginBottom: 16 }}>{openPost.body}</p>

            {/* Like / stats */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #21262d" }}>
              <button className={`like-btn${likedPosts[openPost.id] ? " liked" : ""}`} onClick={() => toggleLike(openPost.id)}>
                ♡ {openPost.likes}
              </button>
              <span style={{ fontSize: 12, color: "#8b949e", display: "flex", alignItems: "center" }}>💬 {openPost.replies} replies</span>
              <span style={{ fontSize: 12, color: "#8b949e", display: "flex", alignItems: "center" }}>👁 {openPost.views}</span>
            </div>

            {/* Replies */}
            {openPost.answers.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>Replies</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {openPost.answers.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 14, borderBottom: "1px solid #21262d" }}>
                      <div className="avatar" style={{ background: `hsl(${a.user.charCodeAt(0) * 37 % 360},45%,28%)`, color: "#e6edf3", width: 30, height: 30, fontSize: 12 }}>{a.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 5 }}>{a.user} · {a.time}</div>
                        <div style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.7, marginBottom: 8 }}>{a.text}</div>
                        <button className="like-btn" style={{ fontSize: 11 }}>♡ {a.likes}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reply box */}
            <div>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>Write a reply</div>
              <textarea className="textarea-input" style={{ minHeight: 80 }} placeholder="Share your thoughts or answer..." value={reply} onChange={e => setReply(e.target.value)} />
              <button className="btn-primary" style={{ marginTop: 10, width: "100%" }} onClick={submitReply}>Post Reply →</button>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {newPostModal && (
        <div className="modal-bg" onClick={() => setNewPostModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setNewPostModal(false)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 22, cursor: "pointer" }}>×</button>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>New Post</h2>

            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Category</label>
                <select className="select-input" style={{ width: "100%" }} value={newPost.tag} onChange={e => setNewPost({ ...newPost, tag: e.target.value })}>
                  {["Help", "Showcase", "Discussion", "Resource"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Phase</label>
                <select className="select-input" style={{ width: "100%" }} value={newPost.phase} onChange={e => setNewPost({ ...newPost, phase: e.target.value })}>
                  {PHASES.filter(p => p !== "All Phases").map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Title</label>
              <input className="text-input" placeholder="What's your question or topic?" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Details (optional)</label>
              <textarea className="textarea-input" placeholder="Add more context, code snippets, or details..." value={newPost.body} onChange={e => setNewPost({ ...newPost, body: e.target.value })} />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setNewPostModal(false)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={submitPost}>Publish Post →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}