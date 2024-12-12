import '../scss/style.scss';
import donuts from './donuts.mjs';  
import './payment.mjs';

const donutHtmlContainer = document.querySelector('#donutContainer');
const cartHtmlContainer = document.querySelector('#cart');
const today = new Date();

const isFriday = today.getDay() === 5; // 5 = Friday
const isMonday = today.getDay() === 1; // 0 Sunday, 1 Monday
const currentHour = today.getHours();

// Multiplier function if friday and monday
function getPriceMultiplier() {
  if ((isFriday && currentHour >= 15) || (isMonday && currentHour < 15)) {
    return 0.90;  // Pass? Then 10% Off
  }
  return 1;  // Not passed? No discount
}
// Print Donuts function
function printDonuts() {
  donutHtmlContainer.innerHTML = '';

  donuts.forEach((donut, index) => {
    const stars = generateStars(donut.rating);
    const selectedImageIndex = donut.selectedImageIndex || 0;

    donutHtmlContainer.innerHTML += `
      <div class="donut-card">
        <div class="donut-img-container">
          <img src="${donut.images[selectedImageIndex].src}" alt="${donut.images[selectedImageIndex].alt}" class="donut-img" id="donut-img-${index}">
          <div class="image-controls">
            <button class="prev-img" data-id="${index}">◀</button>
            <button class="next-img" data-id="${index}">▶</button>
          </div>
        </div>        
        <div class="donut-info">
          <span class="donut-name">${donut.name}</span>
          <span class="donut-price">${donut.price} kr</span>
        </div>
        <div class="donut-rating">
          <span>Rating: ${stars}</span>
        </div>
        <div class="donut-actions">
          <button class="minus" data-id="${index}">-</button>
          <span class="donut-amount">Amount: ${donut.amount}</span>
          <button class="plus" data-id="${index}">+</button>
        </div>
      </div>
    `;
  }); 
  attachCarouselEvents();
  attachAmountEvents();
  printCartDonuts();
}
// Function to change imgs
function attachCarouselEvents() {
  const prevButtons = document.querySelectorAll('.prev-img');
  const nextButtons = document.querySelectorAll('.next-img');
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.id, 10);
      const donut = donuts[index];

      // Change to the previous index (with wrap-around)
      donut.selectedImageIndex = (donut.selectedImageIndex || 0) - 1;
      if (donut.selectedImageIndex < 0) {
        donut.selectedImageIndex = donut.images.length - 1; // Last img
      }
      updateDonutImage(index);
    });
  });

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.id, 10);
      const donut = donuts[index];

      // Cange to the next index (with wrap-around)
      donut.selectedImageIndex = (donut.selectedImageIndex || 0) + 1;
      if (donut.selectedImageIndex >= donut.images.length) {
        donut.selectedImageIndex = 0; // Fist img
      }
      updateDonutImage(index);
    });
  });
}
// Update img without randeing
function updateDonutImage(index) {
  const donut = donuts[index];
  const selectedImageIndex = donut.selectedImageIndex || 0;
  const donutImage = document.getElementById(`donut-img-${index}`);
  donutImage.src = donut.images[selectedImageIndex].src;
  donutImage.alt = donut.images[selectedImageIndex].alt;
}
// Function to generate stars 
function generateStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const fractionalStar = rating - fullStars;
  // Full colored stars
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }  
  // Fractioned color stars
  if (fractionalStar >= 0.25 && fractionalStar < 0.75) {
    stars += '⯪'; // Media estrella
  } else if (fractionalStar >= 0.75) {
    stars += '★';
  }
  // Empty stars
  for (let i = fullStars + (fractionalStar >= 0.25 ? 1 : 0); i < 5; i++) {
    stars += '☆';
  }
  return stars;
}
function attachAmountEvents() {
  const minusBtns = document.querySelectorAll('button.minus');
  const plusBtns = document.querySelectorAll('button.plus');

  minusBtns.forEach((btn) => btn.addEventListener('click', decreaseAmount));
  plusBtns.forEach((btn) => btn.addEventListener('click', increaseAmount));
}
function decreaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  donuts[index].amount = Math.max(0, donuts[index].amount - 1);
  printDonuts();
}
function increaseAmount(e) {
  const index = e.currentTarget.dataset.id;
  donuts[index].amount += 1;
  printDonuts();
}
// Function to print out the donuts
function printCartDonuts() {
  cartHtmlContainer.innerHTML = '';
  let sum = 0;
  let orderedDonutAmount = 0;
  let msg = '';
  let priceIncrease = getPriceMultiplier();
  donuts.forEach((donut) => {
    orderedDonutAmount += donut.amount;
    if (donut.amount > 0) {
      let donutPrice = donut.price;
      if (donut.amount >= 10) {
        donutPrice *= 0.9;   
      }
      const adjustedDonutPrice = donutPrice * priceIncrease;
      sum += donut.amount * adjustedDonutPrice;

      cartHtmlContainer.innerHTML += `
        <article>
          <span>${donut.name}</span> | <span>${donut.amount}</span> | <span>${(donut.amount * adjustedDonutPrice).toFixed(2)} kr</span>
        </article>
      `;
    }
  });
  // Show total & discounts
  if (sum <= 0) return;
  if ((isMonday && currentHour < 15) || (isFriday && currentHour >= 15)) {
    sum *= 0.9;  // 10% discount
    msg += '<p>Måndagsrabatt: 10% på hela beställningen</p>'; //Message to customer.
  }
  const roundedSum = Math.round(sum);
  cartHtmlContainer.innerHTML += `<h1>Total = ${sum.toFixed(2)} kr</h1>`;
  cartHtmlContainer.innerHTML += `<div>${msg}</div>`;
  // Message to customer, if shipping is over 80 kr become free.
  if (roundedSum >= 80) {
    cartHtmlContainer.innerHTML += '<p>Gratis frakt om shipping > 80 kr!</p>';
  }
  // Calculate shipping costs
  if (orderedDonutAmount > 15) {
    cartHtmlContainer.innerHTML += '<h2>Shipping = 0 kr</h2>';
  } else {
    cartHtmlContainer.innerHTML += `<h2>Shipping = ${Math.round(25 + 0.1 * sum)} kr</h2>`;
  }
}
printDonuts();