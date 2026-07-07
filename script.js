// GESTION DU THÈME (SOMBRE / CLAIR)
const toggle = document.getElementById("darkToggle");
const htmlElement = document.documentElement; // Tailwind utilise souvent la classe sur <html>
// Fonction pour mettre à jour l'icône et l'apparence
function updateThemeUI() {
    if (htmlElement.classList.contains("dark")) {
        // Mode sombre activé
        if (toggle) toggle.innerHTML = '<i class="fas fa-sun text-yellow-400"></i>'; 
        localStorage.setItem("theme", "dark");
    } else {
        // Mode clair activé
        if (toggle) toggle.innerHTML = '<i class="fas fa-moon text-emerald-400"></i>';
        localStorage.setItem("theme", "light");
    }
}
// Charger le thème sauvegardé au démarrage
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
        // On bascule une classe Tailwind pour afficher/cacher le menu
        navLinks.classList.toggle("hidden");
        navLinks.classList.toggle("flex");
        
        // Animation simple de l'icône burger
        mobileMenuBtn.innerHTML = navLinks.classList.contains("hidden") ? "☰" : "✕";
    });
}

// EFFET DE SCROLL SUR LA NAVBAR
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-3', 'shadow-2xl', 'bg-[#030712]/90');
        nav.classList.remove('py-5');
    } else {
        nav.classList.add('py-5');
        nav.classList.remove('py-3', 'shadow-2xl', 'bg-[#030712]/90');
    }
});

// GESTION DU LIEN ACTIF DANS LA NAV
// Compare l'URL ET l'ancre (#...) actuelles avec le href de chaque lien du menu
// pour n'appliquer la couleur verte qu'au bon lien, sans en allumer plusieurs à la fois
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentHash = window.location.hash; // ex: "#about", "#skills", "#contact" ou ""

function updateActiveNavLink() {
    document.querySelectorAll(".nav-link").forEach(link => {
        const href = link.getAttribute("href");
        const [hrefPage, hrefHash] = href.split("#");
        const linkPage = hrefPage || currentPage;
        const linkHash = hrefHash ? "#" + hrefHash : "";

        // Le lien est actif seulement si :
        // - c'est la bonne page (index.html, veille.html, cv.html, projets.html...)
        // - ET la bonne ancre (même # ou aucune ancre des deux côtés)
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

// Si l'utilisateur clique sur une ancre de la même page (À propos, Compétences, Contact),
// on remet à jour le lien actif sans recharger la page
window.addEventListener("hashchange", updateActiveNavLink);
