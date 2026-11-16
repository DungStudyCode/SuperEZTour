export const QUOTE_STATUSES = {
  waiting: {
    label: 'Chờ báo giá',
    variant: 'waiting',
    color: '#FF9900',
    bg: '#FFF8E6'
  },
  processing: {
    label: 'Đang xử lý',
    variant: 'processing',
    color: '#0084FF',
    bg: '#EBF5FF'
  },
  completed: {
    label: 'Đã hoàn tất',
    variant: 'completed',
    color: '#00B060',
    bg: '#E8F8F0'
  },
  deferred: {
    label: 'Tạm hoãn',
    variant: 'deferred',
    color: '#8B95A1',
    bg: '#F2F4F6'
  }
};

export const INITIAL_QUOTES = [
  {
    id: 'Q-20261115-08',
    customerName: 'Nguyễn*Văn',
    destination: 'Cebu (Philippines)',
    destinationId: 'cebu',
    travelGroup: '4 người lớn + 1 trẻ em',
    travelDates: '2026-12-15 (4 ngày 3 đêm)',
    status: 'waiting',
    timeAgo: 'Vừa xong',
    createdAt: '2026-11-15T10:50:00Z',
    notes: 'Muốn tour lặn ngắm cá mập voi Oslob và thác Kawasan'
  },
  {
    id: 'Q-20261115-07',
    customerName: 'Trần*Mai',
    destination: 'Đà Nẵng (Việt Nam)',
    destinationId: 'danang',
    travelGroup: '6 người (Gia đình)',
    travelDates: '2026-12-24 (3 ngày 2 đêm)',
    status: 'processing',
    timeAgo: '7 phút trước',
    createdAt: '2026-11-15T10:45:00Z',
    notes: 'Tour Bà Nà Hills và phố cổ Hội An, xe Limousine'
  },
  {
    id: 'Q-20261115-06',
    customerName: 'Lê*Hoàng',
    destination: 'Bali (Indonesia)',
    destinationId: 'bali',
    travelGroup: '2 người (Cặp đôi)',
    travelDates: '2027-01-10 (5 ngày 4 đêm)',
    status: 'completed',
    timeAgo: '18 phút trước',
    createdAt: '2026-11-15T10:34:00Z',
    notes: 'Tour trăng mật kèm chụp ảnh Cổng Trời và Nusa Penida'
  },
  {
    id: 'Q-20261115-05',
    customerName: 'Phạm*Dũng',
    destination: 'Kota Kinabalu (Malaysia)',
    destinationId: 'kotakinabalu',
    travelGroup: '8 người (Bạn bè)',
    travelDates: '2026-12-30 (4 ngày 3 đêm)',
    status: 'processing',
    timeAgo: '32 phút trước',
    createdAt: '2026-11-15T10:20:00Z',
    notes: 'Tour ngắm hoàng hôn và sông đom đóm riêng'
  },
  {
    id: 'Q-20261115-04',
    customerName: 'Đặng*Oanh',
    destination: 'Boracay (Philippines)',
    destinationId: 'boracay',
    travelGroup: '3 người',
    travelDates: '2027-01-05 (4 ngày 3 đêm)',
    status: 'completed',
    timeAgo: '50 phút trước',
    createdAt: '2026-11-15T10:02:00Z',
    notes: 'Gói White Beach Healing & thuyền buồm Paraw'
  },
  {
    id: 'Q-20261115-03',
    customerName: 'Hoàng*Yến',
    destination: 'Đài Bắc (Đài Loan)',
    destinationId: 'taipei',
    travelGroup: '5 người',
    travelDates: '2027-02-12 (4 ngày 3 đêm)',
    status: 'completed',
    timeAgo: '1 giờ trước',
    createdAt: '2026-11-15T09:45:00Z',
    notes: 'Tết Nguyên Đán đi Dã Liễu, Cửu Phần, Thập Phần'
  },
  {
    id: 'Q-20261115-02',
    customerName: 'Vũ*Tuấn',
    destination: 'Bangkok (Thái Lan)',
    destinationId: 'bangkok',
    travelGroup: '4 người lớn',
    travelDates: '2026-12-18 (3 ngày 2 đêm)',
    status: 'deferred',
    timeAgo: '2 giờ trước',
    createdAt: '2026-11-15T08:30:00Z',
    notes: 'Khách đổi kế hoạch dời sang tháng 1'
  },
  {
    id: 'Q-20261115-01',
    customerName: 'Đặng*Huyền',
    destination: 'Nha Trang (Việt Nam)',
    destinationId: 'nhatrang',
    travelGroup: '10 người (Công ty)',
    travelDates: '2026-12-20 (3 ngày 2 đêm)',
    status: 'completed',
    timeAgo: '3 giờ trước',
    createdAt: '2026-11-15T07:15:00Z',
    notes: 'Tour cano 4 đảo riêng và tắm bùn Hòn Tằm'
  }
];
