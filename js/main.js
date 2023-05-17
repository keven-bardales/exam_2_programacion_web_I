var form = document.getElementById('form');
var formInputs = form.querySelectorAll('input:not([type="button"])');
var listaVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

document.getElementById('alertLetras').style.display = 'none';
document.getElementById('alertNumeros').style.display = 'none';

console.log(formInputs);

function validarInputTexto(element) {
  const valor = element.trim();
  const alertLetras = document.getElementById('alertLetras');

  // Verificar si solo contiene letras, tiene longitud 3 y comienza con "H" (insensible a mayúsculas y minúsculas)
  if (/^[Hh][a-zA-Z]{2}$/.test(valor)) {
    alertLetras.style.display = 'none';
    return true;
  }

  alertLetras.style.display = 'block';
  return false;
}

function validarInputNumerico(element) {
  const valor = element.trim();

  // Verificar si solo contiene números y tiene longitud 4
  if (/^\d{4}$/.test(valor)) {
    document.getElementById('alertNumeros').style.display = 'none';
    return true;
  }
  document.getElementById('alertNumeros').style.display = 'block';
  return false;
}

function establecerEnfoque() {
  for (var i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value.trim() === '') {
      formInputs[i].focus();
      break;
    }
  }
}

formInputs[0].addEventListener('input', () => {
  validarInputTexto(formInputs[0].value);
});

formInputs[1].addEventListener('input', () => {
  validarInputNumerico(formInputs[1].value);
});

function registrarVehiculo() {
  var letras = formInputs[0].value.trim();
  var numeros = formInputs[1].value.trim();

  var esValidoLetras = validarInputTexto(letras);
  var esValidoNumeros = validarInputNumerico(numeros);

  if (esValidoLetras && esValidoNumeros) {
    letras = letras.toUpperCase();

    var nuevoAuto = {
      id: listaVehiculos.length + 1,
      letras: letras,
      numeros: numeros,
      fecha: new Date().toISOString(),
    };

    listaVehiculos.push(nuevoAuto);

    let cantidadvehiculos = document.getElementById('cantidadvehiculos');
    cantidadvehiculos.textContent = listaVehiculos.length;

    localStorage.setItem('vehiculos', JSON.stringify(listaVehiculos));

    console.log('Autos almacenados:');
    console.log(listaVehiculos);

    form.reset();

    formInputs[0].focus();
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  registrarVehiculo();
});

establecerEnfoque();
var formBuscarClave = document.getElementById('buscarclave');
var inputClave = document.getElementById('clave');
var li_vehiculos = document.getElementById('li_vehiculos');

function mostrarVehiculosRegistrados() {
  var claveIngresada = inputClave.value.trim();
  claveIngresada = claveIngresada.toUpperCase();

  var vehiculosRegistrados =
    JSON.parse(localStorage.getItem('vehiculos')) || [];

  let claveAverificar = '';
  // Verificar si la clave ingresada coincide con la propiedad "letras" de los vehículos registrados
  var vehiculosCoincidentes = vehiculosRegistrados.filter(function (vehiculo) {
    claveAverificar = vehiculo.letras + vehiculo.numeros;
    return claveAverificar === claveIngresada;
  });

  if (vehiculosCoincidentes.length > 0) {
    li_vehiculos.innerHTML = '';

    console.log(
      'Cantidad de vehículos registrados: ' + vehiculosCoincidentes.length
    );

    // Mostrar los datos de los vehículos en la lista
    for (var i = 0; i < vehiculosCoincidentes.length; i++) {
      var vehiculo = vehiculosCoincidentes[i];
      let claveVehiculo = vehiculo.letras + vehiculo.numeros;

      var li = document.createElement('li');
      li.classList = 'list-group-item d-flex justify-content-between lh-sm';

      let div = document.createElement('div');

      let h6 = document.createElement('h6');
      h6.classList = 'my-0';
      h6.textContent =
        vehiculo.id + '. ' + vehiculo.letras + ' ' + vehiculo.numeros;

      div.appendChild(h6);

      let small = document.createElement('small');
      small.classList = 'text-muted';

      // Formatear la fecha al formato español (dd/mm/yyyy)
      var fecha = new Date(vehiculo.fecha);
      var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      var fechaFormateada = fecha.toLocaleDateString('es-ES', options);

      small.textContent = fechaFormateada;

      div.appendChild(small);

      li.appendChild(div);

      li_vehiculos.appendChild(li);
    }
  } else {
    console.log('No se encontraron vehículos con la clave ingresada');
  }

  // Limpiar el campo de la clave
  inputClave.value = '';
}

formBuscarClave.addEventListener('submit', function (event) {
  event.preventDefault();
  mostrarVehiculosRegistrados();
});
