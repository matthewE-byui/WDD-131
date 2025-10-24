const articleContainer = document.querySelector("#articles");

function displayArticles() {
  articles.forEach((book) => {
    const article = document.createElement("article");
    article.classList.add("book");

    article.innerHTML = `
      <div class="book-details">
        <p><strong>${book.date}</strong></p>
        <p>Ages: ${book.ages}</p>
        <p>Genre: ${book.genre}</p>
        <p>Rating: ${book.stars}</p>
      </div>
      <div class="book-content">
        <h2>${book.title}</h2>
        <img src="${book.imgSrc}" alt="${book.imgAlt}">
        <p>${book.description}</p>
      </div>
    `;

    articleContainer.appendChild(article);
  });
}

displayArticles();
