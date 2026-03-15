import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getLesson } from "../lessonData";

export default function LessonPlayer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const lesson = getLesson(id) || location.state?.lesson;

  const [tab, setTab] = useState("content");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);

  function handleQuizSubmit() {
    if (!lesson?.quiz) return;
    let score = 0;
    lesson.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  }

  function handleMarkDone() {
    setLessonDone(true);
  }

  if (!lesson) {
    return (
      <div style={{ fontFamily: "'JetBrains Mono',monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Lesson not found</div>
        <button onClick={() => navigate("/courses")} style={{ background: "#58a6ff", border: "none", color: "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}>
          ← Back to Courses
        </button>
      </div>
    );
  }

  const scorePercent = lesson.quiz ? Math.round((quizScore / lesson.quiz.length) * 100) : 0;

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
        .lesson-content h2 { font-family: 'Space Grotesk',sans-serif; font-size: 20px; font-weight: 800; color: #e6edf3; margin: 24px 0 12px; }
        .lesson-content h3 { font-size: 15px; font-weight: 700; color: #c9d1d9; margin: 20px 0 8px; }
        .lesson-content p { font-size: 14px; color: #8b949e; line-height: 1.8; margin-bottom: 12px; }
        .lesson-content ul, .lesson-content ol { padding-left: 20px; margin-bottom: 12px; }
        .lesson-content li { font-size: 14px; color: #8b949e; line-height: 1.8; }
        .lesson-content code { background: #21262d; color: #79c0ff; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
        .lesson-content strong { color: #e6edf3; font-weight: 600; }
        .lesson-content table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
        .lesson-content th { background: #1c2128; color: #8b949e; padding: 8px 12px; text-align: left; border: 1px solid #21262d; }
        .lesson-content td { padding: 8px 12px; border: 1px solid #21262d; color: #c9d1d9; }
        .code-block { background: #161b22; border: 1px solid #21262d; border-radius: 10px; overflow: hidden; margin: 16px 0; }
        .code-header { padding: 10px 16px; background: #1c2128; border-bottom: 1px solid #21262d; display: flex; align-items: center; justify-content: space-between; }
        .code-body { padding: 16px; overflow-x: auto; font-size: 13px; line-height: 1.7; color: #e6edf3; white-space: pre; }
        .hide-mobile { display: inline !important; }
        @media (max-width: 480px) {
          .hide-mobile { display: none !important; }
        }
        .quiz-option { width: 100%; background: #0d1117; border: 1px solid #21262d; border-radius: 8px; padding: 12px 16px; color: #c9d1d9; font-family: inherit; font-size: 13px; cursor: pointer; text-align: left; transition: all 0.2s; margin-bottom: 8px; }
        .quiz-option:hover { border-color: #58a6ff44; }
        .quiz-option.selected { border-color: #58a6ff; color: #58a6ff; background: #58a6ff11; }
        .quiz-option.correct { border-color: #3fb950; color: #3fb950; background: #3fb95011; }
        .quiz-option.wrong { border-color: #f06262; color: #f06262; background: #f0626211; }
        .exercise-item { background: #161b22; border: 1px solid #21262d; border-left: 3px solid #f79d65; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; font-size: 13px; color: #c9d1d9; line-height: 1.6; }
        @media (max-width: 768px) {
          .lesson-grid { grid-template-columns: 1fr !important; }
          .top-bar { padding: 0 16px !important; }
          .page-pad { padding: 16px !important; }
          .lesson-title-bar { flex-wrap: wrap !important; gap: 8px !important; }
          .tab-btn { padding: 8px 12px !important; font-size: 12px !important; }
          .lesson-content h2 { font-size: 18px !important; }
          .quiz-option { font-size: 12px !important; padding: 10px 12px !important; }
          .code-body { font-size: 11px !important; }
        }
        @media (max-width: 480px) {
          .tab-btn { padding: 8px 8px !important; font-size: 11px !important; }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar" style={{ background: "#161b22", borderBottom: "1px solid #21262d", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", position: "sticky", top: 0, zIndex: 100, gap: 8 }}>
        {/* Left — back + phase only, hide title on mobile */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden", flexShrink: 1 }}>
          <button onClick={() => navigate("/courses")} style={{ background: "none", border: "none", color: "#8b949e", fontFamily: "inherit", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>← Courses</button>
          <span style={{ color: "#30363d", flexShrink: 0 }}>|</span>
          <span style={{ fontSize: 11, color: lesson.phaseColor, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>Phase {lesson.phase}</span>
          <span style={{ color: "#30363d", flexShrink: 0 }} className="hide-mobile">›</span>
          <span style={{ fontSize: 12, color: "#e6edf3", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} className="hide-mobile">{lesson.title}</span>
        </div>
        {/* Right — duration + mark complete */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#8b949e", whiteSpace: "nowrap" }} className="hide-mobile">⏱ {lesson.duration}</span>
          {lessonDone
            ? <span style={{ fontSize: 11, background: "#3fb95022", color: "#3fb950", border: "1px solid #3fb95033", padding: "4px 10px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>✓ Done</span>
            : <button onClick={handleMarkDone} style={{ background: "linear-gradient(135deg,#58a6ff,#1f6feb)", border: "none", color: "white", fontFamily: "inherit", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap" }}>✓ Mark Done</button>
          }
        </div>
      </div>

      <div className="page-pad" style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="lesson-grid" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>

          {/* Left — Main content */}
          <div>
            {/* Video */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
              {lesson.videoId === "PLACEHOLDER" ? (
                <div style={{ aspectRatio: "16/9", background: "#0d1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ fontSize: 48 }}>🎬</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>Video Coming Soon</div>
                  <div style={{ fontSize: 13, color: "#8b949e", textAlign: "center", maxWidth: 300, lineHeight: 1.6 }}>
                    Upload your YouTube video and replace the PLACEHOLDER in lessonData.js with your video ID
                  </div>
                </div>
              ) : (
                <div style={{ aspectRatio: "16/9" }}>
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${lesson.videoId}`}
                    title={lesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "block" }}
                  />
                </div>
              )}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: "1px solid #21262d", marginBottom: 20, display: "flex", overflowX: "auto" }}>
              {["content", "code", "exercises", "quiz"].map(t => (
                <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                  {t === "content" ? "📖 Lesson" : t === "code" ? "💻 Code" : t === "exercises" ? "🏋️ Practice" : "📝 Quiz"}
                </button>
              ))}
            </div>

            {/* CONTENT TAB */}
            {tab === "content" && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{lesson.title}</h1>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, background: lesson.phaseColor + "22", color: lesson.phaseColor, padding: "3px 10px", borderRadius: 10, fontWeight: 700 }}>{lesson.phaseTitle}</span>
                    <span style={{ fontSize: 12, color: "#8b949e" }}>⏱ {lesson.duration}</span>
                  </div>
                </div>

                {/* Objectives */}
                <div style={{ background: "#161b22", border: "1px solid #21262d", borderLeft: `3px solid ${lesson.phaseColor}`, borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: lesson.phaseColor, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>What you'll learn</div>
                  {lesson.objectives.map((obj, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#c9d1d9" }}>
                      <span style={{ color: lesson.phaseColor, flexShrink: 0 }}>✓</span> {obj}
                    </div>
                  ))}
                </div>

                {/* Lesson content rendered as markdown-like */}
                <div className="lesson-content" dangerouslySetInnerHTML={{
                  __html: lesson.content
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/^- (.+)$/gm, '<li>$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(?!<[h|l])/gm, '')
                }} />
              </div>
            )}

            {/* CODE TAB */}
            {tab === "code" && (
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Code Examples</h2>
                {lesson.codeExamples?.map((ex, i) => (
                  <div key={i} className="code-block">
                    <div className="code-header">
                      <span style={{ fontSize: 13, color: "#e6edf3", fontWeight: 600 }}>{ex.title}</span>
                      <span style={{ fontSize: 11, background: "#21262d", color: "#8b949e", padding: "2px 8px", borderRadius: 4 }}>{ex.language}</span>
                    </div>
                    <div className="code-body">{ex.code}</div>
                  </div>
                ))}
              </div>
            )}

            {/* EXERCISES TAB */}
            {tab === "exercises" && (
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Practice Exercises</h2>
                <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 20, lineHeight: 1.7 }}>
                  Complete these exercises to reinforce what you learned. Try them yourself before checking solutions.
                </p>
                {lesson.exercises?.map((ex, i) => (
                  <div key={i} className="exercise-item">
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ color: "#f79d65", fontWeight: 700, flexShrink: 0 }}>#{i + 1}</span>
                      <span>{ex}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* QUIZ TAB */}
            {tab === "quiz" && (
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Knowledge Check</h2>
                <p style={{ fontSize: 13, color: "#8b949e", marginBottom: 24 }}>
                  {lesson.quiz?.length} questions · Test your understanding of {lesson.title}
                </p>

                {quizSubmitted ? (
                  <div style={{ textAlign: "center", padding: "32px 0" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>
                      {scorePercent >= 80 ? "🎉" : scorePercent >= 60 ? "👍" : "📚"}
                    </div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 800, color: scorePercent >= 80 ? "#3fb950" : scorePercent >= 60 ? "#f79d65" : "#f06262", marginBottom: 8 }}>
                      {quizScore}/{lesson.quiz.length}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                      {scorePercent >= 80 ? "Excellent work!" : scorePercent >= 60 ? "Good job!" : "Keep studying!"}
                    </div>
                    <div style={{ fontSize: 13, color: "#8b949e", marginBottom: 28 }}>{scorePercent}% correct</div>

                    {/* Show answers */}
                    <div style={{ textAlign: "left" }}>
                      {lesson.quiz.map((q, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#e6edf3" }}>{i + 1}. {q.question}</div>
                          {q.options.map((opt, j) => (
                            <div key={j} className={`quiz-option ${j === q.correct ? "correct" : quizAnswers[i] === j && j !== q.correct ? "wrong" : ""}`}
                              style={{ cursor: "default" }}>
                              {j === q.correct ? "✓ " : quizAnswers[i] === j ? "✗ " : ""}{opt}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setQuizScore(0); }}
                      style={{ background: "#21262d", border: "none", color: "#e6edf3", fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "10px 24px", borderRadius: 8, cursor: "pointer", marginTop: 16 }}>
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <div>
                    {lesson.quiz?.map((q, i) => (
                      <div key={i} style={{ marginBottom: 24 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#e6edf3" }}>{i + 1}. {q.question}</div>
                        {q.options.map((opt, j) => (
                          <button key={j} className={`quiz-option${quizAnswers[i] === j ? " selected" : ""}`}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [i]: j })}>
                            <span style={{ color: "#484f58", marginRight: 8 }}>{String.fromCharCode(65 + j)}.</span> {opt}
                          </button>
                        ))}
                      </div>
                    ))}
                    <button
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < (lesson.quiz?.length || 0)}
                      style={{ background: Object.keys(quizAnswers).length < (lesson.quiz?.length || 0) ? "#21262d" : "linear-gradient(135deg,#58a6ff,#1f6feb)", border: "none", color: Object.keys(quizAnswers).length < (lesson.quiz?.length || 0) ? "#484f58" : "white", fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px 32px", borderRadius: 8, cursor: Object.keys(quizAnswers).length < (lesson.quiz?.length || 0) ? "not-allowed" : "pointer" }}>
                      Submit Quiz →
                    </button>
                    <div style={{ fontSize: 12, color: "#484f58", marginTop: 8 }}>
                      {Object.keys(quizAnswers).length}/{lesson.quiz?.length} questions answered
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — Lesson info sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Progress */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Progress</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["content", "code", "exercises", "quiz"].map(t => (
                  <div key={t} style={{ flex: 1, minWidth: 60, background: tab === t ? lesson.phaseColor + "22" : "#21262d", border: `1px solid ${tab === t ? lesson.phaseColor + "44" : "#30363d"}`, borderRadius: 6, padding: "8px 4px", textAlign: "center", cursor: "pointer" }}
                    onClick={() => setTab(t)}>
                    <div style={{ fontSize: 16 }}>{t === "content" ? "📖" : t === "code" ? "💻" : t === "exercises" ? "🏋️" : "📝"}</div>
                    <div style={{ fontSize: 10, color: tab === t ? lesson.phaseColor : "#484f58", marginTop: 4 }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next lesson */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Up Next</div>
              <button onClick={() => navigate("/courses")}
                style={{ width: "100%", background: "linear-gradient(135deg,#58a6ff,#1f6feb)", border: "none", color: "white", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "11px", borderRadius: 8, cursor: "pointer" }}>
                Back to Course →
              </button>
            </div>

            {/* Phase info */}
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Phase Info</div>
              <div style={{ fontSize: 13, color: lesson.phaseColor, fontWeight: 700, marginBottom: 4 }}>Phase {lesson.phase}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>{lesson.phaseTitle}</div>
              <div style={{ fontSize: 12, color: "#8b949e" }}>Lesson {lesson.id.split("-")[1]} of phase</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}