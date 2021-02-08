// variables    
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso ´resionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito 
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones
function agregarCurso(e) {
    //para evitar el salto al inicio ponemos
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    console.log('desde eliminarCurso');
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }
}

//lee el contenido del Html al que demos click y estrae la informacion 
function leerDatosCurso(curso) {
   //console.log(curso);

    // Crear un objeto con el contenido del curso actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si ya existe el elemento 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso; 
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    carritoHTML();
     
}

// Muestra el carrito de compras en el Html

function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src"${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;

        //agrega el html del carrito en el tboy
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}