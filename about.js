document.addEventListener("DOMContentLoaded", function () {


    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;

            const name = contactForm.querySelector("#name")?.value.trim() || "";
            const email = contactForm.querySelector("#email")?.value.trim() || "";
            const message = contactForm.querySelector("#message")?.value.trim() || "";

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            try {
                button.disabled = true;
                button.innerHTML =
                    '<span class="spinner"></span>Please wait...';

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
                            message: message
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                contactForm.reset();
                showToast("Your message has been sent successfully!");

            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                button.disabled = false;
                button.innerHTML = originalText;
            }
        });
    }



    // PERSONALIZED TRAVEL INQUIRY


    const inquiryForm = document.getElementById("inquiry-form");
    const guestMessage = document.getElementById("inquiry-guest");

    if (inquiryForm && guestMessage) {

        let currentUser = null;

        try {
            currentUser = JSON.parse(
                localStorage.getItem("currentUser")
            );
        } catch (error) {
            currentUser = null;
        }

        // Show form only for logged-in users
        if (currentUser) {
            inquiryForm.hidden = false;
            guestMessage.hidden = true;

            document.getElementById("inquiry-name").value =
                currentUser.name || "";

            document.getElementById("inquiry-email").value =
                currentUser.email || "";

            document.getElementById("inquiry-phone").value =
                currentUser.phone || "";

        } else {
            inquiryForm.hidden = true;
            guestMessage.hidden = false;
        }

        inquiryForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const messageElement =
                document.getElementById("inquiry-form-message");

            const destination =
                document.getElementById("inquiry-place").value;

            const message =
                document.getElementById("inquiry-message").value.trim();

            const interests = Array.from(
                inquiryForm.querySelectorAll(
                    'input[type="checkbox"]:checked'
                )
            ).map(function (checkbox) {
                return checkbox.value;
            });

            // Validation
            if (!destination) {
                messageElement.textContent =
                    "Please choose a destination.";
                messageElement.className = "text-danger mb-3";
                return;
            }

            if (interests.length === 0) {
                messageElement.textContent =
                    "Please select at least one interest.";
                messageElement.className = "text-danger mb-3";
                return;
            }

            if (message.length < 10) {
                messageElement.textContent =
                    "Your message must contain at least 10 characters.";
                messageElement.className = "text-danger mb-3";
                return;
            }

            // Check authentication again
            let loggedInUser = null;

            try {
                loggedInUser = JSON.parse(
                    localStorage.getItem("currentUser")
                );
            } catch (error) {
                loggedInUser = null;
            }

            if (!loggedInUser) {
                inquiryForm.hidden = true;
                guestMessage.hidden = false;
                return;
            }

            const submitButton =
                inquiryForm.querySelector('button[type="submit"]');

            const originalButtonText = submitButton.innerHTML;

            try {
                // Task 6: Loading Spinner
                submitButton.disabled = true;
                submitButton.innerHTML =
                    '<span class="spinner"></span>Sending inquiry...';

                await new Promise(function (resolve) {
                    setTimeout(resolve, 1000);
                });

                // Get existing requests
                const requests = JSON.parse(
                    localStorage.getItem("saparRequests") || "[]"
                );

                // Create new inquiry
                const newRequest = {
                    id: Date.now(),
                    name: loggedInUser.name,
                    email: loggedInUser.email,
                    phone: loggedInUser.phone,
                    destination: destination,
                    interests: interests,
                    message: message,
                    date: new Date().toISOString(),
                    status: "Pending"
                };

                requests.push(newRequest);

                // Save inquiry
                localStorage.setItem(
                    "saparRequests",
                    JSON.stringify(requests)
                );

                messageElement.textContent = "";
                messageElement.className = "mb-3";

                // Task 7: Toast Notification
                showToast(
                    "Your travel inquiry was sent successfully!"
                );

                inquiryForm.reset();

                // Restore account information
                document.getElementById("inquiry-name").value =
                    loggedInUser.name || "";

                document.getElementById("inquiry-email").value =
                    loggedInUser.email || "";

                document.getElementById("inquiry-phone").value =
                    loggedInUser.phone || "";

            } catch (error) {
                messageElement.textContent =
                    "Unable to send inquiry. Please try again.";

                messageElement.className = "text-danger mb-3";

            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }


    // TOAST NOTIFICATION FUNCTION


    function showToast(message) {

        let toast = document.getElementById("sapar-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "sapar-toast";
            toast.className = "success-toast";

            toast.innerHTML = `
                <span>✓</span>
                <span id="sapar-toast-message"></span>
            `;

            document.body.appendChild(toast);
        }

        document.getElementById("sapar-toast-message").textContent =
            message;

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }

});
