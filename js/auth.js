/* Authentication & User Profiles - auth.js */

document.addEventListener("DOMContentLoaded", () => {
  initAuthUI();
  renderProfileDashboard();
});

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

function initAuthUI() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const authNavUser = document.getElementById("auth-nav-user");

  // Navbar user icon update based on session status
  if (authNavUser) {
    const user = getCurrentUser();
    if (user) {
      authNavUser.href = "profile.html";
      authNavUser.innerHTML = `<img src="profile.jpg" alt="User Profile" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid var(--primary-color);display:block;">`;
    } else {
      authNavUser.href = "login.html";
      authNavUser.innerHTML = `<img src="profile.jpg" alt="User Profile" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:1px solid var(--border-color);display:block;">`;
    }
  }

  // Handle Login Form Submit
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!email || !password) {
        window.showToast("Please fill in all fields", "info");
        return;
      }

      const users = getUsers();
      const user = users[email];

      if (user && user.password === password) {
        localStorage.setItem("currentUser", JSON.stringify({ email, name: user.name }));
        window.showToast("Login successful! Redirecting...", "success");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 1200);
      } else {
        window.showToast("Invalid email or password", "info");
      }
    });
  }

  // Handle Register Form Submit
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (!name || !email || !password || !confirmPassword) {
        window.showToast("Please fill in all fields", "info");
        return;
      }

      if (password.length < 6) {
        window.showToast("Password must be at least 6 characters", "info");
        return;
      }

      if (password !== confirmPassword) {
        window.showToast("Passwords do not match", "info");
        return;
      }

      const users = getUsers();
      if (users[email]) {
        window.showToast("Email already registered", "info");
        return;
      }

      // Add new user
      users[email] = { name, password, orders: [], address: {} };
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login user
      localStorage.setItem("currentUser", JSON.stringify({ email, name }));

      window.showToast("Registration successful!", "success");
      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1200);
    });
  }

  // Simple forgot password alert handler
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      const email = prompt("Enter your registered email address:");
      if (email) {
        const users = getUsers();
        if (users[email]) {
          alert(`Password recovery instructions sent to ${email} (Demo password: ${users[email].password})`);
        } else {
          alert("Email address not found.");
        }
      }
    });
  }
}

// Render profile dashboard if on profile.html
function renderProfileDashboard() {
  const profileContainer = document.getElementById("profile-dashboard-container");
  if (!profileContainer) return;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    profileContainer.innerHTML = `
      <div class="glass-card" style="padding:3rem; text-align:center; max-width:500px; margin: 4rem auto;">
        <h2 style="margin-bottom:1rem;">Access Denied</h2>
        <p style="color:var(--text-secondary); margin-bottom:2rem;">Please log in to view your profile dashboard details.</p>
        <a href="login.html" class="btn btn-primary">Login Now</a>
      </div>
    `;
    return;
  }

  const users = getUsers();
  const userData = users[currentUser.email] || { name: currentUser.name, orders: [], address: {} };

  // Fill in values if elements exist
  const nameField = document.getElementById("profile-name");
  const emailField = document.getElementById("profile-email");
  const addressField = document.getElementById("profile-address");
  const ordersList = document.getElementById("orders-history-list");

  if (nameField) nameField.value = userData.name;
  if (emailField) emailField.value = currentUser.email;
  if (addressField && userData.address) {
    addressField.value = userData.address.street || "";
    const cityField = document.getElementById("profile-city");
    const zipField = document.getElementById("profile-zip");
    if (cityField) cityField.value = userData.address.city || "";
    if (zipField) zipField.value = userData.address.zip || "";
  }

  // Render Orders List
  if (ordersList) {
    const orders = userData.orders || [];
    if (orders.length === 0) {
      ordersList.innerHTML = `<li style="color:var(--text-muted); text-align:center; padding:2rem 0;">No order history found.</li>`;
    } else {
      ordersList.innerHTML = orders.map(order => `
        <li class="glass-card" style="padding:1.5rem; margin-bottom:1rem; border-color:var(--border-color); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <strong>Order ID: #${order.id}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted);">${order.date}</div>
            </div>
            <span class="badge" style="position:static; padding:0.4rem 0.8rem; border-radius:50px; background:#10b981; color:white; border:none;">Completed</span>
          </div>
          <div style="border-top:1px solid var(--border-color); margin-top:0.5rem; padding-top:0.5rem;">
            ${order.items.map(item => `
              <div style="display:flex; justify-content:space-between; font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.2rem;">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${item.price * item.quantity}</span>
              </div>
            `).join("")}
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); margin-top:0.5rem; padding-top:0.5rem;">
            <span>Total Paid</span>
            <span>$${order.total}</span>
          </div>
        </li>
      `).join("");
    }
  }

  // Handle Edit profile details form
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const updatedName = document.getElementById("profile-name").value.trim();
      const updatedStreet = document.getElementById("profile-address").value.trim();
      const updatedCity = document.getElementById("profile-city").value.trim();
      const updatedZip = document.getElementById("profile-zip").value.trim();

      userData.name = updatedName;
      userData.address = { street: updatedStreet, city: updatedCity, zip: updatedZip };
      users[currentUser.email] = userData;
      localStorage.setItem("users", JSON.stringify(users));

      // Update current user cached name
      currentUser.name = updatedName;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      window.showToast("Profile details updated successfully!");
    });
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.showToast("Logged out successfully");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;
window.getUsers = getUsers;
