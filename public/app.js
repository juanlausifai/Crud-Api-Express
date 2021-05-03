// Referencia a la tabla de contenido
const contentTable = document.getElementById('contentTable');
// Referencia al template
const templateRow = document.getElementById('contentRow').content;

/**
 * Agregar Row.
 *
 * @param {*} name
 * @param {*} age
 */
function addRow(name, age) {
  // Clono el template en una nueva variable
  const row = templateRow.cloneNode(true);

  // Modifico el valor del nodo de texto por el ingesado por el usuario
  row.querySelector('.txtName').innerText = name;
  row.querySelector('.txtAge').innerText = age;

  // Inserto en el contenido de la tabla
  contentTable.appendChild(row);
}

function initApp() {
  addRow('Juan', 130);
  addRow('Edu', 134);
}
