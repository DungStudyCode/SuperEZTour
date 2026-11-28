import React from 'react';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import FloatingActions from '../../components/layout/FloatingActions/FloatingActions';
import Home from './Home';
import { useConsultation } from '../../context/ConsultationContext';

const HomeRoute = () => {
  const { openNewConsultation } = useConsultation();

  return (
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
  );
};

export default HomeRoute;
