async function getUsers() {
  // Fetches user data from a local JSON file.
  const users = await fetch("../data/users.json");
  // Parses the JSON response and returns the data.
  return await users.json();
}

async function getProducts() {
  // Fetches product data from a local JSON file.
  const products = await fetch("../data/products.json");
  // Parses the JSON response and returns the data.
  return await products.json();
}

document.addEventListener("DOMContentLoaded", () => {
  // Put users in localStorage
  getUsers()
    .then((data) => {
      localStorage.setItem("users", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });

  // Check if the user is logged in
  if (!localStorage.getItem("user")) {
    // If not, redirect to the login page
    window.location.href = "login.html";
  }

  // Put the products in localStorage
  getProducts()
    .then((data) => {
      // Store the products in localStorage
      localStorage.setItem("products", JSON.stringify(data));
      console.log("Products stored in localStorage");
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  // Get the value from the query string if present
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search") || "";

  // Display the filtered cards
  renderCards(searchParam);

  // Listen for the custom event for live search
  document.addEventListener("search-cards", (e) => {
    renderCards(e.detail);
    // Also update the searchbar if present
    const searchBar = document.getElementById("search-bar");
    if (searchBar) searchBar.value = e.detail;
  });
});

function renderCards(filter = "") {
  const cardsContainer = document.getElementById("card-row-container");
  // Clear existing cards from the container
  cardsContainer.innerHTML = "";

  // Retrieve all products from localStorage
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  // Normalize the search filter for case-insensitive comparison
  const search = filter.trim().toLowerCase();

  // Filter products based on the search term
  const filtered = search
    ? allProducts.filter((card) => card.name.toLowerCase().startsWith(search))
    : allProducts;

  // Iterate over filtered products and create card elements
  filtered.forEach((card) => {
    const cardElement = document.createElement("div");
    // Add CSS classes for styling and responsiveness
    cardElement.classList.add(
      "card-market-item",
      "col-12",
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "mb-5"
    );
    // Construct the image source path based on the card's name
    const cardImageSrc = card.name.toLowerCase().replace(/ /g, "_");
    // Set the inner HTML for the card, including image, name, price, and add-to-cart button
    cardElement.innerHTML = `
      <div class="cm-card-item">
        <img class="card-img-top" src="../assets/images/${cardImageSrc}.png" alt="${card.name}" />
        <div class="cm-card-body">
          <h5 class="cm-card-title">${card.name}</h5>
          <div class="card-price-btn-row">
            <p class="card-price">${card.price}$</p>
            <button class="btn-add-to-cart">Add to cart</button>
          </div>
        </div>
      </div>
    `;
    // Get the add-to-cart button element
    const addToCartBtn = cardElement.querySelector('.btn-add-to-cart');
    // Add an event listener for the add-to-cart button
    addToCartBtn.addEventListener('mouseup', function () {
      // Get the current user data from localStorage
      let user = JSON.parse(localStorage.getItem('user'));
      // Add the card to the user's cart (with a quantity of 1)
      user.cart.push({ ...card, quantity: 1 });
      // Save the updated user data back to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Provide simple feedback to the user
      addToCartBtn.textContent = "Added!";
      // Reset button text after a delay
      setTimeout(() => addToCartBtn.textContent = "Add to cart", 1000);
    });
    // Append the created card element to the cards container
    cardsContainer.appendChild(cardElement);
  });
}