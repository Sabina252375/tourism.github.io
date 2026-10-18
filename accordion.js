

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {
        question.addEventListener("click", function () {
            const item = question.closest(".faq-item");
            const answer = item.querySelector(".faq-answer");
            const icon = question.querySelector(".faq-icon");
            const isOpen = item.classList.contains("active");

            item.classList.toggle("active");
            question.setAttribute("aria-expanded", String(!isOpen));

            if (isOpen) {
                answer.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });
});
