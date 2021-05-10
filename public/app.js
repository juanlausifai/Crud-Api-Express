// Referencia a la tabla de contenido
const contentTable = document.getElementById("contentTable");
// Referencia al template
const templateRow = document.getElementById("contentRow").content;

const inputId = document.getElementById("inputId");
const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const createUserForm = document.getElementById("createUserForm");
const inputSearch = document.getElementById("inputSearch");
const buttonSearch = document.getElementById("buttonSearch");
const buttonAdd = document.getElementById("buttonAdd");
const buttonUpdate = document.getElementById("buttonUpdate");
const buttonEditCancel = document.getElementById("buttonEditCancel");
const titlePanel = document.getElementById("titlePanel");


buttonSearch.addEventListener('click', filterUsers);
buttonEditCancel.addEventListener('click', editCancel);

/**
 * Filtrar usuarios
 */
async function filterUsers() {
  contentTable.innerHTML = "";
  let filterName = inputSearch.value;
  const data = await api("get", `/users?filterName=${filterName}`);
  data.forEach(({ name, age, id ,created_at,updated_at}) => addRow(name, age, id,created_at,updated_at));
}



/**
 * Agregar Row.
 *
 * @param {*} name
 * @param {*} age
 */
function addRow(name, age, id,created_at,updated_at) {
  // Clono el template en una nueva variable
  const row = templateRow.cloneNode(true);

  // Modifico el valor del nodo de texto por el ingesado por el usuario
  row.querySelector(".txtName").innerText = name;
  row.querySelector(".txtAge").innerText = age;
  row.querySelector(".txtCreatedAt").innerText = created_at;
  row.querySelector(".txtUpdatedAt").innerText = updated_at;
  row.querySelector(".btnDelete").onclick = () => deleteUser(id);
  row.querySelector(".btnEdit").onclick = () => editUser(id,name,age);
  row.querySelector(".row").dataset.id = id;

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
async function api(method, endpoint, body = undefined) {
  if (body) {
    body = JSON.stringify(body);
  }

  const response = await fetch(`/api${endpoint}`, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

/**
 * Cargar datos de la tabla.
 */
async function loadTable() {
  contentTable.innerHTML = "";
  let data = await api("get", "/users");
  data = data.sort((a, b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;

    return 0;
})
  data.forEach(({ name, age, id, created_at, updated_at }) => addRow(name, age, id, created_at,updated_at));
}

/**
 * Inicio de la APP.
 */
async function initApp() {
  await loadTable();
}


/**
 * Crear usuario.
 */
async function createUser() {
  const name = inputName.value;
  const age = inputAge.value;

  await api("post", "/users", {
    name,
    age,
  });

  createUserForm.reset();
  loadTable();
}

/**
 * Eliminar un usuario
 *
 */

async function deleteUser(id) {
  await api("delete", `/users/${id}`);

  const userRow = document.querySelector(`[data-id='${id}']`);
  userRow.remove();
}

/**
 * Cuando presiono el boton editar del listado
 */
async function editUser(id,name,age) {

  inputId.value=id;
  inputName.value=name;
  inputAge.value=age;
  buttonUpdate.style.visibility="visible";
  buttonEditCancel.style.visibility="visible";
  buttonAdd.style.display="none";
  titlePanel.innerHTML ="Editar Usuario";
  
}

/**
 * Cuando presiono el boton cancelar del formulario
 */

function editCancel(){
  buttonAdd.style.display="block";
  buttonUpdate.style.visibility="hidden";
  buttonEditCancel.style.visibility="hidden";
  inputId.value="";
  inputName.value="";
  inputAge.value="";
  titlePanel.innerHTML ="Crear Usuario";
}


/**
 * Update de usuario.
 */
 async function updateUser() {
  let name = inputName.value;
  let age = inputAge.value;
  let id= inputId.value;

  await api("put", `/users/${id}`, {
    name,
    age,
  });

  createUserForm.reset();
  loadTable();
  editCancel();
}
