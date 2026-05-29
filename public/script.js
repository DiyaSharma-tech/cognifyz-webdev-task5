// Get password input
const password = document.getElementById("password");

// Get strength message
const strengthMessage = document.getElementById("strengthMessage");

// Password checker
password.addEventListener("input", () => {

    let value = password.value;

    // Weak
    if (value.length < 6) {

        strengthMessage.innerHTML = "Weak Password";
        strengthMessage.style.color = "red";

    }

    // Medium
    else if (value.length < 10) {

        strengthMessage.innerHTML = "Medium Password";
        strengthMessage.style.color = "orange";

    }

    // Strong
    else {

        strengthMessage.innerHTML = "Strong Password";
        strengthMessage.style.color = "green";

    }

});

// Show password
document.getElementById("showPassword")
.addEventListener("change", function () {

    if (this.checked) {

        password.type = "text";

    } 
    
    else {

        password.type = "password";

    }

});

// Submit form
function submitForm() {

    // Inputs
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let passwordValue = password.value;

    // Validation
    if (name === "" || email === "" || passwordValue === "") {

        alert("Please fill all fields");

        return;

    }

    // Welcome box
    document.getElementById("welcomeBox")
    .classList.remove("d-none");

    // Welcome message
    document.getElementById("welcomeMessage")
    .innerHTML = `Welcome, ${name}!`;

    // Routing
    window.location.hash = "welcome";

    // Send data to API
    fetch("/api/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password: passwordValue
        })

    })
    .then(response => response.json())
    .then(data => {

        fetchUsers();

    });

}

// Fetch users
async function fetchUsers() {

    const response = await fetch("/api/users");

    const users = await response.json();

    const userList = document.getElementById("userList");

    userList.innerHTML = "";

    users.forEach((user, index) => {

        userList.innerHTML += `
        
        <li class="list-group-item d-flex justify-content-between">
        
            ${user.name}

            <button class="btn btn-danger btn-sm"
            onclick="deleteUser(${index})">

                Delete

            </button>

        </li>

        `;

    });

}

// Delete user
async function deleteUser(index) {

    await fetch(`/api/users/${index}`, {

        method: "DELETE"

    });

    fetchUsers();

}

// Client-side routing
window.addEventListener("hashchange", () => {

    if (window.location.hash === "#welcome") {

        document.getElementById("welcomeBox")
        .classList.remove("d-none");

    }

});

// Initial load
fetchUsers();