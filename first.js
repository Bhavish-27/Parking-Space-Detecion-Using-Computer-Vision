// first.js (Your existing script)
// Check if the signup form was previously displayed
var signUpFormDisplayed = localStorage.getItem('signUpFormDisplayed');

if (signUpFormDisplayed === 'true') {
    // If signup form was displayed, show it
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
} else {
    // Otherwise, show the login form
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

// Function to toggle form and save state
function toggleForm(formId) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';

    document.getElementById(formId).style.display = 'block';

    // Save the state of the form in local storage
    if (formId === 'signupForm') {
        localStorage.setItem('signUpFormDisplayed', 'true');
    } else {
        localStorage.setItem('signUpFormDisplayed', 'false');
    }
}


// Additional script for form validation
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the input fields
    var phoneNumberInput = document.getElementById("phoneNumber");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");

    // Add event listeners to reset custom validity messages when inputs change
    phoneNumberInput.addEventListener("input", function() {
    if (/^\d{10}$/.test(this.value)) {
        this.setCustomValidity("");
    } else {
        this.setCustomValidity("Please enter a valid 10-digit phone number containing only numeric characters.");
    }

    // Remove non-numeric characters from the input
    this.value = this.value.replace(/\D/g, '');
});

    passwordInput.addEventListener("input", function() {
        confirmPasswordInput.setCustomValidity(""); // Reset confirm password validity when password changes
    });

    confirmPasswordInput.addEventListener("input", function() {
        if (this.value === passwordInput.value) {
            this.setCustomValidity("");
        } else {
            this.setCustomValidity("Passwords do not match.");
        }
    });

    // Function to validate form submission 
    function validateSignUp() {
        // Check validity of all input fields
        if (phoneNumberInput.validity.valid && passwordInput.validity.valid && confirmPasswordInput.validity.valid) {
            // If all validations pass, show success message
            alert("Account successfully created!");
            toggleForm('loginForm');
            return true;
        } else {
            // If any validation fails, prevent form submission
            return false;
        }
    }

    // Add validateSignUp function to the global scope so it can be called from HTML
    window.validateSignUp = validateSignUp;
});
// Function to show slots buttons
function showSlots() {
    // Hide the login form
    document.getElementById('loginForm').style.display = 'none';

    // Display the slots buttons
    document.getElementById('slotsButtons').style.display = 'block';
}

// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get the reset button
    var resetButton = document.getElementById("resetButton");

    // Add click event listener to the reset button
    resetButton.addEventListener("click", function() {
        // Get the text fields by their IDs
        var usernameField = document.getElementById("username");
        var passwordField = document.getElementById("password1");

        // Clear the value of each text field
        usernameField.value = "";
        passwordField.value = "";
    });
});
// JavaScript
// Function to update the count of free parking spaces
// Function to update the count of free parking spaces
// Function to update the count of free parking spaces

document.addEventListener("DOMContentLoaded", function() {
    // Get the home link
    var homeLink = document.getElementById("homeLink");

    // Add click event listener to the home link
    homeLink.addEventListener("click", function(event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();
        
        // Hide the slots container
        document.querySelector('.slots-container').style.display = 'none';
        
        // Show the login form and hide the signup form
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
    });
});
function resetPassword() {
    var email = document.getElementById("username").value; // Get the email from the input field

    firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            alert("Password reset email sent. Check your email inbox.");
        })
        .catch(function(error) {
            var errorMessage = error.message;
            alert("Error sending password reset email: " + errorMessage);
        });
}