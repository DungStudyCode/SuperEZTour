import React, { useEffect, useRef } from 'react';
import { X, Check, Plus, MapPin, Sparkles, Flame, Award } from 'lucide-react';
import './HanoiTaste3D.css';

/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V2
 * BÚN CHẢ HÀ NỘI — DEEP CULINARY MONOGRAPH MODAL
 *
 * Full accessibility:
 *  - Keyboard Escape key closes
 *  - Body scroll lock without resetting Lenis
 *  - Focus restoration
 *  - Bilingual KO / VI
 *  - Verified Hanoi Bún Chả addresses & culinary craft breakdown
 */

const BUN_CHA_INSTITUTIONS = [
  {
    id: 'hang-quat',
    nameVi: 'Bún Chả Hàng Quạt (Ngõ 74)',
    nameKo: '항꿧 골목 참숯 분짜 (Bún Chả Hàng Quạt)',
    addressVi: 'Ngõ 74 Hàng Quạt, Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 항꿧 74번지 골목',
    styleVi: 'Chả nướng than hoa trong ngõ nhỏ — Đậm vị truyền thống phố cổ',
    styleKo: '구시가지 좁은 골목의 깊은 참숯 직화 풍미',
    descVi:
      'Nằm sâu trong con ngõ nhỏ phố Hàng Quạt, quán nổi tiếng với những mẻ chả viên và chả miếng nướng xèo xèo trên than củi, giữ độ mềm mọng và lớp vỏ xém cạnh thơm dịu.',
    descKo:
      '항꿧 거리의 좁은 골목 안쪽에 자리한 노포로, 참숯 위에서 정성껏 구워내 겉은 노릇하고 속은 촉촉한 돼지고기 완자와 구이의 진수를 보여줍니다.',
    signatureVi: 'Bún chả viên & chả miếng nướng than hoa'
  },
  {
    id: 'dac-kim',
    nameVi: 'Bún Chả Đắc Kim (Hàng Mành)',
    nameKo: '닥낌 항마잉 분짜 (Bún Chả Đắc Kim)',
    addressVi: '1 Hàng Mành, Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 항마잉 1번지',
    styleVi: 'Bát chả đầy đặn giữa trung tâm Khu Phố Cổ',
    styleKo: '구시가지 중심에서 만나는 푸짐한 정통 분짜 한 상',
    descVi:
      'Một trong những địa chỉ lâu đời gắn liền với tên tuổi phố Hàng Mành. Thịt được chọn từ phần nạc vai và ba chỉ tươi, tẩm ướp đậm đà và dọn kèm rổ rau sống phong phú.',
    descKo:
      '항마잉 거리를 대표하는 유서 깊은 분짜 전문점입니다. 신선한 돼지 목살과 삼겹살을 진하게 양념해 구워내며 풍성한 허브 채소와 함께 제공됩니다.',
    signatureVi: 'Bún chả Hàng Mành & Nem rán dùng kèm'
  },
  {
    id: 'huong-lien',
    nameVi: 'Bún Chả Hương Liên (Lê Văn Hưu)',
    nameKo: '흐엉리엔 분짜 (Bún Chả Hương Liên)',
    addressVi: '24 Lê Văn Hưu, Quận Hai Bà Trưng, Hà Nội',
    addressKo: '하노이 하이바쯩 레반흐우 24번지',
    styleVi: 'Hương vị gia truyền quen thuộc của khu phố Hai Bà Trưng',
    styleKo: '오바마 대통령 방문으로 널리 알려진 대중적 명소',
    descVi:
      'Quán ăn gia đình lâu năm tại phố Lê Văn Hưu, từng đón Tổng thống Mỹ Barack Obama và đầu bếp Anthony Bourdain vào năm 2016. Nước chấm pha thanh nhẹ, dễ thưởng thức với du khách quốc tế.',
    descKo:
      '2016년 버락 오바마 미국 대통령과 셰프 앤서니 보데인이 함께 식사하며 세계적으로 유명해진 식당입니다. 깔끔하고 은은한 단맛의 육수가 특징입니다.',
    signatureVi: 'Bún chả truyền thống & Nem hải sản'
  },
  {
    id: 'sinh-tu',
    nameVi: 'Bún Chả Sinh Từ',
    nameKo: '신뜨 전통 스타일 분짜 (Bún Chả Sinh Từ)',
    addressVi: 'Khu vực Nguyễn Khuyến (phố Sinh Từ cũ), Quận Đống Đa, Hà Nội',
    addressKo: '하노이 동다 응우옌쿠옌(구 신뜨 거리) 일대',
    styleVi: 'Dấu ấn ẩm thực lâu đời từ phố Sinh Từ xưa',
    styleKo: '옛 신뜨 거리에서 시작된 하노이 분짜의 고전적 풍미',
    descVi:
      'Gắn liền với khu phố Sinh Từ xưa (nay là phố Nguyễn Khuyến), phong cách bún chả nơi đây chú trọng độ mảnh của sợi bún, vị hài hòa của nước chấm ấm và thịt nướng vừa lửa.',
    descKo:
      '옛 신뜨 거리에서 유래한 전통 분짜 스타일로, 가늘고 부드러운 쌀면과 은은한 불향의 돼지고기, 따뜻한 소스의 균형을 중시합니다.',
    signatureVi: 'Bún chả kẹp tre nướng than củi'
  }
];

const BunChaDetailModal = ({ isOpen, onClose, isKorean, isAddedToTrip, onToggleTrip }) => {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        if (previouslyFocusedElement.current?.focus) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="pho-modal-overlay buncha-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="buncha-modal-title"
    >
      <div
        className="pho-modal-panel buncha-modal-panel"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
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
            <span>{isKorean ? '하노이 점심 미식 심층 탐구' : 'CHUYÊN KHẢO ẨM THỰC TRÀNG AN'}</span>
          </div>
          <h2 id="buncha-modal-title" className="pho-modal-title">
            {isKorean ? '하노이 참숯 분짜의 미학 (Bún Chả)' : 'Bún Chả Hà Nội — Hương Thơm Từ Bếp Than Hoa'}
          </h2>
          <p className="pho-modal-lead">
            {isKorean
              ? '참숯 위에서 노릇하게 구워낸 두 종류의 돼지고기와 따뜻한 새콤달콤 느억맘 소스, 부드러운 쌀면과 허브가 어우러지는 하노이 대표 점심 미식입니다.'
              : 'Nếu buổi sáng Hà Nội thuộc về bát phở nóng thanh tao, thì buổi trưa phố thị lại quyến rũ bởi làn khói thơm từ những vỉ chả nướng than hoa và bát nước chấm chua ngọt hài hòa.'}
          </p>
        </header>

        {/* Modal Body Content */}
        <div className="pho-modal-scrollable">
          {/* Section 1: Four Pillars of Authentic Bun Cha */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Flame size={17} />
              <span>{isKorean ? '정통 하노이 분짜를 완성하는 4가지 요소' : 'Bốn Thành Phần Làm Nên Mâm Bún Chả Hà Nội'}</span>
            </h3>

            <div className="pho-elements-grid">
              <div className="pho-element-card">
                <span className="element-num">01</span>
                <h4>{isKorean ? '짜비엔 & 짜미엥 (Chả Viên & Chả Miếng)' : 'Chả Viên & Chả Miếng'}</h4>
                <p>
                  {isKorean
                    ? '다진 목살과 살코기로 빚어 육즙이 살아있는 완자(Chả Viên)와, 살코기와 비계가 적절히 섞인 삼겹살을 얇게 썰어 구운 고기 조각(Chả Miếng)이 두 가지 식감을 선사합니다.'
                    : 'Chả viên được nặn từ thịt nạc vai băm nhuyễn mềm mọng; chả miếng thường dùng thịt ba chỉ có cả nạc lẫn mỡ để khi nướng không bị khô mà cháy cạnh vàng ươm.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">02</span>
                <h4>{isKorean ? '참숯 직화 구이 (Lửa Than Hoa)' : 'Hương Khói Than Hoa'}</h4>
                <p>
                  {isKorean
                    ? '고기 양념이 참숯 연기와 만나 은은한 훈연 향을 입습니다. 숙련된 손길로 불 조절을 해가며 겉은 노릇하고 속은 부드럽게 구워내는 것이 핵심입니다.'
                    : 'Thịt ướp gia vị vừa phải được kẹp vỉ và quạt đều tay trên than hoa hồng rực. Lửa than giúp mỡ tươm ra xèo xèo, tạo lớp hương khói đặc trưng không lò điện nào thay thế được.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">03</span>
                <h4>{isKorean ? '따뜻한 새콤달콤 소스 (Nước Chấm)' : 'Bát Nước Chấm Ấm & Đồ Chua'}</h4>
                <p>
                  {isKorean
                    ? '피시소스와 식초, 설탕, 따뜻한 물을 황금 비율로 배합해 짭조름하면서도 산뜻한 맛을 냅니다. 얇게 썬 그린 파파야나 콜라비, 당근 절임이 아삭한 식감을 더합니다.'
                    : 'Nước chấm bún chả không pha quá mặn mà thanh nhẹ, ấm nóng, điểm thêm những lát đu đủ xanh hoặc su hào, cà rốt ngâm giòn cùng tỏi băm và ớt tươi.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">04</span>
                <h4>{isKorean ? '쌀국수 면과 신선한 허브 (Bún & Rau Sống)' : 'Bún Rối & Rổ Rau Sống Tươi'}</h4>
                <p>
                  {isKorean
                    ? '가늘고 부드러운 쌀국수 면(Bún rối)을 소스에 적시고, 차조기(Tía tô), 베트남 밤민트(Kinh giới), 상추 등 향긋한 생채소를 듬뿍 곁들여 상쾌한 뒷맛을 완성합니다.'
                    : 'Sợi bún rối trắng mềm ăn kèm xà lách, tía tô, kinh giới, rau mùi tươi mát. Khi ăn, gắp một lọn bún nhỏ nhúng vào bát nước chấm để vị đậm đà quyện đều.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Iconic Addresses */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Award size={17} />
              <span>{isKorean ? '하노이에서 경험하는 대표 분짜 명소' : 'Những Địa Chỉ Bún Chả Tiêu Biểu Tại Hà Nội'}</span>
            </h3>

            <div className="pho-institutions-list">
              {BUN_CHA_INSTITUTIONS.map((item) => (
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
                  ? '하노이 분짜 일정이 담겼습니다'
                  : 'Đã thêm Bún chả Hà Nội vào hành trình'
                : isKorean
                ? '하노이 분짜 체험 일정에 추가'
                : 'Thêm trải nghiệm Bún chả Hà Nội vào hành trình'}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default BunChaDetailModal;
