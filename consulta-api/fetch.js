//fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//  .then((res) => res.json())
//  .then((res) => console.log(res))
//  .catch((err) => console.log(err));

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    loadingData(false);

    paintCard(data);
  } catch (err) {
    console.log(err);
  }
};

const loadingData = (state) => {
  const loading = document.getElementById("loading");

  if (state) loading.classList.remove("hidden");
  else loading.classList.add("hidden");
};

const paintCard = (data) => {
  const cards = document.getElementById("cartas");
  const template = document.getElementById("template-carta").content;
  const fragment = document.createDocumentFragment();

  console.log(data.results);

  data.results.forEach((item) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector("span").textContent = item.species;
    clone.querySelector("img").setAttribute("src", item.image);

    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};
