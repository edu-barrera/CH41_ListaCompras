let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
let totalProductos = document.getElementById("totalProductos");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let precio;
let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;

// Aquí se almacena la información de la tabla
let datos = new Array();

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  if (isNaN(txtNumber.value)) {
    return false;
  } // is NaN
  if (Number(txtNumber.value) <= 0) {
    return false;
  }

  return true;
} // validar cantidad

function getPrecio() {
  return Math.floor(Math.random() * 10000) / 100;
}

const limpiar = function () {
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtNombre.style.border = "";
  txtNumber.style.border = "";
  isValid = true;
};

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  limpiar();
  if (txtNombre.value.length < 3) {
    alertValidacionesTexto.innerHTML =
      "El <strong> nombre </strong> es muy corto<br/>";
    alertValidaciones.style.display = "block";
    txtNombre.style.border = "solid red medium";
    isValid = false;
  }

  if (!validarCantidad()) {
    alertValidacionesTexto.innerHTML +=
      "El <strong> numero </strong> es muy corto";
    alertValidaciones.style.display = "block";
    txtNumber.style.border = "solid red medium";
    isValid = false;
  }

  if (isValid) {
    contador++;
    precio = getPrecio();
    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;

    let elemento = `{"id": ${contador},
      "nombre": "${txtNombre.value}",
      "cantidad": "${txtNumber.value}",
      "precio": ${precio}
    }`;

    datos.push(JSON.parse(elemento));
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    contadorProductos.innerText = contador;
    totalEnProductos += parseFloat(txtNumber.value);
    costoTotal += precio * parseFloat(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    txtNumber.value = "";
    txtNombre.value = "";
    localStorage.setItem("contador", 0);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);

    txtNombre.focus();
  }
});

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  limpiar();
  txtNombre.value = "";
  txtNumber.value = "";
  productosTotal.innerText = "";
  precioTotal.innerText = "";
  cuerpoTabla.innerHTML = "";
  contadorProductos.innerText = "0";
  productosTotal.innerText = "";
  contador = 0;
  totalEnProductos = 0;
  costoTotal = 0;
  localStorage.setItem("contador", contador);
  localStorage.setItem("totalEnProductos", totalEnProductos);
  localStorage.setItem("costoTotal", costoTotal);
  datos = new Array();
  localStorage.removeItem("datos");
  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
}); // Boton para limpiar la info actual

window.addEventListener("load", function (event) {
  event.preventDefault();
  if (this.localStorage.getItem("contador") != null) {
    contador = Number(this.localStorage.getItem("contador"));
  }
  if (this.localStorage.getItem("totalEnProductos") != null) {
    totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
  }
  if (this.localStorage.getItem("costoTotal") != null) {
    costoTotal = Number(this.localStorage.getItem("costoTotal"));
  }
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((r) => {
      let row = `<tr>
    <td>${r.id}</td>
    <td>${r.nombre}</td>
    <td>${r.cantidad}</td>
    <td>${r.precio}</td>
    </tr>`;
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
  }

  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
});
