// DOM ELEMENT REFERENCES
let totalCost = document.getElementById('total-cost');
let orderId = document.getElementById('orderId');

// Shows total cost of order and order ID
//totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('choicePrice');
orderId.innerHTML = sessionStorage.getItem('orderId');

// Remove all sessionStorage items
sessionStorage.removeItem('orderId');
sessionStorage.removeItem('choiceId');
sessionStorage.removeItem('choiceName');
sessionStorage.removeItem('choiceColor');
sessionStorage.removeItem('choicePrice');
sessionStorage.removeItem('choice');
sessionStorage.removeItem('colorChosen');



