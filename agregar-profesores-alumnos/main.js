const form = document.getElementById("form");
const templateStudent = document.getElementById("student-card").content;
const templateTeacher = document.getElementById("teacher-card").content;
const teachersContainer = document.getElementById("teachers");
const studentsContainer = document.getElementById("students");

const students = [];
const teachers = [];

const alert = document.getElementById("alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("hidden");

  const formData = new FormData(form);

  const [name, age, position] = [...formData.values()];

  if (!name.trim() || !age.trim() || !position.trim()) {
    alert.classList.remove("hidden");
    return;
  }

  position === "student"
    ? students.push(
        new Student(name, age, window.crypto.randomUUID(), false)
      ) && Person.paintPersonUI(students, position)
    : teachers.push(new Teacher(name, age)) &&
      Person.paintPersonUI(teachers, position);

  form.reset();
});

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static paintPersonUI(people, type) {
    const fragment = document.createDocumentFragment();

    if (type === "student") {
      studentsContainer.textContent = "";
      people.forEach((person) => fragment.appendChild(person.addStudent()));
      studentsContainer.appendChild(fragment);
    } else {
      teachersContainer.textContent = "";
      people.forEach((person) => fragment.appendChild(person.addTeacher()));
      teachersContainer.appendChild(fragment);
    }
  }
}

class Student extends Person {
  constructor(name, age, id, state) {
    super(name, age);
    this.id = id;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  addStudent() {
    const clone = templateStudent.cloneNode(true);
    clone.querySelector("article").setAttribute("id", this.id);
    clone.querySelector("h5 :first-child").textContent = this.name;

    const stateH5 = clone.querySelector("h5 :last-child");
    stateH5.textContent = this.state ? "Aprobado" : "Reprobado";

    const btnAprobar = clone.querySelector("#btn-aprobar");
    const btnReprobar = clone.querySelector("#btn-reprobar");

    if (this.state) {
      stateH5.classList.remove("bg-red-700");
      stateH5.classList.add("bg-green-700");
      btnAprobar.disabled = true;
      btnReprobar.disabled = false;
    } else {
      stateH5.classList.remove("bg-green-700");
      stateH5.classList.add("bg-red-700");
      btnAprobar.disabled = false;
      btnReprobar.disabled = true;
    }

    btnAprobar.addEventListener("click", () => {
      changeState(this.id, !this.state);
      this.setState(!this.state);
    });

    btnReprobar.addEventListener("click", () => {
      changeState(this.id, !this.state);
      this.setState(!this.state);
    });

    clone.querySelector("p").textContent = this.age;

    return clone;
  }
}

const changeState = (id, state) => {
  const card = studentsContainer.querySelector(`[id="${id}"]`);

  const btnAprobar = card.querySelector("#btn-aprobar");
  const btnReprobar = card.querySelector("#btn-reprobar");

  const h5 = card.querySelector("h5 :last-child");
  h5.textContent = state ? "Aprobado" : "Reprobado";

  if (state) {
    h5.classList.remove("bg-red-700");
    h5.classList.add("bg-green-700");
    btnAprobar.disabled = true;
    btnReprobar.disabled = false;
  } else {
    h5.classList.remove("bg-green-700");
    h5.classList.add("bg-red-700");
    btnAprobar.disabled = false;
    btnReprobar.disabled = true;
  }
};

class Teacher extends Person {
  addTeacher() {
    const clone = templateTeacher.cloneNode(true);
    clone.querySelector("h5").textContent = this.name;
    clone.querySelector("p").textContent = this.age;

    return clone;
  }
}
