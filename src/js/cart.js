// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the main content container where cart content will be rendered
  const contentDiv = document.getElementById("content");

  // Retrieve the currently logged-in user and their cart from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = user ? user.cart : [];

  // If the cart is empty, display a message to the user
  if (cart.length === 0) {
    contentDiv.innerHTML = `
      <div id="empty-cart-message" class="d-flex align-items-center justify-content-center">
        <div class="empty-cart-emoji">🛒</div>
        <div class="empty-cart-title">:( No items in cart</div>
        <div class="empty-cart-desc">Your cart is empty. Start adding some cards!</div>
      </div>
    `;
  } else {
    // If the cart has items, render the card container
    contentDiv.innerHTML = `
      <div class="container card-container">
        <div class="row" id="card-row-container"></div>
      </div>
    `;

    // For each card in the cart, create and append a card element
    cart.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add(
        "card-market-item",
        "col-12",
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "mb-5"
      );
      // Generate the image file name based on the card's name
      const cardImageSrc = card.name.toLowerCase().replace(/ /g, "_");
      cardElement.innerHTML = `
          <div class="cm-card-item">
            <img
              class="card-img-top"
              src="../assets/images/${cardImageSrc}.png"
              alt="${card.name}"
            />
            <div class="cm-card-body">
              <h5 class="cm-card-title">${card.name}</h5>
              <div class="card-price-btn-row">
                <p class="card-price">${card.price}$</p>
              </div>
            </div>
          </div>
        `;
      document.getElementById("card-row-container").appendChild(cardElement);
    });
  }
  // Log the user's cart to the console for debugging
  console.log("User's cart:", cart);
});

// Handle the purchase of the cart when the "Buy Cart" button is clicked
document.getElementById("buy-cart-btn").addEventListener("mouseup", () => {
  // Retrieve the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // Clear the user's cart
  user.cart = [];
  // Save the updated user data
  localStorage.setItem("user", JSON.stringify(user));
  // Show a confirmation message and redirect to the home page
  alert("Cart purchased successfully! Thank you for your order.");
  window.location.href = "index.html";
});