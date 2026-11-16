import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import FloatingActions from './components/layout/FloatingActions/FloatingActions';
import QuoteModal from './components/common/QuoteModal/QuoteModal';
import Home from './pages/Home/Home';
import DestinationPage from './features/destinations/DestinationPage';
import { INITIAL_QUOTES } from './data/quotes';

function App() {
  const [quotes, setQuotes] = useState(INITIAL_QUOTES);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteDestination, setQuoteDestination] = useState('');

  const handleOpenQuoteModal = (destinationId = '') => {
    setQuoteDestination(destinationId);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleAddQuote = (newQuote) => {
    setQuotes((prev) => [newQuote, ...prev]);
  };

  return (
    <Router>
      <div className="travel-platform-app">
        <Routes>
          {/* Main Home Page */}
          <Route
            path="/"
            element={
              <>
                <Header onOpenQuoteModal={() => handleOpenQuoteModal()} />
                <Home
                  quotes={quotes}
                  onOpenQuoteModal={handleOpenQuoteModal}
                  onSelectDestination={setQuoteDestination}
                />
                <Footer onOpenQuoteModal={() => handleOpenQuoteModal()} />
                <FloatingActions onOpenQuoteModal={() => handleOpenQuoteModal()} />
              </>
            }
          />

          {/* Dynamic Destination Landing Engine for all 16 destinations */}
          <Route
            path="/destinations/:slug"
            element={<DestinationPage onAddQuote={handleAddQuote} />}
          />

          {/* Direct Route for Da Nang */}
          <Route
            path="/destinations/da-nang"
            element={<DestinationPage onAddQuote={handleAddQuote} slugProp="da-nang" />}
          />
        </Routes>

        {/* Global Interactive Quick Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          onAddQuote={handleAddQuote}
          defaultDestination={quoteDestination}
        />
      </div>
    </Router>
  );
}

export default App;