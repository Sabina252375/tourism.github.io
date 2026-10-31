const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("contact-form-message");

// Display a success or error message.
function showMessage(element, text, success = false) {
    element.textContent = (success ? "✓ " : "⚠ ") + text;

    element.style.color = success ? "#176b45" : "#a52b3a";
    element.style.background = success
        ? "rgba(220, 250, 233, 0.8)"
        : "rgba(255, 232, 235, 0.85)";
    element.style.border = success
        ? "1px solid #8bd5aa"
        : "1px solid #f0a5af";
}

// Validate the contact form using a callback function.
function validateContactForm(callback) {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const place = document.getElementById("place").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !place || !message) {
        callback("Please fill in all fields.", false);
        return;
    }

    if (name.length < 2) {
        callback("Name must contain at least 2 characters.", false);
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        callback("Please enter a valid email address.", false);
        return;
    }

    if (message.length < 10) {
        callback("Message must contain at least 10 characters.", false);
        return;
    }

    callback("All fields are valid!", true);
}

// Task 6 and Task 7
$(document).ready(function () {

    $("#contact-form").on("submit", async function (event) {

        event.preventDefault();

        const button = $(this).find("button[type='submit']");
        const originalText = button.html();

        // Validate form
        validateContactForm(function (message, success) {

            if (!success) {
                showMessage(
                    document.getElementById("contact-form-message"),
                    message,
                    false
                );
            }

        });

        // Check if all fields are valid
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const place = $("#place").val();
        const message = $("#message").val().trim();

        if (
            !name ||
            !email ||
            !place ||
            !message ||
            name.length < 2 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            message.length < 10
        ) {
            return;
        }

        // Task 6: Show loading spinner
        button.prop("disabled", true);

        button.html(
            '<span class="spinner"></span>Please wait...'
        );

        try {

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        place: place,
                        message: message
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Request failed");
            }

            // Task 7: Show notification
            $("#success-toast")
                .addClass("show");

            setTimeout(function () {
                $("#success-toast")
                    .removeClass("show");
            }, 3000);

            // Clear form
            this.reset();

        } catch (error) {

            showMessage(
                document.getElementById("contact-form-message"),
                "Failed to send the message.",
                false
            );

        } finally {

            // Restore button
            button.prop("disabled", false);
            button.html(originalText);

        }

    });

});


// Registration form.
const registrationForm = document.getElementById("registration-form");
const registrationMessage = document.getElementById("registration-message");

if (registrationForm && registrationMessage) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-password").value;
        const confirmPassword =
            document.getElementById("reg-confirm-password").value;

        if (!name || !email || !password || !confirmPassword) {
            showMessage(
                registrationMessage,
                "Please fill in all fields."
            );
            return;
        }

        if (name.length < 2) {
            showMessage(
                registrationMessage,
                "Name must contain at least 2 characters."
            );
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage(
                registrationMessage,
                "Please enter a valid email address."
            );
            return;
        }

        if (password.length < 8) {
            showMessage(
                registrationMessage,
                "Password must contain at least 8 characters."
            );
            return;
        }

        if (!/\d/.test(password)) {
            showMessage(
                registrationMessage,
                "Password must contain at least one number."
            );
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)) {
            showMessage(
                registrationMessage,
                "Password must contain at least one special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            showMessage(
                registrationMessage,
                "Passwords do not match."
            );
            return;
        }

        showMessage(
            registrationMessage,
            "All fields are valid! Your registration form is complete.",
            true
        );

        registrationForm.reset();
    });
}



