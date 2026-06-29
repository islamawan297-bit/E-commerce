/* Global Application Module - app.js */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCustomCursor();
  initScrollAnimations();
  initSideDrawers();
  initTheme();
  initMobileMenu();
  initScrollEffects();
  initSearch();
  updateBadges();
  setupQuickViewModal();
});

// Toast notifications
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type} glass-card`;
  
  // Icon based on type
  let icon = '<svg style="width:20px;height:20px;fill:#10b981" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 7.207l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 11.586l3.293-3.293a1 1 0 011.414 1.414z"/></svg>';
  if (type === "info") {
    icon = '<svg style="width:20px;height:20px;fill:#3b82f6" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/></svg>';
  }

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Theme setup & toggle
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeIcon(nextTheme);
    showToast(`Switched to ${nextTheme} theme`, "info");
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;
  if (theme === "dark") {
    themeToggleBtn.innerHTML = `<svg style="width:20px;height:20px;fill:currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clip-rule="evenodd"/></svg>`;
  } else {
    themeToggleBtn.innerHTML = `<svg style="width:20px;height:20px;fill:currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
  }
}

// Mobile Menu Drawer setup
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
}

// Scroll behaviors
function initScrollEffects() {
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Search bar navigation
function initSearch() {
  const searchInput = document.getElementById("header-search");
  if (!searchInput) return;

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
      }
    }
  });
}

// Cart & Wishlist counts synchronization
function updateBadges() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const cartBadges = document.querySelectorAll(".cart-count-badge");
  const wishlistBadges = document.querySelectorAll(".wishlist-count-badge");

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  cartBadges.forEach(badge => badge.textContent = totalCartItems);
  wishlistBadges.forEach(badge => badge.textContent = wishlist.length);
}

// Quick View Modal
function setupQuickViewModal() {
  // Create Modal Element in DOM if not exists
  let modalOverlay = document.getElementById("quickview-modal");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "quickview-modal";
    modalOverlay.className = "modal-overlay";
    modalOverlay.innerHTML = `
      <div class="modal-container glass-card">
        <button class="modal-close" id="modal-close-btn">&times;</button>
        <div class="modal-content" id="modal-body-content"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const closeBtn = document.getElementById("modal-close-btn");
  closeBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("open");
    }
  });
}

function openQuickView(productId) {
  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById("quickview-modal");
  const modalBody = document.getElementById("modal-body-content");

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div style="border-radius:var(--border-radius-md); overflow:hidden;">
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover; aspect-ratio:1;">
      </div>
      <div style="display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <span style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); font-weight:600;">${product.category}</span>
          <h2 style="font-size:1.8rem; margin:0.5rem 0; line-height:1.2;">${product.name}</h2>
          
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; color:#fbbf24;">
            ${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}
            <span style="color:var(--text-muted); font-size:0.85rem;">(${product.reviewsCount} reviews)</span>
          </div>

          <div style="display:flex; align-items:baseline; gap:0.8rem; margin-bottom:1.5rem;">
            <span style="font-size:1.8rem; font-weight:800; color:var(--text-primary);">$${product.price}</span>
            ${product.originalPrice ? `<span style="text-decoration:line-through; color:var(--text-muted);">$${product.originalPrice}</span>` : ""}
          </div>

          <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.95rem;">${product.description}</p>
        </div>

        <div style="display:flex; gap:1rem;">
          <button class="btn btn-primary" onclick="window.addToCart('${product.id}', 1); document.getElementById('quickview-modal').classList.remove('open');" style="flex:1;">Add to Cart</button>
          <button class="btn btn-secondary" onclick="window.toggleWishlist('${product.id}'); document.getElementById('quickview-modal').classList.remove('open');" style="width:50px; padding:0; display:flex; align-items:center; justify-content:center;">
            <svg style="width:20px; height:20px; fill:currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("open");
}

// Expose openQuickView globally
window.openQuickView = openQuickView;
window.showToast = showToast;
window.updateBadges = updateBadges;

// ==========================================
// PRESET PREMIUM EFFECTS CORE HANDLERS
// ==========================================

function initPreloader() {
  let loader = document.getElementById("preloader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "preloader";
    loader.innerHTML = `
      <div class="preloader-spinner"></div>
      <h2 style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:700;">Veloce</h2>
    `;
    document.body.prepend(loader);
  }

  // Fade out loader on window complete load
  window.addEventListener("load", () => {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 600);
  });

  // Fallback in case load event already fired or takes too long
  setTimeout(() => {
    if (document.getElementById("preloader")) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 600);
    }
  }, 2500);
}

function initCustomCursor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Grow effect on interactive elements
  const addHoverEffects = () => {
    const targets = document.querySelectorAll("a, button, input, select, textarea, .product-card, .glass-card, [onclick]");
    targets.forEach(target => {
      // Avoid duplicate listeners
      if (target.dataset.hasCursorListener) return;
      target.dataset.hasCursorListener = "true";

      target.addEventListener("mouseenter", () => cursor.classList.add("grow"));
      target.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
    });
  };

  addHoverEffects();
  // Periodically check for new dynamically added items
  setInterval(addHoverEffects, 1500);
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Instantly show all scroll elements
    document.querySelectorAll(".scroll-animate").forEach(el => el.classList.add("animate-in"));
    return;
  }

  const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -40px 0px"
  });

  // Assign scroll animation classes to core layouts
  const layoutsToAnimate = document.querySelectorAll(
    ".hero-section > div > *, .product-card, .glass-card, section h2, section p, .footer-top > *, .faq-item"
  );

  layoutsToAnimate.forEach((el, index) => {
    el.classList.add("scroll-animate");
    
    // Stagger layout structures
    if (el.classList.contains("product-card") || el.classList.contains("glass-card")) {
      const staggerIndex = (index % 4) + 1;
      el.classList.add(`delay-${staggerIndex}`);
      el.classList.add("zoom-in");
    } else {
      el.classList.add("fade-up");
    }

    animObserver.observe(el);
  });
}

// Side Drawers: Shopping Bar & Love Bar
function initSideDrawers() {
  // Inject Cart Drawer HTML
  let cartDrawer = document.getElementById("cart-drawer");
  if (!cartDrawer) {
    cartDrawer = document.createElement("div");
    cartDrawer.id = "cart-drawer";
    cartDrawer.className = "drawer-overlay";
    cartDrawer.innerHTML = `
      <div class="drawer-content glass-card">
        <div class="drawer-header">
          <h2 style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:700;">Shopping Bar</h2>
          <button class="drawer-close" onclick="window.toggleCartDrawer()">&times;</button>
        </div>
        <div id="cart-drawer-items" class="drawer-items"></div>
        <div class="drawer-footer">
          <div class="drawer-total">
            <span>Subtotal</span>
            <span id="cart-drawer-total">$0</span>
          </div>
          <a href="cart.html" class="btn btn-secondary" style="width:100%; margin-bottom:0.5rem; text-align:center; padding:0.6rem 0;">View Full Cart</a>
          <a href="checkout.html" class="btn btn-primary" style="width:100%; text-align:center; padding:0.6rem 0;">Checkout Now</a>
        </div>
      </div>
    `;
    document.body.appendChild(cartDrawer);

    // Close on overlay click
    cartDrawer.addEventListener("click", (e) => {
      if (e.target === cartDrawer) window.toggleCartDrawer();
    });
  }

  // Inject Wishlist Drawer HTML
  let wishlistDrawer = document.getElementById("wishlist-drawer");
  if (!wishlistDrawer) {
    wishlistDrawer = document.createElement("div");
    wishlistDrawer.id = "wishlist-drawer";
    wishlistDrawer.className = "drawer-overlay";
    wishlistDrawer.innerHTML = `
      <div class="drawer-content glass-card">
        <div class="drawer-header">
          <h2 style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:700;">Love Bar</h2>
          <button class="drawer-close" onclick="window.toggleWishlistDrawer()">&times;</button>
        </div>
        <div id="wishlist-drawer-items" class="drawer-items"></div>
        <div class="drawer-footer">
          <a href="wishlist.html" class="btn btn-primary" style="width:100%; text-align:center; padding:0.6rem 0;">View Wishlist Page</a>
        </div>
      </div>
    `;
    document.body.appendChild(wishlistDrawer);

    // Close on overlay click
    wishlistDrawer.addEventListener("click", (e) => {
      if (e.target === wishlistDrawer) window.toggleWishlistDrawer();
    });
  }

  // Setup click triggers on header icons
  const cartIconLink = document.querySelector('.header-actions a[href="cart.html"]');
  const wishlistIconLink = document.querySelector('.header-actions a[href="wishlist.html"]');

  if (cartIconLink) {
    cartIconLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.toggleCartDrawer();
    });
  }

  if (wishlistIconLink) {
    wishlistIconLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.toggleWishlistDrawer();
    });
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    renderCartDrawer();
  }
}

function toggleWishlistDrawer() {
  const drawer = document.getElementById("wishlist-drawer");
  if (!drawer) return;
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    renderWishlistDrawer();
  }
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById("cart-drawer-items");
  const totalLabel = document.getElementById("cart-drawer-total");
  if (!itemsContainer) return;

  const cart = window.getCart ? window.getCart() : [];
  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem 0; font-size:0.95rem;">Your cart is empty.</p>`;
    if (totalLabel) totalLabel.textContent = "$0";
    return;
  }

  let subtotal = 0;
  itemsContainer.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;
    return `
      <div style="display:flex; gap:1rem; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.8rem;">
        <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; border-radius:var(--border-radius-sm); object-fit:cover;">
        <div style="flex:1;">
          <h4 style="font-size:0.9rem; font-weight:600; line-height:1.2; display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;">${item.name}</h4>
          <span style="color:var(--text-muted); font-size:0.8rem;">${item.quantity} &times; $${item.price}</span>
        </div>
        <button onclick="window.removeFromCart('${item.id}'); setTimeout(renderCartDrawer, 50);" style="background:none; border:none; color:#ef4444; cursor:pointer; font-weight:700;">&times;</button>
      </div>
    `;
  }).join("");

  if (totalLabel) totalLabel.textContent = `$${subtotal}`;
}

function renderWishlistDrawer() {
  const itemsContainer = document.getElementById("wishlist-drawer-items");
  if (!itemsContainer) return;

  const wishlist = window.getWishlist ? window.getWishlist() : [];
  if (wishlist.length === 0) {
    itemsContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem 0; font-size:0.95rem;">Your wishlist is empty.</p>`;
    return;
  }

  const wishlistItems = window.products.filter(p => wishlist.includes(p.id));
  itemsContainer.innerHTML = wishlistItems.map(item => `
    <div style="display:flex; gap:1rem; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:0.8rem;">
      <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; border-radius:var(--border-radius-sm); object-fit:cover;">
      <div style="flex:1;">
        <h4 style="font-size:0.9rem; font-weight:600; line-height:1.2; display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;">${item.name}</h4>
        <span style="color:var(--text-muted); font-size:0.8rem;">$${item.price}</span>
      </div>
      <button onclick="window.moveToCart('${item.id}'); setTimeout(renderWishlistDrawer, 50);" style="background:none; border:none; color:var(--primary-color); cursor:pointer; font-size:0.8rem; font-weight:600;">Add</button>
    </div>
  `).join("");
}

// Intercept window badges sync to update drawers automatically
const baseUpdateBadges = window.updateBadges;
window.updateBadges = function() {
  if (typeof baseUpdateBadges === "function") baseUpdateBadges();
  renderCartDrawer();
  renderWishlistDrawer();
};

// Expose drawers globally
window.toggleCartDrawer = toggleCartDrawer;
window.toggleWishlistDrawer = toggleWishlistDrawer;
window.renderCartDrawer = renderCartDrawer;
window.renderWishlistDrawer = renderWishlistDrawer;


