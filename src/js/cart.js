document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.querySelectorAll('.cart-item');
  const emptyMessage = document.getElementById('empty-cart-message');
  const cartContainer = document.getElementById('cart-items');

  // Verifica se ci sono item visibili nel carrello
  let visibleItems = 0;
  cartItems.forEach(item => {
    // Verifica se l'elemento è visibile (non display:none o visibilità nascosta)
    const style = window.getComputedStyle(item);
    if (style.display !== 'none' && style.visibility !== 'hidden') {
      visibleItems++;
    }
  });

  if (visibleItems === 0) {
    emptyMessage.style.display = 'flex';
    cartContainer.style.display = 'none';
  } else {
    emptyMessage.style.display = 'none';
    cartContainer.style.display = 'flex';
  }
});
