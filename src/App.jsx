import { useLayoutEffect, useState } from "react";
import LandingPage from "./Components/LandingPage";
import SignIn from "./Components/SignIn";
import EmployeeWorkspace from "./Components/EmployeeWorkspace";

const THEME_KEY = "tickflow-theme";
const SESSION_KEY = "tickflow-user";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // storage unavailable, fall through to the system preference
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

// Only the Employee workspace exists so far. Other roles land here for now.
function ComingSoon({ user, theme, onToggleTheme, onSignOut }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-page p-6 text-ink">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-line bg-surface p-8 shadow-[var(--shadow-card)]">
        <p className="eyebrow mb-2">{user.role}</p>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Signed in as {user.email}
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-muted">
          The {user.role} workspace (“{user.home}”) hasn’t been built yet. Sign
          in with employee@tickflow.demo to see the Employee views.
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={onSignOut} className="btn btn-primary">
            Sign out
          </button>
          <button type="button" onClick={onToggleTheme} className="btn btn-secondary">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(readSession);
  const [theme, setTheme] = useState(getInitialTheme);

  // Layout effect so the right theme is applied before the first paint.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const showScreen = (login) => {
    setShowLogin(login);
    window.scrollTo(0, 0);
  };

  const handleSuccessLogin = (account) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(account));
    } catch {
      // session just won't survive a refresh
    }
    setUser(account);
    window.scrollTo(0, 0);
  };

  const handleSignOut = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // nothing to clear
    }
    setUser(null);
    setShowLogin(false);
    window.scrollTo(0, 0);
  };

  if (user) {
    const Workspace = user.role === "Employee" ? EmployeeWorkspace : ComingSoon;
    return (
      <Workspace
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignOut={handleSignOut}
      />
    );
  }

  return showLogin ? (
    <SignIn
      theme={theme}
      onToggleTheme={toggleTheme}
      onBackToLanding={() => showScreen(false)}
      onSuccessLogin={handleSuccessLogin}
    />
  ) : (
    <LandingPage
      theme={theme}
      onToggleTheme={toggleTheme}
      onOpenLogin={() => showScreen(true)}
    />
  );
}

export default App;

