import { CARD, PageHeader } from "./WorkspaceUI";

export default function Notifications({ items, onMarkRead }) {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Updates about assignments, comments, status changes and service activity."
      />

      <div className={`${CARD} overflow-hidden`}>
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted">You’re all caught up.</p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((n) => (
              <li key={n.id} className="flex items-start gap-3 px-5 py-4">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-brand"}`}
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-[13px] ${n.read ? "font-semibold text-muted" : "font-bold"}`}>
                    {!n.read && <span className="sr-only">Unread: </span>}
                    {n.title}
                  </p>
                  <p className="text-xs text-muted">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted/80">{n.time}</p>
                </div>
                {!n.read && (
                  <button
                    type="button"
                    onClick={() => onMarkRead(n.id)}
                    aria-label={`Mark “${n.title}” as read`}
                    className="link shrink-0 text-xs"
                  >
                    Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}