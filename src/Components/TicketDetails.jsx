import { useState } from "react";
import Icon from "./Icon";
import { CARD, PageHeader, StatusBadge, PriorityBadge } from "./WorkspaceUI";
import { ME } from "./employeeData";

export default function TicketDetails({ ticket, requesterName, onBack, onAddComment }) {
  const [reply, setReply] = useState("");

  const who = (name) => (name === ME ? requesterName : name);

  const handleSend = (e) => {
    e.preventDefault();
    const text = reply.trim();
    if (!text) return;
    onAddComment(ticket.id, text);
    setReply("");
  };

  const info = [
    ["Requester", requesterName],
    ["Assignee", ticket.assignee ?? "Unassigned"],
    ["Team", ticket.team ?? "Not assigned"],
    ["Priority", ticket.priority],
    ["First response due", ticket.firstResponseDue],
    ["Resolution due", ticket.resolutionDue],
  ];

  return (
    <>
      <PageHeader
        title="Ticket details"
        subtitle="Review the request, follow the conversation and track progress."
        action={
          <button type="button" onClick={onBack} className="btn btn-secondary h-9">
            <Icon name="back" />
            Back
          </button>
        }
      />

      <div className="grid items-start gap-4 min-[1051px]:grid-cols-[1.6fr_0.9fr]">
        <section className={`${CARD} p-5 md:p-6`} aria-label="Ticket">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-brand-ink">{ticket.id}</span>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>
          <h2 className="mb-1 text-xl font-bold tracking-tight">{ticket.subject}</h2>
          <p className="mb-4 text-[11px] text-muted">
            Created {ticket.created} · Category: {ticket.category} · Team: {ticket.team ?? "Not assigned"}
          </p>
          <p className="text-[13px] leading-relaxed">{ticket.description}</p>
          {ticket.attachments?.length > 0 && (
            <p className="mt-3 text-xs text-muted">Attachments: {ticket.attachments.join(", ")}</p>
          )}

          <h3 className="mt-6 mb-3 text-sm font-bold">Conversation</h3>
          {ticket.comments.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line px-4 py-5 text-center text-xs text-muted">
              No comments yet. Add one below to start the conversation.
            </p>
          ) : (
            <ul className="grid gap-2.5" aria-live="polite">
              {ticket.comments.map((c, i) => (
                <li
                  key={i}
                  className={`rounded-lg border border-line px-3.5 py-3 text-[13px] ${
                    c.role === "Requester" ? "bg-brand-soft" : "bg-alt"
                  }`}
                >
                  <p className="mb-0.5 text-xs">
                    <b>{who(c.author)}</b>{" "}
                    <span className={c.role === "Requester" ? "text-muted" : "text-brand-ink"}>
                      · {c.role}
                    </span>
                    {c.time && <span className="text-muted"> · {c.time}</span>}
                  </p>
                  <p className="leading-relaxed text-muted">{c.text}</p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSend} className="mt-5">
            <label htmlFor="commentBody" className="mb-1.5 block text-xs font-bold">
              Add a comment
            </label>
            <textarea
              id="commentBody"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              placeholder="Write a public reply…"
              aria-describedby="commentHint"
              className="field h-auto min-h-[100px] resize-y py-3"
            />
            <p id="commentHint" className="mt-1.5 text-[11px] text-muted">
              Replies are visible to everyone working on this ticket.
            </p>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={!reply.trim()}
                className="btn btn-primary h-9 disabled:pointer-events-none disabled:opacity-50"
              >
                Send comment
              </button>
            </div>
          </form>
        </section>

        <div className="grid gap-4">
          <section className={`${CARD} p-5`} aria-label="Ticket information">
            <h3 className="mb-2 text-sm font-bold">Ticket information</h3>
            <dl>
              {info.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line py-2.5 text-xs last:border-b-0"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${CARD} p-5`} aria-label="Status history">
            <h3 className="mb-4 text-sm font-bold">Status history</h3>
            <ol className="relative ml-1 border-l border-line">
              {ticket.history.map((h, i) => (
                <li key={i} className="relative pb-4 pl-5 last:pb-0">
                  <span className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-surface" />
                  <p className="text-xs font-bold">{h.label}</p>
                  <p className="text-[11px] text-muted">
                    {who(h.by)} · {h.when}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}