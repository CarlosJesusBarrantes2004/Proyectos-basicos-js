const libroBuscar = document.getElementById("input");
const btnBuscar = document.getElementById("btn-buscar");
const contenedorLibros = document.getElementById("libros");
const fragmento = document.createDocumentFragment();

const crearEtiqueta = (texto) => {
  const etiqueta = document.createElement("span");
  etiqueta.classList.add("text-sm", "font-semibold");
  etiqueta.innerText = texto;
  return etiqueta;
};

const construirLibro = (libro) => {
  const carta = document.createElement("div");
  carta.classList.add(
    "border",
    "rounded-md",
    "bg-white",
    "flex",
    "flex-col",
    "p-2"
  );

  Object.keys(libro).forEach((key) => {
    let etiqueta = crearEtiqueta(libro[key]);
    carta.appendChild(etiqueta);
  });

  return carta;
};

const cargarLibros = () => {
  const peticion = fetch("./data/Libros.json");

  peticion
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((res) => {
      res.forEach((e) => fragmento.appendChild(construirLibro(e)));

      contenedorLibros.appendChild(fragmento);
    })
    .catch((err) => console.log(`Ha ocurrido un error: ${err}`));
};

cargarLibros();

const filtrarLibros = (nombre) => {
  const peticion = fetch("./data/Libros.json");

  while (fragmento.firstChild) {
    fragmento.removeChild(fragmento.firstChild);
  }

  contenedorLibros.innerHTML = "";

  peticion
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({ status: res.status, statusText: res.statusText })
    )
    .then((res) => {
      res.map((libro) => {
        let titulo = libro.titulo.toUpperCase();

        if (titulo.includes(nombre.toUpperCase())) {
          fragmento.appendChild(construirLibro(libro));
        }

        contenedorLibros.appendChild(fragmento);
      });
    })
    .catch((err) => console.log(`Error : ${err}`));
};

libroBuscar.addEventListener("input", function () {
  const nombre = this.value;

  filtrarLibros(nombre);
});
