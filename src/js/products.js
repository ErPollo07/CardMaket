// Take the search parameter on the url
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

console.log("Hai cercato: ", searchQuery);

localStorage.clear();

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

getProductList()
  .then((pList) => {
    // cycle through the list of products
    pList.forEach((card) => {
      console.log(card);
      const cardElement = document.createElement("div");
      cardElement.classList.add("cardElement");

      const cardName = card.name;
      const cardImageSrc = cardName.replace(" ", "_");

      cardElement.innerHTML = `
        <img class="cardImg" src="../assets/imge/${cardImageSrc}.png">
        <div class="cardDetailsContainer">
          <p class="cardName">${card.name}</p>
          <p class="cardPrice">${card.price}</p>
        </div>`;

      // append the element of the card 
      document.getElementById("cardContainer").appendChild(cardElement);
    });
  })
  // catch any error if they occurs
  .catch((err) => {
    console.error("Errore nella generazione:", err);
  });
