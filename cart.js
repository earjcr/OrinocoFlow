// THE CHOICE OF BEAR AND COLOR IS IN sessionStorage

// Reset the indicator
sessionStorage.setItem('colorChosen', false);

// Import the product data of the chosen bear
const choiceName        = sessionStorage.getItem('choiceName');
const choiceColor       = sessionStorage.getItem('choiceColor');
const choicePrice       = sessionStorage.getItem('choicePrice');
const choiceId          = sessionStorage.getItem('choiceId');

// Initialize the valuesChecked variable
const valuesChecked = 0

// Create product array if it does not yet exist, and add the choiceId to the array
// if (!sessionStorage['cartProduct']) {
//    sessionStorage.setItem('cartProduct', string);
// } else {
// NEED TO ADD THE PROGRAMMING FOR MULTIPLE ITEMS
// }

// sessionStorage.setItem('cartProduct', (sessionStorage.getItem('cartProduct')) && choiceId);

// Initialize the total cost
let totalPrice = 0

editCart = () => {
    // First Card Elements showing the chosen bear info and cart contents

    // Add product to Cart Contents
    const addName = document.getElementById('addName');
        addName.textContent = choiceName + ' - ' + choiceColor;
    const addPrice = document.getElementById('addPrice');
        addPrice.textContent = choicePrice / 100;

    // Total price will need to move for programming multiple purchase
    const addTotal = document.getElementById('totalPrice');
        totalPrice = totalPrice + choicePrice;
        addTotal.textContent = totalPrice / 100;

    // Second card gets information for the purchasor
    console.log('cart.js[50]');
    // Get customer info after clicking checkout button
    const btnCheckout = document.getElementById('btnCheckout');
    btnCheckout.addEventListener('click', () => {
        // Get the "final" customer info from the form
        let products = [];

        //get id prod and push it in array
        // let cartArray = JSON.parse(localStorage.getItem('cart'));
        // for (let i = 0; i < cartArray.length; i++) {
        //   products.push(choiceid);
        // }
        products.push(choiceId);
        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let address = document.getElementById('address');
        let city = document.getElementById('city');
        let zip = document.getElementById('zip');
        let email = document.getElementById('email');
        // Object stores informations from form
        let contact = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          address: address.value,
          city: city.value,
          zip: zip.value,
        }
        let data = {
          contact: contact,
          products: products,
        }
        makeRequest(data);

        //submit();
    })
}

editCart();

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
// API export function
// makeRequest = (data) => {
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open('POST', 'http://localhost:3000/api/teddies/order');
//         request.setRequestHeader('Content-Type', 'application/json');
//         request.send(JSON.stringify(data));
//         request.send(data);
//         request.onreadystatechange = () => {
//             if (request.readyState === 4) {
//                 console.log('cart.js[94]')
//                 if (request.status === 201) {
//                     // Response successful
//                     resolve(JSON.parse(request.response));
//                      orderId = data.orderId;
//                     sessionStorage.setItem("orderId", orderId);
//                     console.log(orderId);
//                 }
//                 if (request.status === 400) {
//                     // Unsuccessful
//                     console.log(request.status)
//                     reject('Request unsuccessful');
//                 }
//             }
//         }
//     });
// }

// submit = async () => {
//     try {
//         // Run makeRequest and wait for a response
//         //const stringPost = sessionStorage.getItem('stringPost')
//         const requestPromise = makeRequest(postObject);
//         const response = await requestPromise;
//         console.log(response)
//         // Display response

//     }   catch (error) {
//         // Failed request
//         document.querySelector('form').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
//     }
// }

// submit();
