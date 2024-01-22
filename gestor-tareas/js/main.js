const btnGuardar = document.getElementById("btn-guardar");
const contenedorTareas = document.getElementById("tareas");
const input = document.querySelector("input");

const crearBoton = (texto, clases) => {
  const btn = document.createElement("button");
  btn.classList.add(...clases);
  btn.innerText = texto;
  return btn;
};

const editar = (e) => {
  e.target.classList.add("hidden");
  e.target.nextSibling.classList.remove("hidden");
  e.target.previousSibling.disabled = false;
};

const borrar = (id) => {
  Array.from(contenedorTareas.children).forEach((tarea) => {
    if (tarea.id === id) contenedorTareas.removeChild(tarea);
  });

  const tareas = localStorage.getItem("tareas");
  const tareasJson = JSON.parse(tareas);

  const tareasStorage = JSON.stringify(
    tareasJson.filter((tarea) => tarea.id !== id)
  );

  localStorage.setItem("tareas", tareasStorage);
};

const actualizar = (e, id) => {
  const input = e.target.parentNode.firstChild;
  input.disabled = true;
  const nuevaTarea = input.value;
  e.target.classList.add("hidden");
  e.target.previousSibling.classList.remove("hidden");

  const tareas = localStorage.getItem("tareas");
  const tareasJson = JSON.parse(tareas);

  const tareasStorage = JSON.stringify(
    tareasJson.map((e) => {
      if (e.id === id) return { id: e.id, tarea: nuevaTarea };
      else return e;
    })
  );

  localStorage.setItem("tareas", tareasStorage);
};

const construirTarea = (id, tarea) => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("flex", "mb-2");
  contenedor.id = id;

  const input = document.createElement("input");
  input.classList.add(
    "px-2",
    "rounded-sm",
    "border",
    "text-sm",
    "w-3/4",
    "outline-none"
  );
  input.disabled = true;
  input.value = tarea;

  const btnEditar = crearBoton("Editar", [
    "bg-green-400",
    "text-white",
    "text-sm",
    "font-bold",
    "px-4",
    "py-2",
    "rounded-sm",
    "mx-3",
    "hover:bg-green-600",
    "transition",
    "ease-in",
    "duration-150",
  ]);
  btnEditar.addEventListener("click", (e) => editar(e, id));

  const btnBorrar = crearBoton("Borrar", [
    "bg-red-400",
    "text-white",
    "text-sm",
    "font-bold",
    "px-4",
    "py-2",
    "rounded-sm",
    "hover:bg-red-600",
    "transition",
    "ease-in",
    "duration-150",
  ]);
  btnBorrar.addEventListener("click", () => borrar(id));

  const btnActualizar = crearBoton("Actualizar", [
    "bg-blue-400",
    "text-white",
    "text-sm",
    "font-bold",
    "px-4",
    "py-2",
    "rounded-sm",
    "mx-3",
    "hover:bg-blue-600",
    "transition",
    "ease-in",
    "duration-150",
    "hidden",
  ]);
  btnActualizar.addEventListener("click", (e) => actualizar(e, id));

  contenedor.appendChild(input);
  contenedor.appendChild(btnEditar);
  contenedor.appendChild(btnActualizar);
  contenedor.appendChild(btnBorrar);

  return contenedor;
};

const guardarLocaltorage = (id, tarea) => {
  const tareas = localStorage.getItem("tareas");
  const tareasJson = JSON.parse(tareas) || [];

  tareasJson.push({ id, tarea });

  const tareasStorage = JSON.stringify(tareasJson);

  localStorage.setItem("tareas", tareasStorage);
};

const cargarTareas = () => {
  const tareas = localStorage.getItem("tareas");
  const tareasJson = JSON.parse(tareas) || [];

  tareasJson.forEach((e) => {
    const tarea = construirTarea(e.id, e.tarea);

    contenedorTareas.appendChild(tarea);
  });
};

cargarTareas();

btnGuardar.addEventListener("click", () => {
  const contenido = input.value;
  input.value = "";
  const id = window.crypto.randomUUID();

  const tarea = construirTarea(id, contenido);

  contenedorTareas.appendChild(tarea);

  guardarLocaltorage(id, contenido);
});
