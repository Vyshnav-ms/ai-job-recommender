import { useState } from 'react';
import './app.css';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import LoadingScreen from './components/LoadingScreen';
import JobResults from './components/JobResults';

// ── n8n webhook URL from env (set VITE_N8N_WEBHOOK_URL in .env) ──
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

// ── Mock data for UI testing (used when no webhook URL is configured) ──
const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Vercel',
    location: 'Remote',
    score: 94,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    description: 'Join our team to build the future of web development tooling. You will own large features end-to-end and collaborate with top engineers.',
    url: 'https://vercel.com/careers',
    salary: '$140k – $180k',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Linear',
    location: 'San Francisco, CA',
    score: 87,
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
    description: 'Build beautiful, high-performance software tools. We are a small team with high standards for design and engineering quality.',
    url: 'https://linear.app/careers',
    salary: '$120k – $160k',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'Loom',
    location: 'Remote',
    score: 81,
    skills: ['React', 'Redux', 'JavaScript', 'CSS', 'REST APIs'],
    description: 'Help build the world\'s best async video messaging product. Fast-paced, collaborative team with a user-first mindset.',
    url: 'https://loom.com/careers',
    salary: '$110k – $145k',
    type: 'Full-time',
  },
  {
    id: 4,
    title: 'UI Engineer',
    company: 'Figma',
    location: 'New York, NY',
    score: 76,
    skills: ['React', 'WebGL', 'Canvas API', 'TypeScript', 'Performance'],
    description: 'Work on the rendering engine and UI systems that power Figma\'s collaborative design tool used by millions.',
    url: 'https://figma.com/careers',
    salary: '$130k – $170k',
    type: 'Full-time',
  },
  {
    id: 5,
    title: 'JavaScript Developer',
    company: 'Notion',
    location: 'Remote',
    score: 70,
    skills: ['JavaScript', 'React', 'Electron', 'IndexedDB', 'Node.js'],
    description: 'Build the all-in-one workspace that millions of teams rely on. You\'ll work across web and desktop platforms.',
    url: 'https://notion.so/careers',
    salary: '$100k – $135k',
    type: 'Full-time',
  },
  {
    id: 6,
    title: 'Software Engineer – Frontend',
    company: 'Stripe',
    location: 'Dublin, Ireland',
    score: 65,
    skills: ['React', 'TypeScript', 'GraphQL', 'Testing', 'Accessibility'],
    description: 'Design and build the financial infrastructure of the internet. Work with world-class engineers on challenging, impactful problems.',
    url: 'https://stripe.com/jobs',
    salary: '€90k – €120k',
    type: 'Full-time',
  },
];

const VIEW = { UPLOAD: 'upload', LOADING: 'loading', RESULTS: 'results', ERROR: 'error' };

export default function App() {
  const [view, setView] = useState(VIEW.UPLOAD);
  const [jobs, setJobs] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpload = async (file) => {
    setView(VIEW.LOADING);
    setErrorMsg('');

    // ── If no webhook configured, use mock data after a delay ──
    if (!WEBHOOK_URL || WEBHOOK_URL.includes('your-n8n-instance')) {
      setTimeout(() => {
        setJobs(MOCK_JOBS);
        setView(VIEW.RESULTS);
      }, 9000); // simulate n8n processing time
      return;
    }

    try {
      const formData = new FormData();
      formData.append('data', file);
      formData.append('filename', file.name);

      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      // Support both { jobs: [...] } and a raw array
      const jobList = Array.isArray(data) ? data : data.jobs;

      if (!Array.isArray(jobList) || jobList.length === 0) {
        throw new Error('No jobs returned from the server. Check your n8n workflow output.');
      }

      setJobs(jobList);
      setView(VIEW.RESULTS);
    } catch (err) {
      console.error('Resume upload error:', err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setView(VIEW.ERROR);
    }
  };

  const handleReset = () => {
    setJobs([]);
    setView(VIEW.UPLOAD);
    setErrorMsg('');
  };

  return (
    <div className="app-wrapper">
      <Header />

      <main className="app-main" id="main-content">
        {view === VIEW.UPLOAD && (
          <UploadSection onSubmit={handleUpload} isLoading={false} />
        )}

        {view === VIEW.LOADING && <LoadingScreen />}

        {view === VIEW.RESULTS && (
          <JobResults jobs={jobs} onReset={handleReset} />
        )}

        {view === VIEW.ERROR && (
          <div className="error-screen animate-fade-in">
            <div className="error-card glass-card">
              <div className="error-icon" aria-hidden="true">⚠️</div>
              <h2>Something went wrong</h2>
              <p className="text-muted">{errorMsg}</p>
              <button id="try-again-btn" className="btn-primary" onClick={handleReset}>
                Try Again
              </button>
              <details className="error-details text-sm text-muted">
                <summary>Troubleshooting tips</summary>
                <ul>
                  <li>Make sure your n8n webhook is active and the URL in <code>.env</code> is correct.</li>
                  <li>The n8n workflow must return: <code>{"{ jobs: [...] }"}</code></li>
                  <li>Check CORS settings in your n8n instance (allow all origins or your dev URL).</li>
                </ul>
              </details>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p className="text-muted text-sm">
          Built with <span style={{ color: 'var(--clr-accent)' }}>♥</span> using React + n8n AI Workflows
        </p>
      </footer>
    </div>
  );
}
