import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import GetAIInsight from './pages/GetAIInsight';
import Staking from './pages/Staking';
import Resource from './pages/Resource';
import FAQ from './pages/FAQ';
import Finance from './pages/solutions/Finance';
import HealthWellness from './pages/solutions/HealthWellness';
import HumanResource from './pages/solutions/HumanResource';
import Education from './pages/solutions/Education';
import DecentralizedPersonalInsights from './pages/solutions/DecentralizedPersonalInsights';
import InsightForm from './pages/form/InsightForm';
import Profile from './pages/form/Profile';
import FaceAnalysis from './pages/form/FaceAnalysis';
import VideoAnalysis from './pages/form/VideoAnalysis';
import DigitalFootprint from './pages/form/DigitalFootprint';
import Result from './pages/form/Result';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<About />} />
            <Route path="/" element={<GetAIInsight />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/" element={<Resource />} />
            {/* Blog route temporarily disabled */}
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/solutions/finance" element={<Finance />} />
            <Route path="/solutions/health-wellness" element={<HealthWellness />} />
            <Route path="/solutions/human-resource" element={<HumanResource />} />
            <Route path="/solutions/education" element={<Education />} />
            <Route path="/solutions/decentralized-personal-insights" element={<DecentralizedPersonalInsights />} />
            
            {/* Protected Routes - Form and its sub-routes */}
            <Route path="/insights-form" element={
              <ProtectedRoute>
                <InsightForm />
              </ProtectedRoute>
            } />
            <Route path="/insights-form/face-analysis" element={
              <ProtectedRoute>
                <FaceAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/insights-form/video-analysis" element={
              <ProtectedRoute>
                <VideoAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/insights-form/digital-footprint" element={
              <ProtectedRoute>
                <DigitalFootprint />
              </ProtectedRoute>
            } />
            <Route path="/insights-form/result" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
            
            {/* Profile Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/face-analysis" element={
              <ProtectedRoute>
                <FaceAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/profile/video-analysis" element={
              <ProtectedRoute>
                <VideoAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/profile/digital-footprint" element={
              <ProtectedRoute>
                <DigitalFootprint />
              </ProtectedRoute>
            } />
            <Route path="/profile/result" element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            } />
            
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
