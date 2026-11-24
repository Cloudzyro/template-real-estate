"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/data/site";

// Posts to the address in NEXT_PUBLIC_FORM_ENDPOINT (Formspree, Basin, a
// Supabase edge function or anything that accepts a form POST). With no
// endpoint set, the form offers to open the visitor's email app instead.
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Props = {
  subject: string;
  to?: string;
  defaultMessage?: string;
  showInterest?: boolean;
  compact?: boolean;
};

export function InquiryForm({ subject, to = site.contact.email, defaultMessage = "", showInterest = false, compact = false }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "nomail">("idle");
  const [mailto, setMailto] = useState("");
  const uid = useId();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("subject", subject);

    if (!endpoint) {
      const body = [...data.entries()]
        .filter(([k]) => k !== "subject" && k !== "_gotcha")
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      setMailto(`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      setState("nomail");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl bg-brass-soft p-5 text-sm">
        <p className="font-display text-xl text-ink">Thank you, your message is on its way.</p>
        <p className="mt-1 text-muted">We will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate={false}>
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className="label" htmlFor={`${uid}-name`}>
            Name
          </label>
          <input className="field" id={`${uid}-name`} name="name" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-email`}>
            Email
          </label>
          <input className="field" id={`${uid}-email`} name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="label" htmlFor={`${uid}-phone`}>
            Phone <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input className="field" id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" />
        </div>
        {showInterest && (
          <div>
            <label className="label" htmlFor={`${uid}-interest`}>
              I would like to
            </label>
            <select className="field" id={`${uid}-interest`} name="interest" defaultValue="Schedule a tour">
              <option>Schedule a tour</option>
              <option>Ask a question</option>
              <option>Talk about financing</option>
              <option>Make an offer</option>
            </select>
          </div>
        )}
      </div>
      <div>
        <label className="label" htmlFor={`${uid}-message`}>
          Message
        </label>
        <textarea className="field min-h-28" id={`${uid}-message`} name="message" defaultValue={defaultMessage} required />
      </div>
      {/* Spam trap: real visitors never see or fill this. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Send message"}
      </button>
      {state === "nomail" && (
        <div role="status" className="rounded-2xl border border-line bg-paper p-4 text-sm">
          <p>This site's form is not connected yet, so nothing was sent.</p>
          <p className="mt-1">
            <a className="font-semibold text-pine underline underline-offset-4" href={mailto}>
              Email us your message instead
            </a>{" "}
            or call {site.contact.phone}.
          </p>
        </div>
      )}
      {state === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Something went wrong sending your message. Please try again, or email{" "}
          <a className="underline" href={`mailto:${to}`}>
            {to}
          </a>
          .
        </p>
      )}
    </form>
  );
}
