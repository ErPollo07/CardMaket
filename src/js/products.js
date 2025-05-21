const cardContainer = document.getElementById("cardContainer");

// Take the search parameter on the url
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

console.log("Hai cercato: ", searchQuery);

// clear the localStorage
localStorage.clear();

/***
 * Get the product list from src/data/products.json
 * and put it in the localStorage
 */
async function getProductList() {
  let products = localStorage.getItem("products");

  if (products) {
    return JSON.parse(products);
  }

  // fletch the file
  const res = await fetch("../data/products.json");
  // transform the promise in a json format
  products = await res.json();
  // put the json data as string in the loal storage
  localStorage.setItem("products", JSON.stringify(products));

  return products;
}

// Search in the products list
getProductList()
  .then((pList) => {
    // cycle through the list of products
    pList.forEach((card) => {
      if (card.name.startWith(searchQuery)) {
        console.log(card);
        const cardElement = document.createElement("div");
        cardElement.classList.add("card-market-item ");

        // resolve the name of the png in assets/images
        const cardImageSrc = card.name.replace(" ", "_");

        cardElement.innerHTML = `
        <div class="col-12 col-lg-3 col-md-4 col-sm-6">
          <div class="card d-flex">
            <img
              class="card-img-top"
              src="../assets/images/${cardImageSrc}"
              alt="${cardImageSrc}"
            />
            <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-price">${card.price}</p>
            </div>
          </div>
        </div>
        `;

        // append the element of the card
        cardContainer.appendChild(cardElement);
      }
    });
  })
  .catch((err) => {
    // catch any error if they occurs
    console.error("Errore nella generazione:", err);
  }
);

if (document.getElementsByClassName("card-market-item").length === 0) {
  cardContainer.innerHTML = `
    <div
      id="empty-cart-message"
      class="d-flex align-items-center justify-content-center"
    >
      <h1>:( No item in cart</h1>
    </div>
  `;
}
