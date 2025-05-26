import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { Footer, NavBar, Welcome, Markets } from './components';
import Wallet from './components/market-pages/Wallet';
import Community from './components/market-pages/Community';
import { Analytics } from './components/market-pages/Analytics';
import { Profile } from './components/Profile';
import TradeApp from './components/trade2/TradeApp';
import Auth from './components/Auth';
import { useAuthStore } from './store/useAuthStore';
import TeamsAndServices from './components/teams-and-services/TeamsAndServices';
import HelpCenter from './components/teams-and-services/HelpCenter';
import PrivacyNotice from './components/teams-and-services/PrivacyNotice';
import ServiceAgreement from './components/teams-and-services/ServiceAgreement';
import AnnouncementCenter from './components/teams-and-services/AnnouncementCenter';
import ChatBot from './components/chatbot/ChatBot';

// Full-screen Loader component
const Loader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400 border-opacity-75" />
  </div>
);

// Protected Route component that redirects to auth if not logged in
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  // If we're still checking auth status, show a loader
  if (isCheckingAuth) {
    return <Loader />;
  }

  // If not authenticated after checking, redirect to auth page
  if (!authUser) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const { checkAuth } = useAuthStore();

  // Memoize checkAuth to prevent unnecessary re-renders
  const memoizedCheckAuth = useCallback(async () => {
    if (!authChecked) {
      await checkAuth();
      setAuthChecked(true);
    }
  }, [checkAuth, authChecked]);

  useEffect(() => {
    // Always attempt to check auth on app load, but only once
    if (!authChecked) {
      memoizedCheckAuth();
    }

    // Simulation of initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reduced to 1 second

    return () => clearTimeout(timer);
  }, [memoizedCheckAuth, authChecked]);

  // Show loader while initial loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <NavBar />
      {/* Dodajemo padding-top da gurnemo sadržaj ispod fiksirane navigacije */}
      <div className="min-h-screen bg-[#211e1e] pt-[80px]">
        <Routes>
          {/* Public route - Welcome page accessible to everyone */}
          <Route
            path="/"
            element={
              <div className="gradient-bg-welcome">
                <Welcome />
              </div>
            }
          />

          {/* Auth route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes - Only accessible when logged in */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/markets"
            element={
              <ProtectedRoute>
                <Markets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/markets/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/markets/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />

          <Route
            path="/markets/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/markets/trade"
            element={
              <ProtectedRoute>
                <TradeApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams-services"
            element={
              <TeamsAndServices />
            }
          />
          <Route
            path="/help-center"
            element={
              <HelpCenter/>
            }
          />
            <Route
            path="/pravicy-notice"
            element={
              <PrivacyNotice/>
            }
          />
            <Route
              path="/agreement"
            element={
              <ServiceAgreement/>
            }
          />
              <Route
              path="/announcement"
            element={
              <AnnouncementCenter/>
            }

          />
             <Route
            path="/markets/chat-bot"
            element={
              <ProtectedRoute>
                <ChatBot/>
              </ProtectedRoute>
            }
          />
          {/* Catch all other routes and redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
