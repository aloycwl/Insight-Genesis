import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/logo.svg';
import narrowRightIcon from '../assets/icons/narrow-right.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Insight Genesis" />
            </Link>
            
            <Link to="/insights-form" className="cta-button">
              <span>Get Your Own Insights Now</span>
              <img src={narrowRightIcon} alt="arrow" className="cta-icon" />
            </Link>
          </div>
          
          <div className="footer-links-section">
            <div className="footer-column">
              <h3 className="footer-heading">Solutions</h3>
              <ul className="footer-links">
                <li><Link to="/solutions/decentralized-personal-insights">Decentralized Personal Insight</Link></li>
                <li><Link to="/solutions/finance">Financial Inclusion</Link></li>
                <li><Link to="/solutions/health-wellness">Health & Wellness</Link></li>
                <li><Link to="/solutions/human-resource">Human Resource</Link></li>
                <li><Link to="/solutions/education">Education</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Resource</h3>
              <ul className="footer-links">
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="https://docs.insightgenesis.ai/" target="_blank" rel="noopener noreferrer">Docs</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Contact</h3>
              <ul className="footer-links">
                <li><a href="https://www.linkedin.com/company/insight-genesis" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://t.me/InsightGenesisAi" target="_blank" rel="noopener noreferrer">Telegram Channel</a></li>
                <li><a href="https://t.me/InsightGenesis" target="_blank" rel="noopener noreferrer">Telegram Group Chat</a></li>
                <li><a href="https://x.com/genesis_insight" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                <li><a href="mailto:IGAi@insightgenesis.ai" target="_blank">IGAi@insightgenesis.ai</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-links">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms Of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2025 Insight Genesis</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 