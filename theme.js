
// Get saved theme from localStorage
const savedTheme = localStorage.getItem("sapar-theme") || "light";

// Apply saved theme immediately
document.documentElement.setAttribute("data-theme", savedTheme);

document.addEventListener("DOMContentLoaded", function () {

    const headerActions = document.getElementById("header-actions");

    if (!headerActions) return;

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
                '<i class="bi bi-sun-fill"></i>';

            themeButton.setAttribute("aria-label", "Switch to light mode");
            themeButton.title = "Switch to light mode";
            themeButton.setAttribute("aria-pressed", "true");

        } else {
            themeButton.innerHTML =
                '<i class="bi bi-moon-stars-fill"></i>';

            themeButton.setAttribute("aria-label", "Switch to dark mode");
            themeButton.title = "Switch to dark mode";
            themeButton.setAttribute("aria-pressed", "false");
        }
    }

    // Add theme button to the top header
    headerActions.appendChild(themeButton);

    updateButton();

    // Toggle theme
    themeButton.addEventListener("click", function () {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);

        localStorage.setItem("sapar-theme", newTheme);

        updateButton();
    });

});
