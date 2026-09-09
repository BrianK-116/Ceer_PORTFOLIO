/* =============================================================
   CEERUTE — script.js
   Xử lý 3 việc:
     1. Modal "Đang phát triển" (mở/đóng)
     2. Đổi nền navbar khi cuộn trang
     3. Hiệu ứng "xuất hiện khi cuộn tới" cho các khối .reveal
   ============================================================= */


/* =============================================================
   1. MODAL "ĐANG PHÁT TRIỂN"
   ============================================================= */

const modal = document.getElementById("comingSoonModal");
const comingSoonButtons = document.querySelectorAll(".coming-soon");
const closeModal = document.querySelector(".close-modal");
const modalCloseButton = document.querySelector(".modal-close-btn");

// Chỉ chạy phần modal nếu trang hiện tại thực sự có modal này
// (giúp file script.js dùng chung được cho mọi trang mà không báo lỗi console).
if (modal) {

    /* ----- Mở modal khi bấm bất kỳ nút nào có class .coming-soon ----- */
    comingSoonButtons.forEach((button) => {

        button.addEventListener("click", () => {

            modal.classList.add("active");

            // Khoá cuộn nền trong lúc modal mở, tránh cuộn "xuyên" qua modal
            document.body.style.overflow = "hidden";

        });

    });


    /* ----- Đóng modal ----- */
    function hideModal() {

        modal.classList.remove("active");
        document.body.style.overflow = "";

    }

    if (closeModal) {
        closeModal.addEventListener("click", hideModal);
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener("click", hideModal);
    }

    // Bấm ra vùng nền tối bên ngoài hộp thoại cũng đóng modal
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            hideModal();
        }

    });

    // Nhấn phím ESC để đóng modal — tiện cho người dùng bàn phím
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            hideModal();
        }

    });

}


/* =============================================================
   1B. MENU MOBILE (nút hamburger)
   ============================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("is-open");

        // Cập nhật aria-expanded để trình đọc màn hình biết trạng thái menu
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    });

    // Bấm chọn 1 mục trong menu thì tự đóng menu lại
    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =============================================================
   2. HIỆU ỨNG NAVBAR KHI CUỘN
   Nền navbar đậm hơn khi người dùng đã cuộn xuống,
   giúp phân biệt rõ navbar với nội dung phía dưới.
   ============================================================= */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 11, 20, 0.92)";
        } else {
            navbar.style.background = "rgba(5, 11, 20, 0.65)";
        }

    });

}


/* =============================================================
   3. SCROLL-REVEAL
   Các phần tử mang class .reveal sẽ mờ/dịch nhẹ ban đầu (định nghĩa
   trong style.css) và chỉ hiện rõ khi cuộn tới gần vùng nhìn thấy.
   Dùng IntersectionObserver thay vì lắng nghe sự kiện "scroll" trực
   tiếp để nhẹ máy và mượt hơn, đặc biệt trên điện thoại.
   ============================================================= */

// Gắn sẵn class .reveal cho các khối nội dung chính, để không phải
// sửa tay từng file HTML. Nếu trang không có phần tử nào khớp,
// đoạn này tự động không làm gì cả — an toàn cho mọi trang.
const revealTargets = document.querySelectorAll(
    ".folder-card, .about-content, .about-number, .section-heading, .event-item, .page-footer h2"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window && revealTargets.length > 0) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Chỉ cần hiện 1 lần, sau đó ngừng theo dõi phần tử này
                    // để tiết kiệm tài nguyên.
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px",
        }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

} else {

    // Trình duyệt quá cũ không hỗ trợ IntersectionObserver:
    // hiện thẳng nội dung, không áp dụng hiệu ứng, tránh nội dung bị "kẹt" ẩn mãi.
    revealTargets.forEach((el) => el.classList.add("is-visible"));

}
