
const tripModal = document.getElementById("tripModal");
const openTripForm = document.getElementById("openTripForm");
const closeTripForm = document.getElementById("closeTripForm");
const tripForm = document.getElementById("tripForm");
const tripSuccess = document.getElementById("tripSuccess");

// Trip form
if (tripModal && openTripForm && closeTripForm && tripForm && tripSuccess) {
    openTripForm.addEventListener("click", function () {
        tripModal.classList.add("show");
    });

    closeTripForm.addEventListener("click", function () {
        tripModal.classList.remove("show");
    });

    tripModal.addEventListener("click", function (event) {
        if (event.target === tripModal) {
            tripModal.classList.remove("show");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            tripModal.classList.remove("show");
        }
    });

    tripForm.addEventListener("submit", function (event) {
        event.preventDefault();
        tripSuccess.style.display = "block";
        tripForm.reset();
    });
}

// Almaty music player
const almatySong = document.getElementById("almatySong");
const musicToggle = document.getElementById("musicToggle");
const muteToggle = document.getElementById("muteToggle");

if (almatySong && musicToggle && muteToggle) {
    almatySong.volume = 0.35;

    musicToggle.addEventListener("click", function () {
        if (almatySong.paused) {
            almatySong.play()
                .then(function () {
                    musicToggle.textContent = "⏸ Pause";
                })
                .catch(function () {
                    musicToggle.textContent = "▶ Play";
                });
        } else {
            almatySong.pause();
            musicToggle.textContent = "▶ Play";
        }
    });

    muteToggle.addEventListener("click", function () {
        almatySong.muted = !almatySong.muted;

        muteToggle.textContent = almatySong.muted
            ? "🔇 Sound off"
            : "🔊 Sound on";
    });

    // Try autoplay; the browser may block it.
    almatySong.play()
        .then(function () {
            musicToggle.textContent = "⏸ Pause";
        })
        .catch(function () {
            musicToggle.textContent = "▶ Play";
        });
}
$(document).ready(function () {

    $("#placeSearch").on("keyup", function () {

        let value = $(this).val().toLowerCase();

        $(".card").filter(function () {

            let text = $(this).text().toLowerCase();

            $(this).toggle(text.includes(value));

        });

    });

});
// Task 2: Autocomplete Search

let places = [
    "Medeu",
    "Shymbulak",
    "Kok Tobe",
    "Kaskelen",
    "Big Almaty Lake"
];

$("#placeSearch").on("input", function () {

    let value = $(this).val().toLowerCase();

    $("#suggestions").empty();

    if (value === "") {
        return;
    }

    let matches = places.filter(function (place) {
        return place.toLowerCase().startsWith(value);
    });

    matches.forEach(function (place) {

        $("#suggestions").append(
            `<div class="suggestion">${place}</div>`
        );

    });

});
$("#suggestions").on("click", ".suggestion", function () {

    let place = $(this).text();

    $("#placeSearch").val(place);

    $("#suggestions").empty();

    $("#placeSearch").trigger("keyup");

});