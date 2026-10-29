export type Mineral = {
  slug: string;
  name: string;
  headline: string;
  intro: string;
  overview: string;
  applications: { title: string; text: string }[];
  requirements: string[];
  /** visual parameters for the 3D specimen */
  look: { color: string; roughness: number; metalness: number; detail: number; shape: "rock" | "nodules" | "crystal" | "strata" };
};

export const minerals: Mineral[] = [
  {
    slug: "thermal-coal",
    name: "Thermal Coal",
    headline: "Dependable energy input for heavy industry.",
    intro: "Thermal coal sourced and coordinated for cement kilns, power generation and industrial boilers.",
    overview:
      "Thermal coal remains a key energy source for cement production, manufacturing and utilities across East Africa. We work with qualified suppliers to match calorific value, ash and moisture to your process requirements.",
    applications: [
      { title: "Cement kilns", text: "Fuel for clinker production in rotary kilns." },
      { title: "Power & utilities", text: "Steam generation for captive and grid power." },
      { title: "Industrial boilers", text: "Process heat for manufacturing and agro-processing." },
    ],
    requirements: ["Calorific value (GAR/NAR)", "Ash and sulphur content", "Total moisture", "Size fraction", "Quantity and delivery schedule"],
    look: { color: "#1c1d21", roughness: 0.35, metalness: 0.25, detail: 0.32, shape: "rock" },
  },
  {
    slug: "clinker",
    name: "Clinker",
    headline: "The core of every bag of cement.",
    intro: "Portland cement clinker supplied to grinding plants and cement manufacturers.",
    overview:
      "Clinker is the nodular intermediate product of cement kilns, ground with gypsum to produce cement. Reliable clinker supply allows grinding operations to keep running and scale output to demand.",
    applications: [
      { title: "Cement grinding", text: "Primary input for grinding and blending plants." },
      { title: "Blended cements", text: "Combined with pozzolans, slag or limestone." },
      { title: "Construction supply", text: "Supports regional infrastructure build-out." },
    ],
    requirements: ["C3S / C2S content", "Free lime", "LOI and insoluble residue", "Nodule size", "Quantity and delivery schedule"],
    look: { color: "#4a4540", roughness: 0.95, metalness: 0.05, detail: 0.22, shape: "nodules" },
  },
  {
    slug: "iron-ore",
    name: "Iron Ore",
    headline: "Raw strength for steel and metal processing.",
    intro: "Iron ore sourced for steel mills, foundries and metal processors.",
    overview:
      "Iron ore is the foundational input for steelmaking. We coordinate sourcing of lump and fines to agreed Fe content and impurity limits, with logistics aligned to plant schedules.",
    applications: [
      { title: "Steelmaking", text: "Feedstock for integrated and mini-mill operations." },
      { title: "Foundries", text: "Iron input for casting and fabrication." },
      { title: "Cement additive", text: "Used as an iron corrective in raw meal." },
    ],
    requirements: ["Fe content", "Silica, alumina, phosphorus", "Lump or fines", "Moisture", "Quantity and delivery schedule"],
    look: { color: "#5a2e22", roughness: 0.55, metalness: 0.6, detail: 0.28, shape: "rock" },
  },
  {
    slug: "gypsum",
    name: "Gypsum",
    headline: "Setting control for cement and beyond.",
    intro: "Natural gypsum for cement manufacturing, plaster, board and agriculture.",
    overview:
      "Gypsum regulates the setting time of cement and is essential to plaster, drywall and soil conditioning. We source gypsum to purity and particle specifications agreed with each customer.",
    applications: [
      { title: "Cement production", text: "Set retarder interground with clinker." },
      { title: "Plaster & board", text: "Base material for building finishes." },
      { title: "Agriculture", text: "Soil conditioner supplying calcium and sulphur." },
    ],
    requirements: ["Purity (CaSO4·2H2O)", "Particle size", "Moisture", "Quantity and handling", "Delivery schedule"],
    look: { color: "#e8e3d8", roughness: 0.25, metalness: 0.0, detail: 0.12, shape: "crystal" },
  },
  {
    slug: "lithium",
    name: "Lithium",
    headline: "Supporting the region's energy transition.",
    intro: "Lithium-bearing ore and concentrate for processors and offtake partners.",
    overview:
      "Lithium is a critical input for batteries and energy storage. We focus on lithium-bearing ore and concentrate — distinct from processed lithium compounds — sourced through qualified partners.",
    applications: [
      { title: "Battery supply chains", text: "Feedstock for downstream lithium processing." },
      { title: "Ceramics & glass", text: "Flux for specialist ceramics and glassware." },
      { title: "Industrial offtake", text: "Concentrate for international processors." },
    ],
    requirements: ["Li2O grade", "Iron and impurity limits", "Ore or concentrate form", "Quantity", "Destination and schedule"],
    look: { color: "#b9a6b0", roughness: 0.4, metalness: 0.15, detail: 0.2, shape: "crystal" },
  },
  {
    slug: "limestone",
    name: "Limestone",
    headline: "A versatile foundation for industry.",
    intro: "Limestone for cement raw meal, construction aggregates and industrial processing.",
    overview:
      "Limestone is the primary raw material for cement and lime, and widely used in construction, steel fluxing and water treatment. Supply is matched to CaCO3 content and grading needs.",
    applications: [
      { title: "Cement raw meal", text: "Main calcium source in kiln feed." },
      { title: "Construction", text: "Aggregates and building stone." },
      { title: "Steel & processing", text: "Flux and neutralising agent." },
    ],
    requirements: ["CaCO3 content", "MgO and silica", "Grading / particle size", "Moisture", "Quantity and delivery schedule"],
    look: { color: "#cfc6b4", roughness: 0.9, metalness: 0.0, detail: 0.18, shape: "strata" },
  },
];

export const capabilities = [
  "Safety, Health & Environmental Excellence",
  "Strategic Mineral Sourcing",
  "Supply Chain & Logistics Excellence",
  "Customer & Market Leadership",
  "Operational Excellence",
  "Governance, Risk & Compliance",
  "People & Leadership",
  "Innovation & Digital Capability",
];

export const industries = [
  { name: "Cement", text: "Clinker, gypsum, limestone, coal and iron correctives for kilns and grinding plants." },
  { name: "Steel & Metal Processing", text: "Iron ore and fluxing minerals for mills and foundries." },
  { name: "Construction & Infrastructure", text: "Material inputs supporting roads, housing and public works." },
  { name: "Manufacturing", text: "Industrial minerals and process fuels for production lines." },
  { name: "Energy & Utilities", text: "Thermal coal and transition minerals for power and storage." },
  { name: "Mining & Mineral Processing", text: "Ore and concentrate trading with processing partners." },
];

export const countries = [
  { name: "Kenya", note: "Headquarters in Nairobi. Coordination hub for regional trade.", x: 72, y: 42 },
  { name: "Uganda", note: "Industrial customers served via the Northern Corridor.", x: 44, y: 36 },
  { name: "Rwanda", note: "Cross-border distribution to construction and manufacturing.", x: 32, y: 52 },
  { name: "Tanzania", note: "Port and road logistics via the Central Corridor.", x: 56, y: 70 },
];

export const services = [
  { title: "Mineral Sourcing", text: "Identifying and qualifying suppliers that meet your specifications." },
  { title: "Commodity Trading", text: "Structured commercial agreements for spot and term supply." },
  { title: "Supply-Chain Coordination", text: "Aligning production, inspection and shipment timelines." },
  { title: "Logistics & Transport", text: "Road and sea movements planned around your plant schedule." },
  { title: "Cross-Border Distribution", text: "Delivery across East African borders with documentation support." },
];

export const faqs = [
  { q: "Which minerals do you supply?", a: "Thermal coal, clinker, iron ore, gypsum, lithium and limestone. Other minerals may be sourced on request, subject to confirmation." },
  { q: "Which countries do you serve?", a: "We serve industrial customers across East Africa, including Kenya, Uganda, Rwanda and Tanzania." },
  { q: "Where are your minerals sourced from?", a: "Sources vary by commodity and are confirmed during commercial discussion against your specification." },
  { q: "Do you handle logistics?", a: "Yes. We coordinate road and sea logistics, shipment planning, customs documentation and delivery management." },
  { q: "Can we agree long-term supply?", a: "Yes. We welcome long-term supply agreements built around agreed specifications, volumes and schedules." },
  { q: "How do I request a quote?", a: "Use the enquiry form with your mineral, specifications, quantity and destination and our team will respond." },
];

export const insights = [
  { tag: "Commodity explainer", title: "Why clinker supply shapes cement output in East Africa", date: "Sep 2026" },
  { tag: "Regional insight", title: "Corridor logistics: moving bulk minerals from port to plant", date: "Aug 2026" },
  { tag: "Company update", title: "Shaz Ventures expands supply coordination across the region", date: "Jul 2026" },
];
