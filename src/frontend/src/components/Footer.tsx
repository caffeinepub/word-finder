import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer
      className="py-8"
      style={{
        background: "var(--becat-text)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-2 font-display font-bold text-lg mb-1"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              <span>🐱</span>
              <span>BeCat.Tech</span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Your purr-fect search destination
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <button
              type="button"
              className="transition-opacity hover:opacity-70"
              aria-label="Twitter/X"
              onClick={() => {}}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label="Twitter/X"
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </button>
            {/* Instagram */}
            <button
              type="button"
              className="transition-opacity hover:opacity-70"
              aria-label="Instagram"
              onClick={() => {}}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label="Instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </button>
            {/* Facebook */}
            <button
              type="button"
              className="transition-opacity hover:opacity-70"
              aria-label="Facebook"
              onClick={() => {}}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label="Facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {[
            { label: "About", note: "Created by Shahed" },
            { label: "How Search Works" },
            { label: "Privacy Policy" },
            { label: "Terms of Service" },
            { label: "Settings" },
            { label: "FAQ" },
          ].map((link) => (
            <button
              key={link.label}
              type="button"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
              title={link.note}
              onClick={() => {}}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Separator
          style={{ background: "rgba(255,255,255,0.12)" }}
          className="mb-5"
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            <a
              href="https://shahed.gt.tc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-semibold"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Shahed
            </a>{" "}
            © 2026 BeCat.Tech
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "becat.tech")}`}
              className="hover:opacity-80 transition-opacity"
              style={{ color: "rgba(255,255,255,0.45)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
