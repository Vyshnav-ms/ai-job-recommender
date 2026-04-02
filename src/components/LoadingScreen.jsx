import { useEffect, useState } from 'react';
import './loading-screen.css';

const STEPS = [
  { icon: '📄', label: 'Parsing your resume', detail: 'Extracting skills, experience & education…' },
  { icon: '🔍', label: 'Searching job boards', detail: 'Scanning thousands of live opportunities…' },
  { icon: '🤖', label: 'AI matching in progress', detail: 'Scoring each role against your profile…' },
  { icon: '✨', label: 'Ranking results', detail: 'Sorting by best fit for you…' },
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 2200;
    const tick = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 3;
      });
    }, 180);

    return () => {
      clearInterval(tick);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="loading-screen animate-fade-in">
      <div className="loading-card glass-card">
        <div className="loading-orb" aria-hidden="true">
          <div className="orb-ring ring-1" />
          <div className="orb-ring ring-2" />
          <div className="orb-ring ring-3" />
          <div className="orb-core">
            <span className="orb-emoji">{STEPS[currentStep].icon}</span>
          </div>
        </div>

        <h2 className="loading-title">Analyzing Your Resume</h2>

        <div className="step-label animate-fade-in" key={currentStep}>
          <span className="step-text">{STEPS[currentStep].label}</span>
          <span className="step-detail text-muted text-sm">{STEPS[currentStep].detail}</span>
        </div>

        <div className="progress-bar-wrap" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${Math.min(progress, 95)}%` }}
            />
          </div>
          <span className="progress-pct text-sm text-muted">{Math.round(Math.min(progress, 95))}%</span>
        </div>

        <div className="steps-list">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`step-item ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}`}
            >
              <div className="step-indicator" aria-hidden="true">
                {i < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3.5 3.5 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i === currentStep ? (
                  <span className="dot-spinner" />
                ) : (
                  <span className="dot-idle" />
                )}
              </div>
              <span className="step-name">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
