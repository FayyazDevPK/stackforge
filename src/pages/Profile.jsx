import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isPro = user?.plan === "pro";

  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    goal: "Get a dev job",
    level: "Beginner",
  });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    newReplies: true, announcements: true, weeklyDigest: true, promos: false,
  });

  // Load real user data from Firestore on mount
  useEffect(() => {
    if (!user) return;
    async function loadProfile() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          name: data.name || user.name || "",
          email: data.email || user.email || "",
          username: data.username || "",
          bio: data.bio || "",
          location: data.location || "",
          website: data.website || "",
          goal: data.goal || "Get a dev job",
          level: data.level || "Beginner",
        });
        if (data.notifications) setNotifications(data.notifications);
      } else {
        // First time — pre-fill from auth
        setForm(f => ({
          ...f,
          name: user.name || "",
          email: user.email || "",
        }));
      }
    }
    loadProfile();
  }, [user]);

  // Save profile to Firestore
  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        username: form.username,
        bio: form.bio,
        location: form.location,
        website: form.website,
        goal: form.goal,
        level: form.level,
      }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  // Save notifications to Firestore
  async function handleSaveNotifications() {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), { notifications }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    if (!auth.currentUser) return;
    setDeleteLoading(true);
    setDeleteError("");
    try {
      // Re-authenticate first (Firebase requires this for delete)
      const credential = EmailAuthProvider.credential(auth.currentUser.email, deletePassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      // Delete Firestore user doc
      await deleteDoc(doc(db, "users", auth.currentUser.uid));
      // Delete Firebase Auth account
      await deleteUser(auth.currentUser);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setDeleteError("Incorrect password. Please try again.");
      } else {
        setDeleteError("Something went wrong. Please try again.");
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  const displayName = form.name || user?.name || "User";

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
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-pro { background: linear-gradient(135deg, #f79d65, #f06292); border: none; color: white; font-family: inherit; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 8px; cursor: pointer; }
        .btn-danger { background: none; border: 1px solid #f0626244; color: #f06262; font-family: inherit; font-size: 13px; padding: 10px 24px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-danger:hover { background: #f0626211; }
        .toggle-wrap { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #21262d; }
        .toggle-wrap:last-child { border-bottom: none; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
          .top-bar-pad { padding: 0 16px !important; }
          .page-pad { padding: 20px 16px !important; }
          .tab-scroll { overflow-x: auto; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 14px; height: 14px; border: 2px solid #ffffff44; border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
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
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{displayName}</h1>
            <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>
              {form.username ? `@${form.username}` : user?.email} {form.location ? `· ${form.location}` : ""}
            </div>
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

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="form-row">
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Full Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Username</label>
                <input className="input-field" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="your_username" />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Email Address</label>
              <input className="input-field" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
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
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? <span className="spinner" /> : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* PASSWORD TAB */}
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
            <button className="btn-primary" style={{ marginTop: 6 }}>Update Password</button>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
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
                  style={{ width: 40, height: 22, borderRadius: 11, position: "relative", cursor: "pointer", transition: "background 0.2s", border: "none", flexShrink: 0, background: notifications[item.key] ? "#238636" : "#21262d" }}
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                >
                  <div style={{ position: "absolute", width: 16, height: 16, borderRadius: "50%", background: "white", top: 3, transition: "left 0.2s", left: notifications[item.key] ? "21px" : "3px" }} />
                </button>
              </div>
            ))}
            <div style={{ paddingTop: 16, paddingBottom: 8 }}>
              <button className="btn-primary" onClick={handleSaveNotifications} disabled={saving}>
                {saving ? <span className="spinner" /> : "Save Preferences"}
              </button>
            </div>
          </div>
        )}

        {/* DANGER ZONE TAB */}
        {tab === "danger" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "20px" }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Log out of all devices</h3>
              <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 14, lineHeight: 1.6 }}>This will end all active sessions on other devices.</p>
              <button className="btn-danger" onClick={() => { logout(); navigate("/"); }}>Log Out</button>
            </div>
            <div style={{ background: "#161b22", border: "1px solid #f0626233", borderRadius: 12, padding: "20px" }}>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 6, color: "#f06262" }}>Delete Account</h3>
              <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 14, lineHeight: 1.6 }}>Permanently delete your account and all progress. Cannot be undone.</p>
              <button className="btn-danger" style={{ borderColor: "#f0626266" }} onClick={() => setDeleteModal(true)}>Delete My Account</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account Modal */}
      {deleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "#000000bb", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#161b22", border: "1px solid #f0626244", borderRadius: 14, padding: "32px 28px", maxWidth: 420, width: "100%", position: "relative" }}>
            <button onClick={() => { setDeleteModal(false); setDeletePassword(""); setDeleteError(""); }} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 22, cursor: "pointer" }}>×</button>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: "center" }}>⚠️</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#f06262", textAlign: "center" }}>Delete Account</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 20, lineHeight: 1.7, textAlign: "center" }}>
              This will permanently delete your account and all your data. This cannot be undone.
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#8b949e", display: "block", marginBottom: 6 }}>Enter your password to confirm</label>
              <input
                style={{ width: "100%", background: "#0d1117", border: "1px solid #f0626244", borderRadius: 8, padding: "11px 14px", color: "#e6edf3", fontFamily: "inherit", fontSize: 13, outline: "none" }}
                type="password" placeholder="••••••••"
                value={deletePassword}
                onChange={e => { setDeletePassword(e.target.value); setDeleteError(""); }}
              />
            </div>
            {deleteError && (
              <div style={{ background: "#f0626222", border: "1px solid #f0626244", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#f06262" }}>⚠ {deleteError}</div>
            )}
            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading || !deletePassword}
              style={{ width: "100%", background: "#f06262", border: "none", color: "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px", borderRadius: 8, cursor: deleteLoading || !deletePassword ? "not-allowed" : "pointer", opacity: deleteLoading || !deletePassword ? 0.5 : 1 }}
            >
              {deleteLoading ? "Deleting..." : "Yes, Delete My Account"}
            </button>
          </div>
        </div>
      )}

      {/* Save toast */}
      {saved && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#238636", border: "1px solid #2ea043", color: "white", padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, zIndex: 300, fontFamily: "inherit" }}>
          ✓ Changes saved!
        </div>
      )}
    </div>
  );
}