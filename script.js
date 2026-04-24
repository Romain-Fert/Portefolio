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
        nav.classList.add('py-2', 'bg-black/80');
        nav.classList.remove('py-4', 'bg-black/40');
    } else {
        nav.classList.add('py-4', 'bg-black/40');
        nav.classList.remove('py-2', 'bg-black/80');
    }
});
