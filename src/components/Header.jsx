import './header.css';

export default function Header({ currentView, onNav }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo" onClick={() => onNav('upload')} style={{ cursor: 'pointer' }}>
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
            Matchify <span className="gradient-text">Jobs</span>
          </span>
        </div>

        <nav className="header-nav" style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => onNav('upload')} 
            className={`btn-nav ${currentView !== 'about' ? 'active' : ''}`}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentView !== 'about' ? '#fff' : 'var(--clr-text-muted)',
              cursor: 'pointer',
              fontWeight: currentView !== 'about' ? '600' : '400',
              transition: 'color 0.2s ease',
              fontSize: '1rem'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => onNav('about')} 
            className={`btn-nav ${currentView === 'about' ? 'active' : ''}`}
            style={{
              background: 'transparent',
              border: 'none',
              color: currentView === 'about' ? '#fff' : 'var(--clr-text-muted)',
              cursor: 'pointer',
              fontWeight: currentView === 'about' ? '600' : '400',
              transition: 'color 0.2s ease',
              fontSize: '1rem'
            }}
          >
            About
          </button>
        </nav>

        {/* Removed redundant header badge to make room for nav, or keep it in mobile menu? Let's just keep it on larger screens. */}
        <div className="header-badge" style={{ display: 'none' }}>
          <span className="pulse-dot" aria-hidden="true" />
          AI-Powered Matching
        </div>
      </div>
    </header>
  );
}
