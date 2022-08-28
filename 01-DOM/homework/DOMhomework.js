// Crear un array vacío llamado 'toDoItems'
// Tu codigo acá:
let toDoItems = [];

// En la página 'index.html' hay un elemento span cuyo texto es 'Aplicación creada por:'.
// Usando querySelector seleccionar dicho span por su id ('createdBy') y luego usando innerHTML
// agregar tu nombre al final del texto actual. Ej: 'Aplicación creada por Franco'
// Tu código acá:
let createdBy = document.querySelector('#createdBy');
createdBy.innerHTML = createdBy.innerHTML + ' Maximiliano Alonso';

// Lo de arriba seria igual a esto:
//document.querySelector('#createdBy').innerHTML = document.querySelector('#createdBy').innerHTML + ' Lucas Beckford'

// Crear una clase denominada 'ToDo' cuyo constructor debe recibir un único parámetro del tipo string
// con el nombre 'description' que será justamente la descripción del ToDo.
// Agregar dos propiedades a la clase:
// 1) 'description' : debe ser igual a la descripción pasada como parámetro al constructor
// 2) 'complete'    : debe setearse en false
// Ayuda: usar 'this' en el constructor

function ToDo(description) {
  // Tu código acá:
  this.description = description;
  this.complete = false;
};


// Agregar un método denominado 'completeToDo' al prototipo de la clase ToDo
// No requiere ningún argumento
// Debe setear el atributo 'complete' del ToDo en true

// Tu código acá:
ToDo.prototype.completeToDo = function () {
  this.complete = true;
};


// Agregar dos parámetros a la función 'buildToDo':
//    1) Un objeto de la clase ToDo
//    2) Index numérico
//
// La función debe realizar lo siguiente:

function buildToDo(todo, index) {
  // Tu código acá:
  //    1) Crear un elemento 'div' y asignárselo a una variable denominada 'toDoShell'
  let toDoShell = document.createElement('div');

  //    2) Asignarle a 'toDoShell' la clase 'toDoShell'
  toDoShell.className = 'toDoShell'; // === toDoShell.setAttribute('class', 'toDoShell'); - classlisadd

  //    3) Crear un elemento 'span' y asignárselo a una variable denominada 'toDoText'
  let toDoText = document.createElement('span');
  // <span></span>

  //    4) Utilizando el objeto toDo pasado como argumento, setear el 'toDoText' innerHTML
  //       asignándole el valor de la propiedad 'description' del objeto ToDo.
  toDoText.innerHTML = todo.description;
  // <span>descripción del todo</span>

  //    5) Asignarle como id del 'toDoText' el valor 'index' recibido como argumento
  toDoText.setAttribute('id', index);
  // <span id=index recibido por parámetro>descripción del todo</span>

  // EVENTLISTENER - Ejercicio completeToDo
  toDoText.addEventListener('click', completeToDo);

  //    6) En función del atributo 'complete' del objeto ToDo recibido como argumento:
  //          - Si es true: asignarle a 'toDoText' la clase 'completeText'
  //          - Si es false: no asignarle ninguna clase
  if (todo.complete === true) {
    toDoText.setAttribute('class', 'completeText'); // === toDoText.className = "completeText";
    // <span id="someIndex" class="completeText">descripción del todo</span>
  };

  //    7) Agregar 'toDoText' como hijo de 'toDoShell'
  toDoShell.appendChild(toDoText); // element.appenchlid() = Agregar hijo

  //    8) Devolver la variable toDoShell
  return (toDoShell);

};


// La función 'buildToDos' debe crear un array de objetos toDo y devolverlo
// Recibirá como parámetro un array de objetos ToDo
// Utilizar el método map usando la función previamente creada ('buildToDo')
// Devolver el nuevo array

function buildToDos(toDos) {
  // Tu código acá:
  return toDos.map(function (el, idx) {
    return buildToDo(el, idx);
  });

  //return (toDos.map(buildToDo));
};


// La función 'displayToDos' se va a encargar de que se vean los toDo's en pantalla

//  5) Al final de este archivo, antes de la línea que dice "NO CAMBIES NADA DE ACÁ PARA ABAJO" escribe una
//     línea para hacer el llamado a esta funcion (displayToDos)
//  6) Abrir o en el caso de ya tenerlo abierto, recargar, la página

function displayToDos() {
  // Tu código acá:
  //  1) Seleccionr el elemento cuyo id es 'toDoContainer' y almacenarlo en una variable denominada 'toDoContainer'
  let toDoContainer = document.getElementById('toDoContainer');

  //  2) Setear el innerHTML de 'toDoContainer' como un string vacio ("")
  toDoContainer.innerHTML = '';

  //  3) Llamar a la función previemante creada 'buildToDos' pasándole como argumento el array toDoItems
  let toDosarray = buildToDos(toDoItems)

  //  4) Iterar sobre el resultado devuelto por la función 'buildToDos' e ir agregndo cada elemento a 'toDoContainer'
  toDosarray.forEach((element) => {
    toDoContainer.appendChild(element);
  });

  //  5) Al final de este archivo, antes de la línea que dice "NO CAMBIES NADA DE ACÁ PARA ABAJO" escribe una
  //  línea para hacer el llamado a esta funcion (displayToDos)

  //  6) Abrir o en el caso de ya tenerlo abierto, recargar, la página




  // ===
  // buildToDos(toDoItems).forEach(function (element) {
  //   toDoContainer.appendChild(element);
  // });

  // bucle for
  // let items = buildToDos(toDoItems);
  // for (let index = 0; index < items.length; index++) {
  //   toDoContainer.appendChild(items[index]);
  // };
};


// La función 'addToDo' agregará un nuevo ToDo al array 'toDoItems'
// [NOTA: Algunas cuestiones a tener en cuenta sobre el elemento 'input' de HTML (Ya que 'toDoInput' es un input)
// Todos los elementos input tienen una propiedad llamada 'value' que nos permite acceder al texto que se encuentre
// actualmente escrito dentro del input]

function addToDo() {
  // Tu código acá:

  //  1) Crear un nuevo ToDo usando la clase ToDo y pasándole el valor del input 'toDoInput' como parámetro
  let toDoInput = document.querySelector('#toDoInput')
  let newToDo = new ToDo(toDoInput.value)
  // newToDo = {
  //   description: "estudiar para el checkpoint",
  //   complete: false
  // }

  //  2) Agregar el objeto ToDo recién creado al array toDoItems
  toDoItems.push(newToDo)

  //  3) Setear el valor del input toDoInput como un string vacio ("") (Esto se realiza para que en la vista se borre lo que se encontraba escrito)
  toDoInput.value = '';

  //  4) Llamar a la función displayToDos para que se actualicen los toDos mostrados en pantalla
  displayToDos();
};

// Agregar un 'Event Listener' para que cada vez que el botón 'AGREGAR' sea clickeado
// se ejecute la función 'addToDo'
// Tu código acá:

//   1) Seleccionar el elemento cuyo id es 'addButton'
let addButton = document.querySelector('#addButton')

//   2) Agregarle un 'click' event listener, pasándole la función 'addToDo' como callback
addButton.addEventListener('click', addToDo)

//document.querySelector('#addButton').addEventListener('click', addToDo);


// La función completeToDo se va a ejecutar cuando queramos completar un todo
// [NOTA: Algunas cuestiones a tener en cuenta
// Todo Event Listener recibe como parámetro el objeto 'event' conteniendo un montón de información que incluye
// el tipo del evento, que elemento fue el que lo llamó, los valores de dicho elemento, etc.
// En este paso vamos a utilizarlo para encontrar el index del item que disparó el evento (Esta parte ya se
// encuentra desarrollada pero está comentada dentro de la función por lo que va a ser necesario que la descomenten)]
//   1) Utilizando el index suministrado, llamar a 'completeToDo' (Recuerden que habíamos creado dcho método en el
//      prototipo de la clase ToDo) sobre el elemento correspondiente del array toDoItems
//   2) Llamar a displayToDos para actualizar los elementos que se van a mostrar en pantalla
//   3) En la función 'buildToDo' agregar un 'click' event listener al elemento 'toDoText', pasándole
//      esta función como callback

function completeToDo(event) {
  // DESCOMENTAR LA SIGUIENTE LINEA
  const index = event.target.id;
  // Tu código acá:
  toDoItems[index].completeToDo();
  displayToDos();
};

// Una vez que llegaste a este punto verificá que todos los tests pasen


// **********************************************EXTRA CREDITOS:********************************************** //

/*    Investigá sobre el tipo 'checkbox' del elemento input y realizar lo siguiente en la función 'buildToDo':
        a) Crer un checkbox en la función 'buildToDo'
        b) Asignarle como id a dicho checkbox el valor del index y quitar el id del index de toDoText
        c) Agregarle al checkbox el 'click' event listener de completeToDo y quitárle el event listener a toDoText
        d) Asignarle la clase 'completeCheckbox' al checkbox
        e) Dentro del bloque 'if' de la función buildToDo, si es true, setear el atributo 'checked' en true en el checkbox
        f) Agregar el checkbox sobre el elemento 'toDoShell'
*/
// ********************************************** ----------- ********************************************** //


// Acá debes insertar la llamada a 'displayToDos'
displayToDos();

// ---------------------------- NO CAMBIES NADA DE ACÁ PARA ABAJO ----------------------------- //
if (typeof module !== 'undefined') {
  module.exports = {
    toDoItems: toDoItems,
    ToDo: ToDo,
    buildToDos: buildToDos,
    buildToDo: buildToDo,
    completeToDo: completeToDo,
    displayToDos: displayToDos,
    addToDo: addToDo
  };
}