import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        background: "var(--becat-text)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div
              className="flex items-center gap-3 font-display font-bold text-2xl mb-2"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              <span className="text-2xl">🐱</span>
              <span>BeCat.Tech</span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Your purr-fect search destination
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:opacity-70 hover:bg-white/10"
              aria-label="Twitter/X"
              onClick={() => {}}
            >
              <svg
                width="24"
                height="24"
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
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:opacity-70 hover:bg-white/10"
              aria-label="Instagram"
              onClick={() => {}}
            >
              <svg
                width="24"
                height="24"
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
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:opacity-70 hover:bg-white/10"
              aria-label="Facebook"
              onClick={() => {}}
            >
              <svg
                width="24"
                height="24"
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
        <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
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
              className="text-sm py-1 transition-colors hover:text-white"
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
          className="mb-6"
        />

        {/* Copyright */}
        <div className="flex items-center justify-center">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
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
        </div>
      </div>
    </footer>
  );
}
