import bcrypt from 'bcryptjs';
import { session } from '../Session.js';
import { displayMessage } from '../../Animations/Ui.js';

// Switch between view mod and edit mod
function toggleEditMode(isEditing) {
    // Retrieve data and selector in html
    const inputs = document.querySelectorAll('#lastName, #firstName, #mail');
    const passwordSection = document.getElementById('passwordSection');
    const editBtn = document.getElementById('editBtn');

    // Validation: if editing remove readonly attribute, if not set readonly attribute
    inputs.forEach(input => {
        if (isEditing) {
            input.removeAttribute('readonly');
        } else {
            input.setAttribute('readonly', true);
        }
    });

    // Show or hide the password section + the edit button
    passwordSection.style.display = isEditing ? 'flex' : 'none';
    editBtn.style.display = isEditing ? 'none' : 'block';
}


// Initialize the profile page with the current user's data
export function initProfile() {
    // Retrieve the logged-in user's information from the session
    const user = session.getCurrentUser();

    // Select UI elements
    const profileName = document.getElementById('username');
    const profileForm = document.getElementById('profileForm');
    const editBtn = document.getElementById('editBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // If no user is found, we stop the execution to prevent errors
    if (!user) {
        return;
    }

    // Set the user's name in the header
    if (profileName) {
        profileName.textContent = `${user.firstName} ${user.lastName}`;
    }

    // Fill the form inputs with the user's data if the form exists
    if (profileForm) {
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('mail').value = user.email;

        // Click on edit button
        editBtn?.addEventListener('click', () => toggleEditMode(true));

        // Click on cancel button
        cancelBtn?.addEventListener('click', () => {
            toggleEditMode(false);

            // Reset inputs to original user data
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('mail').value = user.email;

        });

        // Submit the form
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleProfileUpdate(user);
        });
    }
}

// Update and save the new information
async function handleProfileUpdate(currentUser) {
    const newLastName = document.getElementById('lastName').value;
    const newFirstName = document.getElementById('firstName').value;
    const oldPass = document.getElementById('oldPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;

    // Create the updated user object
    let updatedUser = {
        ...currentUser,
        lastName: newLastName,
        firstName: newFirstName
    };

    // If the user wants to change the password
    if (newPass !== "") {

        // Compare the old password with the hashed password in the storage
        const isMatch = await bcrypt.compare(oldPass, currentUser.password);


        if (!isMatch) {
            displayMessage("Erreur : L'ancien mot de passe est incorrect.", "error");
            return;
        }

        // Validation: Check password strength (8 chars, 1 uppercase, 1 number)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(newPass)) return displayMessage("Le mot de passe n'est pas assez fort.");

        // Check if the two new passwords are the same
        if (newPass !== confirmPass) {
            displayMessage("Erreur : Le nouveau mot de passe et la confirmation ne correspondent pas.", "error");
            return;
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);
        updatedUser.password = hashedPassword;

    };

    // Save the new data to the localStorage
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const index = allUsers.findIndex(u => u.email === currentUser.email);

    if (index !== -1) {
        allUsers[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
        localStorage.setItem('activeUser', updatedUser.email);

        displayMessage("Profil mis à jour avec succès !", "success");

        setTimeout(() => {
            toggleEditMode(false);
            location.reload();
        }, 1500);
    } else {
        displayMessage("L'utilisateur n'existe pas.", "error");
    }
}

