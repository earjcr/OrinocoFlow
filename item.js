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

createCard = (response) => {
    const section = document.querySelector('section');
        // Get saved data from sessionStorage
        let i = sessionStorage.getItem('choice');
        //for (let i in response) {
        
        // Elements of the card
        const card = document.createElement('section');
        const newBtn = document.createElement('a');
        const img = response[i].imageUrl;
        const newImg = document.createElement('IMG');

        // Format the card and its elements
        card.classList.add('col-12', 'col-md-6', 'card', 'p-2', 'mb-1', 'border', 'border-success', 'shadow-0');
        //newBtn.setAttribute('href', 'cart.html');
        newBtn.classList.add('btn')
        newBtn.classList.add('text-center')
        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        // Add name, description, and price to cardn
        newBtn.innerHTML += '<h2>' + response[i].name + '</h2>';
        newBtn.innerHTML += '<p>' + response[i].description + '</p>';
        newBtn.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';

        // Save data to sessionStorage
        //newBtn.addEventListener('click', () => {
        //    sessionStorage.setItem('choice', i);
    
        // Make card clickable and append card elements
        newBtn.appendChild(newImg);
        card.appendChild(newBtn);
        section.appendChild(card);  
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
