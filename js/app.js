// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners (){
    //cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los cursos del local storges
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];
        carritoHTML();
    })

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteando el arreglo
        limpiarHTML();
    })
}


//Funciones 
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

    
}

    //Elimina cursos del carrito
    function eliminarCurso(e){
        if(e.target.classList.contains('borrar-curso')) {
            const cursoId = e.target.getAttribute('data-id');

            // Eliminar del arreglo de articulos carrito 
            articulosCarrito = articulosCarrito.filter( curso  => curso.id !== cursoId );

            carritoHTML(); //iterar sobre el carrito
            
        }
    }

//Lee el contendio del HTML 
function leerDatosCurso(curso) {
    console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id  );
    if(existe) {
        //Atualizar la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        } );
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    
    carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // agrega el HTMl del carrito al tbody
        contenedorCarrito.appendChild(row);
    });
    //Agregar el carrito de compras al storage
    sincronizarStorage();
}
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Eliminar los cursos del tbody
function limpiarHTML() {
    //forma lenta 
    //  contenedorCarrito.innerHTML = '';

    // mejor forma de limpiar html
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}