import { createFileRoute } from "@tanstack/react-router";
import port from "@/assets/port.jpg";
import { CTA, PageHero, Reveal, SectionHead } from "@/components/site/ui";
import { RegionMap, SupplyRoute } from "@/components/site/widgets";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Supply Chain & Logistics — Shaz Ventures" },
      { name: "description", content: "Road and sea logistics, shipment planning, customs coordination and delivery management." },
      { property: "og:title", content: "Supply Chain & Logistics — Shaz Ventures" },
      { property: "og:description", content: "Bulk mineral movements coordinated from port to plant." },
    ],
  }),
  component: Logistics,
});

function Logistics() {
  return (
    <>
      <PageHero
        eyebrow="Supply chain & logistics"
        title={<>Port to plant, <span className="text-copper">coordinated.</span></>}
        text="Road and sea logistics, shipment planning, customs coordination and delivery management — aligned with your production schedule."
        visual={<img src={port} alt="Shaz team on the deck of a bulk vessel at the quay" width={1600} height={912} className="h-full w-full rounded-xl object-cover shadow-deep" />}
      />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHead eyebrow="Shipment stages" title="Every movement, planned." />
        <div className="mt-12"><SupplyRoute stages={["Shipment planning", "Sea freight", "Port handling", "Customs", "Road delivery"]} /></div>
      </section>
      <section className="border-y border-border bg-graphite">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <Reveal><SectionHead eyebrow="Corridors" title="Cross-border distribution." /></Reveal>
          <div className="mt-12"><RegionMap /></div>
        </div>
      </section>
      <CTA />
    </>
  );
}
