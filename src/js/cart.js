document.addEventListener("DOMContentLoaded", function () {
  // Get the content div and card container elements
  const contentDiv = document.getElementById("content");
  const cardContainer = document.getElementById("card-row-container"); // This variable is declared but not used in the provided code.

  // Get the cart of the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  // Initialize cart; if user or user.cart is null/undefined, default to an empty array
  const cart = user ? user.cart : [];

  // Check if the cart is empty
  if (cart.length === 0) {
    // Put in the content div the empty cart message
    contentDiv.innerHTML = `
      <div id="empty-cart-message" class="d-flex align-items-center justify-content-center">
        <div class="empty-cart-emoji">🛒</div>
        <div class="empty-cart-title">:( No items in cart</div>
        <div class="empty-cart-desc">Your cart is empty. Start adding some cards!</div>
      </div>
    `;
  } else {
    // Put in the content div the container for all the cards
    contentDiv.innerHTML = `
      <div class="container card-container">
        <div class="row" id="card-row-container"></div>
      </div>
    `;

    // Populate the container with individual product cards
    cart.forEach((card) => {
      // Create a new div element for each card
      const cardElement = document.createElement("div");
      // Add Bootstrap and custom classes for styling and responsiveness
      cardElement.classList.add(
        "card-market-item",
        "col-12",
        "col-lg-3",
        "col-md-4",
        "col-sm-6",
        "mb-5"
      );
      // Resolve the image file name based on the card's name (lowercase and spaces replaced with underscores)
      const cardImageSrc = card.name.toLowerCase().replace(/ /g, "_");

      // Set the inner HTML of the card element
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

      // Append the created card element to the card row container
      document.getElementById("card-row-container").appendChild(cardElement);
    });
  }
  // Log the user's cart to the console for debugging purposes
  console.log("User's cart:", cart);
});

// Add an event listener to the "Buy Cart" button
document.getElementById("buy-cart-btn").addEventListener("mouseup", () => {
  // Get the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Clear the user's cart
  user.cart = [];
  // Save the updated user data back to localStorage
  localStorage.setItem("user", JSON.stringify(user));
  // Display a success message to the user
  alert("Cart purchased successfully! Thank you for your order.");
  // Redirect the user to the home page
  window.location.href = "index.html";
});