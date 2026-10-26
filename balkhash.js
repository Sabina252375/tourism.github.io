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