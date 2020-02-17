const galleryForm = document.querySelector(".gallery__form");
const searchInput = document.querySelector(".gallery__input");
const searchBtn = document.querySelector(".gallery__button--search");
const gallery = document.querySelector(".gallery");
const galleryContainer = document.querySelector(".gallery__container");
const loadBtn = document.querySelector(".gallery__button--load");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const q = searchInput.value;
  axios({
    method: "get",
    url: `https://images-api.nasa.gov/search?q=${q}`,
    data: {
      per_page: 5
    }
  }).then(res => {
    if (res.data.collection.items.length > 0) {
      while (galleryContainer.firstChild)
        galleryContainer.removeChild(galleryContainer.firstChild);
      searchInput.value = "";

      const eachItem = res.data.collection.items;

      for (let i = 0; i < 15; i++) {
        const imgUrl = eachItem[i].links[0].href;
        const imageEl = document.createElement("img");
        imageEl.src = imgUrl;
        imageEl.classList.add("image");
        galleryContainer.appendChild(imageEl);
      }

      loadBtn.classList.remove("hide");
      loadBtn.classList.add("show");

      // load more
      let counter;
      var start = 0;
      var all = 15;
      loadBtn.addEventListener("click", function () {
        counter++;
        if (counter === 0) {
          start = start;
          all = all;
        } else {
          start = start + 15;
          all = all + 15;
        }

        for (var i = start; i < all; i++) {
          const imgUrl = eachItem[i].links[0].href;
          const imageEl = document.createElement("img");
          imageEl.src = imgUrl;
          imageEl.classList.add("image");
          galleryContainer.appendChild(imageEl);
        }
      });
      // for (const el of eachItem) {
      //   const imageEl = document.createElement("div");
      //   imageEl.innerHTML = `<img class="image" src="${el.links[0].href}">`;
      //   galleryContainer.appendChild(imageEl);
      // }
    } else {
      while (galleryContainer.firstChild)
        galleryContainer.removeChild(galleryContainer.firstChild);
      searchInput.value = "";
      const errorBox = document.createElement("div");
      errorBox.innerHTML = `<p style="color: white">Oops, something went wrong! Probably there is no data like you are looking for...</p>`;
      galleryContainer.appendChild(errorBox);
    }
  });
});