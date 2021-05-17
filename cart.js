// THIS FILE WAS CREATED FROM THE index.js FILE
// THE CODE WAS ALTERED SLIGHTLY TO MAKE FUTURE EDITS EASIER
// THE CHOICE OF BEAR IS IN sessionStorage

// API import function
makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
        apiRequest.send();
        apiRequest.onreadystatechange = () => {

            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    // Response received AND successful
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    // Unsuccessful
                    reject('Server is down!');
                }
            }
        }
    });
}

sessionStorage.setItem('colorChosen', false);
if (!sessionStorage['cartName']) {
    sessionStorage['cartName', '[]']
}
sessionStorage.getItem('choice');
let currentName        = sessionStorage.getItem('choiceName');
let currentDescription = sessionStorage.getItem('choiceDescription');
let currentPrice       = sessionStorage.getItem('choicePrice');
let currentId          = sessionStorage.getItem('choiceId');

createCard = (response) => {
    const section = document.querySelector('section');
        // Get choice of bear from sessionStorage
        let i = sessionStorage.getItem('choice');
        
        // First Card Elements showing the chosen bear - just the image
        const card = document.createElement('section');
            const newBtn = document.createElement('a');
            const img = response[i].imageUrl;
            const newImg = document.createElement('IMG');

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

init = async () => {
    try {
        // Run makeRequest and wait for a response
        const requestPromise = makeRequest();
        const response = await requestPromise;
        // Display response
        createCard(response);
    }   catch (error) {
        // Failed request
        document.querySelector('section').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
    }
}

init();
