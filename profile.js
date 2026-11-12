
document.addEventListener("DOMContentLoaded", function () {

    // Get current user from localStorage
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Check if user is logged in
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Get all registered users
    let users = JSON.parse(localStorage.getItem("saparUsers")) || [];

    // Display user information
    function displayProfile() {
        document.getElementById("profileName").textContent = currentUser.name;
        document.getElementById("profileEmail").textContent = currentUser.email;
        document.getElementById("profilePhone").textContent =
            currentUser.phone || "Not provided";
    }

    displayProfile();

    // Get edit form elements
    const editBtn = document.getElementById("editProfileBtn");
    const editForm = document.getElementById("editProfileForm");
    const saveBtn = document.getElementById("saveProfileBtn");
    const cancelBtn = document.getElementById("cancelEditBtn");
    const message = document.getElementById("editMessage");

    // Open edit form
    editBtn.addEventListener("click", function () {

        document.getElementById("editName").value = currentUser.name;
        document.getElementById("editEmail").value = currentUser.email;
        document.getElementById("editPhone").value = currentUser.phone || "";

        editForm.style.display = "block";
        message.textContent = "";
    });

    // Cancel editing
    cancelBtn.addEventListener("click", function () {
        editForm.style.display = "none";
        message.textContent = "";
    });

    // Save profile changes
    saveBtn.addEventListener("click", function () {

        const newName = document.getElementById("editName").value.trim();
        const newEmail = document.getElementById("editEmail").value.trim().toLowerCase();
        const newPhone = document.getElementById("editPhone").value.trim();

        // Validate required fields
        if (!newName || !newEmail || !newPhone) {
            message.style.color = "red";
            message.textContent = "Please fill in all fields.";
            return;
        }

        // Validate name
        if (newName.length < 2) {
            message.style.color = "red";
            message.textContent = "Name must contain at least 2 characters.";
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(newEmail)) {
            message.style.color = "red";
            message.textContent = "Please enter a valid email address.";
            return;
        }

        // Validate Kazakhstan phone number
        const cleanPhone = newPhone.replace(/[\s()-]/g, "");
        const phonePattern = /^(\+7|8)7\d{9}$/;

        if (!phonePattern.test(cleanPhone)) {
            message.style.color = "red";
            message.textContent = "Please enter a valid Kazakhstan phone number.";
            return;
        }

        // Check if email is already used by another account
        const emailExists = users.some(user =>
            user.email.toLowerCase() === newEmail &&
            user.email.toLowerCase() !== currentUser.email.toLowerCase()
        );

        if (emailExists) {
            message.style.color = "red";
            message.textContent = "This email is already registered.";
            return;
        }

        // Find current user in registered users
        const userIndex = users.findIndex(user =>
            user.email.toLowerCase() === currentUser.email.toLowerCase()
        );

        if (userIndex === -1) {
            message.style.color = "red";
            message.textContent = "User account was not found.";
            return;
        }

        // Update registered user information
        users[userIndex].name = newName;
        users[userIndex].email = newEmail;
        users[userIndex].phone = cleanPhone;

        // Update current logged-in user
        currentUser.name = newName;
        currentUser.email = newEmail;
        currentUser.phone = cleanPhone;

        // Save changes to localStorage
        localStorage.setItem("saparUsers", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // Refresh displayed information
        displayProfile();

        message.style.color = "green";
        message.textContent = "Profile updated successfully!";

        editForm.style.display = "none";
    });
    // CHANGE PASSWORD

const changePasswordBtn = document.getElementById("changePasswordBtn");
const changePasswordForm = document.getElementById("changePasswordForm");
const savePasswordBtn = document.getElementById("savePasswordBtn");
const cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
const passwordMessage = document.getElementById("passwordMessage");

// Open password form
changePasswordBtn.addEventListener("click", function () {
    changePasswordForm.style.display = "block";
    passwordMessage.textContent = "";
});

// Cancel password change
cancelPasswordBtn.addEventListener("click", function () {
    changePasswordForm.style.display = "none";

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    passwordMessage.textContent = "";
});

// Save new password
savePasswordBtn.addEventListener("click", function () {

    const oldPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    // Check empty fields
    if (!oldPassword || !newPassword || !confirmPassword) {
        passwordMessage.style.color = "red";
        passwordMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Check current password
    const userIndex = users.findIndex(user =>
        user.email.toLowerCase() === currentUser.email.toLowerCase()
    );

    if (userIndex === -1 || users[userIndex].password !== oldPassword) {
        passwordMessage.style.color = "red";
        passwordMessage.textContent = "Current password is incorrect.";
        return;
    }

    // Validate new password
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
        passwordMessage.style.color = "red";
        passwordMessage.textContent =
            "Password must have 8 characters, uppercase, lowercase, number and special character.";
        return;
    }

    // Confirm new password
    if (newPassword !== confirmPassword) {
        passwordMessage.style.color = "red";
        passwordMessage.textContent = "Passwords do not match.";
        return;
    }

    // Check if new password is different
    if (newPassword === oldPassword) {
        passwordMessage.style.color = "red";
        passwordMessage.textContent = "Choose a different password.";
        return;
    }

    // Update password
    users[userIndex].password = newPassword;

    localStorage.setItem("saparUsers", JSON.stringify(users));

    // Clear form
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";

    changePasswordForm.style.display = "none";

    passwordMessage.style.color = "green";
    passwordMessage.textContent = "Password changed successfully!";
});

    // Logout button
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    });

});

 // Display Favorite Destinations

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("favoriteDestinationsList");
    if (!container) return;

    function displayFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favoriteDestinations")) || [];

        if (favorites.length === 0) {
            container.innerHTML = "<p>You haven't added any favorite destinations yet.</p>";
            return;
        }

        container.innerHTML = favorites.map((place, index) => `
            <div class="favorite-card">
                <img src="${place.image || 'images/medeu.jpg'}" alt="${place.name}">
                <div class="favorite-card-info">
                    <h3>${place.name}</h3>
                    <p>Almaty, Kazakhstan</p>
                    <button class="remove-favorite" data-index="${index}">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `).join("");

        container.querySelectorAll(".remove-favorite").forEach(button => {
            button.addEventListener("click", function () {
                const favorites = JSON.parse(localStorage.getItem("favoriteDestinations")) || [];
                favorites.splice(Number(this.dataset.index), 1);
                localStorage.setItem("favoriteDestinations", JSON.stringify(favorites));
                displayFavorites();
            });
        });
    }

    displayFavorites();
});
