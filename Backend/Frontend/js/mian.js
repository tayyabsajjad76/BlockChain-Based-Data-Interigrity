// ---------- Global Helper Functions ----------

function showMessage(elementId, message, duration=3000) {
    const el = document.getElementById(elementId);
    if(!el) return;
    el.textContent = message;
    setTimeout(() => { el.textContent = ''; }, duration);
}

function navigateTo(url, delay=0) {
    setTimeout(() => { window.location.href = url; }, delay);
}

// ---------- User Session Handling ----------

function setCurrentUser(name, email, role) {
    localStorage.setItem("currentUser", JSON.stringify({ name, email, role }));
}

function getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function updateDashboardWelcome() {
    const user = getCurrentUser();
    const el = document.getElementById("welcomeUser");
    if(user && el){
        el.textContent = `Welcome, ${user.name} (${user.role})`;
    }
}

window.onload = function() {
    updateDashboardWelcome();
};





async function login() {
    const email = document.getElementById('email').value.trim();   // use email
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        document.getElementById("loginResult").innerText = "Enter both email and password!";
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })   // send email, not username
        });
        const data = await res.json();

        if (data.status === "success") {
            document.getElementById("loginResult").innerText = "Login Successful"; // your desired message
            setTimeout(() => window.location.href = "index.html", 1500);
        } else {
            document.getElementById("loginResult").innerText = data.message;
        }
    } catch (err) {
        document.getElementById("loginResult").innerText = "Error connecting to backend!";
    }
}



async function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.trim();

    if(!name || !email || !password || !role){
        showMessage("registerResult", "Fill all fields!");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await res.json();

        if(data.status === "success"){
            showMessage("registerResult", "Registered successfully! Redirecting...", 3000);
            navigateTo("login.html", 1500);
        } else {
            showMessage("registerResult", data.message, 3000);
        }
    } catch(err){
        showMessage("registerResult", "Error connecting to backend!", 3000);
    }
}
