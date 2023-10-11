function clearCart() {
    // const cartItemsContainer = document.getElementById('cart-items-container');
    let cartItems = localStorage.getItem("cartItems");
    while (cartItems.firstChild) {
      cartItems.removeChild(cartItems.firstChild);
    }
  
    localStorage.removeItem('cartItems');
    cartItemMap.clear();
    updateCartInfo();
  }
  clearCart();