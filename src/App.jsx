import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import FloatingActions from './components/layout/FloatingActions/FloatingActions';
import QuoteModal from './components/common/QuoteModal/QuoteModal';
import ExperienceDrawer from './components/common/ExperienceDrawer/ExperienceDrawer';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import Home from './pages/Home/Home';
import DestinationPage from './features/destinations/DestinationPage';
import { LanguageProvider } from './context/LanguageContext';
import { ConsultationProvider, useConsultation } from './context/ConsultationContext';
import { INITIAL_QUOTES } from './data/quotes';

/**
 * Main application content with access to unified ConsultationContext.
 */
function AppContent({ quotes, handleAddQuote }) {
  const { openNewConsultation } = useConsultation();

  return (
    <Router>
      <div className="travel-platform-app">
        <Routes>
          {/* Main Home Page */}
          <Route
            path="/"
            element={
              <>
                <Header onOpenQuoteModal={(opts) => openNewConsultation(opts || { source: 'navbar' })} />
                <Home
                  onOpenQuoteModal={openNewConsultation}
                  onSelectDestination={(destId) =>
                    openNewConsultation({ source: 'destination-card', destinationId: destId })
                  }
                />
                <Footer onOpenQuoteModal={(opts) => openNewConsultation(opts || { source: 'footer' })} />
                <FloatingActions
                  onOpenQuoteModal={(type) =>
                    openNewConsultation(
                      type === 'kakao'
                        ? { source: 'floating', contactMethod: 'kakao' }
                        : { source: 'floating' }
                    )
                  }
                />
              </>
            }
          />

          {/* Dynamic Destination Landing Engine for all 16 destinations */}
          <Route
            path="/destinations/:slug"
            element={
              <ErrorBoundary isolated>
                <DestinationPage onAddQuote={handleAddQuote} />
              </ErrorBoundary>
            }
          />

          {/* Direct Route for Da Nang */}
          <Route
            path="/destinations/da-nang"
            element={
              <ErrorBoundary isolated>
                <DestinationPage onAddQuote={handleAddQuote} slugProp="da-nang" />
              </ErrorBoundary>
            }
          />
        </Routes>

        {/* Global Interactive Experience Detail Drawer */}
        <ErrorBoundary isolated>
          <ExperienceDrawer />
        </ErrorBoundary>

        {/* Global Interactive Quick Quote Modal */}
        <ErrorBoundary isolated>
          <QuoteModal onAddQuote={handleAddQuote} />
        </ErrorBoundary>
      </div>
    </Router>
  );
}

function App() {
  const [quotes, setQuotes] = useState(INITIAL_QUOTES);

  const handleAddQuote = (newQuote) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ConsultationProvider onAddQuote={handleAddQuote}>
          <AppContent quotes={quotes} handleAddQuote={handleAddQuote} />
        </ConsultationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
