// Reset the indicator
sessionStorage.setItem('colorChosen', false);
let orderId;
const valuesChecked = 0

createCart = () => {
  // Import the product data of the newly chosen bear
  const choiceId    = sessionStorage.getItem('choiceId');
  const choiceName  = sessionStorage.getItem('choiceName');
  const choiceColor = sessionStorage.getItem('choiceColor');
  const choicePrice = sessionStorage.getItem('choicePrice');

  // If cart exists, assign variable. If not, create it
  let cart = sessionStorage.getItem('cart');
  if (!sessionStorage['cart']) {
     cart = []
  } else {
     cart = JSON.parse(cart);     
  };

  // Append the newly chosen bear data to the cart and store it
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

displayCart = () => {
  // First Card Elements: showing the Cart Contents
  let cart = JSON.parse(sessionStorage.getItem('cart'));

  // Assign parent ul columns for Name, Price, and Remove
  const addName   = document.getElementById('addName');
  const addPrice  = document.getElementById('addPrice');
  const addRemove = document.getElementById('addRemove');

  // Remove all children from ul's
  // while (addName.hasChildNodes()) {  
  //   addName.removeChild(addName.firstChild);
  //   addPrice.removeChild(addPrice.firstChild);
  //   addRemove.removeChild(addRemove.firstChild);
  // }

  // Build up the Cart Contents, starting with the column header
  let newName = document.createElement('li');
      newName.textContent = 'Bear'
      newName.classList.add('list-inline-item');
      addName.appendChild(newName);
  let newPrice = document.createElement('li');
      newPrice.textContent = 'Price'
      newPrice.classList.add('list-inline-item');
      addPrice.appendChild(newPrice);
  let newRemove = document.createElement('li');
      newRemove.textContent = 'Remove'
      newRemove.classList.add('list-inline-item');
      addRemove.appendChild(newRemove);

  // Create 'Remove' button that will be replicated
  let btnRemove = document.createElement('button');
      btnRemove.textContent = 'X';
      btnRemove.classList.add('btn'); 
      btnRemove.classList.add('btn-danger'); 
      btnRemove.classList.add('list-inline');

  let totalPrice = 0;
  let splice = null
  let cartEntry
  // Loop through to add each bear info to Cart Contents
  for (let j = 0; j < cart.length; j++) {
    cartEntry = cart[j];
    // Bear name and color
      newName = document.createElement('li');
      newName.textContent = cartEntry.name + ' - ' + cartEntry.color;
      newName.classList.add('list-inline-item');
      addName.appendChild(newName);
    // Price of bear
      newPrice = document.createElement('li');
      newPrice.textContent = cartEntry.price / 100;
      newPrice.classList.add('list-inline-item');
      addPrice.appendChild(newPrice);
      totalPrice = totalPrice + cartEntry.price * 1;
    // Removal button
      newRemove = document.createElement('li');
      newRemove.textContent = 'X';
      newRemove.classList.add('list-inline-item');
      addRemove.appendChild(newRemove);

    // let remove = btnRemove;
    // remove.addEventListener('click', () => {
    //   spliceNumber = j;
    //   //RESOLVE WHEN CODING REMOVAL: continue;
    // });
    // remove.setAttribute('type', 'button');
    // addRemove.appendChild(remove);
  }    
  // Add last row in Cart Contents
    newName = document.createElement('li');
    newName.textContent = 'Total';
    newName.classList.add('list-inline-item');
    addName.appendChild(newName);
  // Price of bear
    newPrice = document.createElement('li');
    newPrice.textContent = totalPrice / 100;
    newPrice.classList.add('list-inline-item');
    addPrice.appendChild(newPrice);
  // Removal button
    newRemove = document.createElement('li');
    newRemove.textContent = ' ';
    newRemove.classList.add('list-inline-item');
    addRemove.appendChild(newRemove);

  // Add last row in Cart Contents
  // newName.textContent = 'Total Price';
  // addName.appendChild(newName);
  // newPrice.textContent = totalPrice / 100;
  // addPrice.appendChild(newPrice);
  // RESOLVE WHEN CODING REMOVAL cart.splice(spliceNumber,1)
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

displayCart();

createPage = () => { 
// Second Card Elements: form information for the purchasor
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

createPage();

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
