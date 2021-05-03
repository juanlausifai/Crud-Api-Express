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

// async function api(endpoint, method, body) {

// }

async function initApp() {
  const response = await fetch('/api/users', {
    method: 'GET',
  });

  const data = await response.json();

  data.forEach(({ name, age }) => addRow(name, age));
}

// function initApp() {
//   fetch('/api/users', {
//     method: 'GET',
//   }).then((response) => {
//     response.json().then((data) => {
//       data.forEach(({ name, age }) => addRow(name, age));
//     });
//   });
// }
