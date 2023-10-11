const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
async function fetchProductDetail(productId) {
    try {
      const data = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const response = await data.json();
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async function displayProductDetail(productId) {
    const product = await fetchProductDetail(productId);
    const productDetailContainer = document.querySelector('.product-detail'); 
    const productDesc = document.querySelector('.prod_detail'); 

    const image = document.createElement('img');
    image.setAttribute('src', product.image);
    image.setAttribute('alt', product.category);
    productDetailContainer.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = product.title;
    productDesc.appendChild(title);
  
    const price = document.createElement('h3');
    price.textContent = `Price: $${product.price}`;
    productDesc.appendChild(price);
  
    const description = document.createElement('p');
    description.textContent = product.description;
    productDesc.appendChild(description); 

  // <a href="add_to_cart.html"> 
  const button = document.createElement('button');
    button.innerHTML = "Add to cart";
    productDesc.appendChild(button);

    button.addEventListener('click', function(event) {
      event.preventDefault();
      addItemToCart(product.id);
      alert('Item added to cart!');
      window.open('add_to_cart.html', '_blank');
    });

    productDetailContainer.appendChild(productDesc);
  }
  
  function addItemToCart(productId) {
    let cartItems = localStorage.getItem('cartItems');
    if (!cartItems) cartItems = [];
    else cartItems = JSON.parse(cartItems);
    
    cartItems.push(productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(cartItems)
  }

  displayProductDetail(productId);