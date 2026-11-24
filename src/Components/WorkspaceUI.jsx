import { useEffect, useRef } from "react";

export const CARD =
  "rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-card)]";

const STATUS_STYLES = {
  New: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  Open: "bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  "In Progress": "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Resolved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Closed: "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300",
  Cancelled: "bg-slate-100 text-slate-500 dark:bg-slate-500/15 dark:text-slate-400",
};

const PRIORITY_STYLES = {
  High: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  Normal: "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300",
  Low: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
};

const BADGE =
  "inline-block rounded-[var(--radius-badge)] px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap";

export function StatusBadge({ status }) {
  return <span className={`${BADGE} ${STATUS_STYLES[status]}`}>{status}</span>;
}

export function PriorityBadge({ priority }) {
  return <span className={`${BADGE} ${PRIORITY_STYLES[priority]}`}>{priority}</span>;
}

export function Avatar({ initial, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-ink ${className}`}
    >
      {initial}
    </span>
  );
}

export function PageHeader({ title, subtitle, action }) {
  const headingRef = useRef(null);

  // Move focus to the page title on navigation so screen readers announce it.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="eyebrow mb-1.5">TickFlow / Employee</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-[length:var(--text-h1)] font-bold tracking-tight outline-none"
        >
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Field({ label, htmlFor, required, note, hint, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold">
        {label}
        {required && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {note && <span className="font-normal text-muted"> {note}</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
      {hint && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-[11px] text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}