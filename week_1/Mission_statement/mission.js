  
  const themeSelector = document.querySelector("#theme");
const body = document.body;
const logo = document.querySelector("#logo");

function changeTheme() {
  if (themeSelector.value === "dark") {
    body.classList.add("dark");
    logo.setAttribute("src", "images/byui-logo_white.png"); //  white logo
  } else {
    body.classList.remove("dark");
    logo.setAttribute("src", "images/byui-logo_blue.webp"); //  blue logo
  }
}

themeSelector.addEventListener("change", changeTheme);