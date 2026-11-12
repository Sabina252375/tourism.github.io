
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");

    const goSignup = document.getElementById("go-signup");
    const goLogin = document.getElementById("go-login");

    const loginMessage = document.getElementById("login-message");
    const signupMessage = document.getElementById("signup-message");

    const USERS_KEY = "saparUsers";
    const CURRENT_USER_KEY = "currentUser";

    // Get registered users from localStorage
    function getUsers() {
        try {
            return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        } catch (error) {
            return [];
        }
    }

    // Display messages
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = "form-message " + type;
    }

    // Clear messages
    function clearMessages() {
        loginMessage.textContent = "";
        loginMessage.className = "form-message";

        signupMessage.textContent = "";
        signupMessage.className = "form-message";
    }

    // Show Login form
    function showLogin() {
        loginForm.hidden = false;
        signupForm.hidden = true;

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

        clearMessages();
    }

    // Show Sign Up form
    function showSignup() {
        loginForm.hidden = true;
        signupForm.hidden = false;

        signupTab.classList.add("active");
        loginTab.classList.remove("active");

        clearMessages();
    }

    // Switch between forms
    loginTab.addEventListener("click", showLogin);
    signupTab.addEventListener("click", showSignup);

    goSignup.addEventListener("click", showSignup);
    goLogin.addEventListener("click", showLogin);

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Password validation
    function isStrongPassword(password) {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password);
    }

    // Phone validation
    function isValidPhone(phone) {
        const cleanPhone = phone.replace(/[\s()-]/g, "");
        return /^(\+7|8)7\d{9}$/.test(cleanPhone);
    }

    // SIGN UP FORM
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        clearMessages();

        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim().toLowerCase();
        const phone = document.getElementById("signup-phone").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const users = getUsers();

        // Validate name
        if (name.length < 2) {
            showMessage(signupMessage, "Please enter your full name.", "error");
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showMessage(signupMessage, "Please enter a valid email address.", "error");
            return;
        }

        // Validate phone
        if (!isValidPhone(phone)) {
            showMessage(signupMessage, "Please enter a valid Kazakhstan phone number.", "error");
            return;
        }

        // Validate password
        if (!isStrongPassword(password)) {
            showMessage(
                signupMessage,
                "Password must contain at least 8 characters, uppercase and lowercase letters, a number and a special character.",
                "error"
            );
            return;
        }

        // Confirm password
        if (password !== confirmPassword) {
            showMessage(signupMessage, "Passwords do not match.", "error");
            return;
        }

        // Check if email already exists
        const emailExists = users.some(function (user) {
            return user.email === email;
        });

        if (emailExists) {
            showMessage(signupMessage, "This email is already registered.", "error");
            return;
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        const submitButton = signupForm.querySelector("button[type='submit']");
        const originalText = submitButton.innerHTML;

        try {
            // Task 6: Loading Spinner
            submitButton.disabled = true;
            submitButton.innerHTML =
                '<span class="spinner"></span>Creating account...';

            // Simulate registration process
            await new Promise(function (resolve) {
                setTimeout(resolve, 1200);
            });

            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // Task 7: Toast Notification
            const toast = document.getElementById("success-toast");
            const toastMessage = document.getElementById("toast-message");

            if (toast && toastMessage) {
                toastMessage.textContent = "Account created successfully!";
                toast.classList.add("show");

                setTimeout(function () {
                    toast.classList.remove("show");
                }, 3000);
            }

            signupForm.reset();

            setTimeout(function () {
                showLogin();
                document.getElementById("login-email").value = email;

                showMessage(
                    loginMessage,
                    "Your account is ready. Please log in.",
                    "success"
                );
            }, 1500);

        } catch (error) {
            showMessage(
                signupMessage,
                "Unable to create account. Please try again.",
                "error"
            );
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });

    // LOG IN FORM
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearMessages();

        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value;

        // Check empty fields
        if (!email || !password) {
            showMessage(loginMessage, "Please fill in all fields.", "error");
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showMessage(loginMessage, "Please enter a valid email address.", "error");
            return;
        }

        // Find user
        const users = getUsers();

        const foundUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!foundUser) {
            showMessage(
                loginMessage,
                "Incorrect email or password.",
                "error"
            );
            return;
        }

        // Save current user without password
        const currentUser = {
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone
        };

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(currentUser)
        );

        showMessage(loginMessage, "Login successful! Redirecting...", "success");

        // Redirect to Profile Page
        setTimeout(function () {
            window.location.href = "profile.html";
        }, 800);
    });
});
