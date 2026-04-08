// DARK MODE
const toggle = document.getElementById("darkToggle");

// Fonction pour mettre à jour l'icône
function updateIcon() {
    if (document.body.classList.contains("dark")) {
        toggle.textContent = "☀️"; // Mode sombre → icône soleil
    } else {
        toggle.textContent = "🌙"; // Mode clair → icône lune
    }
}

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
updateIcon(); // Met l'icône correcte au chargement

// Au clic : changer le thème + sauvegarder + changer icône
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

    updateIcon();
});


// MENU MOBILE
const mobileMenu = document.getElementById("mobileMenu");
const navLinks = document.getElementById("navLinks");

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}
