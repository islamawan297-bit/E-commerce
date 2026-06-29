/* Checkout Page Management - checkout.js */

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  prefillCheckoutDetails();
  initCheckoutForm();
});

function renderCheckoutSummary() {
  const checkoutItemsContainer = document.getElementById("checkout-items-list");
  if (!checkoutItemsContainer) return;

  const cart = window.getCart();
  if (cart.length === 0) {
    checkoutItemsContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:1.5rem 0;">Your cart is empty.</p>`;
    return;
  }

  // Calculate prices
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const shipping = subtotal > 150 ? 0 : 15; // Free shipping above $150
  const tax = Math.round(subtotal * 0.08); // 8% sales tax
  const total = subtotal + shipping + tax;

  checkoutItemsContainer.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;">
      ${cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.95rem;">
          <div style="display:flex; align-items:center; gap:0.8rem;">
            <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; border-radius:var(--border-radius-sm); object-fit:cover;">
            <div>
              <span style="font-weight:600; display:block;">${item.name}</span>
              <span style="color:var(--text-secondary); font-size:0.8rem;">Qty: ${item.quantity} &times; $${item.price}</span>
            </div>
          </div>
          <span style="font-weight:700;">$${item.price * item.quantity}</span>
        </div>
      `).join("")}
    </div>
    <div style="border-top:1px solid var(--border-color); padding-top:1rem; display:flex; flex-direction:column; gap:0.6rem; font-size:0.95rem;">
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-secondary);">Subtotal</span>
        <span>$${subtotal}</span>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-secondary);">Estimated Tax (8%)</span>
        <span>$${tax}</span>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--text-secondary);">Shipping</span>
        <span>${shipping === 0 ? "Free" : `$${shipping}`}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; border-top:1px solid var(--border-color); padding-top:0.8rem; margin-top:0.4rem;">
        <span>Total</span>
        <span>$${total}</span>
      </div>
    </div>
  `;

  // Storing checkout total for submission usage
  checkoutItemsContainer.dataset.total = total;
}

function prefillCheckoutDetails() {
  const currentUser = window.getCurrentUser();
  if (!currentUser) return;

  const users = window.getUsers();
  const userData = users[currentUser.email];
  if (!userData) return;

  // Prefill shipping/billing info
  const fullNameField = document.getElementById("checkout-fullname");
  const emailField = document.getElementById("checkout-email");
  const streetField = document.getElementById("checkout-address");
  const cityField = document.getElementById("checkout-city");
  const zipField = document.getElementById("checkout-zip");

  if (fullNameField) fullNameField.value = userData.name || "";
  if (emailField) emailField.value = currentUser.email || "";
  if (streetField && userData.address) streetField.value = userData.address.street || "";
  if (cityField && userData.address) cityField.value = userData.address.city || "";
  if (zipField && userData.address) zipField.value = userData.address.zip || "";
}

function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = window.getCart();
    if (cart.length === 0) {
      window.showToast("Your cart is empty. Cannot place order.", "info");
      return;
    }

    // Capture fields
    const fullname = document.getElementById("checkout-fullname").value.trim();
    const email = document.getElementById("checkout-email").value.trim();
    const address = document.getElementById("checkout-address").value.trim();
    const city = document.getElementById("checkout-city").value.trim();
    const zip = document.getElementById("checkout-zip").value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "card";

    if (!fullname || !email || !address || !city || !zip) {
      window.showToast("Please fill in all shipping details.", "info");
      return;
    }

    // Card specifics validation
    if (paymentMethod === "card") {
      const cardNum = document.getElementById("checkout-cardnumber").value.replace(/\s+/g, "");
      const expiry = document.getElementById("checkout-expiry").value.trim();
      const cvc = document.getElementById("checkout-cvc").value.trim();

      if (!cardNum || !expiry || !cvc) {
        window.showToast("Please complete credit card payment fields.", "info");
        return;
      }
      if (cardNum.length < 16) {
        window.showToast("Please enter a valid credit card number.", "info");
        return;
      }
    }

    // Placing order
    const orderId = Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toISOString().split("T")[0];
    const total = parseFloat(document.getElementById("checkout-items-list").dataset.total || 0);

    const newOrder = {
      id: orderId,
      date: date,
      items: cart,
      total: total,
      shippingAddress: { fullname, address, city, zip }
    };

    // If logged in, save to users orders
    const currentUser = window.getCurrentUser();
    if (currentUser) {
      const users = window.getUsers();
      if (users[currentUser.email]) {
        if (!users[currentUser.email].orders) {
          users[currentUser.email].orders = [];
        }
        users[currentUser.email].orders.unshift(newOrder);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    // Clear cart
    localStorage.removeItem("cart");
    window.updateBadges();

    window.showToast("Order placed successfully! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = `order-success.html?orderId=${orderId}`;
    }, 1200);
  });
}
