import { createFileRoute } from "@tanstack/react-router";
import { CTA, PageHero } from "@/components/site/ui";
import { FaqList } from "@/components/site/widgets";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "FAQ — Shaz Ventures" },
      { name: "description", content: "Answers on sourcing, countries served, commodities, logistics and long-term supply." },
      { property: "og:title", content: "FAQ — Shaz Ventures" },
      { property: "og:description", content: "Common buyer questions answered." },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions buyers ask us." text="Sourcing, coverage, commodities, logistics and long-term supply agreements." />
      <section className="mx-auto max-w-7xl px-6 py-24"><FaqList photographic /></section>
      <CTA />
    </>
  );
}
