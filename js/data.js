/**
 * PARCELPULSE - MOCK DATA MODULE
 * Chứa dữ liệu giả lập cho 6 thực thể chính:
 * 1. parcels
 * 2. trackingEvents
 * 3. routes
 * 4. stops
 * 5. exceptions
 * 6. users
 */

const DEFAULT_USERS = [
  {
    id: "USR-001",
    name: "Nguyễn Thị Mai",
    email: "mai.nguyen@gmail.com",
    phone: "0912345678",
    role: "recipient",
    roleName: "Người nhận",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "USR-002",
    name: "Trần Văn Đức",
    email: "duc.tran@parcelpulse.vn",
    phone: "0987654321",
    role: "driver",
    roleName: "Nhân viên giao hàng",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    status: "active",
    vehicle: "Honda Wave 29B1-888.99",
    currentRoute: "ROUTE-HN-04",
    rating: 4.8,
    createdAt: "2023-10-10"
  },
  {
    id: "USR-003",
    name: "Lê Thị Hương",
    email: "huong.le@parcelpulse.vn",
    phone: "0905123456",
    role: "dispatcher",
    roleName: "Điều phối viên",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    status: "active",
    hub: "Kho Trung tâm Cầu Giấy",
    createdAt: "2023-08-01"
  },
  {
    id: "USR-004",
    name: "Phạm Quốc Anh",
    email: "admin@parcelpulse.vn",
    phone: "0933999888",
    role: "admin",
    roleName: "Quản trị viên",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    status: "active",
    createdAt: "2023-01-01"
  },
  {
    id: "USR-005",
    name: "Vũ Minh Tuấn",
    email: "tuan.driver@parcelpulse.vn",
    phone: "0977112233",
    role: "driver",
    roleName: "Nhân viên giao hàng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    status: "active",
    vehicle: "Yamaha Sirius 29X5-345.12",
    currentRoute: "ROUTE-HN-05",
    rating: 4.6,
    createdAt: "2024-02-18"
  }
];

const DEFAULT_PARCELS = [
  {
    id: "PP-2024-00123",
    trackingNumber: "PP-2024-00123",
    senderName: "Công ty Thời Trang SunShine",
    senderPhone: "0243888999",
    senderAddress: "Số 45 Tràng Tiền, Hoàn Kiếm, Hà Nội",
    recipientId: "USR-001",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    deliveryAddress: "Tầng 8, Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội",
    weight: "1.2 kg",
    dimensions: "25x20x10 cm",
    codAmount: 350000,
    status: "in_transit", // pending, in_transit, out_for_delivery, delivered, exception, returned
    statusLabel: "Đang trung chuyển",
    estimatedDelivery: "2024-10-24 16:30",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    routeId: "ROUTE-HN-04",
    notes: "Hàng thời trang cao cấp, gọi trước khi giao 15 phút.",
    preferredTimeSlot: "14:00 - 17:00",
    safeDropOption: "Gửi tại quầy lễ tân tầng 1 nếu vắng",
    createdAt: "2024-10-21 08:30"
  },
  {
    id: "PP-2024-00124",
    trackingNumber: "PP-2024-00124",
    senderName: "Siêu thị Điện máy DigiTech",
    senderPhone: "0247300222",
    senderAddress: "Số 102 Thái Hà, Đống Đa, Hà Nội",
    recipientId: "USR-001",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    deliveryAddress: "Số 15 Ngõ 68 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội",
    weight: "3.5 kg",
    dimensions: "40x30x20 cm",
    codAmount: 1850000,
    status: "exception",
    statusLabel: "Có ngoại lệ",
    estimatedDelivery: "2024-10-22 17:00",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    routeId: "ROUTE-HN-04",
    notes: "Hàng linh kiện điện tử dễ vỡ, không đè nặng.",
    preferredTimeSlot: "17:00 - 20:00",
    safeDropOption: "Yêu cầu giao tận tay người nhận",
    createdAt: "2024-10-20 14:15"
  },
  {
    id: "PP-2024-00125",
    trackingNumber: "PP-2024-00125",
    senderName: "Nhà sách Fahasa Online",
    senderPhone: "0283999111",
    senderAddress: "Kho Tân Bình, TP. Hồ Chí Minh",
    recipientId: "USR-001",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    deliveryAddress: "Tầng 8, Tòa Keangnam, Nam Từ Liêm, Hà Nội",
    weight: "0.8 kg",
    dimensions: "20x15x5 cm",
    codAmount: 0,
    status: "delivered",
    statusLabel: "Giao thành công",
    estimatedDelivery: "2024-10-21 11:30",
    deliveredAt: "2024-10-21 11:15",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    routeId: "ROUTE-HN-04",
    notes: "Đã thanh toán trước qua thẻ tín dụng.",
    preferredTimeSlot: "Bất kỳ",
    safeDropOption: "Gửi bảo vệ sảnh A",
    createdAt: "2024-10-18 09:00"
  },
  {
    id: "PP-2024-00126",
    trackingNumber: "PP-2024-00126",
    senderName: "Mỹ phẩm NatureRepublic",
    senderPhone: "0243912345",
    senderAddress: "Vincom Bà Triệu, Hai Bà Trưng, Hà Nội",
    recipientId: "USR-006",
    recipientName: "Hoàng Linh Chi",
    recipientPhone: "0944556677",
    deliveryAddress: "Phòng 1402, Chung cư Dolphin Plaza, Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
    weight: "0.5 kg",
    dimensions: "15x10x8 cm",
    codAmount: 520000,
    status: "out_for_delivery",
    statusLabel: "Đang đi giao",
    estimatedDelivery: "2024-10-22 15:45",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    routeId: "ROUTE-HN-04",
    notes: "Mang lên tận cửa căn hộ.",
    preferredTimeSlot: "14:00 - 18:00",
    safeDropOption: "Giao tận tay",
    createdAt: "2024-10-22 07:30"
  },
  {
    id: "PP-2024-00127",
    trackingNumber: "PP-2024-00127",
    senderName: "Phụ kiện Apple Hà Nội",
    senderPhone: "0968999999",
    senderAddress: "Thái Hà, Đống Đa, Hà Nội",
    recipientId: "USR-007",
    recipientName: "Đặng Tiến Dũng",
    recipientPhone: "0988776655",
    deliveryAddress: "Số 88 Duy Tân, Cầu Giấy, Hà Nội",
    weight: "0.3 kg",
    dimensions: "15x10x5 cm",
    codAmount: 1200000,
    status: "exception",
    statusLabel: "Có ngoại lệ",
    estimatedDelivery: "2024-10-22 14:00",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    routeId: "ROUTE-HN-04",
    notes: "Cáp sạc MagSafe, cần kiểm tra seal trước khi nhận.",
    preferredTimeSlot: "13:30 - 15:30",
    safeDropOption: "Không đồng kiểm",
    createdAt: "2024-10-21 16:00"
  },
  {
    id: "PP-2024-00128",
    trackingNumber: "PP-2024-00128",
    senderName: "Tập đoàn Dược phẩm PharmaCare",
    senderPhone: "0243765432",
    senderAddress: "KCN Sài Đồng, Long Biên, Hà Nội",
    recipientId: "USR-008",
    recipientName: "Bác sĩ Bùi Văn Hiếu",
    recipientPhone: "0936112244",
    deliveryAddress: "Bệnh viện 19-8 Bộ Công An, Trần Bình, Cầu Giấy, Hà Nội",
    weight: "2.1 kg",
    dimensions: "30x20x15 cm",
    codAmount: 0,
    status: "pending",
    statusLabel: "Chờ điều phối",
    estimatedDelivery: "2024-10-23 10:00",
    driverId: null,
    driverName: null,
    routeId: null,
    notes: "Thuốc và thiết bị y tế bảo quản nhiệt độ thường.",
    preferredTimeSlot: "08:00 - 11:30",
    safeDropOption: "Khoa Dược tầng 2",
    createdAt: "2024-10-22 09:15"
  }
];

const DEFAULT_TRACKING_EVENTS = {
  "PP-2024-00123": [
    {
      time: "2024-10-21 08:30",
      location: "Kho Sunshine, Hoàn Kiếm",
      status: "Tạo đơn hàng",
      description: "Người gửi đã tạo thông tin vận đơn trực tuyến",
      type: "create"
    },
    {
      time: "2024-10-21 11:15",
      location: "Bưu cục Hoàn Kiếm",
      status: "Đã lấy hàng",
      description: "Tài xế nhận hàng thành công từ người gửi",
      type: "pickup"
    },
    {
      time: "2024-10-21 21:00",
      location: "Kho Tổng Phía Bắc (Bắc Từ Liêm)",
      status: "Nhập kho trung chuyển",
      description: "Đã phân loại và kiểm tra an toàn bưu kiện",
      type: "transit"
    },
    {
      time: "2024-10-22 08:00",
      location: "Hub Cầu Giấy - Nam Từ Liêm",
      status: "Xuất kho trung chuyển",
      description: "Đang chuyển giao về kho giao chặng cuối",
      type: "transit"
    }
  ],
  "PP-2024-00124": [
    {
      time: "2024-10-20 14:15",
      location: "Kho DigiTech, Thái Hà",
      status: "Tạo đơn hàng",
      description: "Đơn hàng sẵn sàng xuất xưởng",
      type: "create"
    },
    {
      time: "2024-10-21 09:30",
      location: "Hub Cầu Giấy",
      status: "Bắt đầu giao hàng",
      description: "Giao cho tài xế Trần Văn Đức",
      type: "out_for_delivery"
    },
    {
      time: "2024-10-22 10:30",
      location: "Ngõ 68 Cầu Giấy",
      status: "Phát sinh ngoại lệ",
      description: "Tài xế đã gọi 3 cuộc nhưng khách hàng không bắt máy. Địa chỉ trong ngõ sâu không có số nhà cụ thể.",
      type: "exception"
    }
  ],
  "PP-2024-00125": [
    {
      time: "2024-10-18 09:00",
      location: "Kho Fahasa Tân Bình",
      status: "Tạo đơn hàng",
      description: "Đóng gói sách hoàn tất",
      type: "create"
    },
    {
      time: "2024-10-19 18:30",
      location: "Sân bay Nội Bài",
      status: "Vận chuyển đường bay",
      description: "Hạ cánh an toàn tại ga hàng hóa Nội Bài",
      type: "transit"
    },
    {
      time: "2024-10-21 08:30",
      location: "Hub Nam Từ Liêm",
      status: "Đang giao hàng",
      description: "Tài xế đang trên đường đến địa chỉ người nhận",
      type: "out_for_delivery"
    },
    {
      time: "2024-10-21 11:15",
      location: "Tòa nhà Keangnam, Mễ Trì",
      status: "Giao hàng thành công",
      description: "Người nhận đã ký nhận gói hàng tại quầy lễ tân.",
      type: "delivered"
    }
  ]
};

const DEFAULT_ROUTES = [
  {
    id: "ROUTE-HN-04",
    name: "Tuyến Cầu Giấy - Nam Từ Liêm sáng/chiều",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    date: "2024-10-22",
    totalStops: 12,
    completedStops: 5,
    pendingStops: 5,
    exceptionStops: 2,
    totalDistance: "28.5 km",
    estimatedTime: "5 giờ 30 phút",
    status: "in_progress"
  },
  {
    id: "ROUTE-HN-05",
    name: "Tuyến Bắc Từ Liêm - Hồ Tùng Mậu",
    driverId: "USR-005",
    driverName: "Vũ Minh Tuấn",
    date: "2024-10-22",
    totalStops: 15,
    completedStops: 9,
    pendingStops: 5,
    exceptionStops: 1,
    totalDistance: "34.0 km",
    estimatedTime: "6 giờ 15 phút",
    status: "in_progress"
  }
];

const DEFAULT_STOPS = [
  {
    id: "STOP-001",
    routeId: "ROUTE-HN-04",
    sequence: 1,
    parcelId: "PP-2024-00125",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    address: "Tòa Keangnam, Mễ Trì, Nam Từ Liêm",
    timeWindow: "09:00 - 10:00",
    codAmount: 0,
    status: "completed",
    actualDeliveryTime: "09:45",
    notes: "Lễ tân ký thay"
  },
  {
    id: "STOP-002",
    routeId: "ROUTE-HN-04",
    sequence: 2,
    parcelId: "PP-2024-00124",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    address: "Số 15 Ngõ 68 Cầu Giấy, Quan Hoa",
    timeWindow: "10:30 - 11:30",
    codAmount: 1850000,
    status: "exception",
    actualDeliveryTime: null,
    notes: "Khách không nghe máy, ngõ bị rào thi công"
  },
  {
    id: "STOP-003",
    routeId: "ROUTE-HN-04",
    sequence: 3,
    parcelId: "PP-2024-00126",
    recipientName: "Hoàng Linh Chi",
    recipientPhone: "0944556677",
    address: "P1402 Dolphin Plaza, Mỹ Đình 2",
    timeWindow: "13:30 - 14:30",
    codAmount: 520000,
    status: "pending",
    actualDeliveryTime: null,
    notes: "Giao tận phòng"
  },
  {
    id: "STOP-004",
    routeId: "ROUTE-HN-04",
    sequence: 4,
    parcelId: "PP-2024-00127",
    recipientName: "Đặng Tiến Dũng",
    recipientPhone: "0988776655",
    address: "Số 88 Duy Tân, Cầu Giấy",
    timeWindow: "14:30 - 15:30",
    codAmount: 1200000,
    status: "exception",
    actualDeliveryTime: null,
    notes: "Khách đi công tác, xin hẹn lại ngày mai"
  },
  {
    id: "STOP-005",
    routeId: "ROUTE-HN-04",
    sequence: 5,
    parcelId: "PP-2024-00123",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    address: "Keangnam Landmark, Mễ Trì",
    timeWindow: "15:45 - 16:45",
    codAmount: 350000,
    status: "pending",
    actualDeliveryTime: null,
    notes: "Hàng gói thời trang"
  }
];

const DEFAULT_EXCEPTIONS = [
  {
    id: "EXC-2024-001",
    parcelId: "PP-2024-00124",
    trackingNumber: "PP-2024-00124",
    recipientName: "Nguyễn Thị Mai",
    recipientPhone: "0912345678",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    exceptionType: "customer_absent",
    exceptionTypeLabel: "Khách hàng vắng mặt",
    severity: "high",
    severityLabel: "Ưu tiên cao",
    description: "Đã gọi điện 3 lần vào lúc 10:15, 10:20, 10:25 không ai nghe máy. Có chuông cửa nhưng không ai phản hồi.",
    evidenceImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&auto=format&fit=crop&q=80"
    ],
    attemptCount: 1,
    status: "open", // open, resolving, resolved, returned
    statusLabel: "Chờ xử lý",
    suggestedAction: "Gửi SMS tự động thông báo hẹn giao lại vào ca chiều sau 17h hoặc chuyển sang tủ khóa thông minh.",
    aiConfidence: "94%",
    aiCategory: "customer_absent",
    dispatcherNotes: "Đã liên hệ qua Zalo, khách hẹn giao sau 18h tại nhà riêng.",
    createdAt: "2024-10-22 10:30"
  },
  {
    id: "EXC-2024-002",
    parcelId: "PP-2024-00127",
    trackingNumber: "PP-2024-00127",
    recipientName: "Đặng Tiến Dũng",
    recipientPhone: "0988776655",
    driverId: "USR-002",
    driverName: "Trần Văn Đức",
    exceptionType: "reschedule_request",
    exceptionTypeLabel: "Yêu cầu đổi lịch",
    severity: "medium",
    severityLabel: "Ưu tiên trung bình",
    description: "Khách gọi lại báo đang đi công tác Hải Phòng, xin dời ngày giao sang chiều mai 23/10 lúc 15:00.",
    evidenceImages: [],
    attemptCount: 1,
    status: "resolving",
    statusLabel: "Đang xử lý",
    suggestedAction: "Dời lịch giao sang ca chiều ngày 23/10, lưu kho tạm thời tại Hub Cầu Giấy.",
    aiConfidence: "98%",
    aiCategory: "reschedule_request",
    dispatcherNotes: "Đã xác nhận trên hệ thống dời tuyến cho ngày mai.",
    createdAt: "2024-10-22 11:00"
  },
  {
    id: "EXC-2024-003",
    parcelId: "PP-2024-00130",
    trackingNumber: "PP-2024-00130",
    recipientName: "Lâm Đình Trọng",
    recipientPhone: "0909887766",
    driverId: "USR-005",
    driverName: "Vũ Minh Tuấn",
    exceptionType: "wrong_address",
    exceptionTypeLabel: "Sai địa chỉ / Không tìm thấy",
    severity: "urgent",
    severityLabel: "Khẩn cấp",
    description: "Địa chỉ ghi Số 42 Ngách 5 Ngõ 12 Đường Cầu Diễn nhưng khu vực này mới giải tỏa làm đường, không có số nhà này.",
    evidenceImages: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&auto=format&fit=crop&q=80"
    ],
    attemptCount: 2,
    status: "open",
    statusLabel: "Chờ xử lý",
    suggestedAction: "Kích hoạt định vị thông minh, gửi link qua tin nhắn yêu cầu người nhận ghim lại vị trí chính xác trên bản đồ.",
    aiConfidence: "91%",
    aiCategory: "wrong_address",
    dispatcherNotes: "",
    createdAt: "2024-10-22 11:45"
  }
];

const DEFAULT_PREFERENCES = [
  {
    id: "PREF-001",
    parcelId: "PP-2024-00123",
    trackingNumber: "PP-2024-00123",
    preferredTime: "afternoon",
    preferredTimeLabel: "Buổi chiều (13:00 - 18:00)",
    safeDropLocation: "reception",
    safeDropLabel: "Gửi quầy lễ tân tòa nhà",
    customNotes: "Gọi trước 15 phút, nếu không nghe máy thì cứ gửi lễ tân tầng 1 Keangnam.",
    allowNeighbor: true,
    updatedAt: "2024-10-21 14:00"
  },
  {
    id: "PREF-002",
    parcelId: "PP-2024-00124",
    trackingNumber: "PP-2024-00124",
    preferredTime: "evening",
    preferredTimeLabel: "Buổi tối (18:00 - 21:00)",
    safeDropLocation: "handover",
    safeDropLabel: "Bắt buộc giao tận tay, kiểm tra hàng",
    customNotes: "Đi vào ngõ 68 rẽ phải ở tiệm thuốc Tây, nhà cửa gỗ màu xanh lá.",
    allowNeighbor: false,
    updatedAt: "2024-10-22 10:45"
  }
];

const DEFAULT_FEEDBACKS = [
  {
    id: "FB-001",
    parcelId: "PP-2024-00125",
    trackingNumber: "PP-2024-00125",
    rating: 5,
    tags: ["Giao nhanh", "Tài xế thân thiện", "Hàng nguyên vẹn"],
    comment: "Giao rất đúng giờ, tài xế gọi điện lịch sự, sách được bọc xốp cẩn thận không bị gập mép.",
    createdAt: "2024-10-21 12:00"
  }
];

const DEFAULT_REASSIGNMENTS = [
  {
    id: "REASS-01",
    trackingNumber: "PP-2024-00127",
    fromDriver: "Trần Văn Đức (ROUTE-HN-04)",
    toDriver: "Vũ Minh Tuấn (ROUTE-HN-05)",
    reason: "Khách đi công tác, hẹn lại ca chiều mai",
    timestamp: "2024-10-22 11:15",
    status: "Đã chuyển giao"
  }
];

const DEFAULT_AUDIT_LOGS = [];

const DEFAULT_DAILY_VOLUME = [
  { date: "2024-10-16", label: "Thứ 2", count: 180 },
  { date: "2024-10-17", label: "Thứ 3", count: 210 },
  { date: "2024-10-18", label: "Thứ 4", count: 245 },
  { date: "2024-10-19", label: "Thứ 5", count: 260 },
  { date: "2024-10-20", label: "Thứ 6", count: 280 },
  { date: "2024-10-21", label: "Thứ 7", count: 140 },
  { date: "2024-10-22", label: "Chủ Nhật", count: 105 }
];

const DEFAULT_DRIVER_PERFORMANCE = [
  { id: "USR-002", name: "Trần Văn Đức", phone: "0987654321", vehicle: "Honda Wave 29B1-888.99", route: "ROUTE-HN-04 (Cầu Giấy)", routeId: "ROUTE-HN-04", deliveries: 342, successRate: 97.2, rating: 4.9, reviews: 128, bonus: 500000, distanceKm: 3.2, remainingStops: 5, capacity: 12 },
  { id: "USR-005", name: "Vũ Minh Tuấn", phone: "0977112233", vehicle: "Yamaha Sirius 29X5-345.12", route: "ROUTE-HN-05 (Bắc Từ Liêm)", routeId: "ROUTE-HN-05", deliveries: 315, successRate: 95.8, rating: 4.8, reviews: 98, bonus: 300000, distanceKm: 0.8, remainingStops: 4, capacity: 15 },
  { id: "USR-009", name: "Hoàng Văn Nam", phone: "0934112233", vehicle: "Honda AirBlade 29M1-123.45", route: "ROUTE-HN-08 (Mỹ Đình)", routeId: "ROUTE-HN-08", deliveries: 290, successRate: 94.5, rating: 4.7, reviews: 85, bonus: 200000, distanceKm: 1.9, remainingStops: 2, capacity: 12 },
  { id: "USR-010", name: "Đỗ Quốc Việt", phone: "0965334455", vehicle: "Honda Wave 29H1-999.00", route: "ROUTE-HN-12 (Thanh Xuân)", routeId: "ROUTE-HN-12", deliveries: 268, successRate: 92.8, rating: 4.5, reviews: 74, bonus: 100000, distanceKm: 2.5, remainingStops: 7, capacity: 18 }
];

// Khởi tạo và đồng bộ LocalStorage
function initStorage() {
  if (!localStorage.getItem("pp_users")) {
    localStorage.setItem("pp_users", JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem("pp_parcels")) {
    localStorage.setItem("pp_parcels", JSON.stringify(DEFAULT_PARCELS));
  }
  if (!localStorage.getItem("pp_tracking_events")) {
    localStorage.setItem("pp_tracking_events", JSON.stringify(DEFAULT_TRACKING_EVENTS));
  }
  if (!localStorage.getItem("pp_routes")) {
    localStorage.setItem("pp_routes", JSON.stringify(DEFAULT_ROUTES));
  }
  if (!localStorage.getItem("pp_stops")) {
    localStorage.setItem("pp_stops", JSON.stringify(DEFAULT_STOPS));
  }
  if (!localStorage.getItem("pp_exceptions")) {
    localStorage.setItem("pp_exceptions", JSON.stringify(DEFAULT_EXCEPTIONS));
  }
  if (!localStorage.getItem("pp_preferences")) {
    localStorage.setItem("pp_preferences", JSON.stringify(DEFAULT_PREFERENCES));
  }
  if (!localStorage.getItem("pp_feedbacks")) {
    localStorage.setItem("pp_feedbacks", JSON.stringify(DEFAULT_FEEDBACKS));
  }
  if (!localStorage.getItem("pp_reassignments")) {
    localStorage.setItem("pp_reassignments", JSON.stringify(DEFAULT_REASSIGNMENTS));
  }
  if (!localStorage.getItem("pp_audit_logs")) {
    localStorage.setItem("pp_audit_logs", JSON.stringify(DEFAULT_AUDIT_LOGS));
  }
  if (!localStorage.getItem("pp_daily_volume")) {
    localStorage.setItem("pp_daily_volume", JSON.stringify(DEFAULT_DAILY_VOLUME));
  }
  if (!localStorage.getItem("pp_driver_performance")) {
    localStorage.setItem("pp_driver_performance", JSON.stringify(DEFAULT_DRIVER_PERFORMANCE));
  }
  if (!localStorage.getItem("pp_current_user")) {
    localStorage.setItem("pp_current_user", JSON.stringify(DEFAULT_USERS[0])); // Mặc định người nhận
  }
}

initStorage();

function readKey(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch (error) {
    console.error(`Không đọc được ${key}:`, error);
    return fallback;
  }
}

function saveKey(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("pp:datachanged", { detail: { key } }));
}

// Export data functions
window.PP_DATA = {
  getUsers: () => readKey("pp_users", []),
  saveUsers: (data) => saveKey("pp_users", data),

  getParcels: () => readKey("pp_parcels", []),
  saveParcels: (data) => saveKey("pp_parcels", data),

  getTrackingEvents: () => readKey("pp_tracking_events", {}),
  saveTrackingEvents: (data) => saveKey("pp_tracking_events", data),

  getRoutes: () => readKey("pp_routes", []),
  saveRoutes: (data) => saveKey("pp_routes", data),

  getStops: () => readKey("pp_stops", []),
  saveStops: (data) => saveKey("pp_stops", data),

  getExceptions: () => readKey("pp_exceptions", []),
  saveExceptions: (data) => saveKey("pp_exceptions", data),

  getPreferences: () => readKey("pp_preferences", []),
  savePreferences: (data) => saveKey("pp_preferences", data),

  getFeedbacks: () => readKey("pp_feedbacks", []),
  saveFeedbacks: (data) => saveKey("pp_feedbacks", data),

  getReassignments: () => readKey("pp_reassignments", []),
  saveReassignments: (data) => saveKey("pp_reassignments", data),

  getAuditLogs: () => readKey("pp_audit_logs", []),
  saveAuditLogs: (data) => saveKey("pp_audit_logs", data),

  getDailyVolume: () => readKey("pp_daily_volume", []),
  getDriverPerformance: () => readKey("pp_driver_performance", []),

  getCurrentUser: () => readKey("pp_current_user", null),
  setCurrentUser: (user) => localStorage.setItem("pp_current_user", JSON.stringify(user)),

  resetDefaults: () => {
    localStorage.clear();
    initStorage();
    window.dispatchEvent(new CustomEvent("pp:datachanged", { detail: { key: "all" } }));
  }
};
