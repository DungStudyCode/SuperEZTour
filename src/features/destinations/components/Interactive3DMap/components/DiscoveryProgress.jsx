import React from 'react';
import { Compass, Mouse, Play } from 'lucide-react';

/**
 * Compact editorial discovery progress + interaction guidance bar for Travel Atlas V1.2.
 * Keeps discovery steps visually distinct from TripBuilder selections.
 */
const DiscoveryProgress = ({
  visibleDestinations = [],
  activeLandmarkId,
  scrollStepIndex = -1,
  isPinEligible = false,
  isManualMode = false,
  isKorean = true,
  onSelectStep,
  onResumeDiscovery
}) => {
  if (!Array.isArray(visibleDestinations) || visibleDestinations.length === 0) {
    return null;
  }

  const activeIdx = visibleDestinations.findIndex((d) => d.id === activeLandmarkId);
  const visitedCutoff = isManualMode ? activeIdx : Math.max(activeIdx, scrollStepIndex);

  const guidanceText = isManualMode || !isPinEligible
    ? isKorean
      ? '지도에서 명소를 선택해 나만의 방식으로 둘러보세요.'
      : 'Chọn một điểm trên bản đồ để khám phá theo cách của bạn.'
    : isKorean
    ? '스크롤하며 하노이의 명소를 둘러보세요.'
    : 'Cuộn để khám phá những dấu ấn của Hà Nội.';

  const resumeLabel = isKorean ? '계속 둘러보기' : 'Tiếp tục khám phá';

  return (
    <div className="atlas-discovery-bar">
      <div className="atlas-guidance-group">
        <span className="atlas-guidance-icon" aria-hidden="true">
          {isManualMode || !isPinEligible ? <Compass size={14} /> : <Mouse size={14} />}
        </span>
        <span className="atlas-guidance-text">{guidanceText}</span>

        {isPinEligible && isManualMode && (
          <button
            type="button"
            className="atlas-resume-btn"
            onClick={onResumeDiscovery}
          >
            <Play size={11} aria-hidden="true" />
            <span>{resumeLabel}</span>
          </button>
        )}
      </div>

      <nav
        className="atlas-progress-steps"
        aria-label={isKorean ? '명소 탐색 진행도' : 'Tiến trình khám phá địa điểm'}
      >
        {visibleDestinations.map((dest, idx) => {
          const isActive = dest.id === activeLandmarkId;
          const isVisited = idx < visitedCutoff;
          return (
            <React.Fragment key={dest.id}>
              {idx > 0 && (
                <span
                  className={`atlas-progress-connector ${isVisited || isActive ? 'is-reached' : ''}`}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                className={`atlas-progress-step ${isActive ? 'is-active' : ''} ${
                  isVisited ? 'is-visited' : ''
                }`}
                onClick={() => onSelectStep(dest.id)}
                aria-label={`${dest.routeIndex}. ${dest.name}`}
                aria-current={isActive ? 'step' : undefined}
              >
                {dest.routeIndex || String(idx + 1).padStart(2, '0')}
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default DiscoveryProgress;
