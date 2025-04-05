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

// ----- Dark Mode Button and Menu Button show and hide while scrolling -----
const darkmodeShare = document.querySelector(".darkmode-share");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    if(window.scrollY > 220) {
        darkmodeShare.classList.add("hidden");
    } else {
        darkmodeShare.classList.remove("hidden")
    }
});


// ----- Menu Modal Functionality -----
const menuButton = document.getElementById("menu-button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal-frame");

menuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`

menuButton.addEventListener("click", () => {
    overlay.classList.add("active"); // Show
    modal.classList.add("active");
});

// Option: Click on the overlay to close it again
overlay.addEventListener("click", () => {
    overlay.classList.remove("active"); // Hide
    modal.classList.remove("active");
});

// ----- Close Modal Window -----
const closeButton = document.getElementById("modal-close");

closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");
    modal.classList.remove("active");
});

// ----- Clipboard Functionality -----
document.getElementById("copy-button").addEventListener("click", () => {
    const input = document.getElementById("modal-link");
    input.value = "https://tomseidel.com/links";
    document.execCommand("copy");

    // Optional: Briefly change the button text as feedback
    const button = document.getElementById("copy-button");
    button.textContent = "Copied";
    setTimeout(() => (button.textContent = "Copy Link"), 2000);
});

// ----- Clipboard Functionality for Link Buttons -----
document.querySelectorAll(".link-right").forEach(button => {
    button.addEventListener("click", () => {
        const url = button.dataset.url;
        const input = document.getElementById("modal-link");
        input.value = url;

        // Copy instantly
        input.select();
        document.execCommand("copy");

        // Feedback
        const copyBtn = document.getElementById("copy-button");
        copyBtn.textContent = "Copied";
        setTimeout(() => (copyBtn.textContent = "Copy Link"), 2000);

        // Show modal
        document.querySelector(".overlay").classList.add("active");
        document.querySelector(".modal-frame").classList.add("active");
    });
});