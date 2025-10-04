// Select the menu button and the navigation element
const menuButton = document.querySelector("#menu");
const navElement = document.querySelector(".navigation");

// Add a click event listener to the menu button
menuButton.addEventListener('click', () => {
  // When the button is clicked, toggle the 'open' class on the navigation element
  navElement.classList.toggle('open');
});