// ----- Dark Mode Functionality -----
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("darkmode-button");
    const body = document.body;

    // SVG icons for light, dark, and auto mode
    const icons = {
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
        dark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
        auto: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-moon-icon lucide-sun-moon"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>`
    };

    // Detect system theme preference
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    // Get stored user preference, default to 'auto'
    const getStoredMode = () => localStorage.getItem("theme") || "auto";

    // Determine which theme should actually be applied
    const getEffectiveTheme = (mode) => {
        if (mode === "auto") return getSystemTheme();
        return mode;
    };

    // Apply theme to body based on current mode
    const applyTheme = (mode) => {
        body.classList.remove("dark-mode");

        const theme = getEffectiveTheme(mode);
        if (theme === "dark") body.classList.add("dark-mode");

        updateButton(mode);
    };

    // Update button icon based on current mode
    const updateButton = (mode) => {
        let icon;

        if (mode === "auto") {
            icon = icons.auto;
        } else if (mode === "dark") {
            icon = icons.light;
        } else {
            icon = icons.dark;
        }

        button.innerHTML = icon;
    };

    // Initialize theme on page load
    let currentMode = getStoredMode();
    applyTheme(currentMode);

    // If system theme changes while in 'auto', update UI
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (currentMode === "auto") applyTheme("auto");
    });

    // Cycle between modes on button click
    button.addEventListener("click", () => {
        const effective = getEffectiveTheme(currentMode);

        if (currentMode === "auto") {
            // If auto mode is active, switch to the opposite of the system theme
            currentMode = effective === "dark" ? "light" : "dark";
            localStorage.setItem("theme", currentMode);
        } else {
            // Otherwise, return to auto mode
            currentMode = "auto";
            localStorage.removeItem("theme");
        }

        applyTheme(currentMode);
    });
});

// ----- Hide Buttons on Scroll -----
const darkmodeShare = document.querySelector(".darkmode-share");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        darkmodeShare.classList.add("hidden");
    } else {
        darkmodeShare.classList.remove("hidden");
    }
});

// ----- Menu Modal -----
const menuButton = document.getElementById("menu-button");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal-frame");
const closeButton = document.getElementById("modal-close");

menuButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`;

menuButton.addEventListener("click", () => {
    const url = menuButton.dataset.url || window.location.href;
    openShareModal(url); // Insert link only & display modal
});

overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    modal.classList.remove("active");
});

closeButton.addEventListener("click", () => {
    overlay.classList.remove("active");
    modal.classList.remove("active");
});

// ----- Share Modal & Clipboard -----
const modalLinkInput = document.getElementById("modal-link");
const copyButton = document.getElementById("copy-button");

// Opens the modal & sets the link, but DO NOT copy directly
function openShareModal(link) {
    modalLinkInput.value = link;
    modalLinkInput.select(); // optional: mark directly

    overlay.classList.add("active");
    modal.classList.add("active");
}

// Only when the user actually clicks it is copied
copyButton.addEventListener("click", () => {
    modalLinkInput.select();
    document.execCommand("copy");

    copyButton.textContent = "Copied!";
    setTimeout(() => (copyButton.textContent = "Copy Link"), 2000);
});

// Right-click menus in the link buttons
document.querySelectorAll(".link-right").forEach(button => {
    button.addEventListener("click", () => {
        const url = button.dataset.url;
        openShareModal(url); // Set link, show modal, DO NOT copy
    });
});

// ----- Footer Section -----
document.getElementById("year").textContent = new Date().getFullYear(); // get year