
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("changeColorBtn");

    const colors = [
        "#ffffff",
        "#eef6fc",
        "#e5f0fa",
        "#f0f5fa",
        "#eaf4f4"
    ];

    let currentColor = 0;
    button.addEventListener("click", function () {
        currentColor = (currentColor + 1) % colors.length;
        document.body.style.backgroundColor = colors[currentColor];
    });
});
