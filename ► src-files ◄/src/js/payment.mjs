// Payment section
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const creditCardNumber = document.querySelector('#creditCardNumber');
const creditCardYear = document.querySelector('#creditCardYear');
const creditCardMonth = document.querySelector('#creditCardMonth');
const creditCardCvc = document.querySelector('#creditCardCvc');
const personalId = document.querySelector('#personalId');
const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
const orderBtn = document.querySelector('#orderBtn');
const errorContainer = document.querySelector('#errorContainer');
const confirmationMessageContainer = document.querySelector('#confirmationMessage');

// Card example for customer
let selectedPaymentOption = 'card';  
const personalIdRegEx = /^(\d{10}|\d{12}|\d{6}-\d{4})$/;
const creditCardNumberRegEx = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

// Function to restore values
function restoreDefaultValues() {
  creditCardNumber.value = '5100080000000000';
  creditCardYear.value = 'xx';
  creditCardMonth.value = 'xx';
  creditCardCvc.value = 'xxx';
  personalId.value = '19850505-1234';
  hideError();
}
// Show message error to customer
function showError(message) {
  errorContainer.textContent = message;
  errorContainer.classList.remove('hidden');
  errorContainer.classList.add('visible');
}
// Hide error msg
function hideError() {
  errorContainer.textContent = '';
  errorContainer.classList.remove('visible');
  errorContainer.classList.add('hidden');
}
// Validate input
function activateOrderButton() {
  hideError();
  orderBtn.setAttribute('disabled', '');  
  if (selectedPaymentOption === 'invoice') {
    console.log('Validating ID: ', personalId.value);
    if (!personalIdRegEx.test(personalId.value)) {
      showError('Ogiltigt personnummer.');
      return;
    }
  } else if (selectedPaymentOption === 'card') {    
    console.log('Validating credit card: ', creditCardNumber.value);
    const exampleCardNumber = '5100080000000000';
    if (creditCardNumber.value === exampleCardNumber) {
      showError('Ange ett giltigt kortnummer.');
      return;
    }
    if (!creditCardNumberRegEx.test(creditCardNumber.value)) {
      showError('Ogiltigt kortnummer.');
      return;
    }
    const month = Number(creditCardMonth.value);
    console.log('Month out-of-date', month);
    if (isNaN(month) || month < 1 || month > 12) {
      showError('Ange månader från 01 till 12.');
      return;
    }
    const year = Number(creditCardYear.value);
    const currentYear = Number(String(new Date().getFullYear()).slice(-2));
    if (isNaN(year) || year < currentYear || year > currentYear + 10) {
      showError('Ogiltig år');
      return;
    }
    if (creditCardCvc.value.length !== 3 || isNaN(creditCardCvc.value)) {
      showError('CVC måste ha 3 siffror');
      return;
    }
  }
  // If all above conditions are 'true' then activate button
  orderBtn.removeAttribute('disabled');
}
// Showing the confirmation msg to customer
function showConfirmationMessage() {
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.innerHTML = `<span class="icon">🎉</span> Tack! Vi kommer att behandla din beställning.`;
  console.log('Contenido insertado:', confirmationMessage.innerHTML);   
  confirmationMessage.classList.add('visible');
  setTimeout(() => {
    confirmationMessage.classList.remove('visible');
  }, 5000);            // Msg to customer for 5''.
}
// Alternate one to another payment method
function switchPaymentMethod(e) {
  selectedPaymentOption = e.target.value;
  if (selectedPaymentOption === 'card') {
    cardOption.classList.remove('hidden');
    invoiceOption.classList.add('hidden');
    restoreDefaultValues(); // Restore card values
  } else if (selectedPaymentOption === 'invoice') {
    invoiceOption.classList.remove('hidden');
    cardOption.classList.add('hidden');
    personalId.value = 'YYMMDD-XXXX'; // Restore ID value
  }
  activateOrderButton();
}

document.addEventListener('DOMContentLoaded', () => {
  restoreDefaultValues(); });
cardInvoiceRadios.forEach(radio => {
  radio.addEventListener('change', switchPaymentMethod);
});
[creditCardNumber, creditCardYear, creditCardMonth, creditCardCvc, personalId].forEach(input => {
  input.addEventListener('input', activateOrderButton);
});
orderBtn.addEventListener('click', () => {
  console.log('Clic en el botón Beställ detectado.'); 
  if (!orderBtn.disabled) {  
    console.log('Button activated');
    showConfirmationMessage(); 
    // If customer did click on order button, then show confirmation msg.
  }  
});

let slownessTimeout;
// Showing to cs dates for special discounts!
function stupidCustomerMessage() {
  alert('► 🎉 Du får 10% rabatt! Gäller på fredagar efter kl. 15:00 och måndagar innan kl. 15:00. ☺ ◄');
}
function resetInactivityTimer() {
  clearTimeout(slownessTimeout); 
  slownessTimeout = setTimeout(stupidCustomerMessage, 15 * 60 * 1000    
  ); // Restart msg every 15'
}
function initializeInactivityTracker() {  
  window.addEventListener('mousemove', resetInactivityTimer);
  window.addEventListener('keydown', resetInactivityTimer);
  window.addEventListener('scroll', resetInactivityTimer);
  resetInactivityTimer();
}
initializeInactivityTracker();