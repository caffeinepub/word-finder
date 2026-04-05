import { Cat, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Search", href: "#search" },
  { label: "Gallery", href: "#gallery" },
  { label: "News", href: "#news" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Breeds", href: "#breeds" },
  { label: "Community", href: "#community" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b"
      style={{ borderColor: "var(--becat-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            type="button"
            className="flex items-center gap-2 font-display font-bold text-xl"
            style={{ color: "var(--becat-text)" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-ocid="nav.link"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm"
              style={{ background: "var(--becat-accent)" }}
            >
              <Cat size={16} />
            </span>
            <span>
              BeCat<span style={{ color: "var(--becat-accent)" }}>.Tech</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-secondary"
                style={{ color: "var(--becat-text-muted)" }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--becat-text-muted)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "var(--becat-accent)" }}
              >
                😺
              </div>
              <span className="font-medium">Cat Lover</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--becat-text)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t overflow-hidden bg-white"
            style={{ borderColor: "var(--becat-border)" }}
          >
            <nav
              className="px-4 py-3 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-secondary"
                  style={{ color: "var(--becat-text)" }}
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
