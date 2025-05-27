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

  // Prendi il valore dalla query string se presente
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("search") || "";

  // Mostra le carte filtrate
  renderCards(searchParam);

  // Ascolta l'evento custom per la ricerca live
  document.addEventListener("search-cards", (e) => {
    renderCards(e.detail);
    // Aggiorna anche la searchbar se presente
    const searchBar = document.getElementById("search-bar");
    if (searchBar) searchBar.value = e.detail;
  });
});

function renderCards(filter = "") {
  const cardsContainer = document.getElementById("card-row-container");
  cardsContainer.innerHTML = "";

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const search = filter.trim().toLowerCase();

  const filtered = search
    ? allProducts.filter((card) => card.name.toLowerCase().startsWith(search))
    : allProducts;

  filtered.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "card-market-item",
      "col-12",
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "mb-5"
    );
    const cardImageSrc = card.name.toLowerCase().replace(/ /g, "_");
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
    const addToCartBtn = cardElement.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('mouseup', function () {
      // Prendi il carrello attuale o creane uno nuovo
      let user = JSON.parse(localStorage.getItem('user'));
      // Aggiungi sempre la carta (senza controllare se già presente)
      user.cart.push({ ...card, quantity: 1 });
      localStorage.setItem('user', JSON.stringify(user));
      // Feedback semplice
      addToCartBtn.textContent = "Added!";
      setTimeout(() => addToCartBtn.textContent = "Add to cart", 1000);
    });
    cardsContainer.appendChild(cardElement);
  });
}
