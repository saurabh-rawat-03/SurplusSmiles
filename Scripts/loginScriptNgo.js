const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});


//Validating Form Data
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Get the login and registration forms
    const loginForm = document.querySelector('.login form');
    const registerForm = document.querySelector('.register form');

    // Add event listeners to the forms
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            if (!validateLoginForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                event.preventDefault(); // Prevent default form submission
                handleFormSubmit(loginForm, 'signIn'); // Handle form submission
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            if (!validateRegisterForm()) {
                event.preventDefault(); // Prevent form submission if validation fails
            } else {
                event.preventDefault(); // Prevent default form submission
                handleFormSubmit(registerForm, 'signUp'); // Handle form submission
            }
        });
    }

    // Close the custom modal when the close button is clicked
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.onclick = function () {
            hideModal();
        };
    }

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        const modal = document.getElementById('customModal');
        if (event.target === modal) {
            hideModal();
        }
    };
});

// Function to handle form submission
function handleFormSubmit(form, action) {
    const formData = new FormData(form);
    formData.append(action, true); // Add the action to the form data

    fetch('registerNgo.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response Data:", data); // Debugging line
        if (data.status === 'error') {
            showModal(data.message); // Show error message in the modal
        } else if (data.status === 'success') {
            if (action === 'signUp') {
                // Show success message in the modal
                showModal(data.message);

                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'loginNGO.html';
                }, 2000); // 2000 milliseconds = 2 seconds
            } else if (action === 'signIn') {
                // Redirect to homepage on successful login
                window.location.href = 'homepage.php';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showModal('An error occurred. Please try again.');
    });
}

// Function to show the custom modal with a message
function showModal(message) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    if (modal && modalMessage) {
        modalMessage.textContent = message; // Set the message
        modal.style.display = 'block'; // Show the modal
    }
}

// Function to hide the custom modal
function hideModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.style.display = 'none'; // Hide the modal
    }
}

// Validate the login form
function validateLoginForm() {
    const email = document.getElementById('emaill').value.trim();
    const password = document.getElementById('passwordl').value.trim();

    if (!email || !password) {
        showModal('Please fill in all fields.');
        return false;
    }

    return true;
}

// Validate the registration form
function validateRegisterForm() {
    const nName = document.getElementById('nName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const phNum = document.getElementById('phNum').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!nName || !email || !password || !phNum || !address) {
        showModal('Please fill in all fields.');
        return false;
    }

    if (password.length < 8) {
        showModal('Password must be at least 8 characters long.');
        return false;
    }

    return true;
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone number format (10 digits)
function validatePhoneNumber(phNum) {
    const re = /^\d{10}$/;
    return re.test(phNum);
}