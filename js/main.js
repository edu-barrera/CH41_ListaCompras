let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  return true;
} // validar cantidad

const limpiar = function () {
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtNombre.style.border = "";
  txtNumber.style.border = "";
};

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  limpiar();
  if (txtNombre.value.length < 3) {
    alertValidacionesTexto.innerHTML =
      "El <strong> nombre </strong> es muy corto<br/>";
    alertValidaciones.style.display = "block";
    txtNombre.style.border = "solid red medium";
  }

  if (!validarCantidad()) {
    alertValidacionesTexto.innerHTML +=
      "El <strong> numero </strong> es muy corto";
    alertValidaciones.style.display = "block";
    txtNumber.style.border = "solid red medium";
  }
});

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  limpiar();
  txtNombre.value = "";
  txtNumber.value = "";
});
