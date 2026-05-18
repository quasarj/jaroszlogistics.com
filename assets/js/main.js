// Set current year wherever marked
document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
});

// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Highlight the active nav item based on data-page on <body>
const currentPage = document.body.dataset.page;
if (currentPage) {
    document
        .querySelectorAll("nav.primary a[data-page]")
        .forEach((a) => {
            if (a.dataset.page === currentPage) a.classList.add("active");
        });
}
