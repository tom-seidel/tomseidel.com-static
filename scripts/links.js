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