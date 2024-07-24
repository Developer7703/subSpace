document.getElementById("signupForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch('https://your-hasura-endpoint/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'MR8CJxxamY20y4ahJI5m6XNgMa7o5Vo8fSdeIVIDeQ7R6HEI5jjqK13TyIgPhRl1'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    insert_users(objects: {user_id: ${userId}, full_name: "${fullName}", username: "${username}", password: "${password}"}) {
                        returning {
                            user_id
                            full_name
                            username
                        }
                    }
                }
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.error("GraphQL Errors:", data.errors);
            alert("Sign Up Failed: " + data.errors.map(err => err.message).join(", "));
        } else {
            console.log("Sign Up Successful:", data.data);
            alert("Sign Up Successful");
            window.location.href = 'login.html'; // Redirect to login page after successful sign up
        }
    })
    .catch(error => {
        console.error("Network Error:", error);
        alert("Sign Up Failed: Network Error");
    });
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch('https://your-hasura-endpoint/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'your-admin-secret'
        },
        body: JSON.stringify({
            query: `
                query {
                    users(where: {username: {_eq: "${username}"}, password: {_eq: "${password}"}}) {
                        user_id
                        full_name
                        username
                    }
                }
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.data.users.length > 0) {
            console.log("Log In Successful:", data.data.users[0]);
            alert("Log In Successful");
            // Redirect to the main page or store user info in local storage
        } else {
            alert("Invalid Credentials");
        }
    })
    .catch(error => {
        console.error("Network Error:", error);
        alert("Log In Failed: Network Error");
    });
});
