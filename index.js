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
    for (let i in response) {
        // Elements of the card
        const card = document.createElement('section');
        const newA = document.createElement('button');
        const img = response[i].imageUrl;
        const newImg = document.createElement('IMG');

        // Format the card and its elements
        card.classList.add('col-12', 'col-md-6', 'col-lg-4', 'card', 'p-2', 'mb-1', 'border', 'border-success', 'shadow-0');
        newA.setAttribute('href', 'item.html?id=' + response[i]._id);
        newA.classList.add('text-center')
        newImg.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        // Add name, description, and price to element "a"
        newA.innerHTML += '<h2>' + response[i].name + '</h2>';
        newA.innerHTML += '<p>' + response[i].description + '</p>';
        newA.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';

        // Make card clickable and append card elements
        newA.appendChild(newImg);
        card.appendChild(newA);
        section.appendChild(card);
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

// Get DOM elements
// const generateButton = document.getElementById('generate-button');
// const postTitle = document.getElementById('post-title');
// const postId = document.getElementById('post-id');
// const postContent = document.getElementById('post-content');
