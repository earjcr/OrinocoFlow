// THE CHOICE OF BEAR AND COLOR IS IN sessionStorage

// Reset the indicator
sessionStorage.setItem('colorChosen', false);

// Import the product data of the newly chosen bear
const choiceId          = sessionStorage.getItem('choiceId');
const choiceName        = sessionStorage.getItem('choiceName');
const choiceColor       = sessionStorage.getItem('choiceColor');
const choicePrice       = sessionStorage.getItem('choicePrice');

// Create sessionStorage variable named 'cart', if doesn't exist, and append newly chosen bear
createCart = () => {
  let cart = sessionStorage.getItem('cart');
  if (!sessionStorage['cart']) {
     cart = []
   } else {
     cart = JSON.parse(cart);     
   };
  let choice = {
      name:  choiceName,
      id:    choiceId,
      price: choicePrice,
      color: choiceColor,
  };
  cart.push(choice);
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

createCart ();

// Initialize variables
let orderId;
const valuesChecked = 0
let totalPrice = 0

displayCart = () => {
  // First Card Elements: showing the chosen bear info and cart contents
  

  let cart = JSON.parse(sessionStorage.getItem('cart'));
  for (let j = 0; j < cart.length; j++) {

    // Add product to Cart Contents
    const addName = document.getElementById('addName');
        addName.textContent = choiceName + ' - ' + choiceColor;
    const addPrice = document.getElementById('addPrice');
        addPrice.textContent = choicePrice / 100;

    // Total price will need to move for programming multiple purchase
    const addTotal = document.getElementById('totalPrice');
        totalPrice = totalPrice + choicePrice;
        addTotal.textContent = totalPrice / 100;
  }

    // Second Card Elements: form information for the purchasor
    console.log('cart.js[50]');
    // Get customer info after clicking checkout button
    const btnCheckout = document.getElementById('btnCheckout');
    btnCheckout.addEventListener('click', () => {
        // Assemble the products array
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        let products = [];
        for (let i = 0; i < cart.length; i++) {
          products.push(cart[i].id);
        }
        // Get the "final" customer info from the form
        let firstName = document.getElementById('firstName');
        let lastName  = document.getElementById('lastName');
        let address   = document.getElementById('address');
        let city      = document.getElementById('city');
        let zip       = document.getElementById('zip');
        let email     = document.getElementById('email');
        // Object stores information from form
        let contact = {
          firstName: firstName.value,
          lastName:  lastName.value,
          email:     email.value,
          address:   address.value,
          city:      city.value,
          zip:       zip.value,
        }
        const data = {
          contact: contact,
          products: products
        }
        makeRequest(data);
    })
};

displayCart();

// API export function
function makeRequest(data) {
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {
    //console.log(data);

    orderId = data.orderId;
    sessionStorage.setItem("orderId", orderId);
    console.log(orderId);
    location.replace('confirm.html');

  }).catch((err) => {
    console.log(err);
  })
};
