import { useRef, useState } from "react";
import { CARD, Field, PageHeader } from "./WorkspaceUI";
import { CATEGORIES } from "./employeeData";

const MAX_FILE_BYTES = 20 * 1024 * 1024;

export default function CreateTicket({ requesterName, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    type: "Incident",
    category: "",
    subcategory: "",
    subject: "",
    description: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const subjectRef = useRef(null);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const changeCategory = (e) => {
    const category = e.target.value;
    setForm((f) => ({ ...f, category, subcategory: "" }));
  };

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files);
    const tooBig = picked.find((f) => f.size > MAX_FILE_BYTES);
    if (tooBig) {
      setErrors((prev) => ({ ...prev, files: `“${tooBig.name}” is larger than 20 MB.` }));
      e.target.value = "";
      setFiles([]);
      return;
    }
    setErrors((prev) => ({ ...prev, files: undefined }));
    setFiles(picked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim()) {
      setErrors({ subject: "Please enter a subject." });
      subjectRef.current?.focus();
      return;
    }
    onSubmit({
      ...form,
      subject: form.subject.trim(),
      attachments: files.map((f) => f.name),
    });
  };

  const subcategories = CATEGORIES[form.category] ?? [];
  const wide = "min-[721px]:col-span-2";

  return (
    <>
      <PageHeader
        title="Create a ticket"
        subtitle="Tell us what you need help with. Required fields are marked with *."
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className={`${CARD} grid grid-cols-1 gap-4 p-5 md:p-6 min-[721px]:grid-cols-2`}
      >
        <Field label="Request type" htmlFor="requestType" required>
          <select id="requestType" value={form.type} onChange={update("type")} aria-required="true" className="field">
            <option>Incident</option>
            <option>Service Request</option>
          </select>
        </Field>

        <Field label="Requester" htmlFor="requester" required>
          <input
            id="requester"
            value={requesterName}
            readOnly
            aria-required="true"
            className="field cursor-default bg-alt"
          />
        </Field>

        <Field label="Category" htmlFor="category" required>
          <select id="category" value={form.category} onChange={changeCategory} aria-required="true" className="field">
            <option value="">Select a category</option>
            {Object.keys(CATEGORIES).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Subcategory" htmlFor="subcategory" required>
          <select
            id="subcategory"
            value={form.subcategory}
            onChange={update("subcategory")}
            disabled={!form.category}
            aria-required="true"
            className="field disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field
          label="Subject"
          htmlFor="subject"
          required
          note="(max 200 characters)"
          error={errors.subject}
          className={wide}
        >
          <input
            ref={subjectRef}
            id="subject"
            value={form.subject}
            onChange={update("subject")}
            maxLength={200}
            placeholder="Briefly describe the issue"
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className="field"
          />
        </Field>

        <Field
          label="Description"
          htmlFor="description"
          required
          hint="Avoid including passwords or confidential information."
          className={wide}
        >
          <textarea
            id="description"
            value={form.description}
            onChange={update("description")}
            rows={5}
            placeholder="Describe what happened, what you expected, and any steps already tried."
            aria-required="true"
            aria-describedby="description-hint"
            className="field h-auto min-h-[140px] resize-y py-3"
          />
        </Field>

        <Field
          label="Attachments"
          htmlFor="attachments"
          hint="Maximum 20 MB per file. Allowed file types are controlled by system settings."
          error={errors.files}
          className={wide}
        >
          <input
            id="attachments"
            type="file"
            multiple
            onChange={handleFiles}
            aria-describedby="attachments-hint"
            className="field h-auto py-2 text-[13px] file:mr-3 file:rounded-md file:border file:border-line-strong file:bg-surface file:px-3 file:py-1 file:text-xs file:font-semibold file:text-ink"
          />
        </Field>

        <div className={`flex justify-end gap-2 pt-1 ${wide}`}>
          <button type="button" onClick={onCancel} className="btn btn-secondary h-9">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary h-9">
            Submit ticket
          </button>
        </div>
      </form>
    </>
  );
}