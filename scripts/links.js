// ----- Dark Mode Functionality -----
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("darkmode-button");
    const body = document.body;

    // Check if dark mode is stored
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    // Apply initial mode
    if (isDarkMode) {
        body.classList.add("dark-mode");
    }

    // Update button text
    const updateButton = () => {
        button.innerHTML = body.classList.contains("dark-mode") ? "☼" : "☾";
    };

    updateButton();

    // Toggle function
    button.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        updateButton();
        
    });
});

// ----- Share Modal Functionality -----
const shareButton = document.getElementById("share-button");
const blur = document.querySelector(".blur");

shareButton.addEventListener("click", () => {
    blur.classList.add("active"); // Einblenden
});

// Optional: Klick auf das Overlay schließt es wieder
blur.addEventListener("click", () => {
    blur.classList.remove("active"); // Ausblenden
});