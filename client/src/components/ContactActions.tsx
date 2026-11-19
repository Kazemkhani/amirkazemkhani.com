import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

/** Shared direct contact destinations for the persistent bar and contact sections. */
export default function ContactActions({ floating = false }: { floating?: boolean }) {
  return (
    <nav
      className={`contact-actions${floating ? " contact-dock" : ""}`}
      aria-label={floating ? "Contact Amir" : "Start a conversation"}
    >
      <a
        className="contact-action contact-whatsapp"
        href="https://wa.me/qr/THFRKE4E4OKSL1?s=r"
        target="_blank"
        rel="noopener noreferrer"
        data-track="contact_whatsapp"
      >
        <MessageCircle size={19} aria-hidden="true" />
        <span>WhatsApp me</span>
        <ArrowUpRight className="contact-arrow" size={16} aria-hidden="true" />
      </a>
      <a
        className="contact-action contact-email"
        href="mailto:amir@amirkazemkhani.com"
        data-track="contact_email"
      >
        <Mail size={19} aria-hidden="true" />
        <span>Email me</span>
        <ArrowUpRight className="contact-arrow" size={16} aria-hidden="true" />
      </a>
    </nav>
  );
}
