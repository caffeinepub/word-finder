import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

const FOOTER_LINKS = [
  "About",
  "How Search Works",
  "Privacy Policy",
  "Terms of Service",
  "Settings",
  "FAQ",
];

export function Footer() {
  return (
    <footer
      className="py-12 sm:py-16"
      style={{
        background: "var(--becat-text)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Brand */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="text-3xl sm:text-4xl">🐱</span>
            <span
              className="font-bold text-2xl sm:text-3xl tracking-tight"
              style={{
                color: "rgba(255,255,255,0.97)",
                fontFamily: "var(--font-display)",
              }}
            >
              BeCat.Tech
            </span>
          </div>
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.48)" }}
          >
            Your purr-fect search destination
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mb-8"
          aria-label="Footer navigation"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FOOTER_LINKS.map((label, index) => (
            <span key={label} className="flex items-center gap-4">
              <button
                type="button"
                className="text-sm sm:text-base font-medium transition-colors hover:opacity-80 focus:outline-none focus-visible:opacity-80"
                style={{ color: "#ffffff" }}
                onClick={() => {}}
                data-ocid="nav.link"
              >
                {label}
              </button>
              {index < FOOTER_LINKS.length - 1 && (
                <span
                  className="text-xs select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.nav>

        <Separator
          style={{ background: "rgba(255,255,255,0.09)" }}
          className="mb-6"
        />

        {/* Copyright */}
        <div className="text-center">
          <p
            className="text-sm sm:text-base"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            <a
              href="https://shahed.gt.tc/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Shahed
            </a>{" "}
            © 2026 BeCat.Tech
          </p>
        </div>
      </div>
    </footer>
  );
}
