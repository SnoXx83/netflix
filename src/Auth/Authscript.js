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
            alert("l'email de correspond pas !")
        }

        // Transform the datas in JSON for get the password
        const userObject = JSON.parse(storedDatas);

        // Compare the storedPassword with the actual password
        if (userObject.password !== password) {
            alert("le mot de passe de correspond pas !")
        } else {
            console.log("Match ! Connexion en cours...");
        }
    })
}