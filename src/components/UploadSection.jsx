import { useState, useRef, useCallback } from 'react';
import './upload-section.css';

const ACCEPTED_TYPES = [
  'application/pdf',
];
const ACCEPTED_EXT = ['.pdf'];

export default function UploadSection({ onSubmit, isLoading }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (f) => {
    if (!f) return 'No file selected.';
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    if (!ACCEPTED_EXT.includes(ext)) {
      return `Unsupported file type. Please upload a PDF file.`;
    }
    if (f.size > 10 * 1024 * 1024) {
      return 'File too large. Max size is 10 MB.';
    }
    return '';
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setError('');
    setFile(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    handleFile(dropped);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
    e.target.value = '';
  };

  const handleSubmit = () => {
    if (!file) return;
    onSubmit(file);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section className="upload-section">
      <div className="upload-hero animate-fade-in-up">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Powered by n8n AI Workflow
        </div>
        <h1>
          Find Jobs That{' '}
          <span className="gradient-text">Match Your Skills</span>
        </h1>
        <p className="hero-subtitle">
          Upload your resume and our AI analyzes your experience, skills, and background
          to surface the most relevant job opportunities — ranked by fit.
        </p>

        <div className="stats-row stagger-2 animate-fade-in-up">
          <div className="stat-item">
            <span className="stat-value gradient-text">AI-Powered</span>
            <span className="stat-label">Resume Parsing</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value gradient-text">Instant</span>
            <span className="stat-label">Job Matching</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value gradient-text">Smart</span>
            <span className="stat-label">Skill Scoring</span>
          </div>
        </div>
      </div>

      <div
        className={`drop-zone glass-card ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''} stagger-3 animate-fade-in-up`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload resume file"
        onKeyDown={(e) => e.key === 'Enter' && !file && inputRef.current?.click()}
        id="resume-drop-zone"
      >
        <input
          id="resume-file-input"
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXT.join(',')}
          onChange={handleChange}
          aria-label="Select resume file"
          style={{ display: 'none' }}
        />

        {!file ? (
          <div className="drop-idle">
            <div className="drop-icon animate-float" aria-hidden="true">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="28" fill="url(#uploadCircle)" opacity="0.15"/>
                <defs>
                  <linearGradient id="uploadCircle" x1="0" y1="0" x2="56" y2="56">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M28 36V20M28 20L22 26M28 20L34 26" stroke="url(#uploadCircle)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 38h16" stroke="url(#uploadCircle)" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="drop-title">
              {dragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </p>
            <p className="drop-hint">
              or <button className="inline-link" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>browse files</button>
            </p>
            <div className="drop-formats">
              {ACCEPTED_EXT.map((ext) => (
                <span key={ext} className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(148,163,184,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {ext.toUpperCase()}
                </span>
              ))}
              <span className="drop-size-hint">Max 10 MB</span>
            </div>
          </div>
        ) : (
          <div className="file-preview">
            <div className="file-icon" aria-hidden="true">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="url(#fileGrad)" opacity="0.2"/>
                <defs>
                  <linearGradient id="fileGrad" x1="0" y1="0" x2="36" y2="36">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path d="M11 10h9l5 5v11a1 1 0 01-1 1H11a1 1 0 01-1-1V11a1 1 0 011-1z" stroke="url(#fileGrad)" strokeWidth="1.5"/>
                <path d="M19 10v5h5" stroke="url(#fileGrad)" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M14 19h8M14 22h5" stroke="url(#fileGrad)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size text-muted text-sm">{formatSize(file.size)}</span>
            </div>
            <button
              className="file-remove"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              title="Remove file"
              aria-label="Remove file"
              id="remove-file-btn"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error animate-fade-in" role="alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="#f87171" strokeWidth="1.5"/>
            <path d="M8 5v3M8 11v.5" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      <button
        id="analyze-resume-btn"
        className="btn-primary upload-cta stagger-4 animate-fade-in-up"
        onClick={handleSubmit}
        disabled={!file || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Analyzing…
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2L2 7l7 5 7-5-7-5z" fill="white" opacity="0.9"/>
              <path d="M2 12l7 5 7-5" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            Analyze My Resume
          </>
        )}
      </button>

      <p className="upload-disclaimer text-muted text-sm animate-fade-in stagger-5">
        🔒 Your resume is sent securely to our AI pipeline. We don't store your data.
      </p>
    </section>
  );
}
