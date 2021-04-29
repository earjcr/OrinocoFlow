// API import function
makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/camera/;');
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
    const main = document.querySelector('main');
    for (let i in response) {
        // Elements of the card
        const card = document.createElement('Article');
        const img = response[i].imageUrl;
        const newImg = document.createElement('IMG');
        const newA = document.createElement('a');

        // Bootstrap 4 classes and attributes
        card.classList.add('col-12', 'col-sm-6', 'card', 'p-3', 'm-0');
        // id querystring
        newA.setAttribute('href', 'item.html?id=' + response[i]._id);
        newA.textContent = 'View More Details';
        new.Img.classList.add('img');
        newImg.setAttribute('width', '100%');
        newImg.setAttribute('src', img);

        // Descriptions
        card.innerHTML += '<h2>' + response[i].name + '</h2>';
        card.innerHTML += '<p>' + response[i].description + '</p>';
        card.innerHTML += '<p>' + '$' + response[i].price / 100 + '</p>';

        // Add new card elements
        card.appendChild(newImg);
        card.appendChild(newA);
        main.appendChild(card);
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
        document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '<h2>';
    }
}

init();






// Get DOM elements
//const generateButton = document.getElementById('generate-button');
//const postTitle = document.getElementById('post-title');
//const postId = document.getElementById('post-id');
//const postContent = document.getElementById('post-content');
