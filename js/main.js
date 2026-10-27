/**
 * PARCELPULSE - MAIN JAVASCRIPT FRAMEWORK
 * CSE122 - Xử lý tương tác DOM, Trải nghiệm AI, Thông báo, Dark Mode & Navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initUserBadge();
  initMobileMenu();
  initModals();
});

/* ==========================================================================
   SHARED UTILITIES
   ========================================================================== */

const PP_UTILS = {
  escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  },

  debounce(fn, wait = 250) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  },

  uid(prefix = "ID") {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  },

  isValidTracking(value) {
    return /^PP-\d{4}-\d{5}$/i.test(String(value ?? "").trim());
  },

  now() {
    const date = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
};

window.PP_UTILS = PP_UTILS;

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */

function syncThemeButtons() {
  const isDark = document.body.classList.contains("dark-theme");
  document.querySelectorAll('button[onclick="toggleTheme()"]').forEach((btn) => {
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
  });
}

function initTheme() {
  const savedTheme = localStorage.getItem("pp_theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
  syncThemeButtons();
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("pp_theme", isDark ? "dark" : "light");
  syncThemeButtons();
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
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    document.body.appendChild(container);
  }

  const iconMap = {
    success: "✅",
    danger: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = document.createElement("span");
  icon.style.fontSize = "1.25rem";
  icon.textContent = iconMap[type] || "ℹ️";

  const text = document.createElement("div");
  text.style.flex = "1";
  text.style.fontSize = "0.9rem";
  text.style.fontWeight = "500";
  text.textContent = String(message ?? "");

  const close = document.createElement("button");
  close.type = "button";
  close.className = "toast-close";
  close.setAttribute("aria-label", "Đóng thông báo");
  close.textContent = "✕";
  close.addEventListener("click", () => toast.remove());

  toast.append(icon, text, close);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ==========================================================================
   MODAL CONTROLLER (Escape, focus trap, aria)
   ========================================================================== */

let activeModal = null;
let lastFocusedElement = null;

function getFocusable(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

function handleModalKeydown(event) {
  if (!activeModal) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal(activeModal.id);
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getFocusable(activeModal);
  if (focusable.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function prepareModal(modal) {
  if (!modal) return;
  const dialog = modal.querySelector(".modal-dialog");
  if (!dialog) return;

  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  if (!dialog.hasAttribute("tabindex")) dialog.setAttribute("tabindex", "-1");

  if (!dialog.hasAttribute("aria-labelledby")) {
    const heading = dialog.querySelector("h2, h3");
    if (heading) {
      if (!heading.id) heading.id = `${modal.id}-title`;
      dialog.setAttribute("aria-labelledby", heading.id);
    }
  }
}

function initModals() {
  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.setAttribute("aria-hidden", "true");
    prepareModal(modal);
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop") && event.target.classList.contains("open")) {
      closeModal(event.target.id);
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  if (activeModal && activeModal !== modal) {
    closeModal(activeModal.id);
  }

  lastFocusedElement = document.activeElement;
  prepareModal(modal);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  activeModal = modal;
  document.addEventListener("keydown", handleModalKeydown);

  const dialog = modal.querySelector(".modal-dialog");
  if (dialog) {
    const focusable = getFocusable(modal);
    window.setTimeout(() => (focusable[0] || dialog).focus(), 0);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", handleModalKeydown);

  if (activeModal === modal) {
    activeModal = null;
    document.body.style.overflow = "";
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

/* ==========================================================================
   USER IDENTITY & ROLE MANAGEMENT
   ========================================================================== */

function initUserBadge() {
  const currentUser = window.PP_DATA ? window.PP_DATA.getCurrentUser() : null;
  const userBadge = document.getElementById("header-user-badge");
  if (userBadge && currentUser) {
    userBadge.innerHTML = `
      <img src="${PP_UTILS.escapeHTML(currentUser.avatar)}" alt="Ảnh đại diện ${PP_UTILS.escapeHTML(currentUser.name)}" class="user-avatar">
      <div class="user-info">
        <span class="user-name">${PP_UTILS.escapeHTML(currentUser.name)}</span>
        <span class="user-role-tag">${PP_UTILS.escapeHTML(currentUser.roleName)}</span>
      </div>
    `;
  }
}

function setRoleContext(role) {
  if (!window.PP_DATA) return;
  const users = window.PP_DATA.getUsers();
  const targetUser = users.find(u => u.role === role);
  if (targetUser) {
    window.PP_DATA.setCurrentUser(targetUser);
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
  if (!toggleBtn || !navLinks) return;

  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.setAttribute("aria-label", "Mở menu điều hướng");
  if (navLinks.id) toggleBtn.setAttribute("aria-controls", navLinks.id);

  const setMenuState = (open) => {
    navLinks.classList.toggle("show", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
    toggleBtn.setAttribute("aria-label", open ? "Đóng menu điều hướng" : "Mở menu điều hướng");
  };

  toggleBtn.addEventListener("click", () => {
    setMenuState(!navLinks.classList.contains("show"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("show")) {
      setMenuState(false);
      toggleBtn.focus();
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });
}

/* ==========================================================================
   FORMATTERS
   ========================================================================== */

function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getStatusBadge(status, label) {
  const safeStatus = PP_UTILS.escapeHTML(status);
  const safeLabel = PP_UTILS.escapeHTML(label || status);
  return `<span class="badge badge-${safeStatus}"><span class="badge-dot"></span>${safeLabel}</span>`;
}

function logAuditTrail(action, entityId, detail) {
  if (!window.PP_DATA) return;
  const user = window.PP_DATA.getCurrentUser();
  const logs = window.PP_DATA.getAuditLogs();
  logs.unshift({
    id: PP_UTILS.uid("AUD"),
    action: action,
    entityId: entityId,
    detail: detail,
    actor: user ? user.name : "Hệ thống",
    timestamp: PP_UTILS.now()
  });
  window.PP_DATA.saveAuditLogs(logs);
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
    const value = String(text ?? "").trim();

    if (value.length < 5) {
      showToast("Vui lòng nhập mô tả ngoại lệ chi tiết hơn để AI phân tích", "warning");
      if (typeof callback === "function") callback(null);
      return;
    }

    const lower = value.toLowerCase();
    let result = {
      category: "unknown",
      categoryName: "Chưa đủ dữ kiện để phân loại",
      confidence: "55%",
      severity: "medium",
      uncertain: true,
      explanation: "Không phát hiện từ khóa nghiệp vụ quen thuộc trong mô tả. AI không đủ căn cứ để kết luận.",
      recommendedAction: "Đề nghị tài xế bổ sung thông tin hoặc điều phối viên xác minh thủ công trước khi xử lý."
    };

    if (lower.includes("gọi") || lower.includes("nghe máy") || lower.includes("vắng") || lower.includes("khóa cổng") || lower.includes("khoá cổng") || lower.includes("chuông")) {
      result = {
        category: "customer_absent",
        categoryName: "Khách hàng vắng mặt",
        confidence: "94%",
        severity: "medium",
        uncertain: false,
        explanation: "Phát hiện từ khóa liên quan đến việc liên lạc: 'gọi điện', 'không nghe máy', 'khoá cửa', 'không có ai ở nhà'.",
        recommendedAction: "Gửi SMS tự động thông báo hẹn giao lại hoặc dời ca chiều."
      };
    } else if (lower.includes("địa chỉ") || lower.includes("số nhà") || lower.includes("ngõ") || lower.includes("đường")) {
      result = {
        category: "wrong_address",
        categoryName: "Sai địa chỉ / Không tìm thấy",
        confidence: "96%",
        severity: "high",
        uncertain: false,
        explanation: "Phát hiện các yếu tố vị trí địa lý không khớp trên bản đồ định vị hoặc địa chỉ chưa có số nhà cụ thể.",
        recommendedAction: "Gửi liên kết định vị thông minh qua Zalo/SMS cho người nhận ghim lại tọa độ chính xác."
      };
    } else if (lower.includes("từ chối") || lower.includes("không mua") || lower.includes("hủy") || lower.includes("đổi ý")) {
      result = {
        category: "refused_delivery",
        categoryName: "Người nhận từ chối nhận",
        confidence: "98%",
        severity: "urgent",
        uncertain: false,
        explanation: "Xác nhận tín hiệu người nhận từ chối nhận bưu kiện hoặc không đồng ý mức phí thu hộ COD.",
        recommendedAction: "Yêu cầu tài xế xác nhận lý do từ chối bằng ghi âm/chữ ký, chuyển thông báo về người gửi."
      };
    } else if (lower.includes("hỏng") || lower.includes("vỡ") || lower.includes("rách") || lower.includes("móp")) {
      result = {
        category: "damaged",
        categoryName: "Bưu kiện hư hỏng / móp méo",
        confidence: "99%",
        severity: "urgent",
        uncertain: false,
        explanation: "Phát hiện dấu hiệu rủi ro tổn thất vật lý bao bì bưu kiện trong quá trình bốc dỡ và vận chuyển.",
        recommendedAction: "Chụp ảnh bằng chứng 4 góc bưu kiện, lập biên bản đồng kiểm và giữ nguyên trạng thái tại Hub."
      };
    } else if (lower.includes("mưa") || lower.includes("ngập") || lower.includes("kẹt xe") || lower.includes("tai nạn")) {
      result = {
        category: "weather_delay",
        categoryName: "Chậm trễ thời tiết / giao thông bất khả kháng",
        confidence: "92%",
        severity: "low",
        uncertain: false,
        explanation: "Điều kiện ngoại cảnh cản trở lộ trình di chuyển của phương tiện.",
        recommendedAction: "Tự động dời khung giờ ETA thêm 45-60 phút và cập nhật thông báo trên app của khách."
      };
    }

    // Mô phỏng độ trễ xử lý mô hình AI (1.5s)
    setTimeout(() => {
      if (typeof callback === "function") callback(result);
    }, 1500);
  },

  /**
   * AI-2: ETA Explainability
   * Phân tích thời gian giao hàng dự kiến và 4 yếu tố tác động
   */
  explainETA: function(parcelId, callback) {
    if (!parcelId) {
      showToast("Chưa xác định được bưu kiện để phân tích ETA", "warning");
      if (typeof callback === "function") callback({ error: "missing_parcel" });
      return;
    }

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
      if (typeof callback === "function") callback(actions, !actionDatabase[exceptionType]);
    }, 1200);
  }
};
