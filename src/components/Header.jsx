import './header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)" />
              <path d="M7 9h14M7 14h10M7 19h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="19" r="3" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span className="logo-text">
            Job<span className="gradient-text">Match</span> AI
          </span>
        </div>

        <div className="header-badge">
          <span className="pulse-dot" aria-hidden="true" />
          AI-Powered Matching
        </div>
      </div>
    </header>
  );
}
