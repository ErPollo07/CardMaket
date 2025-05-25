document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.querySelectorAll('.cart-item');
  const emptyMessage = document.getElementById('empty-cart-message');
  const cartContainer = document.getElementById('cart-items');

  let visibleItems = 0;
  cartItems.forEach(item => {
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

  if (typeof jQuery !== 'undefined') {
    const username = "NomeUtente";

    $('.dropdown-content .username-display').text('Ciao, ' + username + '!');

    $('.account-dropdown').on('click', function(event) {
      event.stopPropagation();
      $(this).find('.dropdown-content').toggleClass('show');
    });

    $(document).on('click', function(event) {
      if (!$(event.target).closest('.account-dropdown').length) {
        $('.dropdown-content').removeClass('show');
      }
    });

    $('#logout-link').on('click', function(event) {
      event.preventDefault();
      alert('Effettuato il logout!');
      $('.dropdown-content').removeClass('show');
    });
  } else {
    console.warn("jQuery non è caricato. Le funzionalità del dropdown potrebbero non funzionare.");
  }
});