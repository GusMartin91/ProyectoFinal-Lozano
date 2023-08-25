class Libro {
    constructor(id, nombre, cPaginas, precio) {
        this.id = id
        this.nombre = nombre
        this.cPaginas = cPaginas
        this.precio = precio
        this.cantidad = 0
    }

    agregarCantidad(cantidadDeseada) {
        this.cantidad = this.cantidad + cantidadDeseada
    }

    descripcion() {
        return "ID: " + this.id + "\nNombre: " + this.nombre + "\nCantidad Páginas: " + this.cPaginas + " Precio: $" + this.precio + "\n\n"
    }

    descripcionCarrito() {
        return "ID: " + this.id + "\nNombre: " + this.nombre + "\nCantidad Páginas: " + this.cPaginas + " Precio: $" + this.precio + " Cantidad: " + this.cantidad + "\n\n"
    }
}

class Carrito {
    constructor() {
        this.listaCarrito = []
    }

    agregar(libroNuevo) {
        let existe = this.listaCarrito.some(libro => libro.id == libroNuevo.id)
        if (!existe) {
            this.listaCarrito.push(libroNuevo)
        }
    }

    mostrar() {
        let descripcionListaCompra = "Carrito: \n\n"
        this.listaCarrito.forEach(libro => {
            descripcionListaCompra = descripcionListaCompra + libro.descripcionCarrito()
        })
        return descripcionListaCompra
    }

    calcularTotal() {
        // Inicializamos las variables para el precio total y la cantidad de páginas total.
        let precioTotal = 0;
        let paginasTotal = 0;

        // Iteramos sobre los libros en el carrito.
        this.listaCarrito.forEach(libro => {
            precioTotal += libro.precio * libro.cantidad; // Sumamos el precio del libro multiplicado por la cantidad.
            paginasTotal += libro.cPaginas * libro.cantidad; // Sumamos las páginas del libro multiplicado por la cantidad.
        });

        // Creamos un string que muestra tanto el precio total como las páginas totales.
        const totalString = "El total es de: $" + precioTotal + ".-\nY tenes un total de "+ paginasTotal +" páginas para leer y disfrutar.\n\nGracias por tu compra. ";

        // Devolvemos el string que muestra el total y las páginas.
        return totalString;
    }
}

class LibroController {
    constructor() {
        this.listaLibros = []
    }

    agregar(libro) {
        this.listaLibros.push(libro)
    }

    mostrar() {
        let descripcionListaLibros = "Recuerde el ID del Libro que desea comprar\n\n"
        this.listaLibros.forEach(libro => {
            //descripcionListaLibros = descripcionListaLibros + " id: "+libro.id+ " nombre: "+libro.nombre+ " precio: $"+libro.precio+"\n"
            descripcionListaLibros = descripcionListaLibros + libro.descripcion()
        })
        return descripcionListaLibros
    }

    buscarId(id) {
        return this.listaLibros.find(libro => libro.id == id)
    }
}

//creamos libros
const l1 = new Libro(1, "Don Quijote de la Mancha", 800, 8823.53);
const l2 = new Libro(2, "Cien Años de Soledad", 368, 6617.65);
const l3 = new Libro(3, "El Señor de los Anillos: La Comunidad del Anillo", 576, 10588.24);
const l4 = new Libro(4, "El Gran Gatsby", 192, 5294.12);
const l5 = new Libro(5, "Harry Potter y la Piedra Filosofal", 332, 8382.35);

const carrito = new Carrito()
const controladorL = new LibroController()

controladorL.agregar(l1)
controladorL.agregar(l2)
controladorL.agregar(l3)
controladorL.agregar(l4)
controladorL.agregar(l5)

function comprarLibros() {
    let rta

    do {
        //mostrar la lista de libros
        alert(controladorL.mostrar())
        //pido al usuario el ID del libro que desea comprar
        let id = Number(prompt("Ingrese el ID del libro que desea comprar!"))
        const libro = controladorL.buscarId(id)
        //le pregunto al usuario la cantidad del libro que desea
        let cantidadDeseada = Number(prompt("Ingrese la cantidad que desea comprar!"))
        //libro.cantidad = cantidadDeseada
        libro.agregarCantidad(cantidadDeseada)
        //agregarlo al carrito
        carrito.agregar(libro)
        //mostrar al usuario el libro que posee
        alert(carrito.mostrar())


        rta = prompt("¿Desea finalizar la compra? (escriba 'SI' para finalizar)").toLowerCase()
    } while (rta != "si")

    //mostrar total
    alert(carrito.calcularTotal())
}