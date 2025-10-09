// ===== MENU TOGGLE =====
const menuButton = document.querySelector("#menu");
const navElement = document.querySelector(".navigation");

// Hide menu by default on small screens
navElement.classList.add("hide");

// Toggle menu visibility when clicking the Menu button
menuButton.addEventListener("click", () => {
  navElement.classList.toggle("hide");
});

// ===== HANDLE WINDOW RESIZE =====
function handleResize() {
  if (window.innerWidth > 1000) {
    navElement.classList.remove("hide");
  } else {
    navElement.classList.add("hide");
  }
}
handleResize();
window.addEventListener("resize", handleResize);

// ===== IMAGE VIEWER (MODAL) =====
const gallery = document.querySelector(".gallery");
let modal; // will hold our dialog element

gallery.addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img) return; // ignore clicks not on images

  const src = img.getAttribute("src");
  const alt = img.getAttribute("alt");
  const largeSrc = src.split("-")[0] + "-full.jpeg";

  // Create and show dialog
  modal = document.createElement("dialog");
  modal.innerHTML = `
    <img src="${largeSrc}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
  document.body.appendChild(modal);
  modal.showModal();

  // Close button listener
  modal.querySelector(".close-viewer").addEventListener("click", () => {
    modal.close();
  });

  // Close if clicked outside image
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Remove dialog from DOM when closed
  modal.addEventListener("close", () => modal.remove());
});
