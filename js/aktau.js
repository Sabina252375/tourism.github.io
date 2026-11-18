const menuLinks = document.querySelectorAll(
    ".navbar-nav .nav-link, .nav-menu a"
);
const links = Array.from(menuLinks);

links.forEach((link, index) => {
    link.addEventListener("keydown", function (event) {
        let nextIndex;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % links.length;
        } else if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            nextIndex = (index - 1 + links.length) % links.length;
        } else {
            return;
        }

        event.preventDefault();
        links[nextIndex].focus();
    });
});

const placeCards = document.querySelectorAll(".place-card");

placeCards.forEach((card) => {
    card.addEventListener("click", function () {
        this.classList.toggle("card-animated");
    });
});

document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async function (event) {
        event.stopPropagation();
        const card = this.closest(".place-card");
        const description = card.querySelector(".place-description");
        const message = card.querySelector(".copy-message");
        if (!description) {
            message.textContent = "Description not found!";
            return;
        }
        try {
            await navigator.clipboard.writeText(
                description.textContent.trim()
            );
            message.textContent = "Copied to clipboard!";
            message.style.color = "green";
        } catch (error) {
            message.textContent = "Copy failed!";
            message.style.color = "red";
        }
    });
});


// Favorite Destinations
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".favorite-btn");

    let favorites = JSON.parse(
        localStorage.getItem("favoriteDestinations")
    ) || [];

    // Keep the same format on all pages
    favorites = favorites.map(item =>
        typeof item === "string"
            ? { name: item, image: "" }
            : item
    );

    function saveFavorites() {
        localStorage.setItem(
            "favoriteDestinations",
            JSON.stringify(favorites)
        );
    }

    buttons.forEach(button => {
        const place = button.dataset.place;
        const card = button.closest(".place-card, .card");
        const imageElement = card ? card.querySelector("img") : null;
        const image = imageElement
            ? imageElement.getAttribute("src")
            : "";

        const icon = button.querySelector("i");

        const isFavorite = favorites.some(
            item => item.name === place
        );

        if (isFavorite) {
            button.classList.add("active");
            icon.className = "bi bi-heart-fill";
        }

        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const index = favorites.findIndex(
                item => item.name === place
            );

            if (index !== -1) {
                favorites.splice(index, 1);
                button.classList.remove("active");
                icon.className = "bi bi-heart";
            } else {
                favorites.push({
                    name: place,
                    image: image
                });

                button.classList.add("active");
                icon.className = "bi bi-heart-fill";
            }

            saveFavorites();
        });
    });
});
// Scroll Progress Bar
window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    const progressBar = document.getElementById("scroll-progress");

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
});