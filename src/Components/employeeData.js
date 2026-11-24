// Sample data for the Employee workspace. "ME" stands for the signed-in
// employee, so names follow the profile if it is edited.
export const ME = "me";

export const ACTIVE_STATUSES = ["New", "Open", "In Progress", "Resolved"];
export const CLOSED_STATUSES = ["Closed", "Cancelled"];

export const CATEGORIES = {
  Hardware: ["Laptop or desktop", "Monitor", "Printer", "Keyboard, mouse & peripherals"],
  Software: ["Installation", "License request", "Application error"],
  Network: ["VPN", "Wi-Fi", "Internet access"],
  "Accounts & Access": ["Password reset", "Email access", "Permissions"],
};

export const initialProfile = {
  fullName: "Abdelrahman Mahmoud",
  jobTitle: "Computer Science Student",
  phone: "+20 100 000 0000",
};

export const initialNotifications = [
  {
    id: 1,
    title: "Ticket assigned to you",
    body: "TCK-000125 has been assigned to Omar Adel.",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "SLA breach alert",
    body: "TCK-000112 has exceeded its first response target.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Change request pending",
    body: "A priority change request needs your review.",
    time: "3 hours ago",
    read: false,
  },
];

export const initialTickets = [
  {
    id: "TCK-000125",
    subject: "Unable to access company email",
    status: "In Progress",
    priority: "High",
    assignee: "Omar Adel",
    team: "IT Support",
    category: "Accounts & Access",
    created: "21 Nov 2026",
    description:
      "I cannot sign in to my company email account. The page keeps returning an authentication error even after resetting my password.",
    firstResponseDue: "Today, 4:30 PM",
    resolutionDue: "25 Nov 2026",
    awaitingResponse: false,
    resolvedThisMonth: false,
    comments: [
      {
        author: ME,
        role: "Requester",
        text: "I have tried from both the browser and Outlook app, but the issue is still happening.",
      },
      {
        author: "Omar Adel",
        role: "Technician",
        text: "Thanks for the details. I am checking the account sign-in logs and will update you shortly.",
      },
    ],
    history: [
      { label: "In Progress", by: "Omar Adel", when: "Today, 10:42 AM" },
      { label: "Open · Assigned", by: "System", when: "Today, 9:15 AM" },
      { label: "Ticket created", by: ME, when: "Yesterday" },
    ],
  },
  {
    id: "TCK-000124",
    subject: "New monitor request",
    status: "Open",
    priority: "Normal",
    assignee: "Sara Nabil",
    team: "Desktop Support",
    category: "Hardware",
    created: "19 Nov 2026",
    description:
      "My current monitor flickers and has a dead strip down the left side. I would like a replacement, ideally 24 inch or larger.",
    firstResponseDue: "Met",
    resolutionDue: "27 Nov 2026",
    awaitingResponse: true,
    resolvedThisMonth: false,
    comments: [
      {
        author: "Sara Nabil",
        role: "Technician",
        text: "Do you need a specific size or resolution, or is the standard 24-inch model fine?",
      },
    ],
    history: [
      { label: "Open · Assigned", by: "System", when: "20 Nov 2026" },
      { label: "Ticket created", by: ME, when: "19 Nov 2026" },
    ],
  },
  {
    id: "TCK-000121",
    subject: "VPN connection keeps dropping",
    status: "Resolved",
    priority: "High",
    assignee: "Youssef Ali",
    team: "Network",
    category: "Network",
    created: "14 Nov 2026",
    description:
      "The VPN disconnects every ten to fifteen minutes when I work from home, which interrupts file transfers.",
    firstResponseDue: "Met",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: true,
    comments: [
      {
        author: "Youssef Ali",
        role: "Technician",
        text: "We updated the VPN client and adjusted the keep-alive setting on your profile. Let us know if it drops again.",
      },
    ],
    history: [
      { label: "Resolved", by: "Youssef Ali", when: "Yesterday, 4:05 PM" },
      { label: "In Progress", by: "Youssef Ali", when: "17 Nov 2026" },
      { label: "Ticket created", by: ME, when: "14 Nov 2026" },
    ],
  },
  {
    id: "TCK-000118",
    subject: "Printer not responding on floor 2",
    status: "New",
    priority: "Normal",
    assignee: null,
    team: null,
    category: "Hardware",
    created: "22 Nov 2026",
    description:
      "The shared printer on the second floor shows as offline for everyone on our team. Restarting it did not help.",
    firstResponseDue: "—",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: false,
    comments: [],
    history: [{ label: "Ticket created", by: ME, when: "Today, 8:50 AM" }],
  },
  {
    id: "TCK-000109",
    subject: "Adobe Acrobat license request",
    status: "Closed",
    priority: "Normal",
    assignee: "Mona Tarek",
    team: "IT Support",
    category: "Software",
    created: "5 Nov 2026",
    description: "I need an Acrobat Pro license to edit and sign PDF contracts.",
    firstResponseDue: "Met",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: true,
    comments: [],
    history: [
      { label: "Closed", by: "System", when: "12 Nov 2026" },
      { label: "Ticket created", by: ME, when: "5 Nov 2026" },
    ],
  },
  {
    id: "TCK-000107",
    subject: "Wi-Fi drops in meeting room B",
    status: "Closed",
    priority: "Normal",
    assignee: "Youssef Ali",
    team: "Network",
    category: "Network",
    created: "3 Nov 2026",
    description: "The Wi-Fi in meeting room B disconnects during video calls.",
    firstResponseDue: "Met",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: true,
    comments: [],
    history: [
      { label: "Closed", by: "System", when: "9 Nov 2026" },
      { label: "Ticket created", by: ME, when: "3 Nov 2026" },
    ],
  },
  {
    id: "TCK-000104",
    subject: "Install Visual Studio Code",
    status: "Closed",
    priority: "Low",
    assignee: "Mona Tarek",
    team: "IT Support",
    category: "Software",
    created: "2 Nov 2026",
    description: "Please install Visual Studio Code on my workstation.",
    firstResponseDue: "Met",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: true,
    comments: [],
    history: [
      { label: "Closed", by: "System", when: "4 Nov 2026" },
      { label: "Ticket created", by: ME, when: "2 Nov 2026" },
    ],
  },
  {
    id: "TCK-000098",
    subject: "Duplicate laptop request",
    status: "Cancelled",
    priority: "Low",
    assignee: "Sara Nabil",
    team: "Desktop Support",
    category: "Hardware",
    created: "29 Oct 2026",
    description: "I submitted this request twice by mistake. Please cancel it.",
    firstResponseDue: "—",
    resolutionDue: "—",
    awaitingResponse: false,
    resolvedThisMonth: false,
    comments: [],
    history: [
      { label: "Cancelled", by: ME, when: "29 Oct 2026" },
      { label: "Ticket created", by: ME, when: "29 Oct 2026" },
    ],
  },
];

export function nextTicketId(tickets) {
  const highest = Math.max(0, ...tickets.map((t) => Number(t.id.slice(4))));
  return `TCK-${String(highest + 1).padStart(6, "0")}`;
}

export function shortName(fullName) {
  const [first, ...rest] = fullName.trim().split(/\s+/);
  const last = rest[rest.length - 1];
  return last ? `${first} ${last[0]}.` : first;
}

export const formatDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const currentTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });