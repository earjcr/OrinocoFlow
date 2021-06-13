// Reset the indicator
let colorChosen = sessionStorage.getItem('colorChosen');
let orderId;
const valuesChecked = 0

createCart = () => {
  // Import the product data of the newly chosen bear
  const choiceId    = sessionStorage.getItem('choiceId');
  const choiceName  = sessionStorage.getItem('choiceName');
  const choiceColor = sessionStorage.getItem('choiceColor');
  const choicePrice = sessionStorage.getItem('choicePrice');

  // If cart doesn't exist, create it. Otherwise, get it
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
  if ('1' === sessionStorage.getItem('colorChosen')) {
    cart.push(choice);
  };
  sessionStorage.setItem('cart', JSON.stringify(cart));
  sessionStorage.setItem('colorChosen', '0');
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
  while (addName.hasChildNodes()) {  
    addName.removeChild(addName.firstChild);
    addPrice.removeChild(addPrice.firstChild);
    addRemove.removeChild(addRemove.firstChild);
  }

  // Initiate the Cart Contents variables
  let newName
  let newPrice
  let newRemove
  let totalPrice = 0;
  let spliceNumber = null
  let cartEntry
  let skipEntry

  // Loop through to add each bear info to Cart Contents
  for (let j = 0; j < cart.length; j++) {
    cartEntry = cart[j];
    skipEntry = false
    // Bear name and color
      newName = document.createElement('li');
      newName.textContent = cartEntry.name + ' - ' + cartEntry.color;
      newName.classList.add('py-1')
      addName.appendChild(newName);
      // Price of bear
      newPrice = document.createElement('li');
      newPrice.textContent = cartEntry.price / 100;
      newPrice.classList.add('py-1')
      addPrice.appendChild(newPrice);
      totalPrice = totalPrice + cartEntry.price * 1;
      // Removal button
      newRemove = document.createElement('li');
      newRemove.classList.add('btn')
      newRemove.classList.add('btn-xs')
      newRemove.classList.add("btn-outline-danger");
      newRemove.classList.add('py-0')
      newRemove.setAttribute('type', 'button')
      newRemove.textContent = 'Remove'
      //newRemove.innerHTML = '<i class="bi bi-trash-fill"></i>';
      newRemove.addEventListener('click', () => {
        cart.splice(j, 1)
        sessionStorage.setItem("cart", JSON.stringify(cart));
          sessionStorage.setItem('colorChosen', '0');

        location.reload();
      });
      addRemove.appendChild(newRemove);
  }    
  // Insert totalPrice into HTML
    totalPrice = totalPrice / 100;
    sum = document.getElementById('totalPrice');
    sum.textContent = totalPrice;
}

displayCart();

createPage = () => { 
// Example starter JavaScript for disabling form submissions if there are invalid fields
  // Form nput fields for purchasor

  let charAlpha = /^[A-Za-z -]{3,32}$/;
  let charNumeric = /^[0-9 -]{3,32}$/;
  let charAlphaNumeric = /^[A-Za-z0-9 -#./&']{7,32}$/;
  let charEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //www.regular-expressions.info/email.html
  
  let validFirstName = validLastName = validEmail = validAddress = validCity = validZip = 0;

  let firstName = document.getElementById('firstName');
  firstName.addEventListener('blur', () => {
    if (charAlpha.test(firstName.value)) {
      validFirstName = 1;
      firstName.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validFirstName = 0;
      firstName.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid First Name'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //setAttribute('disabled');   
    };
  });

  let lastName = document.getElementById('lastName');
  lastName.addEventListener('blur', () => {
    if (charAlpha.test(lastName.value)) {
      validLastName = 1;
      lastName.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validLastName = 0;
      lastName.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid Last Name'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //.setAttribute('disabled');   
    };
  });

  let email = document.getElementById('email');
  email.addEventListener('blur', () => {
    if (charEmail.test(email.value)) {
      validEmail = 1;
      email.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validEmail = 0;
      email.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid Email'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //.setAttribute('disabled');   
    };
  });

  let address = document.getElementById('address');
  address.addEventListener('blur', () => {
    if (charAlphaNumeric.test(address.value)) {
      validAddress = 1;
      address.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validAddress = 0;
      address.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid Address'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //.setAttribute('disabled');   
    };
  });

  let city = document.getElementById('city');
  city.addEventListener('blur', () => {
    if (charAlpha.test(city.value)) {
      validCity = 1;
      city.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validCity = 0;
      city.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid City'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //.setAttribute('disabled');   
    };
  });

  let zip = document.getElementById('zip');
  zip.addEventListener('blur', () => {
    if (charNumeric.test(zip.value)) {
      validZip = 1;
      zip.style.border = 'medium solid green';
      if (validFirstName * validLastName * validEmail * validAddress * validCity * validZip) {
        btnCheckout.classList.remove('btn-warning');
        btnCheckout.classList.add('btn-success');
        btnCheckout.textContent = 'Checkout'
        btnCheckout.removeAttribute('disabled');   
      };
    } else {
      validZip = 0;
      zip.style.border = 'medium solid red';
      btnCheckout.textContent = 'Invalid Zip Code'
      btnCheckout.classList.remove('btn-success');
      btnCheckout.classList.add('btn-primary');
      btnCheckout.disabled = true //.setAttribute('disabled');   
    };
  });

  const btnCheckout = document.getElementById('btnCheckout');
  btnCheckout.addEventListener('click', () => {
    // Assemble the products array
    let cart = JSON.parse(sessionStorage.getItem('cart'));
    let products = [];
    for (let i = 0; i < cart.length; i++) {
      products.push(cart[i].id);
    }
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
  });
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
    orderId = data.orderId;
    sessionStorage.setItem("orderId", orderId);
    console.log(orderId);
    location.replace('confirm.html');
  }).catch((err) => {
    console.log(err);
  })
};
