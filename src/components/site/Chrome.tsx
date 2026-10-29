import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { minerals } from "@/lib/content";
import logo from "@/assets/shaz-logo.png";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useMotionFrame } from './MotionSystem';
import { mineralPhotos } from '@/lib/mineral-media';
import { ResponsiveImage } from './ResponsiveImage';

const groups = [
  { label: "Company", links: [{ to: "/about", label: "About" }, { to: "/leadership", label: "Leadership" }, { to: "/why", label: "Why Shaz" }, { to: "/sustainability", label: "Sustainability" }] },
  { label: "Products", links: [{ to: "/products", label: "All minerals" }] },
  { label: "Solutions", links: [{ to: "/services", label: "Services" }, { to: "/industries", label: "Industries" }, { to: "/logistics", label: "Supply Chain & Logistics" }, { to: "/quality", label: "Quality Assurance" }] },
  { label: "Resources", links: [{ to: "/insights", label: "Insights" }, { to: "/faq", label: "FAQ" }] },
] as const;

export function BrandLogo({ className }: { className?: string }) {
  return <img src={logo} alt="Shaz Ventures Limited" width={200} height={98} className={cn("h-14 w-auto shrink-0 object-contain", className)} />;
}

function MenuGroup({ group, onNavigate }: { group: typeof groups[number]; onNavigate?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="justify-between text-[var(--header-muted)] hover:text-[var(--header-foreground)] data-[state=open]:text-primary">
          {group.label}<ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={12} className="site-dropdown z-[60] w-64 border-[var(--header-border)] bg-[var(--header-bg)] p-2 text-[var(--header-foreground)]">
        {group.links.map((link) => <DropdownMenuItem asChild key={link.to}><Link to={link.to} onClick={onNavigate} className="px-3 py-3" activeProps={{ className: "text-primary" }}>{link.label}</Link></DropdownMenuItem>)}
        {group.label === "Products" && <><DropdownMenuSeparator />{minerals.map((mineral, index) => <DropdownMenuItem asChild key={mineral.slug}><Link to="/products/$slug" params={{ slug: mineral.slug }} onClick={onNavigate} className="mineral-menu-item px-3 py-3"><ResponsiveImage src={mineralPhotos[index]} width={48} height={48} alt="" loading="lazy" sizes="48px" />{mineral.name}</Link></DropdownMenuItem>)}</>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionFrame(({ scroll }) => setScrolled(scroll > 20));
  return (
    <header data-scrolled={scrolled} data-open={open} className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Shaz Ventures home" className="flex items-center" onClick={() => setOpen(false)}>
          <BrandLogo />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
          {groups.map((group) => <MenuGroup key={group.label} group={group} />)}
          <Button asChild><Link to="/contact">Enquire</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col gap-2 px-6 pb-6 md:hidden">
          {groups.map((group) => <MenuGroup key={group.label} group={group} onNavigate={() => setOpen(false)} />)}
          <Button asChild><Link to="/contact" onClick={() => setOpen(false)}>Enquire</Link></Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-border bg-graphite">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" aria-label="Shaz Ventures home" className="footer-logo inline-flex items-center rounded px-4 py-3"><BrandLogo /></Link>
          <p className="mt-3 text-sm text-muted-foreground">Regional mineral sourcing, trading and supply-chain partner. Nairobi, Kenya. Est. 2020.</p>
        </div>
        <div>
          <p className="eyebrow">Minerals</p>
          <ul className="mt-4 space-y-2 text-sm">
            {minerals.map((m) => (
              <li key={m.slug}><Link to="/products/$slug" params={{ slug: m.slug }} className="text-muted-foreground hover:text-foreground">{m.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/leadership" className="hover:text-foreground">Leadership</Link></li>
            <li><Link to="/why" className="hover:text-foreground">Why Shaz Ventures</Link></li>
            <li><Link to="/logistics" className="hover:text-foreground">Supply Chain & Logistics</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <p className="mt-4 text-sm text-muted-foreground">P.O. Box 85-00610, Parkside Towers, Third Floor, Mombasa Road, Nairobi, Kenya</p>
          <p className="mt-2 text-sm text-muted-foreground">For Enquiry: <a href="tel:+254733803508" className="hover:text-foreground">+254 733 803 508</a><br />info@shazvltd.com</p>
          <Link to="/contact" className="mt-4 inline-block text-sm font-semibold text-primary">Send an enquiry →</Link>
        </div>
      </div>
      <p className="border-t border-border py-6 text-center font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Shaz Ventures Limited</p>
    </footer>
  );
}
