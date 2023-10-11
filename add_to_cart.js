// Display the items in the cart

function getCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    return [];
  }
  return JSON.parse(cartItems);
}
async function fetchProductDetail(productId) {
  try {
    const data = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const response = await data.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}
async function displayCartItems() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.querySelector(".cart-items");

  if (cartItems.length === 0) {
    cartItemsContainer.textContent = "Your cart is empty";
    return;
  }

  const cartItemMap = new Map(); // Use a Map to keep track of cart item quantity
  for (let i = 0; i < cartItems.length; i++) {
    const productId = cartItems[i];
    const product = await fetchProductDetail(productId);

    if (cartItemMap.has(productId)) {
      // If item already added to the cart, increment the quantity
      const quantity = cartItemMap.get(productId) + 1;
      cartItemMap.set(productId, quantity);

      const cartItem = document.querySelector(
        `.cart-item[data-product-id="${productId}"]`
      );
      if (cartItem) {
        cartItem.querySelector(".quantity").textContent = `${quantity} x `;
      }
    } else {
      // If item not yet added, create new cart item HTML element
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.setAttribute("data-product-id", productId);

      const cart_detail = document.createElement("div");
      cart_detail.classList.add("cart-det");
      cart_detail.setAttribute("data-product-id", productId);

      const image = document.createElement("img");
      image.setAttribute("src", product.image);
      image.setAttribute("alt", product.category);
      image.style.width = "120px";
      image.style.height = "120px";
      cartItem.appendChild(image);

      const title = document.createElement("h3");
      title.textContent = product.title;
      cart_detail.appendChild(title);

      const quantity = document.createElement("span");
      quantity.classList.add("quantity");
      quantity.textContent = "1 x ";
      cart_detail.appendChild(quantity);

      const price = document.createElement("h4");
      price.textContent = `$${product.price}`;
      cart_detail.appendChild(price);

      cartItem.appendChild(cart_detail);

      const button = document.createElement("button");
      button.innerHTML = "+";
      cartItem.appendChild(button);

      button.addEventListener("click", function (event) {
        event.preventDefault();
        addItemToCart(product.id);
        alert("Item added to cart!");
        window.open("add_to_cart.html");
      });

      const removeButton = document.createElement("button");
      removeButton.textContent = "-";
      cartItem.appendChild(removeButton);
      removeButton.addEventListener("click", function (event) {
        removeCartItem(productId);
       
        window.open("add_to_cart.html");
      });

      cartItemsContainer.appendChild(cartItem);
      cartItemMap.set(productId, 1);
    }
  }
  getTotalPayment();
}


displayCartItems();

function addItemToCart(productId) {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) cartItems = [];
  else cartItems = JSON.parse(cartItems);

  cartItems.push(productId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  console.log(cartItems);
}




function removeCartItem(productId) {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) return;

  cartItems = JSON.parse(cartItems);
  const index = cartItems.indexOf(productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}





function getTotalPayment() {
    const cartItems = document.querySelectorAll('.cart-item');
  
    let totalPayment = 0;
  
    cartItems.forEach((cartItem) => {
      const quantity = parseInt(cartItem.querySelector('.quantity').textContent.split(' ')[0]);
      const price = parseFloat(cartItem.querySelector('h4').textContent.replace('$', ''));
      totalPayment += quantity * price;
    });
  const total=document.querySelector('.payment')
  total.innerHTML='Total Amount is: $ '+totalPayment;

     

}