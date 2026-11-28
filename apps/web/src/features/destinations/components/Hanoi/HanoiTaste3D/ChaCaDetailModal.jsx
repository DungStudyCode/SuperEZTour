import React, { useEffect, useRef } from 'react';
import { X, Check, Plus, MapPin, Sparkles, Flame, Award, Info } from 'lucide-react';
import { getLenis } from '../../../../../utils/lenisManager';
import './HanoiTaste3D.css';

/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V3
 * CHẢ CÁ LÃ VỌNG — DEEP CULINARY MONOGRAPH MODAL
 *
 * Full accessibility:
 *  - role="dialog", aria-modal="true", aria-labelledby
 *  - Initial focus inside modal on open
 *  - Keyboard Tab / Shift+Tab focus trap
 *  - Keyboard Escape key & overlay click close
 *  - Safe global Lenis pause/resume (restores exact prior state) + body scroll lock
 *  - Focus restoration to trigger element on close
 *  - Bilingual KO / VI with verified Hanoi Cha Ca addresses
 */

const CHA_CA_INSTITUTIONS = [
  {
    id: 'cha-ca-la-vong-14',
    nameVi: 'Chả Cá Lã Vọng (14 Phố Chả Cá)',
    nameKo: '짜까 라봉 원조 (Chả Cá Lã Vọng · 14 Phố Chả Cá)',
    addressVi: '14 Phố Chả Cá (phố Hàng Sơn cũ), Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 짜까 거리 14번지',
    styleVi: 'Địa chỉ lịch sử gắn liền với gia đình họ Đoàn và tên phố Chả Cá',
    styleKo: '짜까 거리의 이름에 유래가 된 도안(Đoàn) 가문의 역사적 공간',
    descVi:
      'Gắn bó với phố Hàng Sơn cũ nay mang tên phố Chả Cá, quán ăn gia truyền của gia đình họ Đoàn đã góp phần đưa món chả cá tẩm nghệ dùng kèm thì là trở thành dấu ấn riêng của ẩm thực Hà Thành.',
    descKo:
      '옛 항선 거리가 오늘날의 짜까 거리로 불리게 된 배경이 된 유서 깊은 공간입니다. 강황에 재운 생선과 딜을 식탁 위 팬에서 함께 즐기는 하노이 전통 방식을 이어오고 있습니다.',
    signatureVi: 'Chả cá truyền thống & Bún, thì là, mắm tôm'
  },
  {
    id: 'cha-ca-thang-long',
    nameVi: 'Chả Cá Thăng Long (Phố Đường Thành)',
    nameKo: '짜까 탕롱 (Chả Cá Thăng Long · Đường Thành)',
    addressVi: '6B Đường Thành (khu phố cổ Đường Thành), Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 드엉타잉 6B번지 일대',
    styleVi: 'Không gian phố cổ ấm cúng · Phục vụ chả cá lăng tại bàn',
    styleKo: '구시가지의 따뜻한 분위기 · 테이블에서 완성하는 정통 까랑(Cá Lăng) 짜까',
    descVi:
      'Một trong những địa chỉ chả cá quen thuộc ngay khu phố cổ Hoàn Kiếm, được nhiều thực khách địa phương lẫn du khách quốc tế tìm đến nhờ miếng cá lăng săn chắc, đậm vị nghệ riềng và phần rau thì là tươi.',
    descKo:
      '호안끼엠 구시가지 중심에서 현지인과 여행객 모두에게 꾸준히 사랑받는 전문점입니다. 살이 단단한 까랑 생선에 은은한 강황 향과 신선한 딜이 어우러지는 균형 잡힌 한 상을 선보입니다.',
    signatureVi: 'Chả cá lăng & Lòng cá xào thì là'
  },
  {
    id: 'cha-ca-anh-vu',
    nameVi: 'Chả Cá Anh Vũ (Giảng Võ)',
    nameKo: '짜까 아인부 (Chả Cá Anh Vũ · Giảng Võ)',
    addressVi: '120K1 Giảng Võ, Quận Đống Đa, Hà Nội',
    addressKo: '하노이 동다 지앙보 120K1번지',
    styleVi: 'Thương hiệu chả cá Hà Nội từ năm 2004 · Phù hợp nhóm gia đình',
    styleKo: '2004년부터 이어온 하노이 짜까 전문점 · 가족 및 단체 식사에 쾌적',
    descVi:
      'Ra đời từ năm 2004, Chả Cá Anh Vũ chú trọng nguyên liệu cá lăng tươi và không gian rộng rãi, phục vụ chả cá tại bàn cùng các món ăn kèm truyền thống như lòng cá, canh chua đầu cá và nem cá.',
    descKo:
      '2004년 문을 연 이후 신선한 까랑 생선과 쾌적한 식사 공간으로 잘 알려진 곳입니다. 테이블에서 볶아내는 짜까와 함께 생선 완자 넴, 생선 국물 요리 등 다양한 곁들임 메뉴를 즐길 수 있습니다.',
    signatureVi: 'Chả cá lăng truyền thống & Canh chua cá'
  }
];

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ChaCaDetailModal = ({ isOpen, onClose, isKorean, isAddedToTrip, onToggleTrip }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement;

    // Move initial focus inside modal panel
    const focusTimer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus({ preventScroll: true });
      }
    }, 30);

    // Pause global Lenis only if it is currently running, so we restore exact prior state
    const lenis = getLenis();
    let didPauseLenis = false;
    if (lenis && !lenis.isStopped) {
      try {
        lenis.stop();
        didPauseLenis = true;
      } catch (_) {}
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;

      if (didPauseLenis && lenis) {
        try {
          lenis.start();
        } catch (_) {}
      }

      if (
        previouslyFocusedElement.current &&
        typeof previouslyFocusedElement.current.focus === 'function'
      ) {
        try {
          previouslyFocusedElement.current.focus({ preventScroll: true });
        } catch (_) {}
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="pho-modal-overlay chaca-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chaca-modal-title"
    >
      <div
        className="pho-modal-panel chaca-modal-panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="pho-modal-close-btn"
          onClick={onClose}
          aria-label={isKorean ? '닫기' : 'Đóng'}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <header className="pho-modal-header">
          <div className="pho-modal-kicker">
            <Sparkles size={14} />
            <span>{isKorean ? '하노이 테이블 다이닝 심층 탐구' : 'CHUYÊN KHẢO ẨM THỰC TRÀNG AN'}</span>
          </div>
          <h2 id="chaca-modal-title" className="pho-modal-title">
            {isKorean
              ? '짜까 라봉 — 식탁 위에서 완성되는 하노이의 미학'
              : 'Chả Cá Lã Vọng — Nghệ Thuật Thưởng Thức Tại Bàn'}
          </h2>
          <p className="pho-modal-lead">
            {isKorean
              ? '“짜까 라봉”은 특정 식당의 이름이자, 오늘날에는 강황에 재운 생선을 딜과 대파와 함께 식탁 위 팬에서 볶아 먹는 하노이 대표 생선 요리를 통칭하는 이름으로 널리 쓰입니다. 한 거리의 이름이 음식에서 유래할 만큼 하노이 식문화에서 특별한 의미를 지닙니다.'
              : '“Chả cá Lã Vọng” vừa gắn với tên gọi quán ăn lâu đời của gia đình họ Đoàn trên phố Chả Cá, vừa trở thành tên gọi quen thuộc cho món cá tẩm nghệ nướng rồi đảo nóng tại bàn cùng thì là và hành hoa — một nét văn hóa thưởng thức đặc sắc của người Hà Nội.'}
          </p>
        </header>

        {/* Modal Body Content */}
        <div className="pho-modal-scrollable">
          {/* Section 1: Four Flavor Pillars */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Flame size={17} />
              <span>
                {isKorean
                  ? '짜까 라봉을 완성하는 4가지 풍미의 기둥'
                  : 'Bốn Trụ Cột Hương Vị Của Chả Cá Lã Vọng'}
              </span>
            </h3>

            <div className="pho-elements-grid">
              <div className="pho-element-card">
                <span className="element-num">01</span>
                <h4>{isKorean ? '생선과 강황·갈랑갈 양념' : 'Cá Chắc Thịt & Gia Vị Nghệ, Riềng'}</h4>
                <p>
                  {isKorean
                    ? '까랑(메기류)이나 가물치처럼 살이 단단하고 쉽게 부서지지 않는 생선을 한입 크기로 썰어 강황, 갈랑갈, 발효 양념 등에 재운 뒤 초벌로 구워 고유의 황금빛과 깊은 향을 입힙니다.'
                    : 'Các loại cá ít xương, thịt chắc như cá lăng hoặc cá quả được thái miếng vừa ăn, tẩm ướp với nghệ tươi, riềng giã, mẻ và gia vị rồi nướng sơ để giữ độ ngọt và sắc vàng óng đặc trưng.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">02</span>
                <h4>{isKorean ? '신선한 딜(Thì Là)과 대파' : 'Thì Là & Hành Lá Tươi'}</h4>
                <p>
                  {isKorean
                    ? '짜까의 정체성을 결정짓는 핵심 허브입니다. 넉넉하게 올린 딜과 대파가 뜨거운 팬의 기름을 만나 숨이 죽으면서 생선의 기름진 맛을 산뜻하고 향긋하게 잡아 줍니다.'
                    : 'Nếu thiếu thì là và hành hoa chẻ ngọn, chả cá sẽ mất đi một nửa linh hồn. Khi gặp mỡ nóng trong chảo, hương thì là bừng dậy, làm dịu độ béo và nâng vị ngọt của miếng cá.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">03</span>
                <h4>{isKorean ? '식탁 위 뜨거운 팬 경험' : 'Trải Nghiệm Chảo Nóng Tại Bàn'}</h4>
                <p>
                  {isKorean
                    ? '주방에서 완성되어 나오는 요리가 아니라, 식탁 위 작은 화로나 버너에서 지글지글 익혀가며 가장 따뜻한 순간에 덜어 먹는 느리고 정겨운 식사 의식입니다.'
                    : 'Không dọn sẵn nguội lạnh, chả cá được tiếp tục đảo nóng ngay trên bàn ăn. Thực khách tự tay thêm thì là, hành lá và thưởng thức từng miếng cá nóng hổi theo nhịp riêng.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">04</span>
                <h4>{isKorean ? '쌀국수 면, 땅콩, 허브 & 소스' : 'Bún, Lạc Rang, Rau Thơm & Nước Chấm'}</h4>
                <p>
                  {isKorean
                    ? '작은 그릇에 쌀국수 면과 신선한 허브, 고소한 볶은 땅콩을 담고 뜨거운 생선과 딜을 올린 뒤, 라임과 고추를 넣어 거품 나게 저은 맘똠(또는 피시소스)을 곁들여 비벼 먹습니다.'
                    : 'Một bát nhỏ gồm bún rối, vài nhánh rau thơm, lạc rang bùi béo, gắp thêm miếng cá nóng cùng thì là rồi rưới chút mắm tôm đánh bông chanh ớt — hoặc nước mắm pha dịu tùy khẩu vị.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: How to Enjoy & Allergen Note */}
          <section className="pho-modal-section">
            <div className="chaca-tasting-note">
              <Info size={16} className="chaca-note-icon" />
              <div>
                <strong>
                  {isKorean ? '처음 즐기는 여행자를 위한 팁 & 알레르기 안내' : 'Gợi ý thưởng thức & Lưu ý dị ứng'}
                </strong>
                <p>
                  {isKorean
                    ? '베트남식 새우 발효 소스인 맘똠(Mắm Tôm)의 진한 향이 익숙하지 않다면, 대부분의 식당에서 깔끔한 피시소스(Nước Mắm)를 함께 제공합니다. 생선, 땅콩, 갑각류(새우젓)가 포함되므로 알레르기가 있는 경우 주문 전 식당에 미리 확인해 주세요.'
                    : 'Nếu chưa quen hương vị đậm đà của mắm tôm, thực khách có thể yêu cầu nước mắm pha nhẹ tại hầu hết các nhà hàng. Món ăn thường có cá, lạc rang và nước chấm chứa hải sản; quý khách có dị ứng thực phẩm vui lòng trao đổi trước với nhà hàng.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Verified Representative Addresses */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Award size={17} />
              <span>
                {isKorean
                  ? '하노이에서 만나는 대표 짜까 전문점'
                  : 'Những Địa Chỉ Chả Cá Tiêu Biểu Tại Hà Nội'}
              </span>
            </h3>

            <div className="pho-institutions-list">
              {CHA_CA_INSTITUTIONS.map((item) => (
                <div key={item.id} className="institution-card">
                  <div className="institution-header">
                    <div>
                      <h4 className="institution-name">
                        {isKorean ? item.nameKo : item.nameVi}
                      </h4>
                      <div className="institution-meta">
                        <MapPin size={13} />
                        <span>{isKorean ? item.addressKo : item.addressVi}</span>
                      </div>
                    </div>
                    <span className="institution-style-badge">
                      {isKorean ? item.styleKo : item.styleVi}
                    </span>
                  </div>
                  <p className="institution-desc">
                    {isKorean ? item.descKo : item.descVi}
                  </p>
                  <div className="institution-signature">
                    <span className="sig-label">{isKorean ? '대표 구성:' : 'Gợi ý thưởng thức:'}</span>
                    <strong className="sig-val">{item.signatureVi}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer with TripBuilder Action */}
        <footer className="pho-modal-footer">
          <button
            type="button"
            className={`pho-modal-trip-btn ${isAddedToTrip ? 'is-added' : ''}`}
            onClick={onToggleTrip}
          >
            {isAddedToTrip ? <Check size={16} /> : <Plus size={16} />}
            <span>
              {isAddedToTrip
                ? isKorean
                  ? '여행 일정에 추가됨'
                  : 'Đã thêm vào hành trình'
                : isKorean
                ? '짜까 라봉 체험 일정에 추가'
                : 'Thêm trải nghiệm Chả cá Lã Vọng'}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChaCaDetailModal;
