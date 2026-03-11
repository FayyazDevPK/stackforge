import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPro = user?.plan === "pro";
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Fayyaz",
    email: "fayyaz@example.com",
    username: "fayyaz_dev",
    bio: "Full stack developer in progress. Building StackForge.",
    location: "Karachi, Pakistan",
    website: "",
    goal: "Get a dev job",
    level: "Beginner",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [notifications, setNotifications] = useState({
    newReplies: true, announcements: true, weeklyDigest: true, promos: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
        .tab-btn { background: none; border: none; font-family: inherit; font-size: 13px; cursor: pointer; padding: 9px 18px; border-bottom: 2px solid transparent; color: #8b949e; transition: all 0.2s; white-space: nowrap; }
        .tab-btn.active { color: #58a6ff; border-bottom-color: #58a6ff; }
        .tab-btn:hover { color: #e6edf3; }
        .input-field { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 11px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: #58a6ff; }
        .input-field::placeholder { color: #484f58; }
        .textarea-field { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 11px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; resize: vertical; min-height: 90px; line-height: 1.6; transition: border-color 0.2s; }
        .textarea-field:focus { border-color: #58a6ff; }
        .select-field { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 11px 14px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; cursor: pointer; }
        .btn-primary { background: linear-gradient(135deg, #58a6ff, #1f6feb); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 8px; cursor: pointer; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.88; }
        .btn-pro { background: linear-gradient(135deg, #f79d65, #f06292); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 8px; cursor: pointer; }
        .btn-danger { background: none; border: 1px solid #f0626244; color: #f06262; font-family: inherit; font-size: 13px; padding: 10px 24px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-danger:hover { background: #f0626211; }
        .toggle-wrap { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #21262d; }
        .toggle-wrap:last-child { border-bottom: none; }
        .toggle { width: 40px; height: 22px; border-radius: 11px; position: relative; cursor: pointer; transition: background 0.2s; border: none; flex-shrink: 0; }
        .toggle-knob { position: absolute; width: 16px; height: 16px; border-radius: 50%; background: white; top: 3px; transition: left 0.2s; }
        .label { font-size: 12px; color: "#8b949e"; display: block; margin-bottom: 6px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .save-toast { position: fixed; bottom: 24px; right: 24px; background: "#238636"; border: "1px solid #2ea043"; color: white; padding: "12px 20px"; border-radius: 8px; font-size: 13px; font-weight: 600; z-index: 300; }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .top-bar-pad { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .tab-scroll { overflow-x: auto; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar-pad" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>← Dashboard</button>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>Profile & Settings</span>
        </div>
      </div>

      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 760, margin: "0 auto" }}>

        {/* Avatar + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 28, flexShrink: 0 }}>
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{user?.name || form.name}</h1>
            <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>@{form.username} · {form.location}</div>
            {isPro
              ? <span style={{ fontSize: 11, background: "#f79d6522", color: "#f79d65", border: "1px solid #f79d6533", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>✦ Pro Plan</span>
              : <span style={{ fontSize: 11, background: "#21262d", color: "#8b949e", padding: "3px 10px", borderRadius: 20 }}>Free Plan</span>
            }
          </div>
          {isPro
            ? <div style={{ marginLeft: "auto", background: "#3fb95011", border: "1px solid #3fb95033", borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#3fb950" }}>✦ Pro Active</div>
                <div style={{ fontSize: 11, color: "#8b949e", marginTop: 2 }}>All phases unlocked</div>
              </div>
            : <button className="btn-pro" style={{ marginLeft: "auto" }} onClick={() => navigate("/pricing")}>✦ Upgrade to Pro</button>
          }
        </div>

        {/* Tabs */}
        <div className="tab-scroll" style={{ borderBottom: "1px solid #21262d", marginBottom: 28, display: "flex" }}>
          {["profile", "password", "notifications", "danger"].map(t => (
            <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
              {t === "profile" ? "Profile" : t === "password" ? "Password" : t === "notifications" ? "Notifications" : "Danger Zone"}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {tab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="form-row">
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Full Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Username</label>
                <input className="input-field" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Email Address</label>
              <input className="input-field" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Bio</label>
              <textarea className="textarea-field" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Tell the community about yourself..." />
            </div>
            <div className="form-row">
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Location</label>
                <input className="input-field" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Website / Portfolio</label>
                <input className="input-field" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://yoursite.com" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Learning Goal</label>
                <select className="select-field" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })}>
                  {["Get a dev job", "Freelance", "Build my own product", "Learn for fun"].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Experience Level</label>
                <select className="select-field" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}>
                  {["Beginner", "Intermediate", "Advanced"].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={{ paddingTop: 6 }}>
              <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        )}

        {/* ── PASSWORD TAB ── */}
        {tab === "password" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Current Password</label>
              <input className="input-field" type="password" placeholder="••••••••" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>New Password</label>
              <input className="input-field" type="password" placeholder="Min. 8 characters" value={passwords.newPass} onChange={e => setPasswords({ ...passwords, newPass: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Confirm New Password</label>
              <input className="input-field" type="password" placeholder="Repeat new password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
            </div>
            <button className="btn-primary" style={{ marginTop: 6 }} onClick={handleSave}>Update Password</button>
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {tab === "notifications" && (
          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "8px 20px" }}>
            {[
              { key: "newReplies", label: "New replies to your posts", sub: "Get notified when someone replies in the forum" },
              { key: "announcements", label: "Platform announcements", sub: "New courses, features and important updates" },
              { key: "weeklyDigest", label: "Weekly learning digest", sub: "A summary of your progress every Sunday" },
              { key: "promos", label: "Promotions & offers", sub: "Discounts and special deals on Pro plans" },
            ].map(item => (
              <div key={item.key} className="toggle-wrap">
                <div>
                  <div style={{ fontSize: 13, color: "#e6edf3", fontWeight: 500, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "#8b949e" }}>{item.sub}</div>
                </div>
                <button
                  className="toggle"
                  style={{ background: notifications[item.key] ? "#238636" : "#21262d" }}
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                >
                  <div className="toggle-knob" style={{ left: notifications[item.key] ? "21px" : "3px" }} />
                </button>
              </div>
            ))}
            <div style={{ paddingTop: 16, paddingBottom: 8 }}>
              <button className="btn-primary" onClick={handleSave}>Save Preferences</button>
            </div>
          </div>
        )}

        {/* ── DANGER ZONE ── */}
        {tab === "danger" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px" }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Log out of all devices</h3>
              <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 14, lineHeight: 1.6 }}>This will end all active sessions on other devices. You will stay logged in here.</p>
              <button className="btn-danger">Log Out All Devices</button>
            </div>
            <div style={{ background: "#161b22", border: "1px solid #f0626233", borderRadius: 12, padding: "20px" }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f06262" }}>Delete Account</h3>
              <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 14, lineHeight: 1.6 }}>Permanently delete your account and all progress. This action cannot be undone.</p>
              <button className="btn-danger" style={{ borderColor: "#f0626266" }}>Delete My Account</button>
            </div>
          </div>
        )}
      </div>

      {/* Save toast */}
      {saved && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#238636", border: "1px solid #2ea043", color: "white", padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, zIndex: 300, fontFamily: "inherit" }}>
          ✓ Changes saved!
        </div>
      )}
    </div>
  );
}