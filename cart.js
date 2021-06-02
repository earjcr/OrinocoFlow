// THE CHOICE OF BEAR AND COLOR IS IN sessionStorage

// Reset the indicator
sessionStorage.setItem('colorChosen', false);

// Create sessionStorage variable named 'cart', if doesn't exist, and append newly chosen bear
createCart = () => {
  // Import the product data of the newly chosen bear
  const choiceId          = sessionStorage.getItem('choiceId');
  const choiceName        = sessionStorage.getItem('choiceName');
  const choiceColor       = sessionStorage.getItem('choiceColor');
  const choicePrice       = sessionStorage.getItem('choicePrice');

  // If cart exists, assign variable. If not, create it
  let cart = sessionStorage.getItem('cart');
  if (!sessionStorage['cart']) {
     cart = []
  } else {
     cart = JSON.parse(cart);     
  };

  // Append the newly chosen bear data to the cart
  let choice = {
    id:    choiceId,
    name:  choiceName,
    color: choiceColor,
    price: choicePrice,
  };
  cart.push(choice);
  sessionStorage.setItem('cart', JSON.stringify(cart));
};

createCart ();

// Initialize variables
let orderId;
const valuesChecked = 0

displayCart = () => {
  // First Card Elements: showing the Cart Contents
  let cart = JSON.parse(sessionStorage.getItem('cart'));

  // Assign parent ul columns for Name, Price, and Remove
  const addName   = document.getElementById('addName');
  const addPrice  = document.getElementById('addPrice');
  const addRemove = document.getElementById('addRemove');

  // Remove all children from ul's
  while (addName.hasChildNodes()) {  
    addName.removeChild(addName.firstChild);
    addPrice.removeChild(addPrice.firstChild);
    addRemove.removeChild(addRemove.firstChild);
  }
  // Build up the Cart Contents, starting with the column header
  let newName = document.createElement('li');
      newName.textContent = 'Bear'
      newName.classList.add('list-inline-item');
      addName.appendChild(newName);
  let newPrice = document.createElement('li');
      newPrice.textContent = 'Price'
      newPrice.classList.add('list-inline-item');
      newPrice.appendChild(newPrice);
  let newRemove = document.createElement('li');
      newRemove.textContent = 'Remove'
      newRemove.classList.add('list-inline-item');
      addRemove.appendChild(newRemove);

  // Create 'Remove' button that will be replicated
  let btnRemove = document.createElement('button');
      btnRemove.textContent = 'X';
      btnRemove.classList.add('btn btn-danger list-inline'); 

  let totalPrice = 0;
  let splice = null

  // Loop through to add each bear info to Cart Contents
  for (let j = 0; j < cart.length; j++) {
      let remove = btnRemove;
      remove.addEventListener('click', () => {
        spliceNumber = j;
        continue;
      });
      remove.setAttribute('type', 'button');
      addRemove.appendChild(remove);

      newName.textContent = cart.name[j] + ' - ' + cart.color[j];
      addName.appendChild(newName);

      newPrice.textContent = cart.price[j] / 100;
      addPrice.appendChild(newPrice);
      totalPrice = totalPrice + cart.price[j];

    }    
    newName.textContent = 'Total Price';
    addName.appendChild(newName);

    newPrice.textContent = totalPrice / 100;
    addPrice.appendChild(newPrice);
  
    cart.splice(spliceNumber,1)
    sessionStorage.setItem("cart", JSON.stringify(cart));

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
