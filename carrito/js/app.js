const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
  cursos.addEventListener("click", (e) => {
    e.preventDefault();
    //Agrega al Carrito
    if (e.target.classList.contains("agregar-carrito")) {
      const curso = e.target.parentElement.parentElement;
      leerDatosCursos(curso);
    }
  });

  // Elimina un curso
  carrito.addEventListener("click", (e) => {
    eliminarCurso(e);
  });

  //Vaciar Carrito
  vaciarCarritoBtn.addEventListener("click", (e) => {
    vaciarCarrito(e);
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    leerLocalStorage(e);
  });
}

function leerDatosCursos(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").dataset.id,
  };
  insertarCarrito(infoCurso);
  console.log(infoCurso);
}
// ** Muestra el Curso Seleccionado
function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class ="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}
// **Elimina un Curso del Carrito
function eliminarCurso(e) {
  console.log("eliminado");

  let curso, cursoId;
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector("a").dataset.id;
  }
  eliminarCursoLocalStorage(cursoId);
}

// ** Elimina todos los cursos del Carrito
function vaciarCarrito(e) {
  // **Forma Lenta
  //listaCursos.innerHTML = "";
  // **Forma Rapida Recomendada
  while (listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  // Vaciar Local Sotragr
  vaciarLocalStorage();
  return false;
}

// ** Almacena en el LocalStorage

function guardarCursoLocalStorage(curso) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  // Curso seleecionado se agrega al Arreglo
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}
// **Comprueba que haya elementos en LocalStorage
function obtenerCursosLocalStorage() {
  let cursosLS;
  //Comprobación
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }
  return cursosLS;
}
// **Imprime Cursos de LS en el carrito
function leerLocalStorage(e) {
  let cursosLS;
  const fragment = document.createDocumentFragment();

  cursosLS = obtenerCursosLocalStorage();

  console.log(cursosLS);

  cursosLS.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class ="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    fragment.appendChild(row);
  });
  listaCursos.appendChild(fragment);
}

// ** Elimina Curso en el Local Storage

function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  // Obtenemos el arregelo de Cursos
  cursosLS = obtenerCursosLocalStorage();

  cursosLS.forEach((cursoLS, index) => {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });

  localStorage.setItem("cursos", JSON.stringify(cursosLS));
  console.log(cursosLS);
}

// ** Eliminar todos los cursos de LS

function vaciarLocalStorage() {
  localStorage.clear();
}
