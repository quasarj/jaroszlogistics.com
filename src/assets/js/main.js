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

// Lightbox: click any img inside [data-lightbox], navigate within same group
(function () {
    const groups = {};
    document.querySelectorAll("[data-lightbox]").forEach((container) => {
        const groupName = container.dataset.lightbox;
        const list = (groups[groupName] = groups[groupName] || []);
        container.querySelectorAll("img").forEach((img) => {
            list.push(img);
            img.style.cursor = "zoom-in";
            img.addEventListener("click", () =>
                open(groupName, list.indexOf(img)),
            );
        });
    });

    let overlay, imgEl, currentGroup, currentIdx;

    function ensureOverlay() {
        if (overlay) return;
        overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.innerHTML =
            '<button class="lightbox-close" type="button" aria-label="Close">×</button>' +
            '<button class="lightbox-prev" type="button" aria-label="Previous image">‹</button>' +
            '<button class="lightbox-next" type="button" aria-label="Next image">›</button>' +
            '<img alt="">';
        document.body.appendChild(overlay);
        imgEl = overlay.querySelector("img");
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close();
        });
        overlay
            .querySelector(".lightbox-close")
            .addEventListener("click", close);
        overlay.querySelector(".lightbox-prev").addEventListener("click", (e) => {
            e.stopPropagation();
            navigate(-1);
        });
        overlay.querySelector(".lightbox-next").addEventListener("click", (e) => {
            e.stopPropagation();
            navigate(1);
        });
    }

    function open(group, idx) {
        ensureOverlay();
        currentGroup = group;
        currentIdx = idx;
        update();
        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKey);
    }

    function close() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
    }

    function navigate(delta) {
        const list = groups[currentGroup];
        currentIdx = (currentIdx + delta + list.length) % list.length;
        update();
    }

    function update() {
        const list = groups[currentGroup];
        const img = list[currentIdx];
        imgEl.src = img.src;
        imgEl.alt = img.alt;
        const hasMultiple = list.length > 1;
        overlay.querySelector(".lightbox-prev").style.display = hasMultiple
            ? ""
            : "none";
        overlay.querySelector(".lightbox-next").style.display = hasMultiple
            ? ""
            : "none";
    }

    function onKey(e) {
        if (e.key === "Escape") close();
        else if (e.key === "ArrowLeft") navigate(-1);
        else if (e.key === "ArrowRight") navigate(1);
    }
})();
