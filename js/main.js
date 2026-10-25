/**
 * PARCELPULSE - MAIN JAVASCRIPT FRAMEWORK
 * CSE122 - Xử lý tương tác DOM, Trải nghiệm AI, Thông báo, Dark Mode & Navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initUserBadge();
  initMobileMenu();
});

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */

function initTheme() {
  const savedTheme = localStorage.getItem("pp_theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("pp_theme", isDark ? "dark" : "light");
  showToast(isDark ? "Đã bật giao diện ban đêm" : "Đã bật giao diện ban ngày", "info");
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */

function showToast(message, type = "info", duration = 3500) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  const iconMap = {
    success: "✅",
    danger: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${iconMap[type] || "ℹ️"}</span>
    <div style="flex: 1; font-size: 0.9rem; font-weight: 500;">${message}</div>
    <button style="background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.1rem;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================================================
   MODAL CONTROLLER
   ========================================================================== */

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   USER IDENTITY & ROLE MANAGEMENT
   ========================================================================== */

function initUserBadge() {
  const currentUser = window.PP_DATA ? window.PP_DATA.getCurrentUser() : null;
  const userBadge = document.getElementById("header-user-badge");
  if (userBadge && currentUser) {
    userBadge.innerHTML = `
      <img src="${currentUser.avatar}" alt="${currentUser.name}" class="user-avatar">
      <div class="user-info">
        <span class="user-name">${currentUser.name}</span>
        <span class="user-role-tag">${currentUser.roleName}</span>
      </div>
    `;
  }
}

function switchUserRole(role) {
  if (!window.PP_DATA) return;
  const users = window.PP_DATA.getUsers();
  const targetUser = users.find(u => u.role === role);
  if (targetUser) {
    window.PP_DATA.setCurrentUser(targetUser);
    showToast(`Đã chuyển đổi sang vai trò: ${targetUser.roleName}`, "success");
    
    // Điều hướng theo vai trò tương ứng
    setTimeout(() => {
      const redirectMap = {
        recipient: "../pages/recipient-track-parcel.html",
        driver: "../pages/driver-route-stops.html",
        dispatcher: "../pages/dispatcher-operations-dashboard.html",
        admin: "../pages/admin-status-management.html"
      };
      
      const currentPath = window.location.pathname;
      let targetPath = redirectMap[role] || "index.html";
      
      if (currentPath.includes("/pages/")) {
        targetPath = targetPath.replace("../pages/", "");
      }
      
      window.location.href = targetPath;
    }, 600);
  }
}

function initMobileMenu() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
}

/* ==========================================================================
   FORMATTERS
   ========================================================================== */

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getStatusBadge(status, label) {
  return `<span class="badge badge-${status}"><span class="badge-dot"></span>${label || status}</span>`;
}

/* ==========================================================================
   AI ENGINES SIMULATION (MỤC 11 & 12)
   Form: Input -> Processing -> Output -> Reason / Explain -> Decision
   ========================================================================== */

const PP_AI = {
  /**
   * AI-1: Exception Classifier
   * Phân loại ngoại lệ thông minh từ mô tả văn bản thực tế
   */
  classifyException: function(text, callback) {
    if (!text || text.trim().length < 5) {
      showToast("Vui lòng nhập mô tả ngoại lệ chi tiết hơn để AI phân tích", "warning");
      return;
    }

    const lower = text.toLowerCase();
    let result = {
      category: "customer_absent",
      categoryName: "Khách hàng vắng mặt",
      confidence: "94%",
      severity: "medium",
      explanation: "Phát hiện từ khóa liên quan đến việc liên lạc: 'gọi điện', 'không nghe máy', 'khoá cửa', 'không có ai ở nhà'.",
      recommendedAction: "Gửi SMS tự động thông báo hẹn giao lại hoặc dời ca chiều."
    };

    if (lower.includes("địa chỉ") || lower.includes("số nhà") || lower.includes("ngõ") || lower.includes("đường")) {
      result = {
        category: "wrong_address",
        categoryName: "Sai địa chỉ / Không tìm thấy",
        confidence: "96%",
        severity: "high",
        explanation: "Phát hiện các yếu tố vị trí địa lý không khớp trên bản đồ định vị hoặc địa chỉ chưa có số nhà cụ thể.",
        recommendedAction: "Gửi liên kết định vị thông minh qua Zalo/SMS cho người nhận ghim lại tọa độ chính xác."
      };
    } else if (lower.includes("từ chối") || lower.includes("không mua") || lower.includes("hủy") || lower.includes("đổi ý")) {
      result = {
        category: "refused_delivery",
        categoryName: "Người nhận từ chối nhận",
        confidence: "98%",
        severity: "urgent",
        explanation: "Xác nhận tín hiệu người nhận từ chối nhận bưu kiện hoặc không đồng ý mức phí thu hộ COD.",
        recommendedAction: "Yêu cầu tài xế xác nhận lý do từ chối bằng ghi âm/chữ ký, chuyển thông báo về người gửi."
      };
    } else if (lower.includes("hỏng") || lower.includes("vỡ") || lower.includes("rách") || lower.includes("móp")) {
      result = {
        category: "damaged",
        categoryName: "Bưu kiện hư hỏng / móp méo",
        confidence: "99%",
        severity: "urgent",
        explanation: "Phát hiện dấu hiệu rủi ro tổn thất vật lý bao bì bưu kiện trong quá trình bốc dỡ và vận chuyển.",
        recommendedAction: "Chụp ảnh bằng chứng 4 góc bưu kiện, lập biên bản đồng kiểm và giữ nguyên trạng thái tại Hub."
      };
    } else if (lower.includes("mưa") || lower.includes("ngập") || lower.includes("kẹt xe") || lower.includes("tai nạn")) {
      result = {
        category: "weather_delay",
        categoryName: "Chậm trễ thời tiết / giao thông bất khả kháng",
        confidence: "92%",
        severity: "low",
        explanation: "Điều kiện ngoại cảnh cản trở lộ trình di chuyển của phương tiện.",
        recommendedAction: "Tự động dời khung giờ ETA thêm 45-60 phút và cập nhật thông báo trên app của khách."
      };
    }

    // Mô phỏng độ trễ xử lý mô hình AI (1.5s)
    setTimeout(() => {
      callback(result);
    }, 1500);
  },

  /**
   * AI-2: ETA Explainability
   * Phân tích thời gian giao hàng dự kiến và 4 yếu tố tác động
   */
  explainETA: function(parcelId, callback) {
    const factors = [
      { name: "Mật độ giao thông chặng cuối", impact: "+15 phút", status: "warning", detail: "Khu vực Cầu Giấy đang có mật độ phương tiện đông đúc vào giờ cao điểm." },
      { name: "Điều kiện thời tiết", impact: "0 phút", status: "success", detail: "Trời râm mát, không mưa, thuận lợi cho việc di chuyển bằng xe máy." },
      { name: "Độ sẵn sàng của người nhận", impact: "+5 phút", status: "info", detail: "Người nhận đã chọn khung giờ ưu tiên từ 14:00 - 17:00." },
      { name: "Khối lượng công việc của tài xế", impact: "-10 phút", status: "success", detail: "Tài xế đang hoàn thành vượt tiến độ tuyến 2 điểm dừng." }
    ];

    const result = {
      baseETA: "15:30",
      adjustedETA: "15:40 Hôm nay",
      confidenceScore: "95.4%",
      summary: "Dự kiến giao hàng trong vòng 35-45 phút tới với độ chính xác cao.",
      factors: factors
    };

    setTimeout(() => {
      callback(result);
    }, 1800);
  },

  /**
   * AI-3: Next Best Action
   * Gợi ý hành động tiếp theo tốt nhất cho Điều phối viên / Tài xế
   */
  suggestNextAction: function(exceptionType, callback) {
    const actionDatabase = {
      customer_absent: [
        { title: "Gửi liên kết hẹn giờ giao lại tự động", score: "96%", desc: "Gửi SMS chứa link cho khách tự chọn khung giờ thuận tiện nhất hôm nay hoặc ngày mai.", recommended: true },
        { title: "Chuyển gửi bưu kiện tại tủ SmartLocker / Điểm gửi lân cận", score: "88%", desc: "Bưu kiện có thể lưu trữ an toàn trong bán kính 200m nếu khách đồng ý.", recommended: false },
        { title: "Dời lịch giao sang ca kế tiếp của cùng tài xế", score: "79%", desc: "Giao lại vào lúc 17:30 khi người nhận đi làm về.", recommended: false }
      ],
      wrong_address: [
        { title: "Gửi yêu cầu định vị GPS tọa độ thời gian thực", score: "94%", desc: "Người nhận chỉ cần nhấn mở link là hệ thống tự cập nhật tọa độ trên bản đồ của tài xế.", recommended: true },
        { title: "Chuyển tiếp cho Điều phối viên hỗ trợ gọi điện", score: "85%", desc: "Bộ phận CSKH sẽ tra cứu lại hợp đồng và liên hệ người gửi kiểm tra địa chỉ gốc.", recommended: false }
      ],
      default: [
        { title: "Hẹn giao lại vào sáng mai 09:00", score: "92%", desc: "Lưu kho an toàn tại Hub Cầu Giấy và sắp xếp chuyến sớm nhất.", recommended: true },
        { title: "Chuyển hoàn hàng về người gửi", score: "65%", desc: "Thực hiện nếu đơn đã giao không thành công 3 lần theo quy định.", recommended: false }
      ]
    };

    const actions = actionDatabase[exceptionType] || actionDatabase.default;

    setTimeout(() => {
      callback(actions);
    }, 1200);
  }
};
