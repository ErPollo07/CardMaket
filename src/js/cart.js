document.addEventListener("DOMContentLoaded", function () {
  const contentDiv = document.getElementById("content");
  const cardContainer = document.getElementById("card-row-container");

  // Get the cart of the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = user ? user.cart : [];

  // Check if the cart is empty
  if (cart.length === 0) {
    // Put in the content div the empty cart message
    contentDiv.innerHTML = `
      <div
        id="empty-cart-message"
        class="d-flex align-items-center justify-content-center"
      >
        <h1>:( No item in cart</h1>
      </div>
    `;
  } else {
    // Put in the content div the container for all the cards
    contentDiv.innerHTML = `
      <div class="container card-container">
        <div class="row" id="card-row-container"></div>
      </div>
    `;

    // Put the cards in the container
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
      // Resolve the name of the png in assets/images
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
                <button class="btn-add-to-cart">Add to cart</button>
              </div>
            </div>
          </div>
        `;

      // Append the element of the card
      document.getElementById("card-row-container").appendChild(cardElement);
    });
  }
  console.log("User's cart:", cart);
});

document.getElementById("buy-cart-btn").addEventListener("mouseup", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  user.cart = [];
  localStorage.setItem("user", JSON.stringify(user));
  alert("Cart purchased successfully! Thank you for your order.");
  window.location.href = "index.html";
});
