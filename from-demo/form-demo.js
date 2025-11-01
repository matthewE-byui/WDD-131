// form-demo.js

function togglePaymentDetails(e) {
  const theForm = document.querySelector("#checkoutForm");
  const creditCardContainer = document.getElementById("creditCardNumberContainer");
  const paypalContainer = document.getElementById("paypalUsernameContainer");

  // Hide both
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  // Remove required attributes
  theForm.creditCardNumber.required = false;
  theForm.paypalUsername.required = false;

  // Show and re-enable based on selection
  if (theForm.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    theForm.creditCardNumber.required = true;
  } else if (theForm.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    theForm.paypalUsername.required = true;
  }
}

function validateForm(event) {
  const theForm = event.target;
  const errors = [];
  let isValid = true;

  // Validation 1: Only allow Bob
  if (theForm.fullName.value !== "Bob") {
    isValid = false;
    errors.push("Your name is not Bob");
  }

  // Validation 2: Only allow this credit card number if selected
  if (theForm.paymentMethod.value === "creditCard") {
    if (theForm.creditCardNumber.value !== "1234123412341234") {
      isValid = false;
      errors.push("Invalid Credit Card Number");
    }
  }

  if (!isValid) {
    event.preventDefault();
    showErrors(errors);
    return false;
  }
}

function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  const html = errors.map((error) => `<p>${error}</p>`);
  errorEl.innerHTML = html.join("");
}

// Attach listeners
document.querySelector("#paymentMethod").addEventListener("change", togglePaymentDetails);
document.querySelector("#checkoutForm").addEventListener("submit", validateForm);
