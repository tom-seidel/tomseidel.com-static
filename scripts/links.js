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
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

shareButton.addEventListener("click", () => {
    overlay.classList.add("active"); // Show
    modal.classList.add("active");
});

// Optional: Click on the overlay to close it again
overlay.addEventListener("click", () => {
    overlay.classList.remove("active"); // Hide
    modal.classList.remove("active");
});