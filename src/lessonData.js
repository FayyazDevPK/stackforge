// ─────────────────────────────────────────────
// LESSON DATA — Phase 1 & 2
// Replace VIDEO_ID with your YouTube video IDs
// when you upload your videos.
// Format: https://youtube.com/watch?v=VIDEO_ID
// ─────────────────────────────────────────────

export const LESSON_DATA = {

  // ── PHASE 1: FOUNDATIONS ──────────────────
  "1-1": {
    id: "1-1",
    phase: 1,
    phaseTitle: "Foundations",
    phaseColor: "#4FC3F7",
    title: "How the Web Works",
    duration: "18 min",
    videoId: "PLACEHOLDER", // Replace with your YouTube video ID
    objectives: [
      "Understand what happens when you type a URL",
      "Learn what DNS, HTTP and browsers do",
      "Understand client vs server",
      "Know what HTML, CSS and JavaScript each do",
    ],
    content: `
## How the Web Works

Every time you visit a website, a lot happens behind the scenes in milliseconds. Let's break it down.

### The URL
When you type \`https://google.com\` in your browser:
1. Your browser asks a **DNS server** to find Google's IP address
2. DNS returns something like \`142.250.80.46\`
3. Your browser connects to that IP address

### DNS (Domain Name System)
DNS is like the phone book of the internet. It converts human-readable domain names like \`google.com\` into IP addresses that computers use to find each other.

### HTTP & HTTPS
HTTP (HyperText Transfer Protocol) is the language browsers and servers use to communicate.
- **HTTP** — unsecured connection
- **HTTPS** — encrypted, secure connection (the 'S' stands for Secure)

### Client vs Server
- **Client** — your browser (Chrome, Firefox, Safari)
- **Server** — a computer somewhere in the world that stores and serves the website files

### The Request-Response Cycle
1. Browser sends a **request** to the server
2. Server receives request
3. Server sends back a **response** (HTML, CSS, JS files)
4. Browser reads the files and displays the page

### HTML, CSS and JavaScript
- **HTML** — structure (the skeleton)
- **CSS** — styling (the appearance)
- **JavaScript** — behaviour (the interaction)
    `,
    codeExamples: [
      {
        title: "A basic HTTP request",
        language: "http",
        code: `GET / HTTP/1.1
Host: google.com
User-Agent: Mozilla/5.0
Accept: text/html`,
      },
      {
        title: "A basic HTTP response",
        language: "http",
        code: `HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head><title>Google</title></head>
  <body>...</body>
</html>`,
      },
    ],
    exercises: [
      "Open your browser DevTools (F12) → Network tab → visit any website and watch the requests load",
      "Type your favourite website URL and write down what you think happens step by step",
      "Find the IP address of google.com by opening terminal and typing: ping google.com",
    ],
    quiz: [
      {
        question: "What does DNS stand for?",
        options: ["Domain Name System", "Direct Network Service", "Dynamic Name Server", "Data Network System"],
        correct: 0,
      },
      {
        question: "What is the difference between HTTP and HTTPS?",
        options: ["HTTPS is faster", "HTTPS is encrypted and secure", "HTTP is newer", "There is no difference"],
        correct: 1,
      },
      {
        question: "Which language controls the visual appearance of a webpage?",
        options: ["HTML", "JavaScript", "CSS", "PHP"],
        correct: 2,
      },
      {
        question: "What is a 'client' in web development?",
        options: ["A paying customer", "The browser that requests data", "The database", "The server"],
        correct: 1,
      },
    ],
  },

  "1-2": {
    id: "1-2",
    phase: 1,
    phaseTitle: "Foundations",
    phaseColor: "#4FC3F7",
    title: "HTML5 Structure & Semantics",
    duration: "24 min",
    videoId: "PLACEHOLDER",
    objectives: [
      "Write valid HTML5 documents",
      "Use semantic HTML elements correctly",
      "Understand the DOM structure",
      "Build accessible web pages",
    ],
    content: `
## HTML5 Structure & Semantics

HTML is the backbone of every webpage. Let's learn how to write it properly.

### Basic HTML Document Structure
Every HTML file starts with the same basic structure:

### Semantic HTML
Semantic elements clearly describe their meaning to the browser and developer.

**Non-semantic (avoid):**
\`<div>\`, \`<span>\` — tells us nothing about the content

**Semantic (use these):**
- \`<header>\` — top section of page
- \`<nav>\` — navigation links
- \`<main>\` — main content area
- \`<section>\` — a section of content
- \`<article>\` — independent content
- \`<aside>\` — sidebar content
- \`<footer>\` — bottom of page

### Why Semantics Matter
1. **SEO** — search engines understand your content better
2. **Accessibility** — screen readers for blind users work better
3. **Maintainability** — code is easier to read and understand
    `,
    codeExamples: [
      {
        title: "Basic HTML5 document",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my first webpage.</p>
  </body>
</html>`,
      },
      {
        title: "Semantic HTML layout",
        language: "html",
        code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>StackForge</title>
  </head>
  <body>
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
      </nav>
    </header>

    <main>
      <section>
        <h1>Learn Full Stack Development</h1>
        <p>Start your journey today.</p>
      </section>

      <article>
        <h2>Latest Lesson</h2>
        <p>How the Web Works</p>
      </article>
    </main>

    <aside>
      <h3>Quick Links</h3>
    </aside>

    <footer>
      <p>© 2025 StackForge</p>
    </footer>
  </body>
</html>`,
      },
    ],
    exercises: [
      "Create an HTML file and build a personal profile page with your name, bio and a list of your hobbies",
      "Take a screenshot of any website and identify which semantic elements you would use for each section",
      "Build a simple blog post page using article, header, main and footer elements",
    ],
    quiz: [
      {
        question: "What does <!DOCTYPE html> do?",
        options: ["Creates a new HTML file", "Tells the browser this is HTML5", "Adds a title to the page", "Links a CSS file"],
        correct: 1,
      },
      {
        question: "Which element should wrap your main navigation links?",
        options: ["<div>", "<section>", "<nav>", "<header>"],
        correct: 2,
      },
      {
        question: "What is the main benefit of semantic HTML?",
        options: ["It makes pages load faster", "It improves SEO and accessibility", "It adds styling automatically", "It runs JavaScript"],
        correct: 1,
      },
    ],
  },

  "1-3": {
    id: "1-3",
    phase: 1,
    phaseTitle: "Foundations",
    phaseColor: "#4FC3F7",
    title: "CSS3 — Selectors & Box Model",
    duration: "30 min",
    videoId: "PLACEHOLDER",
    objectives: [
      "Use CSS selectors to target elements",
      "Understand the CSS box model",
      "Apply margins, padding and borders",
      "Override styles with specificity",
    ],
    content: `
## CSS3 — Selectors & Box Model

CSS controls how your HTML looks. Let's master the fundamentals.

### CSS Selectors
Selectors tell CSS which elements to style.

**Basic Selectors:**
- \`p\` — targets all \`<p>\` elements (element selector)
- \`.card\` — targets elements with class="card" (class selector)
- \`#hero\` — targets element with id="hero" (ID selector)
- \`*\` — targets everything (universal selector)

**Combinators:**
- \`div p\` — all \`<p>\` inside a \`<div>\`
- \`div > p\` — direct \`<p>\` children of \`<div>\`
- \`h1 + p\` — \`<p>\` immediately after \`<h1>\`

### The Box Model
Every HTML element is a rectangular box with:
- **Content** — the actual text/image
- **Padding** — space inside the border
- **Border** — the line around the element
- **Margin** — space outside the border

### CSS Specificity
When multiple rules target the same element, specificity decides which wins:
1. Inline styles (highest)
2. ID selectors
3. Class selectors
4. Element selectors (lowest)
    `,
    codeExamples: [
      {
        title: "CSS Selectors",
        language: "css",
        code: `/* Element selector */
p {
  color: #333;
  font-size: 16px;
}

/* Class selector */
.card {
  background: white;
  border-radius: 8px;
}

/* ID selector */
#hero {
  background: #0d1117;
  color: white;
}

/* Pseudo-class */
button:hover {
  background: #58a6ff;
  cursor: pointer;
}`,
      },
      {
        title: "The Box Model",
        language: "css",
        code: `/* Box model example */
.box {
  /* Content size */
  width: 300px;
  height: 200px;

  /* Space inside border */
  padding: 20px;
  padding-top: 10px;    /* individual sides */
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;

  /* Border */
  border: 2px solid #58a6ff;
  border-radius: 8px;   /* rounded corners */

  /* Space outside border */
  margin: 16px;
  margin: 16px 24px;    /* vertical horizontal */
}

/* box-sizing: border-box makes sizing intuitive */
* {
  box-sizing: border-box;
}`,
      },
    ],
    exercises: [
      "Create a CSS card component with padding, border, border-radius and box-shadow",
      "Use browser DevTools to inspect any element and see its box model visually",
      "Build a simple navigation bar with horizontal links using CSS",
    ],
    quiz: [
      {
        question: "Which CSS selector has the highest specificity?",
        options: ["Element selector (p)", "Class selector (.card)", "ID selector (#hero)", "Universal selector (*)"],
        correct: 2,
      },
      {
        question: "What does padding do in the CSS box model?",
        options: ["Adds space outside the border", "Adds space inside the border", "Sets the border width", "Controls the margin"],
        correct: 1,
      },
      {
        question: "What property makes element sizing more intuitive by including padding in the width?",
        options: ["box-model: include", "sizing: border", "box-sizing: border-box", "width: include-padding"],
        correct: 2,
      },
    ],
  },

  "2-1": {
    id: "2-1",
    phase: 2,
    phaseTitle: "Frontend Development",
    phaseColor: "#81C784",
    title: "React 18 — Components & JSX",
    duration: "35 min",
    videoId: "PLACEHOLDER",
    objectives: [
      "Understand what React is and why we use it",
      "Create functional components",
      "Write JSX correctly",
      "Pass and use props",
    ],
    content: `
## React 18 — Components & JSX

React is a JavaScript library for building user interfaces. It breaks your UI into reusable pieces called **components**.

### What is React?
React was created by Facebook in 2013. It solves the problem of building complex, interactive UIs by:
- Breaking UI into small reusable **components**
- Automatically updating the DOM when data changes
- Making code easier to maintain and test

### Components
A component is just a JavaScript function that returns JSX.

**Rules:**
1. Component names must start with a capital letter
2. Must return a single root element
3. Can be reused anywhere in your app

### JSX
JSX looks like HTML but it's actually JavaScript. It gets compiled to \`React.createElement()\` calls.

**JSX Rules:**
- Use \`className\` instead of \`class\`
- All tags must be closed (\`<img />\` not \`<img>\`)
- JavaScript expressions go inside \`{}\`
- Return one root element (or use \`<></>\` Fragment)

### Props
Props are how you pass data from parent to child components. They are read-only.
    `,
    codeExamples: [
      {
        title: "Your first React component",
        language: "jsx",
        code: `// A simple functional component
function Greeting() {
  return (
    <div className="greeting">
      <h1>Hello, World!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

export default Greeting;`,
      },
      {
        title: "Components with Props",
        language: "jsx",
        code: `// Component that accepts props
function CourseCard({ title, duration, level, color }) {
  return (
    <div style={{ borderLeft: \`3px solid \${color}\` }}
      className="course-card">
      <h3>{title}</h3>
      <p>{duration} · {level}</p>
    </div>
  );
}

// Using the component with props
function App() {
  return (
    <div>
      <CourseCard
        title="HTML Foundations"
        duration="18 min"
        level="Beginner"
        color="#4FC3F7"
      />
      <CourseCard
        title="React Basics"
        duration="35 min"
        level="Intermediate"
        color="#81C784"
      />
    </div>
  );
}`,
      },
    ],
    exercises: [
      "Create a UserCard component that accepts name, role and avatar props and displays them",
      "Build a ProductList component that renders 3 ProductCard components with different props",
      "Create a Button component that accepts label, color and onClick as props",
    ],
    quiz: [
      {
        question: "What is JSX?",
        options: ["A new programming language", "JavaScript XML — HTML-like syntax in JavaScript", "A CSS framework", "A database query language"],
        correct: 1,
      },
      {
        question: "Why do we use className instead of class in JSX?",
        options: ["It's faster", "class is a reserved word in JavaScript", "className is more specific", "HTML requires it"],
        correct: 1,
      },
      {
        question: "Can a child component modify the props passed to it?",
        options: ["Yes, always", "Yes, but only numbers", "No, props are read-only", "Only with useState"],
        correct: 2,
      },
      {
        question: "What must all React component names start with?",
        options: ["A lowercase letter", "An uppercase letter", "react_", "component_"],
        correct: 1,
      },
    ],
  },

  "2-2": {
    id: "2-2",
    phase: 2,
    phaseTitle: "Frontend Development",
    phaseColor: "#81C784",
    title: "Props, State & Re-rendering",
    duration: "28 min",
    videoId: "PLACEHOLDER",
    objectives: [
      "Understand the difference between props and state",
      "Use useState hook to manage state",
      "Trigger re-renders correctly",
      "Build interactive components",
    ],
    content: `
## Props, State & Re-rendering

Understanding the difference between props and state is fundamental to React.

### Props vs State

| | Props | State |
|---|---|---|
| Who controls it? | Parent component | The component itself |
| Can it change? | No (read-only) | Yes |
| What is it for? | Passing data down | Managing local data |

### useState Hook
useState is React's way of adding state to functional components.

\`\`\`
const [value, setValue] = useState(initialValue);
\`\`\`

- \`value\` — the current state value
- \`setValue\` — function to update state
- \`initialValue\` — the starting value

### Re-rendering
When state changes, React automatically re-renders the component. This is what makes React UIs reactive.

**Important:** Never modify state directly — always use the setter function:
- ❌ \`count = count + 1\` — wrong
- ✅ \`setCount(count + 1)\` — correct

### State with Objects and Arrays
When state is an object or array, always create a new copy:
    `,
    codeExamples: [
      {
        title: "useState — Counter example",
        language: "jsx",
        code: `import { useState } from "react";

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        + Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        - Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
      },
      {
        title: "State with objects",
        language: "jsx",
        code: `import { useState } from "react";

function ProfileForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "student",
  });

  function handleChange(e) {
    // Always spread existing state when updating objects
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Your email"
      />
      <p>Hello, {user.name}!</p>
    </form>
  );
}`,
      },
    ],
    exercises: [
      "Build a like button that shows a count and increments when clicked",
      "Create a toggle component that switches between dark and light mode",
      "Build a simple shopping cart that lets you add/remove items and shows total count",
    ],
    quiz: [
      {
        question: "What hook do you use to add state to a functional component?",
        options: ["useEffect", "useContext", "useState", "useRef"],
        correct: 2,
      },
      {
        question: "What is the correct way to update state?",
        options: ["state = newValue", "state.update(newValue)", "setState(newValue)", "Using the setter function from useState"],
        correct: 3,
      },
      {
        question: "When does React re-render a component?",
        options: ["Every second automatically", "When state or props change", "Only when you call render()", "When the page refreshes"],
        correct: 1,
      },
    ],
  },
};

// Helper — get all lessons for a phase
export function getLessonsByPhase(phaseId) {
  return Object.values(LESSON_DATA).filter(l => l.phase === phaseId);
}

// Helper — get a single lesson
export function getLesson(lessonId) {
  return LESSON_DATA[lessonId] || null;
}