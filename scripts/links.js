// ----- Dark Mode Functionality -----
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("darkmode-button");
    const body = document.body;

    const isDarkMode = localStorage.getItem("darkMode") === "enabled";
    if (isDarkMode) body.classList.add("dark-mode");

    const updateButton = () => {
        button.innerHTML = body.classList.contains("dark-mode")
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    };

    updateButton();

    button.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        updateButton();
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
    copyButton.textContent = "Copy Link";

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