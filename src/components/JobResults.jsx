import { useState, useMemo } from 'react';
import JobCard from './JobCard';
import './job-results.css';

const FILTERS = ['All', 'Great Match', 'Good Match', 'Fair Match'];
const SORT_OPTIONS = ['Best Match', 'Newest', 'Salary'];

export default function JobResults({ jobs, onReset }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Best Match');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = [...jobs];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.company?.toLowerCase().includes(q) ||
          j.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (activeFilter !== 'All') {
      list = list.filter((j) => {
        if (activeFilter === 'Great Match') return j.score >= 80;
        if (activeFilter === 'Good Match') return j.score >= 60 && j.score < 80;
        return j.score < 60;
      });
    }

    if (sortBy === 'Best Match') list.sort((a, b) => b.score - a.score);

    return list;
  }, [jobs, activeFilter, sortBy, search]);

  return (
    <section className="results-section" aria-label="Job recommendations">
      {/* Results Header */}
      <div className="results-header animate-fade-in-up">
        <div className="results-title-row">
          <div>
            <h2 className="results-title">
              Your <span className="gradient-text">Top Matches</span>
            </h2>
            <p className="results-subtitle text-muted text-sm">
              {jobs.length} jobs found · Ranked by AI match score
            </p>
          </div>
          <button
            id="upload-another-btn"
            className="btn-ghost"
            onClick={onReset}
            aria-label="Upload a different resume"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 1v4M7.5 1L5 3.5M7.5 1L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6.5H2a1 1 0 00-1 1v5a1 1 0 001 1h11a1 1 0 001-1v-5a1 1 0 00-1-1h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Upload Another
          </button>
        </div>

        {/* Filters & Search */}
        <div className="results-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 10.5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              id="job-search-input"
              type="text"
              className="search-input"
              placeholder="Search title, company, skill…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search jobs"
            />
          </div>

          <div className="filter-pills" role="group" aria-label="Filter by match quality">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                id={`filter-${f.toLowerCase().replace(' ', '-')}`}
              >
                {f}
              </button>
            ))}
          </div>

          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort jobs by"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="results-summary animate-fade-in-up stagger-2">
        <SummaryCard
          icon="🎯"
          label="Best Match"
          value={`${Math.max(...jobs.map((j) => j.score), 0)}%`}
          color="var(--clr-success)"
        />
        <SummaryCard
          icon="📊"
          label="Avg Score"
          value={`${Math.round(jobs.reduce((a, j) => a + j.score, 0) / jobs.length)}%`}
          color="var(--clr-primary-light)"
        />
        <SummaryCard
          icon="✨"
          label="Great Matches"
          value={jobs.filter((j) => j.score >= 80).length}
          color="var(--clr-secondary)"
        />
        <SummaryCard
          icon="🏢"
          label="Companies"
          value={new Set(jobs.map((j) => j.company)).size}
          color="var(--clr-accent)"
        />
      </div>

      {/* Jobs Grid */}
      {filtered.length > 0 ? (
        <div className="jobs-grid">
          {filtered.map((job, i) => (
            <JobCard key={job.id || i} job={job} index={i} />
          ))}
        </div>
      ) : (
        <div className="no-results glass-card animate-fade-in">
          <span className="no-results-icon" aria-hidden="true">🔍</span>
          <p>No jobs match your current filters.</p>
          <button className="btn-ghost" onClick={() => { setActiveFilter('All'); setSearch(''); }}>
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

function SummaryCard({ icon, label, value, color }) {
  return (
    <div className="summary-card glass-card">
      <span className="summary-icon" aria-hidden="true">{icon}</span>
      <span className="summary-value" style={{ color }}>{value}</span>
      <span className="summary-label text-muted text-xs">{label}</span>
    </div>
  );
}
