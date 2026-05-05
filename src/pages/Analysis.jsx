import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Analysis.css';

const Analysis = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');

    // Save the prompt to clear later if we wanted, but we will clear it now per requirements
    const currentPrompt = prompt;
    setPrompt('');

    try {
      // NOTE: Original request was for https://api.insightgenesis.ai/infer
      // but testing shows that endpoint returns 404, while the replit dev url works.
      // The user gave this url in point 6 of clarification:
      // https://84de2f23-f24e-4856-8f31-861f73ec3a0f-00-15zf3zz06a3mh.kirk.replit.dev/infer
      const res = await fetch('https://84de2f23-f24e-4856-8f31-861f73ec3a0f-00-15zf3zz06a3mh.kirk.replit.dev/infer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth': 'c5UqVPihwtydCKe57YJPtpyE2ryB9AJn'
        },
        body: JSON.stringify({ query: currentPrompt })
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const textData = await res.text();
      setResponse(textData);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <h1 className="analysis-title">Insight Analysis</h1>
        <p className="analysis-subtitle">Enter your prompt below to get AI-powered insights</p>

        <div className="analysis-examples">
          <p>
            SQL example:{' '}
            <span className="example-text" onClick={() => setPrompt('What is the average heart rate?')}>"What is the average heart rate?"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('What is the average stress score?')}>"What is the average stress score?"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('What is the correlation between heart rate and wellness?')}>"What is the correlation between heart rate and wellness?"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('How many health records are there?')}>"How many health records are there?"</span>
          </p>
          <p>
            NoSQL example:{' '}
            <span className="example-text" onClick={() => setPrompt('Show records with high heart rate and stress')}>"Show records with high heart rate and stress"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('Find similar cases with low wellness score')}>"Find similar cases with low wellness score"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('What patterns exist in high cardiovascular risk data?')}>"What patterns exist in high cardiovascular risk data?"</span>,{' '}
            <span className="example-text" onClick={() => setPrompt('Are there similar records with abnormal vital signs?')}>"Are there similar records with abnormal vital signs?"</span>
          </p>
        </div>

        <form className="analysis-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <textarea
              className="analysis-input"
              placeholder="Ask me anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              rows={1}
            />
            <button
              type="submit"
              className={`analysis-submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </form>

        <div className="analysis-feedback-area">
          {loading && (
            <div className="analysis-loading-text">Analyzing your prompt...</div>
          )}

          {error && (
            <div className="analysis-error-text">{error}</div>
          )}
        </div>

        {response && !loading && !error && (
          <div className="analysis-result">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
