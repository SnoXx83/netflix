

// Session management object to handle user data and page access
export const session = {

    // Retrieve the email of the currently logged-in user
    getActiveUserEmail: () => localStorage.getItem('activeUser'),

    // Get the full list of registered users from localStorage
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],

    // Find and return the complete object of the logged-in user
    getCurrentUser: () => {
        const email = localStorage.getItem('activeUser');
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.find(user => user.email === email);
    },

    // Protect routes by checking if a user is logged in. Redirects users based on their authentication status and the current page
    checkAccess: () => {
        const activeUser = localStorage.getItem('activeUser');
        const path = window.location.pathname;

        // Define pages that are only accessible to guests (not logged in)
        const isGuestPage =
            path.includes("SigninPage") ||
            path.includes("SignupPage") ||
            path.endsWith("index.html") ||
            path === "/" ||
            path.endsWith("/");

        // If logged in and trying to access a guest page, redirect to session page
        if (activeUser && isGuestPage) {

            // This ensures the user stays in the "app" area
            window.location.href = "/nestflux/src/user/session.html"

        } else if (!activeUser && !isGuestPage) {
            // If not logged in and trying to access a restricted page, redirect to Sign-in
            window.location.href = "/nestflux/src/auth/SigninPage.html";
        }
    }
};