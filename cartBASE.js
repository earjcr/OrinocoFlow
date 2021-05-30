// Get form elements
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const submitButton = document.getElementById('submit-button');

const url = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';

// Get DOM elements for showing response
const responseMessage = document.getElementById('response-message');
const responseTitle = document.getElementById('response-title');
const responseId = document.getElementById('response-id');
const responseContent = document.getElementById('response-content');

submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  const post = {
    title: titleInput.value,
    content: contentInput.value
  };
  submitFormData(post);
});

// Send inforamtion from user to api
// go to confirmation page
function makeRequest(data) {
  fetch('http://localhost:3000/api/cameras/order', {
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
    location.replace('order-confirmation-page.html');

  }).catch((err) => {
    console.log(err);
  })
};

// function makeRequest(data) {
//   return new Promise((resolve, reject) => {
//     let request = new XMLHttpRequest();
//     request.open('POST', 'http://localhost:3000/api/teddies/order');
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify(data));
//     request.send(data);
//     request.onreadystatechange = () => {
//       if (request.readyState === 4) {
//         if (request.status === 201) {
//           resolve(JSON.parse(request.response));
//           orderId = data.orderId;
//           sessionsStorage.setItem("orderId", orderId);
//           console.log(orderId);
//         } else {
//             reject(JSON.parse(request.response));
//             console.log(request.status);
//         }
        
//       }
//     };
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify(data));
//   });
// }

async function submitFormData(post) {
  try{
    const requestPromise = makeRequest(post);
    const response = await requestPromise;
    responseMessage.textContent = response.message;
    responseTitle.textContent = response.post.title;
    responseId.textContent = response.post.id;
    responseContent.textContent = response.post.content;
  }
  catch(errorResponse) {
    responseMessage.textContent = errorResponse.error;
  }
}