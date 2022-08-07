((d) => {
  const $formNombre = d.querySelector("#generar-nombre");

  if ($formNombre) {
    $formNombre.addEventListener("submit", (e) => {
      e.preventDefault();
      //* Leer las Variables
      const $origen = d.getElementById("origen");
      const origenSeleccionado = $origen.value;

      const $genero = d.getElementById("genero");
      const generoSeleccionado = $genero.value;

      const $cantidad = d.getElementById("numero").value;

      console.log(origenSeleccionado);
      console.log(generoSeleccionado);
      console.log($cantidad);

      let url = "";
      url += "http://uinames.com/api/?";

      //* Si hay Origen Agregarlo a la URL
      if (origenSeleccionado !== "") {
        url += `origen=${origenSeleccionado}&`;
      }
      //* Si hay Genero Agregarlo a la URL
      if (generoSeleccionado !== "") {
        url += `gender=${generoSeleccionado}&`;
      }
      //* Si hay Cantidad Agregarlo a la URL
      if ($cantidad !== "") {
        url += `amount=${$cantidad}&`;
      }
      console.log(url);

      // * Iniciar XMLHTTPREQUEST
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
          console.log(JSON.parse(xhr.responseText));
          const nombres = JSON.parse(xhr.responseText);

          let htmlNombres = "<h2>Nombres Generados</h2>";
          htmlNombres += '<ul class = "lista">';
          nombres.forEach((el, index) => {
            htmlNombres += `<li>${el.name}</li>`;
          });
          htmlNombres += "</ul>";
          d.getElementById("resultado").innerHTML = htmlNombres;
        } else {
          let message = xhr.statusText || "Ocurrio Un Error";
          console.log(`Error ${xhr.status}: ${message}`);
        }
      });
      xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
      xhr.send();
    });
  }
})(document);
