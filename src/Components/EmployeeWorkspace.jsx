import { useState } from "react";
import WorkspaceLayout from "./WorkspaceLayout";
import MyRequests from "./MyRequests";
import CreateTicket from "./CreateTicket";
import TicketDetails from "./TicketDetails";
import Notifications from "./Notifications";
import Profile from "./Profile";
import {
  ME,
  initialTickets,
  initialNotifications,
  initialProfile,
  nextTicketId,
  formatDate,
  currentTime,
} from "./employeeData";

export default function EmployeeWorkspace({ user, theme, onToggleTheme, onSignOut }) {
  const [page, setPage] = useState("My Requests");
  const [cameFrom, setCameFrom] = useState("My Requests");
  const [selectedId, setSelectedId] = useState(null);
  const [tickets, setTickets] = useState(initialTickets);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [profile, setProfile] = useState(initialProfile);
  const [notice, setNotice] = useState("");

  if (user?.role !== "Employee") {
    return (
      <div className="mx-auto max-w-md rounded-[var(--radius-card)] border border-line bg-surface p-6 text-ink shadow-[var(--shadow-card)]">
        <p className="eyebrow mb-1">Access restricted</p>
        <h2 className="mb-2 text-lg font-bold">Employee access only</h2>
        <p className="mb-4 text-sm text-muted">
          This workspace is available only for accounts with the Employee role.
        </p>
        <button type="button" onClick={onSignOut} className="btn btn-primary h-9">
          Sign out
        </button>
      </div>
    );
  }

  const goTo = (next) => {
    setPage(next);
    if (next !== "My Requests") setNotice("");
    window.scrollTo(0, 0);
  };

  const openTicket = (id) => {
    setSelectedId(id);
    setCameFrom(page);
    goTo("Ticket Details");
  };

  const createTicket = (form) => {
    const id = nextTicketId(tickets);
    const ticket = {
      id,
      subject: form.subject,
      status: "New",
      priority: "Normal",
      assignee: null,
      team: null,
      category: form.category || "Not specified",
      subcategory: form.subcategory,
      type: form.type,
      created: formatDate(new Date()),
      description: form.description.trim() || "No description provided.",
      attachments: form.attachments,
      firstResponseDue: "—",
      resolutionDue: "—",
      awaitingResponse: false,
      resolvedThisMonth: false,
      comments: [],
      history: [{ label: "Ticket created", by: ME, when: `Today, ${currentTime()}` }],
    };

    setTickets((prev) => [ticket, ...prev]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Ticket submitted",
        body: `${id} is waiting to be triaged.`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    setNotice(`${id} has been submitted. A technician will pick it up after triage.`);
    goTo("My Requests");
  };

  // Replying to a ticket that was waiting on you clears the "awaiting" flag.
  const addComment = (id, text) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              awaitingResponse: false,
              comments: [...t.comments, { author: ME, role: "Requester", text, time: "Just now" }],
            }
          : t
      )
    );
  };

  const markRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const selected = tickets.find((t) => t.id === selectedId);
  const unreadCount = notifications.filter((n) => !n.read).length;

  let view;
  if (page === "Create Ticket") {
    view = (
      <CreateTicket
        requesterName={profile.fullName}
        onSubmit={createTicket}
        onCancel={() => goTo("My Requests")}
      />
    );
  } else if (page === "Ticket Details" && selected) {
    view = (
      <TicketDetails
        key={selected.id}
        ticket={selected}
        requesterName={profile.fullName}
        onBack={() => goTo(cameFrom)}
        onAddComment={addComment}
      />
    );
  } else if (page === "Notifications") {
    view = <Notifications items={notifications} onMarkRead={markRead} />;
  } else if (page === "Profile") {
    view = <Profile profile={profile} email={user.email} onSave={setProfile} />;
  } else {
    view = (
      <MyRequests
        tickets={tickets}
        requesterName={profile.fullName}
        notice={notice}
        onDismissNotice={() => setNotice("")}
        onCreate={() => goTo("Create Ticket")}
        onOpenTicket={openTicket}
      />
    );
  }

  return (
    <WorkspaceLayout
      page={page === "Ticket Details" && !selected ? "My Requests" : page}
      onNavigate={goTo}
      theme={theme}
      onToggleTheme={onToggleTheme}
      onSignOut={onSignOut}
      unreadCount={unreadCount}
      userName={profile.fullName}
      roleLabel="Employee"
    >
      {view}
    </WorkspaceLayout>
  );
}