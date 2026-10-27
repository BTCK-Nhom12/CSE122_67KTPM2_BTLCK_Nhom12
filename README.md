# ParcelPulse – Theo dõi giao hàng và xử lý ngoại lệ
> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122 (BTL-12)  
> **Lĩnh vực:** Logistics / Last-mile Delivery  
> **Công nghệ:** HTML5 ngữ nghĩa, CSS3 (Design Tokens, Dark Mode, Responsive), Vanilla JavaScript DOM, LocalStorage & AI Simulation.

---

## 1. Cấu Trúc Dự Án

```text
parcelpulse/
├── index.html                           # Cổng vào, chọn vai trò và giới thiệu BTL-12
├── css/
│   └── style.css                        # Hệ thống thiết kế hoàn chỉnh, Dark Mode, Responsive, AI container
├── js/
│   ├── data.js                          # Mock data cho 6 thực thể (parcels, events, routes, stops, exceptions, users)
│   └── main.js                          # Tiện ích DOM, Toast, Modals, 3 Mô hình AI Simulation
├── pages/
│   ├── recipient-track-parcel.html          # [Người nhận] Màn 1: Tra cứu & giải thích ETA bằng AI-2 (R)
│   ├── recipient-delivery-preferences.html  # [Người nhận] Màn 2: Cập nhật tùy chọn nhận hàng & chỉ dẫn ngõ (C/R/U)
│   ├── recipient-delivery-feedback.html     # [Người nhận] Màn 3: Đánh giá chất lượng dịch vụ (C/R/U/D)
│   ├── driver-route-stops.html              # [Tài xế]    Màn 4: Quản lý danh sách điểm dừng & tối ưu tuyến AI-3 (R)
│   ├── driver-stop-detail.html              # [Tài xế]    Màn 5: Chi tiết điểm dừng & xác thực giao hàng e-POD (C/R/U)
│   ├── driver-exception-create.html         # [Tài xế]    Màn 6: Báo ngoại lệ với AI-1 Classifier & AI-3 Next Action (C/R/U/D)
│   ├── dispatcher-operations-dashboard.html # [Điều phối] Màn 7: Dashboard vận hành & AI chấm điểm ưu tiên sự cố (R)
│   ├── dispatcher-exception-queue.html      # [Điều phối] Màn 8: Hàng đợi xử lý ngoại lệ đa tiêu chí & AI đề xuất (C/R/U)
│   ├── dispatcher-reassignment.html         # [Điều phối] Màn 9: Phân công lại tài xế với AI Matching (C/R/U/D)
│   ├── admin-status-management.html         # [Quản trị]  Màn 10: Quản lý vòng đời trạng thái bưu kiện toàn mạng (R/U)
│   ├── admin-user-management.html           # [Quản trị]  Màn 11: Quản lý danh sách tài khoản & phân quyền (C/R/U/D)
│   └── admin-logistics-report.html          # [Quản trị]  Màn 12: Báo cáo KPIs, biểu đồ phân tích & AI Insights (C/R/U/D)
└── README.md
```

---

## 2. Bảng Kiểm Kê 12 Giao Diện Chuẩn Mục 8

| # | Vai trò | Tệp HTML | Giao diện | CRUD | Chức năng chính | AI Tích hợp |
|:---:|---|---|---|:---:|---|---|
| 1 | Người nhận | `recipient-track-parcel.html` | Track Parcel | R | Tra cứu vận đơn thời gian thực, xem timeline sự kiện | **AI-2: ETA Explainability** |
| 2 | Người nhận | `recipient-delivery-preferences.html` | Delivery Preferences | C/R/U | Đặt khung giờ ưu tiên, điểm nhận an toàn, chỉ dẫn ngõ | Tự động cập nhật tuyến tài xế |
| 3 | Người nhận | `recipient-delivery-feedback.html` | Delivery Feedback | C/R/U/D | Đánh giá sao 1-5, chọn tags nhanh, nhận xét chi tiết | Xếp hạng tài xế |
| 4 | Tài xế | `driver-route-stops.html` | Route Stops | R | Quản lý stop list, lọc trạng thái, tìm kiếm | **AI-3: Tối ưu thứ tự điểm dừng** |
| 5 | Tài xế | `driver-stop-detail.html` | Stop Detail | C/R/U | Xem COD, địa chỉ, xác nhận e-POD kèm ảnh và OTP | Cập nhật tự động vòng đời đơn |
| 6 | Tài xế | `driver-exception-create.html` | Exception Create | C/R/U/D | Ghi nhận sự cố hiện trường, tải ảnh bằng chứng | **AI-1 Exception Classifier** & **AI-3 Next Action** |
| 7 | Điều phối | `dispatcher-operations-dashboard.html` | Operations Dashboard | R | 4 KPI cards trực tiếp, giám sát 12 tài xế | **AI-3: Priority Scoring tự động** |
| 8 | Điều phối | `dispatcher-exception-queue.html` | Exception Queue | C/R/U | Lọc đa chiều, kiểm tra ảnh hiện trường, duyệt quyết định | **AI-1 & AI-3 Đề xuất giải pháp** |
| 9 | Điều phối | `dispatcher-reassignment.html` | Reassignment | C/R/U/D | Điều chuyển bưu kiện cho tài xế lân cận khi xe hỏng/kẹt | **AI-3: Smart Driver Matching** |
| 10 | Quản trị | `admin-status-management.html` | Status Management | R/U | Thay đổi trạng thái bưu kiện kèm ghi chú kiểm toán | Đổi trạng thái hàng loạt (Bulk) |
| 11 | Quản trị | `admin-user-management.html` | User Management | C/R/U/D | Thêm mới, sửa thông tin, khóa tài khoản, phân quyền 4 role | Quản lý RBAC |
| 12 | Quản trị | `admin-logistics-report.html` | Logistics Report | C/R/U/D | Biểu đồ cột sản lượng 7 ngày, biểu đồ ngoại lệ, xuất CSV | **AI-2: Logistics Trend Insights** |

---

## 3. Cách Sử Dụng & Trải Nghiệm

1. Mở file [index.html](file:///d:/Downloads/Lập%20trình%20web%20cơ%20bản/BaiTap/parcelpulse/index.html) bằng trình duyệt bất kỳ (Chrome, Edge, Firefox).
2. Tại trang chủ:
   - Chọn vai trò mong muốn để nhảy thẳng vào luồng làm việc.
   - Hoặc click vào nút **"🚀 Trải Nghiệm Ngay"** để bắt đầu từ vai trò Người Nhận.
   - Sử dụng nút **"🌓 Giao diện"** trên Header để chuyển đổi chế độ Sáng / Tối (Dark Mode).
   - Sử dụng thanh Header ở tất cả các trang để chuyển đổi qua lại giữa 12 màn hình một cách liền mạch.
