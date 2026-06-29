/* Cart and Wishlist Logic - cart.js */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.updateBadges();
  // If we are on the cart page, re-render it
  if (typeof renderCartPage === "function") {
    renderCartPage();
  }
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  window.updateBadges();
  // If we are on the wishlist page, re-render it
  if (typeof renderWishlistPage === "function") {
    renderWishlistPage();
  }
}

function addToCart(productId, quantity = 1, showNotice = true) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  const product = window.products.find(p => p.id === productId);

  if (!product) return;

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity
    });
  }

  saveCart(cart);
  if (showNotice) {
    window.showToast(`${product.name} added to cart!`);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  if (item) {
    window.showToast(`${item.name} removed from cart.`, "info");
  }
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity));
    saveCart(cart);
  }
}

function toggleWishlist(productId) {
  const wishlist = getWishlist();
  const itemIndex = wishlist.findIndex(id => id === productId);
  const product = window.products.find(p => p.id === productId);

  if (!product) return;

  if (itemIndex > -1) {
    wishlist.splice(itemIndex, 1);
    saveWishlist(wishlist);
    window.showToast(`${product.name} removed from wishlist.`, "info");
  } else {
    wishlist.push(productId);
    saveWishlist(wishlist);
    window.showToast(`${product.name} added to wishlist!`);
  }

  // Update card heart toggles if they exist on current page
  const heartBtn = document.querySelector(`.btn-wishlist[data-id="${productId}"]`);
  if (heartBtn) {
    heartBtn.classList.toggle("active");
  }
}

function moveToCart(productId) {
  // Add to cart
  addToCart(productId, 1, false);
  
  // Remove from wishlist
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);

  const product = window.products.find(p => p.id === productId);
  window.showToast(`Moved ${product ? product.name : "item"} to cart!`);
}

// Attach functions to window for globally accessible onclick attributes
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.moveToCart = moveToCart;
window.getCart = getCart;
window.getWishlist = getWishlist;
