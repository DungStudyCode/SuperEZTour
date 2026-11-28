import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';
import { ConsultationProvider, useConsultation } from './context/ConsultationContext';

const HomeRoute = lazy(() => import('./pages/Home/HomeRoute'));
const DestinationPage = lazy(() => import('./features/destinations/DestinationPage'));
const ExperienceDrawer = lazy(() => import('./components/common/ExperienceDrawer/ExperienceDrawer'));
const QuoteModal = lazy(() => import('./components/common/QuoteModal/QuoteModal'));

function RouteLoadingFallback() {
  return <div style={{ minHeight: '100vh', background: '#0c1117' }} aria-busy="true" />;
}

function AppContent() {
  const { modalOpen, drawerOpen } = useConsultation();

  return (
    <Router>
      <div className="travel-platform-app">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomeRoute />} />

            <Route
              path="/destinations/da-nang"
              element={
                <ErrorBoundary isolated>
                  <DestinationPage slugProp="da-nang" />
                </ErrorBoundary>
              }
            />

            <Route
              path="/destinations/:slug"
              element={
                <ErrorBoundary isolated>
                  <DestinationPage />
                </ErrorBoundary>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        {drawerOpen && (
          <ErrorBoundary isolated>
            <Suspense fallback={null}>
              <ExperienceDrawer />
            </Suspense>
          </ErrorBoundary>
        )}

        {modalOpen && (
          <ErrorBoundary isolated>
            <Suspense fallback={null}>
              <QuoteModal />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ConsultationProvider>
          <AppContent />
        </ConsultationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
