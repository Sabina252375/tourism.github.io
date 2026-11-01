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