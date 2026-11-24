import { useState } from "react";

const DEMO_ACCOUNTS = {
  "employee@tickflow.demo": { role: "Employee", home: "My Requests" },
  "support@tickflow.demo": { role: "TechSupport", home: "My Workspace" },
  "manager@tickflow.demo": { role: "Manager", home: "Overview" },
  "admin@tickflow.demo": { role: "SysAdmin", home: "Users" },
};

export default function SignIn({
  theme = "light",
  onToggleTheme,
  onBackToLanding,
  onSuccessLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfoMsg("");

    const trimmedEmail = email.trim().toLowerCase();
    const account = DEMO_ACCOUNTS[trimmedEmail];

    if (!account) {
      setErrorMsg("Account not found. Check the email address and try again.");
      return;
    }

    if (!password.trim()) {
      setErrorMsg("Enter your password.");
      return;
    }

    if (password !== "TickFlow@2026" && password !== "123456") {
      setErrorMsg("Incorrect password for this demo account.");
      return;
    }

    setErrorMsg("");
    if (typeof onSuccessLogin === "function") {
      onSuccessLogin({ email: trimmedEmail, ...account });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("Please contact your system administrator to reset your password.");
  };

  return (
    <section
      id="loginScreen"
      className={`grid min-h-screen grid-cols-1 md:grid-cols-[1.05fr_0.95fr] ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* Left Brand Panel */}
      <div
        className="relative flex min-h-[260px] flex-col justify-between overflow-hidden p-8 text-white md:min-h-screen md:p-16"
        style={{
          background: "linear-gradient(155deg, #0B1933 0%, #0F2142 100%)",
        }}
      >
        <div className="relative z-10 flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[11px] border border-white/15 text-sm font-extrabold text-white"
            style={{ backgroundColor: "#1D4ED8" }}
          >
            T
          </span>
          <span>TickFlow</span>
        </div>

        <div className="relative z-10 my-8 max-w-[520px] md:my-0">
          <h1 className="mb-4 text-3xl leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl">
            Support, organized.
            <br />
            Work, uninterrupted.
          </h1>
          <p className="max-w-[460px] text-sm leading-relaxed text-[#94A3B8] sm:text-base">
            A single place to submit requests, manage support tickets,
            collaborate with your team and keep service performance on track.
          </p>
        </div>

        <div className="relative z-10 hidden text-xs text-[#64748B] md:block">
          © 2026 TickFlow. All rights reserved.
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        className={`relative flex flex-col justify-center px-6 py-10 sm:px-10 ${
          isDark ? "bg-[#182235]" : "bg-white"
        }`}
      >
        {/* Top-right Theme Toggle */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          {typeof onToggleTheme === "function" && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Switch color theme"
              className={`cursor-pointer rounded-[9px] border px-3 py-2 text-xs font-semibold transition ${
                isDark
                  ? "border-slate-600 bg-slate-800 text-slate-100 hover:border-blue-400"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700"
              }`}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          )}
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <button
            type="button"
            onClick={onBackToLanding}
            className={`mb-6 inline-block cursor-pointer text-xs font-bold hover:underline ${
              isDark ? "text-blue-400" : "text-blue-700"
            }`}
          >
            ← Back to TickFlow
          </button>

          <div
            className={`mb-2 text-[11px] font-bold tracking-wider uppercase ${
              isDark ? "text-blue-400" : "text-blue-700"
            }`}
          >
            WELCOME TO TICKFLOW
          </div>

          <h2 className="mb-1 text-2xl font-bold tracking-tight sm:text-[27px]">
            Sign in to your account
          </h2>
          <p
            className={`mb-7 text-sm ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Enter your work email and password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="loginEmail"
                className={`mb-1.5 block text-xs font-bold ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Work email
              </label>
              <input
                id="loginEmail"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={`h-[46px] w-full rounded-[8px] border px-3.5 text-sm outline-none transition ${
                  isDark
                    ? "border-slate-600 bg-[#202c40] text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className={`mb-1.5 block text-xs font-bold ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <input
                id="loginPassword"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`h-[46px] w-full rounded-[8px] border px-3.5 text-sm outline-none transition ${
                  isDark
                    ? "border-slate-600 bg-[#202c40] text-slate-100 placeholder:text-slate-400 focus:border-blue-400"
                    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600"
                }`}
              />
            </div>

            <div className="text-right">
              <a
                href="#forgot-password"
                onClick={handleForgotPassword}
                className={`text-xs font-semibold hover:underline ${
                  isDark ? "text-blue-400" : "text-blue-700"
                }`}
              >
                Forgot password?
              </a>
            </div>

            {errorMsg && (
              <p role="alert" className="text-xs font-semibold text-rose-500">
                {errorMsg}
              </p>
            )}

            {infoMsg && (
              <p
                className={`text-xs font-semibold ${
                  isDark ? "text-blue-300" : "text-blue-700"
                }`}
              >
                {infoMsg}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 h-[46px] w-full cursor-pointer rounded-[8px] bg-blue-600 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>
        </div>

        <div
          className={`mt-8 text-center text-xs md:hidden ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          © 2026 TickFlow. All rights reserved.
        </div>
      </div>
    </section>
  );
}


