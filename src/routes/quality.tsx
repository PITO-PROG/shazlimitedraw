import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero, SectionHead } from "@/components/site/ui";
import { StepExplorer } from "@/components/site/widgets";
import { novemberMedia } from '@/lib/november-media';

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Quality Assurance — Shaz Ventures" },
      { name: "description", content: "Supplier qualification, material verification, shipment inspection and documentation." },
      { property: "og:title", content: "Quality Assurance — Shaz Ventures" },
      { property: "og:description", content: "How we check material against your specification." },
    ],
  }),
  component: Quality,
});

const steps = [
  { title: "Supplier qualification", text: "We assess prospective suppliers for capability, track record and ability to meet your specification." },
  { title: "Material verification", text: "Samples are reviewed against agreed parameters before commercial commitment." },
  { title: "Shipment inspection", text: "Inspection is arranged at loading and/or discharge as agreed with the customer." },
  { title: "Documentation", text: "Commercial, transport and quality documents are compiled and shared with each delivery." },
  { title: "Specification compliance", text: "Delivered material is reconciled against the agreed specification and any issues are addressed." },
];

function Quality() {
  return (
    <>
      <PageHero eyebrow="Quality assurance" title={<>Checked at <span className="text-copper">every stage.</span></>} text="A structured process from supplier to delivery, built around the specification you agree with us." visual={<img src={novemberMedia.lab} alt="Gloved hand preparing laboratory sample tubes" width={1600} height={1067} className="h-full w-full object-cover" />} />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Our process" title="Explore the quality sequence." className="mb-12" />
        <StepExplorer steps={steps} />
        <p className="mt-8 font-mono text-xs text-muted-foreground">Process overview only; it does not imply third-party certification.</p>
      </section>
      <CTA />
    </>
  );
}
