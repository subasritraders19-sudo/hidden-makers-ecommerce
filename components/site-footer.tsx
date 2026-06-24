import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  {
    href: "https://instagram.com/Hidden_makers",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/search/top?q=Subasri%20Traders",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://youtube.com/@subasritraders19?si=g7w2kkLalB41arZt",
    label: "YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://wa.me/919677434383",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-primary">
              HIDDEN
            </span>
            <span className="font-serif text-xl font-light">
              MAKERS
            </span>
          </div>

          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Crafted with Tradition. Delivered with Style.
          </p>

          {/* SOCIAL ICONS */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-serif text-lg">Quick Links</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-2">
          <h3 className="font-serif text-lg">Get in Touch</h3>

          <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@hiddenmakers.com" className="hover:text-primary">
                info@hiddenmakers.com
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary mt-0.5" />
              <span>
                Subasri Traders, Pudukottai - 614616, Tamil Nadu
              </span>
            </li>

          </ul>
        </div>

      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Hidden Makers · Subasri Traders
      </div>

    </footer>
  );
}