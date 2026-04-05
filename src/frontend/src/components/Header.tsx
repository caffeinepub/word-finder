import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
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
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        background: "rgba(255,255,255,0.92)",
        borderColor: "var(--becat-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-14">
          {/* Desktop Nav — centered */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-5 py-2.5 rounded-full text-[15px] font-semibold tracking-wide transition-all duration-200 hover:bg-orange-50 hover:text-orange-600"
                style={{ color: "var(--becat-text-muted)" }}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile: show nav label + hamburger */}
          <div className="md:hidden flex items-center justify-between w-full">
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: "var(--becat-text-muted)" }}
            >
              Navigate
            </span>
            <button
              type="button"
              className="p-2.5 rounded-lg transition-colors hover:bg-secondary"
              style={{ color: "var(--becat-text)" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
            className="md:hidden border-t overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.97)",
              borderColor: "var(--becat-border)",
            }}
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
                  className="px-5 py-3.5 rounded-xl text-base font-semibold transition-colors hover:bg-orange-50 hover:text-orange-600"
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
