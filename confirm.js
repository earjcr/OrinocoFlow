// DOM ELEMENT REFERENCES
let totalCost = document.getElementById('total-cost');
let orderId = document.getElementById('orderId');

// Shows total cost of order and order ID
totalCost.innerHTML = '$' + ' ' + localStorage.getItem('choicePrice') / 100;
orderId.innerHTML = localStorage.getItem('orderId');

// Remove all localStorage items
localStorage.removeItem('orderId');
localStorage.removeItem('choiceId');
localStorage.removeItem('choiceName');
localStorage.removeItem('choiceColor');
localStorage.removeItem('choicePrice');
localStorage.removeItem('choice');
localStorage.removeItem('colorChosen');
localStorage.removeItem('cart');
