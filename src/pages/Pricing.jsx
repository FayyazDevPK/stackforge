import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const LS_MONTHLY = "https://devfayyaz.lemonsqueezy.com/checkout/buy/a5ed4d38-c397-4fba-803d-972ab4cefc51";
const LS_ANNUAL = "https://devfayyaz.lemonsqueezy.com/checkout/buy/a910a2ef-4150-4f35-a4bc-2fcf6d803c70";

const FREE_FEATURES = [
  "Phase 1 & 2 access (Foundations + Frontend)",
  "3 free projects with guides",
  "Tools & resources directory",
  "Community forum access",
  "Weekly newsletter",
];

const PRO_FEATURES = [
  "All 6 phases (90+ lessons)",
  "30+ real-world projects",
  "AI & Automation curriculum",
  "Verified phase certificates",
  "Priority community support",
  "Starter code for every project",
  "Exclusive live Q&A sessions",
  "No ads — clean experience",
];

const COMPARE = [
  { feature: "Foundations & Frontend phases", free: true, pro: true },
  { feature: "Backend & Full Stack phases", free: false, pro: true },
  { feature: "Gen AI & Automation phases", free: false, pro: true },
  { feature: "Free projects (3)", free: true, pro: true },
  { feature: "All 30+ projects", free: false, pro: true },
  { feature: "Starter code & guides", free: false, pro: true },
  { feature: "Phase certificates", free: false, pro: true },
  { feature: "Community forum", free: true, pro: true },
  { feature: "Live Q&A sessions", free: false, pro: true },
  { feature: "Ad-free experience", false: false, pro: true },
  { feature: "Priority support", free: false, pro: true },
];

const FAQS = [
  { q: "Is the free plan really free forever?", a: "Yes! The free plan gives you access to Phase 1 and Phase 2 with no time limit and no credit card required." },
  { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. You can cancel anytime from your account settings. No cancellation fees. You keep Pro access until the end of your billing period." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe. PayPal is also supported." },
  { q: "Is there a student discount?", a: "Yes! Students with a valid .edu email get 50% off the annual Pro plan. Sign up and verify your student email to claim it." },
  { q: "Do certificates expire?", a: "No. Once you earn a phase certificate, it's yours forever. Download it as PDF and share on LinkedIn anytime." },
  { q: "What if I'm not satisfied?", a: "We offer a 7-day money-back guarantee. Email us in the first 7 days and we'll give you a full refund — no questions asked." },
];

const TESTIMONIALS = [
  { name: "Riya B.", role: "Got internship offer", avatar: "R", text: "The Pro curriculum paid for itself within a month. I built a RAG chatbot and it got me an internship." },
  { name: "Bilal K.", role: "Freelance Developer", avatar: "B", text: "The AI Automation modules alone are worth the price. My freelance rates doubled after adding these skills." },
  { name: "Sara M.", role: "Frontend Dev @ Startup", avatar: "S", text: "I went Free → Pro after finishing Phase 2 and never looked back. The projects are exactly what employers want." },
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user, upgradePro } = useAuth();
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  const monthlyPrice = annual ? 7 : 12;
  const annualTotal = monthlyPrice * 12;
  const isAlreadyPro = user?.plan === "pro";

  function handleUpgrade() {
    if (user) {
      setSuccessModal(true);
    } else {
      navigate("/signup");
    }
  }

  function handleFreeCTA() {
    navigate(user ? "/dashboard" : "/signup");
  }

  // This actually upgrades the user's plan in auth state + localStorage
  async function activatePro() {
    // Open Lemon Squeezy checkout in new tab
    const checkoutUrl = annual ? LS_ANNUAL : LS_MONTHLY;
    window.open(checkoutUrl, "_blank");
    setSuccessModal(false);
  }

  const s = {
    page: { fontFamily: "'JetBrains Mono', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", overflowX: "hidden" },
    topBar: { background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", position: "sticky", top: 0, zIndex: 100 },
    backBtn: { background: "none", border: "none", color: "#8b949e", fontFamily: "inherit", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: 0 },
    page_inner: { padding: "60px 28px", maxWidth: 1000, margin: "0 auto" },
    planCard: { background: "#161b22", border: "1px solid #21262d", borderRadius: 16, padding: 28, flex: 1, minWidth: 0 },
    planCardFeatured: { background: "linear-gradient(160deg,#161b22,#1a1f29)", border: "1px solid #f79d65", borderRadius: 16, padding: 28, flex: 1, minWidth: 0, position: "relative" },
    featureRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #21262d22", fontSize: 13, color: "#c9d1d9" },
    btnGhost: { background: "none", border: "1px solid #30363d", color: "#e6edf3", fontFamily: "inherit", fontSize: 15, fontWeight: 600, padding: 14, borderRadius: 10, cursor: "pointer", width: "100%", marginBottom: 24 },
    btnPro: { background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: 14, borderRadius: 10, cursor: "pointer", width: "100%", marginBottom: 8 },
    btnProSmall: { background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "7px 18px", borderRadius: 8, cursor: "pointer" },
    btnBlue: { background: "linear-gradient(135deg,#58a6ff,#1f6feb)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "7px 18px", borderRadius: 8, cursor: "pointer" },
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #21262d; border-radius: 3px; }
        .compare-row { display: grid; grid-template-columns: 1fr 100px 100px; padding: 12px 16px; border-bottom: 1px solid #21262d; align-items: center; }
        .compare-row:last-child { border-bottom: none; }
        .compare-row:hover { background: #161b2244; }
        .faq-item { background: #161b22; border: 1px solid #21262d; border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
        .faq-q { padding: 16px 20px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; color: #e6edf3; }
        .faq-a { padding: 0 20px 16px; font-size: 13px; color: #8b949e; line-height: 1.8; }
        .t-card { background: #161b22; border: 1px solid #21262d; border-radius: 12px; padding: 22px; }
        .modal-bg { position: fixed; inset: 0; background: #000000bb; z-index: 999; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal { background: #161b22; border: 1px solid #30363d; border-radius: 16px; padding: 36px 32px; max-width: 440px; width: 100%; text-align: center; position: relative; }
        @media (max-width: 768px) {
          .plans-row { flex-direction: column !important; }
          .topbar-inner { padding: 0 16px !important; }
          .page-inner { padding: 28px 16px !important; }
          .compare-row { grid-template-columns: 1fr 60px 60px !important; font-size: 12px; }
          .tgrid { grid-template-columns: 1fr !important; }
          .faq-q { font-size: 13px !important; }
        }
        @media (max-width: 480px) {
          .compare-row { grid-template-columns: 1fr 50px 50px !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div style={s.topBar} className="topbar-inner">
        <button style={s.backBtn} onClick={() => navigate(user ? "/dashboard" : "/")}>
          <span style={{ color: "#58a6ff", fontWeight: 700, fontSize: 16 }}>⬡</span> StackForge
        </button>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user
            ? <button style={{ ...s.backBtn, color: "#58a6ff" }} onClick={() => navigate("/dashboard")}>← Dashboard</button>
            : <>
                <button style={s.backBtn} onClick={() => navigate("/login")}>Log in</button>
                <button style={s.btnBlue} onClick={() => navigate("/signup")}>Get Started Free</button>
              </>
          }
        </div>
      </div>

      <div style={s.page_inner} className="page-inner">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: "#58a6ff", letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase" }}>// pricing.plans</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 800, marginBottom: 14 }}>Simple, honest pricing</h1>
          <p style={{ color: "#8b949e", fontSize: 15, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Start free and upgrade when you're ready. No hidden fees. Cancel anytime.
          </p>

          {/* Toggle — using inline styles only, no className conflict */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", background: "#161b22", border: "1px solid #21262d", borderRadius: 30, padding: 4 }}>
              <button
                onClick={() => setAnnual(false)}
                style={{ padding: "6px 18px", borderRadius: 24, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s",
                  background: !annual ? "#21262d" : "none",
                  color: !annual ? "#e6edf3" : "#8b949e" }}
              >Monthly</button>
              <button
                onClick={() => setAnnual(true)}
                style={{ padding: "6px 18px", borderRadius: 24, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s",
                  background: annual ? "#21262d" : "none",
                  color: annual ? "#e6edf3" : "#8b949e" }}
              >Annual</button>
            </div>
            {annual && (
              <span style={{ fontSize: 12, background: "#3fb95022", color: "#3fb950", border: "1px solid #3fb95044", padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>Save 42% 🎉</span>
            )}
          </div>
        </div>

        {/* Plan Cards */}
        <div className="plans-row" style={{ display: "flex", gap: 20, marginBottom: 64, alignItems: "flex-start" }}>

          {/* Free */}
          <div style={s.planCard}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Free</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 800, marginBottom: 4 }}>
                $0<span style={{ fontSize: 16, color: "#8b949e", fontWeight: 400 }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: "#8b949e" }}>No credit card needed</div>
            </div>
            <button style={s.btnGhost} onClick={handleFreeCTA}>
              {user ? "Go to Dashboard →" : "Start Free →"}
            </button>
            <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>What's included</div>
            {FREE_FEATURES.map(f => (
              <div key={f} style={{ ...s.featureRow }}>
                <span style={{ color: "#3fb950", flexShrink: 0 }}>✓</span> {f}
              </div>
            ))}
          </div>

          {/* Pro */}
          <div style={s.planCardFeatured}>
            <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#f79d65,#f06292)", borderRadius: 20, padding: "4px 16px", fontSize: 11, color: "white", fontWeight: 700, whiteSpace: "nowrap" }}>
              ✦ MOST POPULAR
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#f79d65", marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>Pro</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 4 }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 800 }}>
                  ${monthlyPrice}<span style={{ fontSize: 16, color: "#8b949e", fontWeight: 400 }}>/mo</span>
                </div>
                {annual && <div style={{ fontSize: 13, color: "#8b949e", paddingBottom: 6 }}>billed ${annualTotal}/yr</div>}
              </div>
              {annual
                ? <div style={{ fontSize: 13, color: "#3fb950" }}>You save $60/year vs monthly</div>
                : <div style={{ fontSize: 13, color: "#8b949e" }}>Switch to annual to save $60/yr</div>}
            </div>

            {isAlreadyPro ? (
              <div style={{ background: "#3fb95022", border: "1px solid #3fb95044", borderRadius: 10, padding: "14px", textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 14, color: "#3fb950", fontWeight: 700 }}>✓ You're on Pro!</div>
                <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>All features unlocked</div>
              </div>
            ) : (
              <>
                <button style={s.btnPro} onClick={handleUpgrade}>
                  {user ? "✦ Upgrade to Pro Now" : "Start 7-Day Free Trial ✦"}
                </button>
                <div style={{ textAlign: "center", fontSize: 11, color: "#484f58", marginBottom: 20 }}>
                  {user ? "Instant access · Cancel anytime" : "No charge for 7 days · Cancel anytime"}
                </div>
              </>
            )}

            <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Everything in Free, plus</div>
            {PRO_FEATURES.map(f => (
              <div key={f} style={{ ...s.featureRow }}>
                <span style={{ color: "#f79d65", flexShrink: 0 }}>✦</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 6 }}>Full comparison</h2>
          <p style={{ color: "#8b949e", fontSize: 13, textAlign: "center", marginBottom: 28 }}>See exactly what's included in each plan</p>
          <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", padding: "14px 16px", background: "#1c2128", borderBottom: "1px solid #21262d" }}>
              <div style={{ fontSize: 12, color: "#8b949e" }}>Feature</div>
              <div style={{ fontSize: 12, color: "#8b949e", textAlign: "center" }}>Free</div>
              <div style={{ fontSize: 12, color: "#f79d65", textAlign: "center", fontWeight: 700 }}>Pro ✦</div>
            </div>
            {COMPARE.map(row => (
              <div key={row.feature} className="compare-row">
                <div style={{ fontSize: 13, color: "#c9d1d9" }}>{row.feature}</div>
                <div style={{ textAlign: "center" }}>{row.free ? <span style={{ color: "#3fb950" }}>✓</span> : <span style={{ color: "#30363d" }}>—</span>}</div>
                <div style={{ textAlign: "center" }}>{row.pro ? <span style={{ color: "#3fb950" }}>✓</span> : <span style={{ color: "#30363d" }}>—</span>}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 28 }}>Learners love Pro</h2>
          <div className="tgrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="t-card">
                <div style={{ fontSize: 28, color: "#f79d65", marginBottom: 10 }}>"</div>
                <p style={{ fontSize: 13, color: "#c9d1d9", lineHeight: 1.8, marginBottom: 16 }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: `hsl(${t.name.charCodeAt(0) * 40 % 360},45%,28%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#3fb950" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: 28 }}>Frequently asked questions</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span style={{ color: "#8b949e", fontSize: 20, flexShrink: 0, transition: "transform 0.2s", display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </div>
              {openFaq === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", background: "linear-gradient(135deg,#1f6feb18,#f79d6511)", border: "1px solid #1f6feb33", borderRadius: 20, padding: "52px 32px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
            {isAlreadyPro ? "You're already Pro! 🎉" : user ? "Ready to go Pro?" : "Start your journey today"}
          </h2>
          <p style={{ color: "#8b949e", fontSize: 14, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {isAlreadyPro ? "All 6 phases and 30+ projects are unlocked. Keep learning!" : user ? "Unlock all 6 phases, 30+ projects and AI curriculum." : "Free forever. Upgrade when you're ready."}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            {isAlreadyPro ? (
              <button style={{ ...s.btnPro, width: "auto", padding: "13px 32px", fontSize: 14 }} onClick={() => navigate("/courses")}>Continue Learning →</button>
            ) : (
              <>
                {!user && (
                  <button style={{ background: "none", border: "1px solid #30363d", color: "#e6edf3", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "13px 28px", borderRadius: 10, cursor: "pointer" }} onClick={() => navigate("/signup")}>
                    Start Free →
                  </button>
                )}
                <button style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "13px 28px", borderRadius: 10, cursor: "pointer" }} onClick={handleUpgrade}>
                  {user ? "✦ Upgrade to Pro Now" : "Start Pro Trial ✦"}
                </button>
              </>
            )}
          </div>
          <p style={{ fontSize: 12, color: "#484f58", marginTop: 16 }}>7-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #21262d", padding: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#58a6ff", fontWeight: 700 }}>⬡ StackForge</span>
          <span style={{ color: "#30363d" }}>·</span>
          <span style={{ fontSize: 12, color: "#8b949e" }}>© 2025 All rights reserved</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Contact", "Blog"].map(l => <span key={l} style={{ fontSize: 12, color: "#8b949e", cursor: "pointer" }}>{l}</span>)}
        </div>
      </div>

      {/* Upgrade Modal */}
      {successModal && (
        <div className="modal-bg" onClick={() => setSuccessModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSuccessModal(false)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: "#8b949e", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You're going Pro!</h2>
            <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 24, lineHeight: 1.7 }}>
              You will be redirected to our secure checkout powered by Lemon Squeezy. After payment your Pro plan activates instantly.
            </p>
            <div style={{ background: "#0d1117", borderRadius: 10, padding: 16, marginBottom: 24, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 8 }}>Order summary</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#e6edf3" }}>
                <span>StackForge Pro ({annual ? "Annual" : "Monthly"})</span>
                <span style={{ color: "#f79d65", fontWeight: 700 }}>${annual ? "84/yr" : "12/mo"}</span>
              </div>
            </div>
            {/* This button calls activatePro() which updates user.plan = "pro" in AuthContext + localStorage */}
            <button
              style={{ background: "linear-gradient(135deg,#f79d65,#f06292)", border: "none", color: "white", fontFamily: "inherit", fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, cursor: "pointer", width: "100%" }}
              onClick={activatePro}
            >
              ✦ Proceed to Checkout →
            </button>
            <p style={{ fontSize: 11, color: "#484f58", marginTop: 12 }}>Connect Stripe to accept real payments</p>
          </div>
        </div>
      )}
    </div>
  );
}
