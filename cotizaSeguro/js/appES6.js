//* Cotizador Constructor
class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }
  cotizarSeguro() {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
    const base = 2000;
    let cantidad;
    switch (this.marca) {
      case "1":
        cantidad = base * 1.15;
        break;
      case "2":
        cantidad = base * 1.05;
        break;
      case "3":
        cantidad = base * 1.35;
        break;
    }
    //* Leer el Año
    const diferencia = new Date().getFullYear() - this.anio;
    //* Cada año de Diferencia Reducir 3% el valor del seguro
    cantidad -= (diferencia * 3 * cantidad) / 100;
    /* 
        Si el seguro es basico se multiplica por 30% mas
        Si el seguro es completo 50% mas
    */
    if (this.tipo === "basico") {
      cantidad *= 1.3;
    } else {
      cantidad *= 1.5;
    }
    return cantidad;
  }
}

//* Todo lo que Se Muestra
class Interfaz {
  mostrarError(mensaje, tipo) {
    const div = document.createElement("DIV");
    if (tipo === "error") {
      div.classList.add("mensaje", "error");
    } else {
      div.classList.add("mensaje", "correcto");
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(() => {
      document.querySelector(".mensaje").remove();
    }, 4000);
  }
  //* Imprime el resultado de la cotización
  mostrarResultado(seguro, total) {
    const resultado = document.getElementById("resultado");
    let marca;
    switch (seguro.marca) {
      case "1":
        marca = "Americano";
        break;
      case "2":
        marca = "Asiatico";
        break;
      case "3":
        marca = "Europeo";
        break;
    }
    //* Crear la ventana
    const div = document.createElement("DIV");
    div.innerHTML = `
        <p class="header">
        Tu Resumen:
        </p>
        <p>
        Marca: ${marca}
        </p>
        <p>
        Año: ${seguro.anio}
        </p>
        <p>
        Tipo: ${seguro.tipo}
        </p>
        <p>
        Total: ${total}
        </p>
    `;
    const spinner = document.querySelector("#cargando img");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      resultado.appendChild(div);
    }, 3000);
  }
}

const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  console.log(marcaSeleccionada, anioSeleccionado, tipo);
  //* Crear Instancia de Interfaz
  const interfaz = new Interfaz();

  //* Revisamos que los campos no etsan vacios
  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    console.log("Faltan Fatos");
    interfaz.mostrarError("Faltan Datos, Revisa el Formulario", "Error");
  } else {
    interfaz.mostrarError("Cotizando...", "exito");
    //* Limpiar Resultados Anteriores
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
      resultados.remove();
    }
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    console.log(seguro);
    const cantidad = seguro.cotizarSeguro();
    //* Mostrar el resultado
    interfaz.mostrarResultado(seguro, cantidad);
  }
});
const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById("anio");
for (let i = max; i > min; i--) {
  let option = document.createElement("OPTION");
  option.value = i;
  option.innerHTML = i;

  selectAnios.appendChild(option);
}
