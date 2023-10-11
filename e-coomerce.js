document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();

      for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        products.innerHTML += `
       <div class="col-sm-3 product">
       <a href="product-details.html?id=${response[i].id}" target=”_blank”>
       <img src="${response[i].image}" alt="${
          response[i].category
        }" class="product-img"></a>
      <div class="product-content"><h2 class="product-title">${
        title.length > 18 ? title.substring(0, 18).concat(" ...") : title
      }</h2>
                                   <h4 class="product-category">${
                                     response[i].category
                                   }</h4>
                                   <p class="product-description">${
                                     description.length > 80
                                       ? description
                                           .substring(0, 80)
                                           .concat(" ...more")
                                       : description
                                   }</p>
                                   <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a href="add_to_cart.html?id=${response[i].id}"           //link to add to cart page
               class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
      }
    } catch (err) {
      console.log(err);
    }
  }
  fetchProducts("https://fakestoreapi.com/products");
});



// var classname = document.getElementsByClassName("add-to-cart");

// var addcart = function() {

//     window.alert("sometext");
// };

// classname.addEventListener('click', addcart(), false);

