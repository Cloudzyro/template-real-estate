import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contactPage.text,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="container-x grid gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">{site.contactPage.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{site.contactPage.text}</p>
        <dl className="mt-10 space-y-6">
          <div>
            <dt className="label">Office</dt>
            <dd>
              <address className="not-italic">
                {site.contact.address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </dd>
          </div>
          <div>
            <dt className="label">Phone and email</dt>
            <dd className="flex flex-col">
              <a className="font-medium text-pine underline-offset-4 hover:underline" href={`tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`}>
                {site.contact.phone}
              </a>
              <a className="font-medium text-pine underline-offset-4 hover:underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Hours</dt>
            <dd>
              {site.contact.hours.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
      <div className="h-fit rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="mb-6 font-display text-2xl font-medium">Send us a message</h2>
        <InquiryForm subject="Website inquiry" showInterest={false} />
      </div>
    </div>
  );
}
