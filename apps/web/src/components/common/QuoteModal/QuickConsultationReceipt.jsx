import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Copy } from 'lucide-react';

const messages = {
  ko: {
    flag: '테스트 접수증', title: '상담 요청이 접수되었습니다',
    detail: '입력하신 테스트 요청이 저장되었습니다. 실제 상담은 진행되지 않습니다.',
    reference: '접수 번호', copy: '접수 번호 복사', copied: '접수 번호를 복사했습니다.',
    select: '복사할 수 없습니다. 아래 번호를 선택해 복사해 주세요.',
    close: '하노이 여행 계속 둘러보기', fresh: '새 테스트 요청 시작',
  },
  vi: {
    flag: 'Biên nhận thử nghiệm', title: 'Yêu cầu tư vấn đã được tiếp nhận',
    detail: 'Hệ thống đã lưu yêu cầu thử nghiệm. Yêu cầu này không mở một phiên tư vấn thực tế.',
    reference: 'Mã yêu cầu', copy: 'Sao chép mã yêu cầu', copied: 'Đã sao chép mã yêu cầu.',
    select: 'Không thể tự sao chép. Hãy chọn và sao chép mã bên dưới.',
    close: 'Tiếp tục khám phá Hà Nội', fresh: 'Bắt đầu yêu cầu thử nghiệm mới',
  },
};

export default function QuickConsultationReceipt({ receipt, language, close, newInquiry }) {
  const l = messages[language];
  const heading = useRef(null);
  const reference = useRef(null);
  const [copyState, setCopyState] = useState(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(receipt.reference);
      setCopyState('copied');
    } catch {
      if (!reference.current) return;
      const range = document.createRange();
      range.selectNodeContents(reference.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setCopyState('select');
    }
  }
  return <div className="hqc-scroll hqc-receipt" data-lenis-prevent>
    <p className="hqc-brand">{l.flag}</p>
    <span className="hqc-receipt-icon" aria-hidden="true"><Check size={23} /></span>
    <h2 id="hqc-title" ref={heading} tabIndex={-1} data-initial-focus>{l.title}</h2>
    <p id="hqc-intro" className="hqc-intro">{l.detail}</p>
    <div className="hqc-receipt-reference">
      <span>{l.reference}</span>
      <code ref={reference}>{receipt.reference}</code>
      <button type="button" onClick={copy}><Copy size={16} aria-hidden="true" />{l.copy}</button>
      <span className="hqc-copy-status" role="status">{copyState ? l[copyState] : ''}</span>
    </div>
    <button className="hqc-submit" type="button" onClick={close}>{l.close}<ArrowRight size={18} aria-hidden="true" /></button>
    <button className="hqc-discard" type="button" onClick={newInquiry}>{l.fresh}</button>
  </div>;
}
