const HERO_TICKETS = [
  { id: "#125", title: "Email access issue", status: "In progress", priority: "High" },
  { id: "#124", title: "New monitor request", status: "Open", priority: "Normal" },
  { id: "#121", title: "VPN connection issue", status: "Resolved", priority: "High" },
  { id: "#118", title: "Printer not responding", status: "New", priority: "—" },
];

const FEATURE_CARDS = [
  {
    id: "ticket-mgmt",
    title: "Ticket Management",
    desc: "Create, track and manage incidents and service requests through a clear, consistent lifecycle.",
    cta: "Explore workflow →",
    href: "#workflow",
  },
  {
    id: "team-assign",
    title: "Team Assignment",
    desc: "Route new unassigned tickets using category-to-team rules and keep the unassigned pool visible.",
    cta: "Explore team workflow →",
    href: "#teams",
  },
  {
    id: "sla-track",
    title: "SLA Tracking",
    desc: "Track first-response and resolution targets after ticket triage, with clear deadline monitoring.",
    cta: "Explore service tracking →",
    href: "#workflow",
  },
  {
    id: "change-approvals",
    title: "Change Approvals",
    desc: "Let technicians request post-triage changes and give managers a dedicated approval process.",
    cta: "Explore approvals →",
    href: "#teams",
  },
  {
    id: "team-collab",
    title: "Team Collaboration",
    desc: "Keep public conversations with requesters separate from internal support notes.",
    cta: "Explore collaboration →",
    href: "#teams",
  },
  {
    id: "reports",
    title: "Reports & Oversight",
    desc: "Give managers visibility into workload, ticket status, SLA performance and pending actions.",
    cta: "Explore reporting →",
    href: "#workflow",
  },
];

const LIFECYCLE_STEPS = [
  { num: "01", label: "Submit", desc: "Employees describe an issue or request." },
  { num: "02", label: "Route & triage", desc: "Tickets reach the appropriate team for prioritization." },
  { num: "03", label: "Resolve", desc: "Technicians update progress and document the resolution." },
  { num: "04", label: "Close", desc: "Requesters confirm the outcome or reopen when needed." },
];

const ACTIVITY_ROWS = [
  {
    code: "TCK-000125",
    subject: "Email access issue",
    badge: "In progress",
    badgeClassLight: "bg-amber-50 text-amber-800",
    badgeClassDark: "bg-amber-950/70 text-amber-300",
    meta: "High",
  },
  {
    code: "TCK-000124",
    subject: "New monitor request",
    badge: "Open",
    badgeClassLight: "bg-emerald-50 text-emerald-700",
    badgeClassDark: "bg-emerald-950/70 text-emerald-300",
    meta: "Normal",
  },
  {
    code: "TCK-000121",
    subject: "VPN connection issue",
    badge: "Resolved",
    badgeClassLight: "bg-emerald-50 text-emerald-700",
    badgeClassDark: "bg-emerald-950/70 text-emerald-300",
    meta: "High",
  },
  {
    code: "TCK-000118",
    subject: "Printer not responding",
    badge: "New",
    badgeClassLight: "bg-amber-50 text-amber-800",
    badgeClassDark: "bg-amber-950/70 text-amber-300",
    meta: "Untriaged",
  },
];

const ROLES_LIST = [
  {
    id: "employees",
    title: "Employees",
    desc: "Submit requests, follow ticket progress, communicate with support and confirm resolution.",
  },
  {
    id: "tech-support",
    title: "Tech Support",
    desc: "Work assigned tickets, update status, communicate with requesters and submit change requests.",
  },
  {
    id: "managers-admins",
    title: "Managers & Admins",
    desc: "Monitor operations, review change requests, manage routing oversight and administer accounts.",
  },
];

function FeatureIcon({ kind }) {
  switch (kind) {
    case "ticket-mgmt":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "team-assign":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      );
    case "sla-track":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "change-approvals":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "team-collab":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16V4" />
        </svg>
      );
  }
}

function RoleIcon({ kind }) {
  if (kind === "employees") {
    return <span className="text-base font-bold leading-none">♙</span>;
  }
  if (kind === "tech-support") {
    return <span className="text-base font-bold leading-none">⌘</span>;
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V5M4 19h16M8 16v-5M13 16V8M18 16V4" />
    </svg>
  );
}

export default function LandingPage({ theme = "light", onOpenLogin, onToggleTheme }) {
  const isDark = theme === "dark";

  const handleLoginClick = () => {
    if (typeof onOpenLogin === "function") {
      onOpenLogin();
    }
  };

  return (
    <div
      id="landingScreen"
      className={`min-h-screen transition-colors ${
        isDark ? "bg-[#101827] text-[#e8eef8]" : "bg-white text-slate-900"
      }`}
    >
      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-20 flex h-[76px] items-center justify-between border-b px-5 backdrop-blur md:px-14 ${
          isDark
            ? "border-[#2a3850] bg-[#182235]/95 text-[#e8eef8]"
            : "border-slate-200/80 bg-white/95 text-slate-900"
        }`}
      >
        <a
          href="#top"
          aria-label="TickFlow home"
          className={`flex items-center gap-2.5 text-xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-blue-600 text-sm font-extrabold text-white">
            T
          </span>
          <span>TickFlow</span>
        </a>

        <nav
          aria-label="Main navigation"
          className={`hidden items-center gap-7 text-[13px] font-semibold md:flex ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#workflow" className="hover:text-blue-500">How it works</a>
          <a href="#teams" className="hover:text-blue-500">For teams</a>
          <a href="#about" className="hover:text-blue-500">About</a>
        </nav>

        <div className="flex items-center gap-2.5">
          {typeof onToggleTheme === "function" && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Switch color theme"
              className={`cursor-pointer rounded-[9px] border px-3 py-2 text-xs font-semibold transition ${
                isDark
                  ? "border-[#3a4a63] bg-[#202c40] text-slate-100 hover:border-blue-400"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-700"
              }`}
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          )}

          <button
            type="button"
            onClick={handleLoginClick}
            className={`cursor-pointer rounded-[9px] border px-4 py-2 text-xs font-bold transition ${
              isDark
                ? "border-[#3a4a63] bg-[#202c40] text-white hover:border-blue-400"
                : "border-slate-300 bg-white text-slate-800 hover:border-blue-600 hover:text-blue-700"
            }`}
          >
            Log in
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 pt-16 pb-16 lg:grid-cols-[1fr_1.08fr] lg:px-16"
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-extrabold tracking-wide uppercase ${
              isDark
                ? "border-blue-500/30 bg-blue-500/15 text-blue-300"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            Support ticketing, made clear
          </div>

          <h1
            className={`mt-5 mb-4 max-w-[610px] text-4xl leading-[1.04] font-extrabold tracking-[-2.2px] sm:text-6xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Support requests.
            <br />
            <span className={isDark ? "text-blue-400" : "text-blue-600"}>
              Under control.
            </span>
          </h1>

          <p
            className={`max-w-[560px] text-base leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            TickFlow brings employees, support teams and managers together in one
            organized workspace — from the first request to resolution.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLoginClick}
              className="cursor-pointer rounded-[9px] bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Get started ↗
            </button>
            <a
              href="#features"
              className={`rounded-[9px] border px-4 py-3 text-xs font-bold transition ${
                isDark
                  ? "border-[#3a4a63] bg-[#182235] text-slate-200 hover:border-blue-400"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
              }`}
            >
              Explore features
            </a>
          </div>

          <div className={`mt-4 text-[11px] ${isDark ? "text-slate-400" : "text-slate-400"}`}>
            One workspace for requests, assignments, approvals and service performance.
          </div>
        </div>

        {/* Product Stage Mockup */}
        <div
          aria-label="Illustration of the TickFlow ticket management dashboard"
          className={`relative min-h-[355px] overflow-hidden rounded-[18px] p-6 ${
            isDark
              ? "bg-gradient-to-br from-blue-950 via-[#182235] to-slate-900"
              : "bg-gradient-to-br from-blue-50 to-blue-100/80"
          }`}
        >
          <div
            className={`relative z-10 overflow-hidden rounded-xl border shadow-xl ${
              isDark
                ? "border-[#2a3850] bg-[#182235]"
                : "border-slate-200 bg-white"
            }`}
          >
            <div
              className={`flex h-[42px] items-center justify-between border-b px-3.5 ${
                isDark ? "border-[#2a3850] bg-[#182235]" : "border-slate-100 bg-white"
              }`}
            >
              <div
                className={`flex items-center gap-2 text-[11px] font-extrabold ${
                  isDark ? "text-slate-100" : "text-slate-800"
                }`}
              >
                <i className="inline-block h-[17px] w-[17px] rounded-[5px] bg-blue-600" />
                TickFlow <span className="font-medium text-slate-400">/ Workspace</span>
              </div>
              <div className="flex gap-1">
                <i className="h-1.5 w-1.5 rounded-full bg-slate-400/50" />
                <i className="h-1.5 w-1.5 rounded-full bg-slate-400/50" />
                <i className="h-1.5 w-1.5 rounded-full bg-slate-400/50" />
              </div>
            </div>

            <div className="grid min-h-[275px] grid-cols-[112px_1fr]">
              <aside
                className={`border-r px-2 py-3.5 text-[8px] ${
                  isDark
                    ? "border-[#2a3850] bg-[#202c40] text-slate-300"
                    : "border-slate-100 bg-slate-50/80 text-slate-500"
                }`}
              >
                <span
                  className={`mb-1 block rounded px-2 py-2 font-extrabold ${
                    isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  Overview
                </span>
                <span className="mb-1 block rounded px-2 py-2">My tickets</span>
                <span className="mb-1 block rounded px-2 py-2">Team queue</span>
                <span className="mb-1 block rounded px-2 py-2">Change requests</span>
                <span className="mb-1 block rounded px-2 py-2">SLA monitor</span>
                <span className="block rounded px-2 py-2">Reports</span>
              </aside>

              <div className="p-4">
                <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                  Ticket overview
                </h3>
                <div className="mb-3 text-[8px] text-slate-400">
                  A clear view of support activity
                </div>

                <div className="mb-3.5 grid grid-cols-3 gap-2">
                  <div
                    className={`rounded-[7px] border p-2 ${
                      isDark ? "border-[#2a3850] bg-[#202c40]/60" : "border-slate-100"
                    }`}
                  >
                    <small className="block text-[7px] text-slate-400">Open tickets</small>
                    <b className={`mt-1 block text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      48
                    </b>
                  </div>
                  <div
                    className={`rounded-[7px] border p-2 ${
                      isDark ? "border-[#2a3850] bg-[#202c40]/60" : "border-slate-100"
                    }`}
                  >
                    <small className="block text-[7px] text-slate-400">Unassigned</small>
                    <b className={`mt-1 block text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      06
                    </b>
                  </div>
                  <div
                    className={`rounded-[7px] border p-2 ${
                      isDark ? "border-[#2a3850] bg-[#202c40]/60" : "border-slate-100"
                    }`}
                  >
                    <small className="block text-[7px] text-slate-400">SLA at risk</small>
                    <b className={`mt-1 block text-base font-extrabold ${isDark ? "text-white" : "text-slate-800"}`}>
                      03
                    </b>
                  </div>
                </div>

                <div
                  className={`overflow-hidden rounded-[7px] border text-[7px] ${
                    isDark
                      ? "border-[#2a3850] text-slate-300"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  <div
                    className={`grid grid-cols-[1.3fr_2fr_1fr_1fr] gap-1 px-2 py-2 font-extrabold ${
                      isDark ? "bg-[#202c40] text-slate-300" : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <span>Ticket</span>
                    <span>Subject</span>
                    <span>Status</span>
                    <span>Priority</span>
                  </div>
                  {HERO_TICKETS.map((row) => (
                    <div
                      key={row.id}
                      className={`grid grid-cols-[1.3fr_2fr_1fr_1fr] items-center gap-1 border-t px-2 py-2 ${
                        isDark ? "border-[#2a3850]" : "border-slate-100"
                      }`}
                    >
                      <span>{row.id}</span>
                      <span>{row.title}</span>
                      <span>
                        <i
                          className={`inline-block rounded-xl px-1.5 py-0.5 font-extrabold not-italic ${
                            isDark
                              ? "bg-amber-950/70 text-amber-300"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {row.status}
                        </i>
                      </span>
                      <span>{row.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative z-20 mt-3 ml-auto w-fit rounded-[10px] border px-3.5 py-2.5 text-[9px] shadow-md ${
              isDark
                ? "border-[#2a3850] bg-[#182235] text-slate-300"
                : "border-blue-100 bg-white text-slate-600"
            }`}
          >
            <b className={`mb-1 block text-[11px] ${isDark ? "text-white" : "text-slate-800"}`}>
              Everything in one place
            </b>
            Tickets · Teams · SLA · Decisions
          </div>
        </div>
      </section>

      {/* Lifecycle Trust Strip */}
      <div
        className={`border-y px-6 py-4 text-center text-xs font-semibold ${
          isDark
            ? "border-[#2a3850] bg-[#141f31] text-slate-300"
            : "border-slate-200/80 bg-slate-50 text-slate-600"
        }`}
      >
        Designed around the full support journey:{" "}
        <strong className={isDark ? "text-white" : "text-slate-800"}>
          Request → Assignment → Triage → Resolution → Closure
        </strong>
      </div>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-[1320px] px-6 py-16 lg:px-16">
        <div
          className={`mb-3 text-[11px] font-extrabold tracking-widest uppercase ${
            isDark ? "text-blue-400" : "text-blue-700"
          }`}
        >
          One connected workflow
        </div>
        <h2
          className={`mb-3.5 text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Everything your support process needs.
        </h2>
        <p
          className={`mb-8 max-w-[780px] text-[15px] leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Keep every request visible, route work to the right team, and give each
          role the tools it needs to move tickets forward with confidence.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_CARDS.map((item) => (
            <article
              key={item.id}
              className={`flex min-h-[190px] flex-col justify-between rounded-[13px] border p-6 transition hover:-translate-y-0.5 hover:shadow-md ${
                isDark
                  ? "border-[#2a3850] bg-[#182235]"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div>
                <div
                  aria-hidden="true"
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] ${
                    isDark ? "bg-blue-500/15 text-blue-400" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <FeatureIcon kind={item.id} />
                </div>
                <h3 className={`mb-2 text-base font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                  {item.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {item.desc}
                </p>
              </div>
              <a
                href={item.href}
                className={`mt-4 inline-block text-[11px] font-extrabold hover:underline ${
                  isDark ? "text-blue-400" : "text-blue-700"
                }`}
              >
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Workflow Showcase Section */}
      <section id="workflow" className={isDark ? "bg-[#141f31]" : "bg-slate-50"}>
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-11 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-16">
          <div>
            <div
              className={`mb-3 text-[11px] font-extrabold tracking-widest uppercase ${
                isDark ? "text-blue-400" : "text-blue-700"
              }`}
            >
              A clearer support operation
            </div>
            <h2
              className={`mb-3.5 text-3xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              From a new request to a resolved ticket.
            </h2>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              TickFlow organizes the work around the ticket lifecycle, so
              employees know where their requests stand and support teams know
              what needs attention next.
            </p>

            <div className="mt-6 grid gap-3">
              {LIFECYCLE_STEPS.map((step) => (
                <div
                  key={step.num}
                  className={`flex items-start gap-2.5 text-xs ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <span className={`font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                    {step.num}
                  </span>
                  <span>
                    <b className={isDark ? "text-white" : "text-slate-800"}>{step.label}</b> — {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`rounded-[14px] border p-4 shadow-lg ${
              isDark ? "border-[#2a3850] bg-[#182235]" : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-3.5 flex items-center justify-between">
              <b className={`text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                Recent support activity
              </b>
              <span className="text-[10px] text-slate-400">Workspace preview</span>
            </div>

            <div className="grid gap-2">
              {ACTIVITY_ROWS.map((row) => (
                <div
                  key={row.code}
                  className={`grid grid-cols-[1.3fr_2fr_0.8fr_0.8fr] items-center gap-2.5 rounded-lg border p-3 text-[10px] ${
                    isDark
                      ? "border-[#2a3850] text-slate-300"
                      : "border-slate-100 text-slate-600"
                  }`}
                >
                  <b className={isDark ? "text-white" : "text-slate-800"}>{row.code}</b>
                  <span>{row.subject}</span>
                  <span
                    className={`w-max rounded-xl px-2 py-1 text-[9px] font-extrabold ${
                      isDark ? row.badgeClassDark : row.badgeClassLight
                    }`}
                  >
                    {row.badge}
                  </span>
                  <span className="text-right">{row.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section (3 cards with hover lift) */}
      <section id="teams" className="mx-auto max-w-[1320px] px-6 py-16 lg:px-16">
        <div
          className={`mb-3 text-[11px] font-extrabold tracking-widest uppercase ${
            isDark ? "text-blue-400" : "text-blue-700"
          }`}
        >
          Built for every role
        </div>
        <h2
          className={`mb-3.5 text-3xl font-extrabold tracking-tight sm:text-4xl ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          The right view for every team member.
        </h2>
        <p
          className={`mb-8 max-w-[780px] text-[15px] leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Role-based workspaces keep each person focused on the actions they are
          allowed and expected to perform.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ROLES_LIST.map((roleItem) => (
            <article
              key={roleItem.id}
              className={`flex min-h-[190px] cursor-pointer flex-col justify-start rounded-[13px] border p-6 transition-all duration-200 hover:-translate-y-1.5 ${
                isDark
                  ? "border-[#2a3850] bg-[#182235] hover:border-blue-500/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)]"
              }`}
            >
              <div
                aria-hidden="true"
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] ${
                  isDark ? "bg-blue-500/15 text-blue-400" : "bg-blue-50 text-blue-600"
                }`}
              >
                <RoleIcon kind={roleItem.id} />
              </div>
              <h3 className={`mb-2 text-base font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                {roleItem.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {roleItem.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section id="about" className="mx-auto max-w-[1180px] px-6 pt-4 pb-16">
        <div
          className={`flex flex-col items-start justify-between gap-6 rounded-[18px] p-8 text-white md:flex-row md:items-center md:p-11 ${
            isDark
              ? "border border-[#2a3850] bg-[#182235]"
              : "bg-slate-900"
          }`}
        >
          <div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Bring your support work into focus.
            </h2>
            <p className="text-[13px] text-slate-300">
              Sign in to your TickFlow workspace and pick up where your team left off.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoginClick}
            className="cursor-pointer rounded-[9px] bg-blue-600 px-5 py-3 text-xs font-bold whitespace-nowrap text-white transition hover:bg-blue-700"
          >
            Log in to TickFlow ↗
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`flex flex-wrap items-center justify-between gap-4 border-t px-6 py-6 text-[11px] md:px-16 ${
          isDark
            ? "border-[#2a3850] bg-[#101827] text-slate-400"
            : "border-slate-200/80 bg-white text-slate-400"
        }`}
      >
        <span>
          <b className={isDark ? "text-slate-200" : "text-slate-700"}>TickFlow</b> · Support Ticketing System
        </span>
        <span>© 2026 TickFlow. All rights reserved.</span>
      </footer>
    </div>
  );
}
