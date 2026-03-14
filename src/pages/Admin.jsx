import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// ── CHANGE THIS TO YOUR EMAIL ──
const ADMIN_EMAIL = "fayyazliaquat70@gmail.com";

const STATS = [
  { label: "Total Users", key: "total", color: "#58a6ff", icon: "👥" },
  { label: "Pro Subscribers", key: "pro", color: "#f79d65", icon: "✦" },
  { label: "Free Users", key: "free", color: "#81C784", icon: "🆓" },
  { label: "Conversion Rate", key: "rate", color: "#CE93D8", icon: "📈" },
];

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [confirmModal, setConfirmModal] = useState(null);

  // ── ACCESS CONTROL ──
  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (user.email !== ADMIN_EMAIL) { navigate("/dashboard"); return; }
  }, [user]);

  // ── LOAD USERS FROM FIRESTORE ──
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    async function loadUsers() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setUsers(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [user]);

  function showAction(msg) {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(""), 3000);
  }

  // Grant Pro
  async function grantPro(userId, userName) {
    await updateDoc(doc(db, "users", userId), { plan: "pro" });
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: "pro" } : u));
    showAction(`✦ Pro granted to ${userName}`);
  }

  // Revoke Pro
  async function revokePro(userId, userName) {
    await updateDoc(doc(db, "users", userId), { plan: "free" });
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: "free" } : u));
    showAction(`Pro revoked from ${userName}`);
  }

  // Delete user from Firestore
  async function deleteUser(userId, userName) {
    await deleteDoc(doc(db, "users", userId));
    setUsers(prev => prev.filter(u => u.id !== userId));
    setConfirmModal(null);
    showAction(`🗑 ${userName} deleted`);
  }

  const totalUsers = users.length;
  const proUsers = users.filter(u => u.plan === "pro").length;
  const freeUsers = totalUsers - proUsers;
  const convRate = totalUsers > 0 ? Math.round((proUsers / totalUsers) * 100) : 0;

  const statsData = { total: totalUsers, pro: proUsers, free: freeUsers, rate: `${convRate}%` };

  const filteredUsers = users.filter(u =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  if (!user || user.email !== ADMIN_EMAIL) return null;

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
        .tab-btn { background: none; border: none; font-family: inherit; font-size: 13px; cursor: pointer; padding: 9px 18px; border-bottom: 2px solid transparent; color: #8b949e; transition: all 0.2s; white-space: nowrap; }
        .tab-btn.active { color: #58a6ff; border-bottom-color: #58a6ff; }
        .tab-btn:hover { color: #e6edf3; }
        .stat-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 20px; }
        .user-row { display: grid; grid-template-columns: 1fr 1fr 100px 120px; gap: 12px; align-items: center; padding: 14px 16px; border-bottom: 1px solid #21262d; transition: background 0.15s; }
        .user-row:hover { background: #161b2266; }
        .user-row:last-child { border-bottom: none; }
        .btn-sm { border: none; font-family: inherit; font-size: 11px; font-weight: 700; padding: 5px 12px; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
        .btn-sm:hover { opacity: 0.8; }
        .search-input { background: #161b22; border: 1px solid #21262d; border-radius: 8px; padding: 9px 14px 9px 36px; color: #e6edf3; font-family: inherit; font-size: 13px; outline: none; width: 100%; max-width: 280px; transition: border-color 0.2s; }
        .search-input:focus { border-color: #58a6ff; }
        .search-input::placeholder { color: #484f58; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
        .modal-bg { position: fixed; inset: 0; background: #000000bb; z-index: 999; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #161b22; border: 1px solid #30363d; border-radius: 14px; padding: 32px; max-width: 380px; width: 100%; text-align: center; }
        .toast { position: fixed; bottom: 24px; right: 24px; background: #238636; border: 1px solid #2ea043; color: white; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; z-index: 300; }
        @media (max-width: 768px) {
          .user-row { grid-template-columns: 1fr 100px !important; }
          .user-email { display: none !important; }
          .user-date { display: none !important; }
          .page-pad { padding: 20px 16px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .search-input { max-width: 100% !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 18 }}>⬡</span>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 15 }}>StackForge</span>
          <span style={{ color: "#30363d" }}>|</span>
          <span style={{ fontSize: 12, background: "#f0626222", color: "#f06262", border: "1px solid #f0626244", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>🔒 Admin Panel</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#8b949e" }}>{user?.email}</span>
          <button onClick={() => navigate("/dashboard")} style={{ background: "none", border: "1px solid #30363d", color: "#8b949e", fontFamily: "inherit", fontSize: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer" }}>← Dashboard</button>
        </div>
      </div>

      <div className="page-pad" style={{ padding: "28px 28px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#f06262", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>// admin.panel — restricted access</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 800 }}>Admin Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {STATS.map(s => (
            <div key={s.key} className="stat-card">
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>
                {loading ? "—" : statsData[s.key]}
              </div>
              <div style={{ fontSize: 12, color: "#8b949e" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pro vs Free bar */}
        {!loading && totalUsers > 0 && (
          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, padding: "16px 20px", marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "#8b949e" }}>Free vs Pro breakdown</span>
              <span style={{ color: "#f79d65", fontWeight: 700 }}>{proUsers} Pro · {freeUsers} Free</span>
            </div>
            <div style={{ height: 8, background: "#21262d", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: `${convRate}%`, height: "100%", background: "linear-gradient(90deg,#f79d65,#f06292)", borderRadius: 4, transition: "width 0.5s" }} />
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #21262d", marginBottom: 24, display: "flex", overflowX: "auto" }}>
          {["overview", "users", "revenue"].map(t => (
            <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
              {t === "overview" ? "📊 Overview" : t === "users" ? "👥 Users" : "💰 Revenue"}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Recent signups */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Recent Signups</h2>
              {loading ? <div style={{ color: "#484f58", fontSize: 13 }}>Loading...</div> :
                users.slice(-5).reverse().map(u => (
                  <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #21262d11" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      {(u.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name || "Unknown"}</div>
                      <div style={{ fontSize: 11, color: "#8b949e" }}>{u.email}</div>
                    </div>
                    <span className="badge" style={{ background: u.plan === "pro" ? "#f79d6522" : "#21262d", color: u.plan === "pro" ? "#f79d65" : "#8b949e" }}>
                      {u.plan === "pro" ? "✦ Pro" : "Free"}
                    </span>
                  </div>
                ))
              }
            </div>

            {/* Quick stats */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Quick Stats</h2>
              {[
                { label: "Total users", value: totalUsers, color: "#58a6ff" },
                { label: "Pro subscribers", value: proUsers, color: "#f79d65" },
                { label: "Free users", value: freeUsers, color: "#81C784" },
                { label: "Conversion rate", value: `${convRate}%`, color: "#CE93D8" },
                { label: "Est. monthly revenue", value: `$${proUsers * 7}`, color: "#3fb950" },
                { label: "Est. annual revenue", value: `$${proUsers * 84}`, color: "#3fb950" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #21262d22", fontSize: 13 }}>
                  <span style={{ color: "#8b949e" }}>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 700 }}>{loading ? "—" : s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <div>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 13, color: "#8b949e" }}>{filteredUsers.length} users found</div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#484f58", fontSize: 13 }}>🔍</span>
                <input className="search-input" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
              {/* Table header */}
              <div className="user-row" style={{ background: "#1c2128", borderBottom: "1px solid #21262d" }}>
                <div style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase" }}>User</div>
                <div className="user-email" style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase" }}>Email</div>
                <div style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase" }}>Plan</div>
                <div style={{ fontSize: 11, color: "#8b949e", textTransform: "uppercase" }}>Actions</div>
              </div>

              {loading ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#484f58", fontSize: 13 }}>Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", color: "#484f58", fontSize: 13 }}>No users found</div>
              ) : (
                filteredUsers.map(u => (
                  <div key={u.id} className="user-row">
                    {/* Name + avatar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                        {(u.name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name || "Unknown"}</div>
                        <div style={{ fontSize: 11, color: "#8b949e" }}>{u.goal || "—"}</div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="user-email" style={{ fontSize: 12, color: "#8b949e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>

                    {/* Plan badge */}
                    <div>
                      <span className="badge" style={{ background: u.plan === "pro" ? "#f79d6522" : "#21262d", color: u.plan === "pro" ? "#f79d65" : "#8b949e" }}>
                        {u.plan === "pro" ? "✦ Pro" : "Free"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {u.plan === "pro" ? (
                        <button className="btn-sm" style={{ background: "#21262d", color: "#8b949e" }} onClick={() => revokePro(u.id, u.name)}>
                          Revoke
                        </button>
                      ) : (
                        <button className="btn-sm" style={{ background: "#f79d6522", color: "#f79d65" }} onClick={() => grantPro(u.id, u.name)}>
                          ✦ Grant Pro
                        </button>
                      )}
                      <button className="btn-sm" style={{ background: "#f0626222", color: "#f06262" }} onClick={() => setConfirmModal(u)}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── REVENUE TAB ── */}
        {tab === "revenue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Revenue Estimates</h2>
              {[
                { label: "Pro subscribers", value: proUsers, color: "#f79d65" },
                { label: "Monthly revenue (@ $7/mo)", value: `$${proUsers * 7}`, color: "#3fb950" },
                { label: "Annual revenue (@ $84/yr)", value: `$${proUsers * 84}`, color: "#3fb950" },
                { label: "Potential (all users go Pro)", value: `$${totalUsers * 7}/mo`, color: "#58a6ff" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #21262d" }}>
                  <span style={{ fontSize: 13, color: "#8b949e" }}>{s.label}</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, color: s.color }}>{loading ? "—" : s.value}</span>
                </div>
              ))}
            </div>

            {/* Lemon Squeezy CTA */}
            <div style={{ background: "linear-gradient(135deg,#f9c23c22,#f9c23c11)", border: "1px solid #f9c23c44", borderRadius: 12, padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🍋</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Payments via Lemon Squeezy</h3>
              <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 16, lineHeight: 1.7 }}>
                Your checkout is powered by Lemon Squeezy. Manage subscriptions, refunds and invoices from your Lemon Squeezy dashboard.
              </p>
              <a href="https://app.lemonsqueezy.com" target="_blank" rel="noreferrer"
                style={{ display: "inline-block", background: "#f9c23c", border: "none", color: "#000", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px 28px", borderRadius: 8, cursor: "pointer", textDecoration: "none" }}>
                Open Lemon Squeezy →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {confirmModal && (
        <div className="modal-bg" onClick={() => setConfirmModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Delete User?</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 24, lineHeight: 1.7 }}>
              This will permanently delete <strong style={{ color: "#e6edf3" }}>{confirmModal.name}</strong>'s data from Firestore. Their Firebase Auth account will remain.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, background: "#21262d", border: "none", color: "#e6edf3", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => deleteUser(confirmModal.id, confirmModal.name)} style={{ flex: 1, background: "#f06262", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "11px", borderRadius: 8, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Action toast */}
      {actionMsg && <div className="toast">{actionMsg}</div>}
    </div>
  );
}