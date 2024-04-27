 // Your Firebase configuration
const firebaseConfig = {
    // Your Firebase configuration here
    apiKey: "AIzaSyCWP1_H0NuUOHJScUYzd60A9LjCKUidZ5A",
    authDomain: "parking-72a0b.firebaseapp.com",
    databaseURL: "https://parking-72a0b-default-rtdb.firebaseio.com",
    projectId: "parking-72a0b",
    storageBucket: "parking-72a0b.appspot.com",
    messagingSenderId: "1053562346352",
    appId: "1:1053562346352:web:8cceaa540c2aa7e1f0cdb5",
    measurementId: "G-B1FKXXHSEW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your Firebase database
const firebaseDB = firebase.database().ref("Parking"); // Change "users" to your desired database node name

// Function to save user data to Firebase
function saveUserData(fullName, email, password, phoneNumber) {
    // Push the user data to the Firebase database
    firebaseDB.push().set({
        fullName: fullName,
        email: email,
        password: password,
        phoneNumber: phoneNumber
    }).then(() => {
        console.log("Data saved successfully!");
        // Optionally, display a success message or redirect the user
    }).catch((error) => {
        console.error("Error saving data:", error);
        // Optionally, display an error message to the user
    });
}

// Function to handle signup form submission
function handleSignUpFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values from the signup form
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    // Save the signup data to Firebase
    saveUserData(fullName, email, password, phoneNumber);

    // Optionally, display a success message or redirect the user
}

// Attach event listener to the signup form
document.getElementById("signupForm").addEventListener("submit", handleSignUpFormSubmission);


// Function to handle login form submission
// Function to handle login form submission
function handleLoginFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve input values from the login form
    const email = document.getElementById("username").value.trim().toLowerCase(); // Convert to lowercase and trim whitespace
    const password = document.getElementById("password1").value;

    // Query the Firebase Realtime Database to check if the entered credentials are valid
    firebase.database().ref("Parking").once("value")
        .then((snapshot) => {
            const users = snapshot.val();
            console.log("Retrieved users:", users); // Log the retrieved users

            // Check if there is a user with the entered email (case-insensitive comparison)
            const matchingUser = Object.values(users).find(user => user.email.toLowerCase() === email);

            if (matchingUser) {
                // Check if the entered password matches the stored password for the user
                if (matchingUser.password === password) {
                    // Hide login form and show slots container
                    document.getElementById("loginForm").style.display = "none";
                    document.querySelector(".slots-container").style.display = "flex";
                } else {
                    // If password doesn't match, display an error message
                    alert("Incorrect password. Please try again.");
                }
            } else {
                // If email doesn't exist, display an error message
                alert("Email not found. Please try again.");
            }
        })
        .catch((error) => {
            // If an error occurs, log it to the console
            console.error("Error fetching users:", error);
            alert("An error occurred. Please try again later.");
        });
}

// Attach event listener to the login form
document.getElementById("loginForm").addEventListener("submit", handleLoginFormSubmission);
