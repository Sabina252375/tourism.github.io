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

//readmore
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

// Task 9: Image Lazy Loading
$(document).ready(function () {

    // Prepare all images except the images inside the carousel
    $("img").not(".carousel-inner img").each(function () {
        const image = $(this);
        const source = image.attr("src");

        // Save the image source in the data-src attribute
        if (source) {
            image.attr("data-src", source);
            image.removeAttr("src");
            image.addClass("lazy-image");
        }
    });

    // Load images when they are close to the viewport
    function lazyLoadImages() {
        $(".lazy-image").each(function () {
            const image = $(this);
            const imageTop = image.offset().top;

            // Calculate the bottom of the visible screen
            const scrollBottom =
                $(window).scrollTop() + $(window).height();

            // Load the image when it is close to the screen
            if (scrollBottom > imageTop - 100) {

                // Restore the image source
                image.attr("src", image.attr("data-src"));
                image.removeAttr("data-src");

                // Add a class to show the image with an animation
                image.addClass("image-loaded");

                // Remove the lazy loading class
                image.removeClass("lazy-image");
            }
        });
    }

    // Load images that are already visible on the screen
    lazyLoadImages();

    // Check for images when the user scrolls
    $(window).on("scroll", lazyLoadImages);

});