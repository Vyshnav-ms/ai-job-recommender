import React from 'react';
// import './about.css';

export default function AboutSection() {
  return (
    <div className="about-section animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          About Matchify Jobs
        </h2>
        
        <p className="text-muted" style={{ lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Matchify Jobs is an AI-powered resume matcher designed to streamline your job search process. By leveraging advanced artificial intelligence through n8n workflows, we analyze your resume to give you tailored job recommendations.
        </p>

        <p className="text-muted" style={{ lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Our mission is to bridge the gap between talented individuals and their ideal roles, saving both job seekers and recruiters valuable time by extracting skills down to the granular level.
        </p>

        <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>How it Works</h3>
        
        <ul className="text-muted" style={{ lineHeight: '1.8', listStyleType: 'disc', paddingLeft: '1.5rem', fontSize: '1.05rem', marginBottom: '2rem' }}>
          <li><strong>Upload:</strong> Simply upload your latest resume in PDF or Word format.</li>
          <li><strong>Analyze:</strong> Our AI securely parses your experience, skills, and education.</li>
          <li><strong>Match:</strong> We compare your profile against current job market opportunities.</li>
          <li><strong>Discover:</strong> Browse curated job listings tailored specifically to your background.</li>
        </ul>

        <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Privacy & Security</h3>
        <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
          Your privacy is our utmost priority. Resumes uploaded to Matchify Jobs are processed dynamically and are not stored permanently. We only use your data for the duration of the matching session to ensure your personal information remains safe.
        </p>
      </div>
    </div>
  );
}
