// THE CHOICE OF BEAR AND COLOR IS IN sessionStorage

// Reset the indicator
sessionStorage.setItem('colorChosen', false);

// Import the product data of the chosen bear
const choiceName        = sessionStorage.getItem('choiceName');
const choiceColor       = sessionStorage.getItem('choiceColor');
const choicePrice       = sessionStorage.getItem('choicePrice');
const choiceId          = sessionStorage.getItem('choiceId');

// Create the stringify'd new product choice for adding to the cart 
let string = '{'
string = string + '"name":"'   + choiceName  + '",'
string = string + '"color":"'  + choiceColor + '",'
string = string + '"price":"'  + choicePrice + '",'
string = string + '"_id":"'    + choiceId    + '"}'
console.log(string);

// Initialize the valuesChecked variable
const valuesChecked = 0

// Create product array if it does not yet exist, and add the choiceId to the array
// if (!sessionStorage['cartProduct']) {
    sessionStorage.setItem('cartProduct', string);
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
        totalPrice = totalPrice + choicePrice
        addTotal.textContent = totalPrice / 100;

    // Second card gets information for the purchasor
    console.log('cart.js[53]')
    // Get customer info after clicking checkout button
    const btnCheckout = document.getElementById('btnCheckout')
    btnCheckout.addEventListener('click', () => {
        // Get the "final" customer info from the form
        const firstName = document.getElementById('firstName')
        const lastName  = document.getElementById('lastName' )
        const address   = document.getElementById('address'  )
        const address2  = document.getElementById('address2' )
        const city      = document.getElementById('city'     )
        const email     = document.getElementById('email'    )
        // const postal    = document.getElementById('postal'   )
        console.log('cart.js[65]')
        // Create the stringify'd customer info for POSTing to the API 
        let stringPost = '"contact":{'
        console.log(stringPost)
        stringPost = stringPost + '"firstName:"'  + firstName.textContent + '",'
        console.log(stringPost)
        stringPost = stringPost + '"lastName":"'  + lastName.textContent  + '",'
        console.log(stringPost)
        stringPost = stringPost + '"address":"'   + address.textContent   + '",'
        console.log(stringPost)
        stringPost = stringPost + '"city":"'      + city.textContent      + '",'
        console.log(stringPost)
        stringPost = stringPost + '"email":"'     + email.textContent     + '"}'
        console.log(stringPost)
        stringPost = stringPost + '"products":["' + choiceId        + '"]'
        console.log(stringPost)
        sessionStorage.setItem('stringPost', stringPost);
        console.log('cart.js[74]')
        // // * Expects request to contain:
        // let contact = {
        //     firstName: firstName.value,
        //     lastName: lastName.value,
        //     address: address.value,
        //     city: city.value,
        //     email: email.value}
        // let productIds = choiceId;
        // const object = contact
        // object = object, productIds;
        submit();
    })
}
// API export function
makeRequest = (data) => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('POST', 'http://localhost:3000/api/teddies/order');
        apiRequest.setRequestHeader('Content-Type', 'application/json');
        // apiRequest.send(JSON.stringify(data));
        apiRequest.send(data);
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 201) {
                    // Response successful
                    resolve(JSON.parse(apiRequest.response));
                }
                if (apiRequest.status === 400) {
                    // Unsuccessful
                    console.log(apiRequest.status)
                    reject('Error - API Request unsuccessful');
                }
            }
        }
    });
}

// const object = sessionStorage.getItem('stringPost');

editCart();

submit = async () => {
    try {
        // Run makeRequest and wait for a response
        const requestPromise = makeRequest(stringPost);
        const response = await requestPromise;
        // Display response

    }   catch (error) {
        // Failed request
        document.querySelector('form').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
    }
}

// submit();
