// GESTION DU THÈME (SOMBRE / CLAIR)
const toggle = document.getElementById("darkToggle");
const htmlElement = document.documentElement;
function updateThemeUI() {
    if (htmlElement.classList.contains("dark")) {
        if (toggle) toggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>';
        localStorage.setItem("theme", "dark");
    } else {
        if (toggle) toggle.innerHTML = '<i class="fas fa-moon text-emerald-400"></i>';
        localStorage.setItem("theme", "light");
    }
}
if (localStorage.getItem("theme") === "dark" ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add("dark");
} else {
    htmlElement.classList.remove("dark");
}
updateThemeUI();

// MENU MOBILE (BURGER)
const mobileMenuBtn = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("hidden");
        navLinks.classList.toggle("flex");
        mobileMenuBtn.innerHTML = navLinks.classList.contains("hidden") ? "☰" : "✕";
    });
}

// EFFET DE SCROLL SUR LA NAVBAR
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-3', 'shadow-2xl');
        nav.classList.remove('py-5');
    } else {
        nav.classList.add('py-5');
        nav.classList.remove('py-3', 'shadow-2xl');
    }
});

// GESTION DU LIEN ACTIF DANS LA NAV
const currentPage = window.location.pathname.split("/").pop() || "index.html";

function updateActiveNavLink() {
    const currentHash = window.location.hash;

    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        const [hrefPage, hrefHash] = href.split("#");
        const linkPage = hrefPage || currentPage;
        const linkHash = hrefHash ? "#" + hrefHash : "";
        const isActive = (linkPage === currentPage) && (linkHash === currentHash);

        if (isActive) {
            link.classList.add("text-emerald-400");
            link.classList.remove("hover:text-emerald-400");
        } else {
            link.classList.remove("text-emerald-400");
            if (!link.classList.contains("hover:text-emerald-400")) {
                link.classList.add("hover:text-emerald-400");
            }
        }
    });
}

updateActiveNavLink();
window.addEventListener("hashchange", updateActiveNavLink);

// ===================================================
// ANIMATIONS : entrée, apparition, cartes 3D, parallaxe
// ===================================================
(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // respecte le réglage "réduire les animations"
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1) Entrée de la page : photo, titre, texte, boutons arrivent l'un après l'autre
    document.querySelectorAll('h1, h1 + p, .min-h-screen > .group, .min-h-screen > .flex')
        .forEach((el, i) => {
            el.classList.add('hero-in');
            el.style.setProperty('--d', (i * 0.12) + 's');
        });

    // 2) Apparition des cartes, titres de section et étapes de la timeline au défilement
    const targets = [...document.querySelectorAll('.glass-card, section h2, .timeline-item')]
        .filter(el => !el.closest('nav') && !el.closest('.min-h-screen'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('in');
                setTimeout(() => { el.style.transitionDelay = ''; }, 1200);
                io.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(el => {
            const index = [...el.parentElement.children].indexOf(el);
            el.style.transitionDelay = Math.min(index, 5) * 90 + 'ms'; // petit décalage entre cartes voisines
            el.classList.add('reveal');
            io.observe(el);
        });
    }

    // 3) Cartes inclinables en 3D qui suivent la souris (ordinateur uniquement)
    document.querySelectorAll('.glass-card').forEach(card => {
        if (card.closest('nav')) return;
        if (!fine || card.classList.contains('rounded-full') || card.querySelector('embed, form')) {
            card.classList.add('no-tilt');
            return;
        }
        card.addEventListener('pointermove', (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            const max = r.width > 700 ? 2.5 : 8; // grandes cartes : inclinaison réduite
            card.style.setProperty('--ry', ((x - 0.5) * 2 * max) + 'deg');
            card.style.setProperty('--rx', ((0.5 - y) * 2 * max) + 'deg');
            card.style.setProperty('--mx', (x * 100) + '%');
            card.style.setProperty('--my', (y * 100) + '%');
        });
        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });

    // 4) Barre de progression + parallaxe des halos de l'accueil
    const bar = document.createElement('div');
    bar.id = 'scrollBar';
    document.body.appendChild(bar);

    const blobs = [...document.querySelectorAll('[class*="blur-[120px]"]')];
    let mx = 0, my = 0, ticking = false;

    function frame() {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
        blobs.forEach((b, i) => {
            const s = i % 2 ? -1 : 1;
            b.style.transform = 'translate3d(' + (mx * 40 * s) + 'px,' + (my * 40 * s + window.scrollY * 0.15 * s) + 'px,0)';
        });
    }
    function request() {
        if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    if (fine) {
        window.addEventListener('pointermove', (e) => {
            mx = e.clientX / window.innerWidth - 0.5;
            my = e.clientY / window.innerHeight - 0.5;
            request();
        });
    }
    frame();
})();
