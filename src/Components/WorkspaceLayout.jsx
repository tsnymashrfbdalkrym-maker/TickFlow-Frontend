import { useEffect, useState } from "react";
import Icon from "./Icon";
import { Avatar } from "./WorkspaceUI";

const NAV_GROUPS = [
  {
    label: "Employee workspace",
    items: [
      { key: "My Requests", icon: "tickets" },
      { key: "Create Ticket", icon: "plus" },
      { key: "Profile", icon: "user" },
    ],
  },
  {
    label: "Workspace",
    items: [{ key: "Notifications", icon: "bell" }],
  },
];

export default function WorkspaceLayout({
  page,
  onNavigate,
  theme,
  onToggleTheme,
  onSignOut,
  unreadCount = 0,
  userName,
  roleLabel = "Employee",
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === "dark";
  // Ticket details belongs under My Requests in the sidebar.
  const activeNav = page === "Ticket Details" ? "My Requests" : page;
  const initial = userName.trim().charAt(0).toUpperCase() || "E";

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (key) => {
    setMenuOpen(false);
    onNavigate(key);
  };

  return (
    <div className="min-h-dvh bg-page text-ink md:grid md:grid-cols-[var(--sidebar-width-md)_1fr] lg:grid-cols-[var(--sidebar-width)_1fr]">
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: static on md+, slide-in drawer below */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-[var(--sidebar-width)] flex-col border-r border-line bg-surface transition-[transform,visibility] duration-200 md:visible md:sticky md:top-0 md:h-dvh md:w-auto md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => go("My Requests")}
          aria-label="TickFlow, go to My Requests"
          className="flex items-center gap-2.5 px-5 py-5 text-lg font-extrabold tracking-tight"
        >
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-brand-dark text-sm font-extrabold text-white">
            T
          </span>
          TickFlow
        </button>

        <nav aria-label="Workspace" className="flex-1 overflow-y-auto px-3 pb-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-1.5 px-3 text-[10px] font-bold tracking-wider text-muted uppercase">
                {group.label}
              </p>
              {group.items.map((item) => {
                const active = activeNav === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => go(item.key)}
                    aria-current={active ? "page" : undefined}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                      active
                        ? "bg-brand-soft text-brand-ink"
                        : "text-muted hover:bg-alt hover:text-ink"
                    }`}
                  >
                    <Icon name={item.icon} />
                    {item.key}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 border-t border-line px-5 py-4">
          <Avatar initial={initial} />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[13px] font-bold">{userName}</p>
            <p className="text-[11px] text-muted">{roleLabel}</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-[var(--topbar-height-sm)] items-center justify-between gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur md:h-[var(--topbar-height)] md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-controls="sidebar"
              aria-expanded={menuOpen}
              className="btn btn-secondary h-8 w-8 px-0 md:hidden"
            >
              <Icon name="menu" />
            </button>
            <nav aria-label="Breadcrumb" className="truncate text-xs text-muted">
              <span className="hidden sm:inline">Workspace / </span>
              <b className="text-ink">{page}</b>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="btn btn-secondary h-8 px-3 text-xs"
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>

            <button
              type="button"
              onClick={() => go("Notifications")}
              aria-label={
                unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"
              }
              className="btn btn-secondary relative h-8 w-8 px-0"
            >
              <Icon name="bell" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-surface" />
              )}
            </button>

            <Avatar initial={initial} className="hidden sm:flex" />

            <button type="button" onClick={onSignOut} className="btn btn-secondary h-8 px-3 text-xs">
              Sign out
            </button>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-[var(--content-max-w)] px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}