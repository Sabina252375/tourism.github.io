function updateDateTime() {
    const now = new Date();

    const formattedDateTime = now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

    document.getElementById("currentDateTime").textContent = formattedDateTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);

const soundButtons = document.querySelectorAll(".sound-button");
const seaWavesSound = document.getElementById("seaWavesSound");

soundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (!seaWavesSound) return;

        seaWavesSound.currentTime = 0;
        seaWavesSound.play();
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
