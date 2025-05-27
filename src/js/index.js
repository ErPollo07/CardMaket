async function getUsers() {
  const users = await fetch("../data/users.json");
  return await users.json();
}

async function getProducts() {
  const products = await fetch("../data/products.json");
  return await products.json();
}

document.addEventListener("DOMContentLoaded", () => {
  // put users in localStorage
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

  const cardsContainer = document.getElementById("card-row-container");

  JSON.parse(localStorage.getItem("products")).forEach((card) => {
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
    cardsContainer.appendChild(cardElement);
  });
});

const search_bar = $("#search-bar");
const search_form = $("#search-form");

search_form.on("submit", function (event) {
  event.preventDefault();
  console.log(search_bar.val());

  const search_term = search_bar.val();

  window.location.href = `products.html?search=${encodeURIComponent(
    search_term
  )}`;
});
