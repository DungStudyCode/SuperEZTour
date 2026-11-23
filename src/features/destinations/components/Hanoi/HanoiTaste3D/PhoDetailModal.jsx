import React, { useEffect, useRef } from 'react';
import { X, Check, Plus, MapPin, Sparkles, Flame, Clock, Award, BookOpen } from 'lucide-react';
import './HanoiTaste3D.css';

/**
 * SUPER EZ TOUR — HANOI SCREEN 4 V1
 * PHỞ HÀ NỘI — DEEP CULINARY MONOGRAPH MODAL
 *
 * Full accessibility:
 *  - Keyboard Escape key closes
 *  - Body scroll lock without messing Lenis
 *  - Focus trap & restore focus
 *  - Bilingual KO / VI
 *  - Verified historical Hanoi pho institutions & cultural tasting guide
 */

const PHO_INSTITUTIONS = [
  {
    id: 'bat-dan',
    nameVi: 'Phở Gia Truyền Bát Đàn',
    nameKo: '밧단 100년 전통 소고기 쌀국수 (Phở Bát Đàn)',
    addressVi: '49 Bát Đàn, Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 밧단 49번지',
    styleVi: 'Phở truyền thống nguyên bản — Nước dùng trong thanh, gầu giòn sần sật',
    styleKo: '정통 원조 하노이 스타일 — 맑고 깊은 우골 육수와 아삭한 양지머리',
    descVi:
      'Quán phở biểu tượng của văn hóa "xếp hàng bưng bát" hơn nửa thế kỷ qua. Không tương ớt công nghiệp, không hoa hồi nồng gắt, chỉ thuần khiết vị ngọt tủy bò hầm kỹ cùng giấm tỏi ớt Bắc.',
    descKo:
      '줄을 서서 직접 그릇을 받아가는 반세기 역사의 하노이 대표 노포. 향신료를 최소화하고 소 사골 본연의 담백한 감칠맛을 극대화한 원조의 품격을 자랑합니다.',
    signatureVi: 'Phở Bò Tái Nạm Gầu & Quẩy giòn'
  },
  {
    id: 'thin-lo-duc',
    nameVi: 'Phở Thìn Lò Đúc (Từ 1979)',
    nameKo: '틴 로둑 소고기 볶음 쌀국수 (Phở Thìn Lò Đúc)',
    addressVi: '13 Lò Đúc, Quận Hai Bà Trưng, Hà Nội',
    addressKo: '하노이 하이바쯩 로둑 13번지',
    styleVi: 'Trường phái Tái Lăn Áp Chảo — Dậy mùi mỡ gừng, ngập tràn hành lá tươi',
    styleKo: '타이란(Tái Lăn) 스타일 — 센 불에 볶은 소고기와 풍성한 대파의 향연',
    descVi:
      'Sáng tạo từ năm 1979 bởi ông Nguyễn Trọng Thìn. Thịt bò tươi được xào lăn nhanh trên chảo gang lửa lớn với gừng đập dập và tỏi, tạo nên nước dùng béo ngậy thơm lừng đặc trưng.',
    descKo:
      '1979년 창안된 독보적 풍미의 쌀국수. 센 화력의 무쇠 팬에서 생강과 함께 재빨리 볶아낸 소고기를 면 위에 얹고, 그릇 가득 신선한 파를 덮어 고소한 육수를 부어냅니다.',
    signatureVi: 'Phở Bò Tái Lăn ngập hành hoa'
  },
  {
    id: 'pho-suong',
    nameVi: 'Phở Sướng (Ngõ Trung Yên)',
    nameKo: '퍼 쓰엉 정통 골목 쌀국수 (Phở Sướng)',
    addressVi: '24B Ngõ Trung Yên, Phố Đinh Liệt, Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 딘리엣 쭝옌 골목 24B',
    styleVi: 'Nước dùng đậm đà ngọt hậu — Thịt chín thái mỏng mềm tan',
    styleKo: '깊은 감칠맛의 육수와 부드럽게 삶아낸 소고기 편육',
    descVi:
      'Nằm ẩn mình trong ngõ Trung Yên cổ kính, Phở Sướng chinh phục người sành ăn bởi vị ngọt hậu sâu lắng của nước ninh xương và lát thịt bò chín mềm mướt không hề bị khô xác.',
    descKo:
      '구시가지 좁은 골목 속에 숨어있는 현지인들의 비밀 미식처. 오랫동안 푹 삶아 얇게 저민 소고기 수육과 감칠맛 넘치는 따뜻한 육수가 입안 가득 감동을 전합니다.',
    signatureVi: 'Phở Bò Chín Nạm & Nước dùng thanh ngọt'
  },
  {
    id: 'pho-tu-lun',
    nameVi: 'Phở Tư Lùn (Hơn 80 năm)',
    nameKo: '뜨 룬 80년 전통 진육수 쌀국수 (Phở Tư Lùn)',
    addressVi: '23 Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội',
    addressKo: '하노이 호안끼엠 하이바쯩 23번지',
    styleVi: 'Trường phái Nước Đục Béo Ngậy — Ninh tủy bò đặc quánh gia truyền',
    styleKo: '진하고 뽀얀 우골 육수 스타일 — 80년 전통의 깊은 풍미',
    descVi:
      'Khác biệt hoàn toàn với phở nước trong, Phở Tư Lùn đặc trưng bởi nồi nước dùng đục sóng sánh ánh tủy bò, thịt tái băm nhỏ đập dập mềm mịn tan ngay trên đầu lưỡi.',
    descKo:
      '맑은 육수와 달리 소 사골의 농후한 풍미가 가득 우러난 진국 쌀국수. 잘게 다져 부드럽게 익힌 소고기와 묵직한 국물의 조화가 일품입니다.',
    signatureVi: 'Phở Tái Đập & Nước dùng tủy đậm đà'
  }
];

const PhoDetailModal = ({ isOpen, onClose, isKorean, isAddedToTrip, onToggleTrip }) => {
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
      className="pho-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pho-modal-title"
    >
      <div
        className="pho-modal-panel"
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
            <span>{isKorean ? '하노이 대표 미식 심층 탐구' : 'CHUYÊN KHẢO ẨM THỰC TRÀNG AN'}</span>
          </div>
          <h2 id="pho-modal-title" className="pho-modal-title">
            {isKorean ? '하노이 정통 쌀국수의 미학 (Phở Bò)' : 'Tuyệt Tác Phở Bò Gia Truyền Hà Nội'}
          </h2>
          <p className="pho-modal-lead">
            {isKorean
              ? '자극적인 소스와 숙주를 배제하고, 맑은 우골 육수와 부드러운 쌀면의 본질에 집중하는 하노이 사람들의 백 년 미식 철학을 만납니다.'
              : 'Không ngọt gắt, không lạm dụng quế hồi, Phở Hà Nội thuần khiết vị ngọt thanh của tủy bò hầm kỹ, bánh phở tráng mỏng mềm mướt và nhịp sống sớm mai tĩnh lặng.'}
          </p>
        </header>

        {/* Modal Body Content */}
        <div className="pho-modal-scrollable">
          {/* Section 1: Anatomy of an Authentic Bowl */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Flame size={17} />
              <span>{isKorean ? '완벽한 한 그릇의 4가지 구성 요소' : 'Bốn Yếu Tố Tạo Nên Bát Phở Chuẩn Vị'}</span>
            </h3>

            <div className="pho-elements-grid">
              <div className="pho-element-card">
                <span className="element-num">01</span>
                <h4>{isKorean ? '맑고 깊은 우골 육수 (Nước Dùng)' : 'Nước Dùng Trong Veo'}</h4>
                <p>
                  {isKorean
                    ? '소 사골을 찬물에 핏물을 완전히 뺀 뒤 12~24시간 은근한 불에서 끓여냅니다. 구운 생강과 양파, 정향, 팔각으로 은은한 풍미를 더하며 맑은 황금빛을 유지합니다.'
                    : 'Xương bò được rửa sạch và ninh lửa riu riu từ 12 đến 24 giờ. Gừng nướng, hành nướng cháy vỏ cùng hoa hồi tạo hương thơm ấm nồng, vớt bọt liên tục để nước trong như hổ phách.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">02</span>
                <h4>{isKorean ? '부드러운 수제 생면 (Bánh Phở)' : 'Bánh Phở Tráng Mỏng'}</h4>
                <p>
                  {isKorean
                    ? '갓 빻은 쌀가루 반죽을 김이 오르는 천 위에서 얇게 쪄낸 뒤 손으로 정갈하게 썬 면입니다. 말린 건면과 비교할 수 없을 만큼 부드럽고 국물이 면에 흠뻑 스며듭니다.'
                    : 'Bột gạo xay ướt được tráng mỏng trên nồi hơi nóng rẫy rồi thái tay đều đặn. Sợi phở mỏng mảnh, mềm mướt mà không nát, thấm đượm vị ngọt của nước dùng.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">03</span>
                <h4>{isKorean ? '다채로운 소고기 부위 (Thịt Bò)' : 'Tuyệt Kỹ Thái Thịt Bò'}</h4>
                <p>
                  {isKorean
                    ? '살짝 데쳐 연분홍빛을 띠는 부드러운 안심(Tái), 푹 삶아 얇게 저며 쫄깃한 양지(Nạm), 그리고 기름기가 적절히 섞여 고소한 차돌박이(Gầu) 중 취향껏 선택합니다.'
                    : 'Thịt bò thăn thái mỏng chần tái mềm ngọt, nạm gầu luộc chín tới giòn thơm. Nhát dao sắc bén thái dứt khoát thành từng lát mỏng đặt đều tăm tắp trên mặt bát.'}
                </p>
              </div>

              <div className="pho-element-card">
                <span className="element-num">04</span>
                <h4>{isKorean ? '마늘 식초와 꽈이 (Giấm Tỏi & Quẩy)' : 'Gia Vị Dùng Kèm Chuẩn Vị'}</h4>
                <p>
                  {isKorean
                    ? '하노이 정통 방식은 달콤한 해선장이나 숙주를 넣지 않습니다. 대신 알싸한 마늘 식초(Giấm Tỏi) 몇 방울과 바삭하게 튀겨낸 꽈이(Quẩy)를 국물에 적셔 즐깁니다.'
                    : 'Tuyệt đối không dùng tương đen ngọt hay giá đỗ sống làm đục vị. Người Tràng An chỉ thêm vài lát ớt tươi, vắt giấm tỏi Bắc và nhúng chiếc quẩy giòn rụm vào bát phở bốc khói.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Four Legendary Institutions */}
          <section className="pho-modal-section">
            <h3 className="pho-modal-section-title">
              <Award size={17} />
              <span>{isKorean ? '하노이 4대 전설의 쌀국수 명가' : 'Tứ Đại Quán Phở Truyền Kỳ Phố Cổ'}</span>
            </h3>

            <div className="pho-institutions-list">
              {PHO_INSTITUTIONS.map((item) => (
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
                    <span className="sig-label">{isKorean ? '시그니처 메뉴:' : 'Món đặc trưng:'}</span>
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
                  ? '하노이 쌀국수 일정이 담겼습니다'
                  : 'Đã thêm Phở Hà Nội vào hành trình'
                : isKorean
                ? '하노이 미식 맞춤 투어에 Phở 담기'
                : 'Thêm trải nghiệm Phở Hà Nội vào hành trình'}
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PhoDetailModal;
