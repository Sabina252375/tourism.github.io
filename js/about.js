
document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // CONTACT FORM
    // =================================

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


    // =================================
    // PERSONALIZED TRAVEL INQUIRY
    // =================================

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


        // Submit inquiry

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


            // VALIDATION

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


            // CHECK LOGIN AGAIN

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


                // GET EXISTING REQUESTS

                const requests = JSON.parse(
                    localStorage.getItem("saparRequests") || "[]"
                );


                // CREATE NEW INQUIRY

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


                // SAVE INQUIRY

                requests.push(newRequest);

                localStorage.setItem(
                    "saparRequests",
                    JSON.stringify(requests)
                );


                // CLEAR VALIDATION MESSAGE

                messageElement.textContent = "";
                messageElement.className = "mb-3";


                // Task 7: SUCCESS NOTIFICATION

                showToast(
                    "Your travel inquiry was sent successfully!"
                );


                // RESET FORM

                inquiryForm.reset();


                // RESTORE ACCOUNT INFORMATION

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


    // =================================
    // TOAST NOTIFICATION
    // =================================

    function showToast(message) {

        let toast = document.getElementById("success-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "success-toast";
            document.body.appendChild(toast);
        }

        toast.className = "toast-message";
        toast.textContent = "✓ " + message;

        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");

        toast.classList.add("show");

        setTimeout(function () {
            toast.classList.remove("show");
        }, 3000);
    }

});


// =================================
// SCROLL PROGRESS BAR
// =================================

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    const progressBar =
        document.getElementById("scroll-progress");

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

});
