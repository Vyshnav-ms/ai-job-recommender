import './job-card.css';

const getScoreClass = (score) => {
  if (score >= 80) return 'score-high';
  if (score >= 60) return 'score-mid';
  return 'score-low';
};

const getScoreLabel = (score) => {
  if (score >= 80) return 'Great Match';
  if (score >= 60) return 'Good Match';
  return 'Fair Match';
};

export default function JobCard({ job, index }) {
  const scoreClass = getScoreClass(job.score);
  const scoreLabel = getScoreLabel(job.score);

  return (
    <article
      className="job-card glass-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="job-card-top">
        <div className="job-company-logo" aria-hidden="true">
          {job.logo ? (
            <img src={job.logo} alt={job.company} />
          ) : (
            <span className="logo-fallback">
              {(job.company || '?').charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="job-meta">
          <h3 className="job-title">{job.title}</h3>
          <div className="job-company-row">
            <span className="job-company">{job.company}</span>
            {job.location && (
              <>
                <span className="meta-sep" aria-hidden="true">·</span>
                <span className="job-location">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5 2.5 7.25 6 11 6 11s3.5-3.75 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="6" cy="4.5" r="1.25" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  {job.location}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="score-area">
          <div className={`score-ring ${scoreClass}`} aria-label={`Match score: ${job.score}%`}>
            <svg viewBox="0 0 36 36" className="score-svg">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(job.score / 100) * 94.25} 94.25`}
                strokeDashoffset="23.5"
                className="score-arc"
              />
            </svg>
            <span className="score-num">{job.score}</span>
          </div>
          <span className={`badge ${scoreClass}`}>{scoreLabel}</span>
        </div>
      </div>

      {job.description && (
        <p className="job-description text-muted text-sm">{job.description}</p>
      )}

      {job.skills && job.skills.length > 0 && (
        <div className="job-skills" role="list" aria-label="Required skills">
          {job.skills.slice(0, 6).map((skill, i) => (
            <span key={i} className="skill-tag" role="listitem">{skill}</span>
          ))}
          {job.skills.length > 6 && (
            <span className="skill-overflow text-muted text-xs">+{job.skills.length - 6} more</span>
          )}
        </div>
      )}

      <div className="job-card-footer">
        {job.salary && (
          <span className="job-salary">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6.5 3.5v.8M6.5 8.7v.8M4.5 7c0 .55.45 1 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {job.salary}
          </span>
        )}

        {job.type && (
          <span className="job-type-badge">
            {job.type}
          </span>
        )}

        <a
          href={job.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary apply-btn"
          id={`apply-btn-${index}`}
          aria-label={`Apply for ${job.title} at ${job.company}`}
        >
          Apply Now
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  );
}
