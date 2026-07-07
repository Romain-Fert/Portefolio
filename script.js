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
// Compare l'URL de la page actuelle avec le href de chaque lien du menu
// et applique automatiquement la couleur verte au bon endroit (desktop + mobile)
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach(link => {
    // On enlève tout ce qui suit un # pour ne comparer que le nom du fichier
    const linkPage = link.getAttribute("href").split("#")[0];

    if (linkPage === currentPage) {
        link.classList.add("text-emerald-400");
        link.classList.remove("hover:text-emerald-400");
    } else {
        link.classList.remove("text-emerald-400");
        if (!link.classList.contains("hover:text-emerald-400")) {
            link.classList.add("hover:text-emerald-400");
        }
    }
});
