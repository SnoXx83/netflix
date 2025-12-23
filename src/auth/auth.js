import bcrypt from 'bcryptjs';
import { displayMessage } from '../animations/ui.js';
import { session } from '../user/session.js';


// Handle user registration (Sign-up)
export function handleSignUp(event) {
    event.preventDefault();

    // Collect data from the form
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    const confirmation = document.getElementById('confirmPassword').value;

    // Validation : Check if passwords match
    if (password !== confirmation) return displayMessage("Les mots de passe ne correspondent pas.");
    
    // Validation: Check password strength (8 chars, 1 uppercase, 1 number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) return displayMessage("Le mot de passe n'est pas assez fort.");

    // Validation: Check if the user already exists in the array
    const users = session.getUsers();
    if (users.find(u => u.email === email)) return displayMessage("Email existe déjà.");

    // Secure the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const newUser = {
        lastName, firstName, email,
        password: bcrypt.hashSync(password, salt)
    };

    // Save the new user to the global users array in localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message and redirect to login page
    displayMessage("L'inscription est un succès. Redirection...", "success");
    setTimeout(() => window.location.href = "../auth/SigninPage.html", 1500);
}

// Handle user login (Sign-in)
export function handleSignIn(event) {
    
    event.preventDefault();
    // Collect credentials
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Search for the user in the database (localStorage)
    const user = session.getUsers().find(user => user.email === email);

    // Validation : Check if user exists and if the password matches the hash
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return displayMessage("L'email ou le mot de passe sont invalide.");
    }

    // Success: Store the email in session (activeUser)
    localStorage.setItem('activeUser', email);
    displayMessage("Connexion réussi !", "success");

    // Redirect to the profile page
    setTimeout(() => window.location.href = "../user/session.html", 1000);
}

// Handle user logout
export function handleLogout() {
    // Clear the active session and redirect to sign-in page
    localStorage.removeItem('activeUser');
    window.location.href = "/nestflux/src/auth/SigninPage.html";
}
