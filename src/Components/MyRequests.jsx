import { useState } from "react";
import Icon from "./Icon";
import { CARD, PageHeader, StatusBadge, PriorityBadge } from "./WorkspaceUI";
import { ACTIVE_STATUSES, CLOSED_STATUSES, shortName } from "./employeeData";

const COLUMNS = ["Ticket", "Subject", "Requester", "Assignee / Team", "Status", "Priority", "Due date"];

function StatCard({ label, value, hint, icon }) {
  return (
    <div className={`${CARD} flex items-start justify-between gap-3 p-4`}>
      <div>
        <p className="text-xs font-semibold text-muted">{label}</p>
        <p className="my-1 text-[length:var(--text-stat)] leading-none font-bold">{value}</p>
        <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">{hint}</p>
      </div>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-stat-icon)] bg-brand-dark text-white"
      >
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
    </div>
  );
}

export default function MyRequests({
  tickets,
  requesterName,
  notice,
  onDismissNotice,
  onCreate,
  onOpenTicket,
}) {
  const [tab, setTab] = useState("active");
  const [query, setQuery] = useState("");

  const activeCount = tickets.filter((t) => ["New", "Open", "In Progress"].includes(t.status)).length;
  const awaitingCount = tickets.filter((t) => t.awaitingResponse).length;
  const attentionCount = tickets.filter((t) => t.awaitingResponse || t.status === "Resolved").length;
  const resolvedCount = tickets.filter((t) => t.resolvedThisMonth).length;

  const q = query.trim().toLowerCase();
  const statuses = tab === "active" ? ACTIVE_STATUSES : CLOSED_STATUSES;
  const rows = tickets
    .filter((t) => statuses.includes(t.status))
    .filter((t) => !q || t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q))
    .sort((a, b) => b.id.localeCompare(a.id));

  const emptyText = q
    ? "No tickets match your search."
    : tab === "active"
      ? "No active requests."
      : "No closed requests.";

  const viewAll = () => {
    setTab("active");
    setQuery("");
  };

  return (
    <>
      <PageHeader
        title="My Requests"
        subtitle="Track your support requests and stay up to date."
        action={
          <button type="button" onClick={onCreate} className="btn btn-primary h-9">
            <Icon name="plus" />
            Create ticket
          </button>
        }
      />

      {notice && (
        <div
          role="status"
          className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <p>{notice}</p>
          <button type="button" onClick={onDismissNotice} aria-label="Dismiss message" className="shrink-0 pt-0.5">
            <Icon name="close" />
          </button>
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Active requests"
          value={activeCount}
          hint={attentionCount > 0 ? `${attentionCount} need your attention` : "Nothing needs attention"}
          icon="tickets"
        />
        <StatCard
          label="Awaiting your response"
          value={awaitingCount}
          hint={awaitingCount > 0 ? "Action required" : "Nothing waiting on you"}
          icon="clock"
        />
        <StatCard label="Resolved this month" value={resolvedCount} hint="All caught up" icon="check" />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[length:var(--text-h2)] font-bold">Your recent requests</h2>
        <button type="button" onClick={viewAll} className="link text-xs">
          View all
        </button>
      </div>

      <div role="tablist" aria-label="Request status" className="mb-4 flex gap-1 border-b border-line">
        {[
          ["active", "Active"],
          ["closed", "Closed"],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls="requests-panel"
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-[13px] font-semibold transition-colors ${
              tab === key
                ? "border-brand text-brand-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id="requests-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
        <div className="relative mb-4">
          <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted">
            <Icon name="search" />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your ticket number or subject"
            aria-label="Search your ticket number or subject"
            className="field pl-10"
          />
        </div>

        <div className={`${CARD} overflow-x-auto`}>
          <table className="w-full min-w-[860px] text-left">
            <thead>
              <tr className="bg-alt">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-4 py-3 text-[length:var(--text-th)] font-bold tracking-wider text-muted uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[length:var(--text-td)]">
              {rows.length === 0 ? (
                <tr className="border-t border-line">
                  <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-muted">
                    {emptyText}
                  </td>
                </tr>
              ) : (
                rows.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => onOpenTicket(t.id)}
                    className="cursor-pointer border-t border-line transition-colors hover:bg-alt"
                  >
                    <td className="px-4 py-3.5">
                      <button type="button" className="link font-bold whitespace-nowrap">
                        {t.id}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 font-bold">{t.subject}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">{shortName(requesterName)}</td>
                    <td className="px-4 py-3.5">
                      {t.assignee ? (
                        <>
                          <span className="block">{t.assignee}</span>
                          <span className="block text-[11px] text-muted">{t.team}</span>
                        </>
                      ) : (
                        <>
                          <span className="block text-muted">Unassigned</span>
                          <span className="block text-[11px] text-muted">Awaiting triage</span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-muted">{t.resolutionDue}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}