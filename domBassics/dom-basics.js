const newSection = document.createElement("section");

const newH2 = document.createElement("h2");
newH2.innerText = "DOM Basics";
newSection.appendChild(newH2);

const newP = document.createElement("p");
newP.innerText = "This was added through Javascript";
newSection.appendChild(newP);

document.body.appendChild(newSection);
