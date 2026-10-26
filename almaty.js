const tripModal = document.getElementById("tripModal");
const openTripForm = document.getElementById("openTripForm");
const closeTripForm = document.getElementById("closeTripForm");
const tripForm = document.getElementById("tripForm");
const tripSuccess = document.getElementById("tripSuccess");

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