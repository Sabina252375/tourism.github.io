
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
