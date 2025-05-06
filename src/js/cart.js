document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.querySelectorAll('.cart-item');
    const emptyMessage = document.getElementById('empty-cart-message');
    const cartContainer = document.getElementById('cart-items');
  
    if (cartItems.length === 0) {
      emptyMessage.style.display = 'flex';
      cartContainer.style.display = 'none';
    } else {
      emptyMessage.style.display = 'none';
      cartContainer.style.display = 'flex';
    }
  });
  