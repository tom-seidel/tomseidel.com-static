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

    // Update button SVG
    const updateButton = () => {
        button.innerHTML = body.classList.contains("dark-mode") ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
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

shareButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`

shareButton.addEventListener("click", () => {
    overlay.classList.add("active"); // Show
    modal.classList.add("active");
});

// Option: Click on the overlay to close it again
overlay.addEventListener("click", () => {
    overlay.classList.remove("active"); // Hide
    modal.classList.remove("active");
});