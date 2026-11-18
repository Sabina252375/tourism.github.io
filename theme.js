// Get saved theme from localStorage
const savedTheme = localStorage.getItem("sapar-theme") || "light";

// Apply saved theme immediately
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", function () {

    // Find the navigation menu
    const navbarList = document.querySelector(".navbar-nav");
    const regularNav = document.querySelector("nav");

    // Create theme button
    const themeButton = document.createElement("button");

    themeButton.id = "theme-toggle";
    themeButton.type = "button";
    // Update button appearance
    function updateButton() {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {
            themeButton.innerHTML =
                '<i class="bi bi-sun-fill"></i> Light';
            themeButton.setAttribute("aria-label", "Switch to light mode");
            themeButton.setAttribute("aria-pressed", "true");
        } else {
            themeButton.innerHTML =
                '<i class="bi bi-moon-stars-fill"></i> Dark';
            themeButton.setAttribute("aria-label", "Switch to dark mode");
            themeButton.setAttribute("aria-pressed", "false");
        }
    }

    // Add button to the navigation
    if (navbarList) {

        const navItem = document.createElement("li");

        navItem.className = "nav-item theme-nav-item";

        navItem.appendChild(themeButton);

        navbarList.appendChild(navItem);

    } else if (regularNav) {

        regularNav.appendChild(themeButton);

    }

    // Show the correct button
    updateButton();

    // Toggle theme when clicked
    themeButton.addEventListener("click", function () {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        // Apply new theme
        document.documentElement.setAttribute("data-theme", newTheme);

        // Save selected theme
        localStorage.setItem("sapar-theme", newTheme);

        // Update button
        updateButton();

    });

});
