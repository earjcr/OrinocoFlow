// THIS FILE WAS CREATED FROM THE index.js FILE
// THE CODE WAS ALTERED SLIGHTLY TO MAKE FUTURE EDITS EASIER
// THE CHOICE OF BEAR IS IN sessionStorage

// Reset the indicator
sessionStorage.setItem('colorChosen', false);

// Import the product data
const choiceName        = sessionStorage.getItem('choiceName');
const choiceColor       = sessionStorage.getItem('choiceColor');
const choiceDescription = sessionStorage.getItem('choiceDescription');
const choicePrice       = sessionStorage.getItem('choicePrice');
const choiceId          = sessionStorage.getItem('choiceId');

// // Create product array if it does not yet exist, and add the choiceId to the array
// if (!sessionStorage['cartProduct']) {
//     sessionStorage.setItem('cartProduct', []);
// }
// const cartProduct = sessionStorage.getItem('cartProduct');
//     cartProduct.push(choiceId);

// Initialize the total cost
let priceTotal = 0

editCards = (response) => {
    // First Card Elements showing the chosen bear info and cart contents
        // Add product to Cart Contents
        const addName = document.getElementById('addName');
            addName.textContent = choiceName + ' - ' + choiceColor;
            console.log(choiceName + ' - ' + choiceColor)
        const addPrice = document.getElementById('addPrice');
            priceTotal = priceTotal + choicePrice
            addPrice.textContent = choicePrice / 100;

        // Format the card and its elements
        card.classList.add('card', 'p-2', 'mb-1', 'border', 'border-success', 'shadow-0');
        newBtn.classList.add('btn')
        newBtn.classList.add('text-center')
        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        // Append card elements
        newBtn.appendChild(newImg);
        card.appendChild(newBtn);
        section.appendChild(card); 

    // Second Card Elements asking color choice
        const bearName = document.getElementById('bearName');
            bearName.textContent = currentName;
        const bearDescription = document.getElementById('bearDescription');
            bearDescription.textContent = currentDescription;
        const costItem = document.getElementById('costItem');
            costItem.textContent = 'The price for ' + currentName + ' is $' + currentPrice / 100;
        const addItem = document.getElementById('addItem');
        const btnColors = document.getElementById('btnColors');
        const colors = response[i].colors;

        for (let j in colors) {
            const newColorButton = document.createElement('button');

            const currentColor = colors[j]; 
            // Format the card and its elements
            newColorButton.classList.add('btn');
            newColorButton.classList.add('btn-outline-dark');
            newColorButton.classList.add('btn-sm');
            newColorButton.classList.add('mt-3');
            newColorButton.textContent = currentColor;

            newColorButton.addEventListener('click', () => {
                sessionStorage.setItem('colorChoice', j);
                addItem.textContent = 'Add ' + currentColor + ' ' + currentName + ' bear to the cart?'
                if (sessionStorage.getItem('colorChosen')) {
                    addItem.setAttribute('href', 'cart.html');   
                };
                sessionStorage.setItem('colorChosen', true);
                    let appendage = '{"name":' + currentName + '"colors":' + currentColor + ',"_id":' + currentId + ',"price":' + currentPrice + '}';
                // sessionStorage.setItem('cart', {"colors":["Tan","Chocolate","Black","White"],"_id":"5be9c8541c9d440000665243","name":"Norbert"       ,"price":2900,

            });

            btnColors.appendChild(newColorButton);

        }
}

// init = async () => {
//     try {
//         // Run makeRequest and wait for a response
//         const requestPromise = makeRequest();
//         const response = await requestPromise;
//         // Display response
//         editCards(response);
//     }   catch (error) {
//         // Failed request
//         document.querySelector('section').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
//     }
// }

// // API export function
// makeRequest = (data) => {
//     return new Promise((resolve, reject) => {
//         let apiRequest = new XMLHttpRequest();
//         apiRequest.open('POST', 'http://localhost:3000/api/teddies/order');
//         apiRequest.setRequestHeader('Content-Type', 'application/json');
//         apiRequest.send(JSON.stringify(data));
//         apiRequest.onreadystatechange = () => {
//             if (apiRequest.readyState === 4) {
//                 if (apiRequest.status === 201) {
//                     // Response successful
//                     resolve(JSON.parse(apiRequest.response));
//                 }
//                 if (apiRequest.status === 400) {
//                     // Unsuccessful
//                     reject('Error - API Request unsuccessful');
//                 }
//             }
//         }
//     });
// }

// init();

