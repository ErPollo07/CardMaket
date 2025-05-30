document.addEventListener("DOMContentLoaded", () => {
  // Get the footer division element
  const footerDiv = document.getElementById("footer");

  // Set the inner HTML of the footer (NO <footer> tag inside, only content)
  footerDiv.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col">
          <h5>Who we are</h5>
          <p>A group of friends who like cards.</p>
        </div>
        <div class="col">
          <h5>Links</h5>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="cart.html">Cart</a></li>
          </ul>
        </div>
        <div class="col">
          <h5>Contact us</h5>
          <p>Email: info@cartMarket.com</p>
          <p>Tel: +39 351 551 7627</p>
        </div>
      </div>
      <hr />
      <div class="text-center">
        <p class="mb-0">&copy; 2025 cardmarket.com - All rights reserved.</p>
      </div>
    </div>
  `;
});