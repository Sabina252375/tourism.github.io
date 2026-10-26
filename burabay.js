const burabayGallery = {
    name: "Burabay Gallery",

    // Names of places shown in the carousel
    places: [
        "Big Chebachye Lake",
        "Burabay View",
        "Okzhetpes Rock",
        "Kenesary Cave",
        "Imanov Waterfall",
        "Maral Farm",
        "Abylai Khan Glade",
        "Ferris Wheel",
        "Multimedia Complex",
        "Burabay Forest"
    ],

    // Display the name of the current place in the console
   showCurrentPlace: function (index) {
    const currentPlace = document.getElementById("currentPlace");
    const place = this.places[index];

    if (currentPlace && place) {
        currentPlace.textContent = this.name + ": " + place;
    }

    console.log(this.name + ": " + place); }
};

// Find the carousel on the page
const carousel = document.getElementById("burabayCarousel");

// Track the active slide when the carousel changes
if (carousel) {
    carousel.addEventListener("slid.bs.carousel", function (event) {
        burabayGallery.showCurrentPlace(event.to);
    });
}


const readMoreBtn = document.querySelector("#readMoreBtn");
const moreText = document.querySelector("#moreText");

if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener("click", function () {
        moreText.hidden = !moreText.hidden;

        readMoreBtn.textContent = moreText.hidden
            ? "Read More"
            : "Read Less";
    });
}
