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

/**
 * Llamado a la API.
 *
 * @param {'get'|'post'|'delete'|'put'} method
 * @param {'/users'|'/users/:id'} endpoint
 * @returns
 */
async function api(method, endpoint) {
  const response = await fetch(`/api${endpoint}`, {
    method,
  });

  const data = await response.json();

  return data;
}

/**
 * Inicio de la APP.
 */
async function initApp() {
  const data = await api('get', '/users');
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
