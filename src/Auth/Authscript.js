
// Managing redirections if the user is already logged in
const activeUser = localStorage.getItem('activeUser');

// List of the pages
const isGuestPage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname.includes("SigninPage.html") ||
    window.location.pathname.includes("SignupPage.html") ||
    window.location.pathname === "/";

// Redirection  
if (activeUser && isGuestPage) {
    if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
        window.location.href = "src/user/Profil.html"; 
    }else {
        window.location.href = "../user/Profil.html";
    }
}


const signupForm = document.getElementById('signUp');

if (signupForm) {

    // Function submit on signUpForm 
    signupForm.addEventListener('submit', function (event) {

        // The page is not redirect
        event.preventDefault();

        // Get all datas we need on Sign-Up Page
        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('mail').value;
        const password = document.getElementById('password').value;
        const confirmationPassword = document.getElementById('confirmPassword').value;

        // Error handling
        if (password !== confirmationPassword) {
            alert("Les mots de passe ne sont pas identiques !");
            return;
        }

        // save datas in user Object
        const user = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,
        };

        // Save user Object in the localStorage with a unique key => email
        localStorage.setItem(email, JSON.stringify(user));

        // Redirect in Sign-in Page
        window.location.href = "../Auth/SigninPage.html";
    });
}


const signInForm = document.getElementById('signIn');

if (signInForm) {
    // Function submit on SignInForm
    signInForm.addEventListener('submit', function (event) {

        event.preventDefault();

        // Get all datas we need on Sign-In Page
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Get the key with email
        const storedDatas = localStorage.getItem(email);

        if (!storedDatas) {
            alert("l'email de correspond pas !");
            return;
        }

        // Transform the datas in JSON for get the password
        const userObject = JSON.parse(storedDatas);

        // Compare the storedPassword with the actual password
        if (userObject.password !== password) {
            alert("le mot de passe de correspond pas !")
        } else {
            // Save the session email
            localStorage.setItem('activeUser', email);

            window.location.href = "../user/Profil.html";
        }
    })
}

const profileName = document.getElementById('username');

if (profileName) {
    const activeEmail = localStorage.getItem('activeUser');

    if (activeEmail) {
        const userData = JSON.parse(localStorage.getItem(activeEmail));
        profileName.textContent = userData.firstName + " " + userData.lastName;
    } else {
        // if nobody is connected , reddirect to login page
        window.location.href = "../Auth/SigninPage.html";
    }
}


const profileForm = document.getElementById('profileForm');

if (profileForm) {
    const activeEmail = localStorage.getItem('activeUser');

    if (activeEmail) {
        const userData = JSON.parse(localStorage.getItem(activeEmail));

        document.getElementById('lastName').value = userData.lastName || "";
        document.getElementById('firstName').value = userData.firstName || "";
        document.getElementById('mail').value = userData.email || "";
        document.getElementById('password').value = userData.password || "";


    }
}


const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function (event) {
        event.preventDefault();

        localStorage.removeItem('activeUser');

        window.location.href = "../Auth/SigninPage.html";
    });
}


