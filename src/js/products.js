const cardContainer = document.getElementById("card-row-container");

// Take the search parameter from the url
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

console.log("You searched for: ", searchQuery);

/***
 * Get the product list from src/data/products.json
 * and put it in the localStorage
 */
async function getProductList() {
  let products = localStorage.getItem("products");

  console.log("Products in local storage: ", products);

  // if the products are already in the local storage
  if (products) {
    return JSON.parse(products);
  }

  // fetch the file
  const res = await fetch("../data/products.json");
  console.log(res);

  // transform the promise in a json format
  products = await res.json();
  console.log(products);

  // put the json data as string in the local storage
  localStorage.setItem("products", JSON.stringify(products));

  return products;
}

// Search in the products list
getProductList()
  .then((pList) => {
    // cycle through the list of products
    pList.forEach((card) => {
      /* if (card.name.startWith(searchQuery)) {
        console.log(card);
      } */

      const cardElement = document.createElement("div");
      cardElement.classList.add(
        "card-market-item",
        "col-12",
        "col-lg-3",
        "col-md-4",
        "col-sm-6"
      );
      // resolve the name of the png in assets/images
      const cardImageSrc = card.name.toLowerCase().replace(/ /g, "_");

      console.log(cardImageSrc);

      cardElement.innerHTML = `
          <div class="card">
            <img
              class="card-img-top"
              src="../assets/images/${cardImageSrc}.png"
              alt="${card.name}"
            />
            <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-price">${card.price}$</p>
            </div>
          </div>
        `;

      // append the element of the card
      cardContainer.appendChild(cardElement);
    });
  })
  .catch((err) => {
    // catch any error if it occurs
    console.error("Error generating:", err);
  });
