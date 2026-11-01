$(document).ready(function () {
    $(".faq-question").on("click", function () {
        const question = $(this);
        const item = question.closest(".faq-item");
        const answer = item.find(".faq-answer");
        const icon = question.find(".faq-icon");
        const isOpen = item.hasClass("active");

        item.toggleClass("active");
        question.attr("aria-expanded", String(!isOpen));

        if (isOpen) {
            answer.css("max-height", "");
            icon.text("+");
        } else {
            answer.css("max-height", answer[0].scrollHeight + "px");
            icon.text("−");
        }
    });

    const faqItems = $(".faq-item");

    faqItems.find(".faq-question, .faq-answer p").each(function () {
        $(this).data("original-text", $(this).text());
    });

    $("#faq-search").on("input", function () {
        const keyword = $(this).val().trim();
        let matches = 0;

        faqItems.each(function () {
            const item = $(this);
            let found = false;

            item.find(".faq-question, .faq-answer p").each(function () {
                const element = $(this);
                const originalText = element.data("original-text");

                element.text(originalText);

                if (keyword === "") {
                    return;
                }

                const escapedKeyword = keyword.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                );

                const regex = new RegExp(escapedKeyword, "gi");

                if (regex.test(originalText)) {
                    found = true;

                    const highlightedText = originalText.replace(
                        regex,
                        function (match) {
                            return "<mark class='search-highlight'>" +
                                match +
                                "</mark>";
                        }
                    );

                    element.html(highlightedText);
                }
            });

            if (keyword === "") {
                item.show();
            } else if (found) {
                matches++;
                item.show();
            } else {
                item.hide();
            }
        });

        if (keyword === "") {
            $("#search-result-count").text("Search through our FAQ");
        } else if (matches === 0) {
            $("#search-result-count").text("No results found");
        } else {
            $("#search-result-count").text(
                matches + " question(s) found"
            );
        }
    });

function updateProgress() {
    const scrollTop = $(window).scrollTop();
    const documentHeight = $(document).height();
    const windowHeight = $(window).height();
    const scrollableHeight = documentHeight - windowHeight;

    const progress = scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

    $("#scroll-progress").css("width", progress + "%");
}

$(window).on("scroll resize", updateProgress);
updateProgress();
});