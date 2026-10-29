import { createFileRoute } from "@tanstack/react-router";
import { Specimen3D } from "@/components/site/ui";
import { EnquiryForm } from "@/components/site/widgets";
import { BrandLogo } from "@/components/site/Chrome";
import { PhotoGallery } from '@/components/site/PhotoGallery';

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact & Enquiries — Shaz Ventures" },
      { name: "description", content: "Send a structured mineral supply enquiry to Shaz Ventures in Nairobi." },
      { property: "og:title", content: "Contact Shaz Ventures" },
      { property: "og:description", content: "Tell us your mineral, specification, quantity and destination." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <><section className="contact-layout mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-36 lg:grid-cols-[1fr_1.6fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 text-5xl font-black leading-tight">Discuss your <span className="text-copper">requirements.</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">Share your mineral, specification, quantity and destination. We'll respond with next steps.</p>
        <div className="mt-8 space-y-2 font-mono text-sm text-muted-foreground">
          <p>For Enquiry: <a href="tel:+254733803508" className="text-foreground transition-colors hover:text-primary">+254 733 803 508</a></p>
          <p>info@shazvltd.com</p>
          <p>P.O. Box 85-00610, Parkside Towers, Third Floor,</p>
          <p>Mombasa Road, Nairobi</p>
        </div>
        <div className="mt-10 max-w-xs"><BrandLogo /></div>
        <Specimen3D label="Gypsum crystal specimen" color="#e8e3d8" roughness={0.25} metalness={0} detail={0.12} shape="crystal" interactive={false} className="mt-6 hidden h-72 lg:block" />
      </div>
      <EnquiryForm />
    </section><PhotoGallery /></>
  );
}
