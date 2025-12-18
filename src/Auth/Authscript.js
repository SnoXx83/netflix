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