import { useEffect, useState } from "react";
import { CARD, Field, PageHeader } from "./WorkspaceUI";

export default function Profile({ profile, email, onSave }) {
  const [form, setForm] = useState(profile);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    onSave({
      fullName: form.fullName.trim(),
      jobTitle: form.jobTitle.trim(),
      phone: form.phone.trim(),
    });
    setSaved(true);
  };

  return (
    <>
      <PageHeader title="My Profile" subtitle="View and update your personal account information." />

      <form
        onSubmit={handleSubmit}
        noValidate
        className={`${CARD} grid grid-cols-1 gap-4 p-5 md:p-6 min-[721px]:grid-cols-2`}
      >
        <Field label="Full name" htmlFor="fullName" error={error}>
          <input
            id="fullName"
            value={form.fullName}
            onChange={update("fullName")}
            autoComplete="name"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "fullName-error" : undefined}
            className="field"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="field cursor-not-allowed opacity-70"
          />
        </Field>

        <Field label="Job title" htmlFor="jobTitle">
          <input
            id="jobTitle"
            value={form.jobTitle}
            onChange={update("jobTitle")}
            autoComplete="organization-title"
            className="field"
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            autoComplete="tel"
            className="field"
          />
        </Field>

        <div className="flex items-center justify-end gap-3 pt-1 min-[721px]:col-span-2">
          <p role="status" className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {saved ? "Changes saved." : ""}
          </p>
          <button type="submit" className="btn btn-primary h-9">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}