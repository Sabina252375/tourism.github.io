
// Sound Effects — Sea Waves

const soundButtons = document.querySelectorAll(".sound-button");
const seaWavesSound = document.getElementById("seaWavesSound");

soundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (!seaWavesSound) return;

        seaWavesSound.currentTime = 0;

        seaWavesSound.play().catch(function (error) {
            console.log("Sound playback error:", error);
        });
    });
});
const activitySelect = document.getElementById("activitySelect");
const activityInfo = document.getElementById("activityInfo");

if (activitySelect && activityInfo) {
    activitySelect.addEventListener("change", function () {
        let message = "";

        switch (activitySelect.value) {
            case "swimming":
                message = "Best time: Summer.";
                break;

            

            case "fishing":
                 message = "Fishing restriction: April 15 – June 1 in the western part of Lake Balkhash and the Ili River delta; April 25 – June 10 in the eastern part of the lake.";
                 break;

                 
            case "beach":
                message = "Best time: Evening.";
                break;

            case "photography":
                message = "Best time: All year.";
                break;

            default:
                message = "";
        }

        activityInfo.textContent = message;
    });
}

$(document).ready(function () {

    // Task 5: Animated Number Counter

    $(".counter").each(function () {

        let counter = $(this);

        let target = Number(
            counter.attr("data-target")
        );

        $({ number: 0 }).animate(
            { number: target },
            {
                duration: 2000,

                step: function () {
                    counter.text(
                        Math.floor(this.number)
                    );
                },

                complete: function () {
                    counter.text(target);
                }
            }
        );

    });

});
// Favorite Destinations
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".favorite-btn");

    let favorites = JSON.parse(
        localStorage.getItem("favoriteDestinations")
    ) || [];

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
            if (icon) icon.className = "bi bi-heart-fill";
        }

        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const index = favorites.findIndex(
                item => item.name === place
            );

            if (index !== -1) {
                favorites.splice(index, 1);
                button.classList.remove("active");
                if (icon) icon.className = "bi bi-heart";
            } else {
                favorites.push({
                    name: place,
                    image: image
                });

                button.classList.add("active");
                if (icon) icon.className = "bi bi-heart-fill";
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