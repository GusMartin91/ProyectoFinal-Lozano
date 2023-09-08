/* Funciones para la Maquina Expendedora */
function compra_maquinaExpendedora() {
    let dinero = Number(prompt("¿Cuanto dinero desea ingresar a la Maquina Expendedora?"))
    let producto = prompt("Elija uno de los productos disponibles: Gaseosa, Alfajor, Chicles, Papas Fritas, Galletitas Dulces").toLowerCase()
    alert(maquinaExpendedora(dinero, producto))
}
function condicionalDinero(dinero, producto, valorProducto) {
    if (dinero > valorProducto) {
        let vuelto = dinero - valorProducto
        return "Aqui tienes tu/s " + producto + ", y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
    } else {
        let restanIngresar = valorProducto - dinero
        return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
    }
}
function maquinaExpendedora(dinero, producto) {
    switch (producto) {
        case "gaseosa":
            return condicionalDinero(dinero, producto, 385)
        case "alfajor":
            return condicionalDinero(dinero, producto, 220)
        case "chicles":
            return condicionalDinero(dinero, producto, 185)
        case "papas fritas":
            return condicionalDinero(dinero, producto, 478)
        case "galletitas dulces":
            return condicionalDinero(dinero, producto, 328)
        default:
            return "No ingresaste un producto valido o nos quedamos sin stock, vuelve a intentar"
    }
}
/* FIN - Funciones para la Maquina Expendedora */

/* Funciones para la Lista de Gastos Mensuales */
function descripcion_compra(gasto, costo) {
    return "Gasto: " + gasto + "\tCosto: $" + costo
}

let detalle_gastosMensuales = ""

let total_gastosMensuales = 0

let rta = ""
function gastos_mensuales() {
    do {
        let gasto = prompt("Ingrese el nombre del servicio/gasto que pagó")
        let costo = Number(prompt("Ingrese el costo del servicio/gasto"))

        detalle_gastosMensuales = detalle_gastosMensuales + descripcion_compra(gasto, costo) + "\n"
        total_gastosMensuales = total_gastosMensuales + costo

        alert(detalle_gastosMensuales + "\n" + "Total de la compra: $" + total_gastosMensuales)

        rta = prompt("Presione 'ENTER' para continuar con la carga de Gastos Mensuales\n\nIngrese 'Fin' para finalizar la carga.")

    } while (rta != "Fin")
    alert(detalle_gastosMensuales + "\n" + "Total de la compra: $" + total_gastosMensuales)
}
/* FIN - Funciones para la Lista de Gastos Mensuales */

/* 
------------------------------------------
-- Funciones para la Segunda Preentrega --
------------------------------------------

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
        const totalString = "El total es de: $" + precioTotal + ".-\nY tenes un total de " + paginasTotal + " páginas para leer y disfrutar.\n\nGracias por tu compra. ";

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
        // Mostrar la lista de libros
        alert(controladorL.mostrar());

        let id;
        let libro;

        // Pedir al usuario el ID del libro que desea comprar
        while (true) {
            id = Number(prompt("Ingrese el ID del libro que desea comprar:"));

            // Verificar si el ID es válido
            libro = controladorL.buscarId(id);
            if (libro) {
                break; // Salir del bucle si el ID es válido
            } else {
                alert("ID de libro no válido. Por favor, ingrese un ID válido.");
            }
        }

        // Preguntar al usuario la cantidad del libro que desea
        let cantidadDeseada = Number(prompt("Ingrese la cantidad que desea comprar:"));

        // Agregar la cantidad deseada al libro
        libro.agregarCantidad(cantidadDeseada);

        // Agregar el libro al carrito
        carrito.agregar(libro);

        // Mostrar al usuario el contenido actual del carrito
        alert(carrito.mostrar());

        rta = prompt("¿Desea finalizar la compra? (escriba 'SI' para finalizar)").toLowerCase();
    } while (rta !== "si");


    //mostrar total
    alert(carrito.calcularTotal())
} */

/*
-----------------------------------------
-- Funciones para la Tercer Preentrega --
-----------------------------------------
*/
class Bulon {
    constructor(id, nombre, precio, descripcion, cantidad, material, img, alt) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.material = material;
        this.img = img;
        this.alt = alt;
    }

    aumentarCantidad() {
        this.cantidad++
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad--
        }
    }

    descripcionCarrito() {
        let desc_carrito
        desc_carrito = `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${this.img}" class="img-fluid rounded-start" style="height: 100%;" alt="${this.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body p-1">
                        <h6 class="card-title">${this.nombre}</h6>
                        <p class="card-text mb-0">Cantidad:
                        <button class="btn btn-dark pt-0 pb-0 px-1" id="disminuir-${this.id}"><i class="fa-solid fa-minus"></i></button>
                        <b>${this.cantidad}</b>
                        <button class="btn btn-dark pt-0 pb-0 px-1" id="aumentar-${this.id}"><i class="fa-solid fa-plus"></i></button>
                        </p>`
        if (this.cantidad > 1) {
            desc_carrito += `
            <p class="card-text mb-0">Precio U.: <b>$${this.precio}.-</b>&nbsp&nbsp&nbsp&nbsp&nbspPrecio Total: <b>$${this.precio * this.cantidad}.-</b></p>
                    <button class="btn btn-danger py-0 px-2" id="ep-${this.id}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>`
        } else {
            desc_carrito += `
            <p class="card-text mb-0">Precio U.: <b>$${this.precio}.-</b></p>
                    <button class="btn btn-danger py-0 px-2" id="ep-${this.id}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>
        </div>
    </div>`
        }

        return desc_carrito
    }

    descripcionBulon() {
        return `
        <div class="card border-light" style="width: 15rem;">
            <img src="${this.img}" class="card-img-top" style="max-height: 160px" alt="${this.alt}">
            <div class="card-body py-1 px-2">
                <h6 class="card-title">${this.nombre}</h6>
                <p class="card-text">${this.descripcion}</p>
            </div>
            <div class="d-flex align-items-end justify-content-center">
                <p class="card-text precio d-flex justify-content-center">$${this.precio}.-</p>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-animacion btn-primary" onclick="addAnimation(this)" id="ap-${this.id}">Añadir al Pedido <i class="fa-light fa-cart-shopping"></i></button>
            </div>
        </div>`
    }
}

class BulonController {
    constructor() {
        this.listaBulones = []

        const botonOrdenMenor = document.getElementById("ordenMenor")
        const botonOrdenMayor = document.getElementById("ordenMayor")

        botonOrdenMenor.addEventListener("click", () => {
            this.ordenarPorMenorPrecio()
        });

        botonOrdenMayor.addEventListener("click", () => {
            this.ordenarPorMayorPrecio()
        });

        const materialSelect = document.getElementById("material")
        materialSelect.addEventListener("change", () => {
            this.filtroMaterial()
            this.conteoBulones()
        });

        const restablecerFiltrosBtn = document.getElementById("restablecerFiltros")
        restablecerFiltrosBtn.addEventListener("click", () => {
            this.restablecerFiltros()
            this.conteoBulones()
        });
    }

    conteoBulones() {
        let cantidadBulones = this.listaBulones.length
        const conteoHTML = document.getElementById("conteoHTML")
        conteoHTML.innerHTML = `Cant. de productos: <b class="bCant">(` + cantidadBulones + `)</b>`
    }
    restablecerFiltros() {
        const materialSelect = document.getElementById("material")
        materialSelect.value = "Todos"

        const precioMin = document.getElementById("precioMin")
        const precioMax = document.getElementById("precioMax")

        precioMin.value = ""
        precioMax.value = ""

        this.listaBulones = []
        this.cargarBulones()
        this.mostrarEnDOM()
        this.conteoBulones()
    }

    filtroMaterial() {
        const materialSelect = document.getElementById("material")
        let selectedMaterial = materialSelect.value

        let minPrice = parseFloat(document.getElementById("precioMin").value) || 0
        let maxPrice = parseFloat(document.getElementById("precioMax").value) || Infinity

        this.listaBulones = []
        this.cargarBulones()
        if (selectedMaterial !== "Todos") {
            this.listaBulones = this.listaBulones.filter(bulon => bulon.material === selectedMaterial)
        }

        this.listaBulones = this.listaBulones.filter(bulon => minPrice <= bulon.precio && bulon.precio <= maxPrice)
        this.mostrarEnDOM()
        this.conteoBulones()
    }

    filtroPrecio() {
        const precio_min = document.getElementById("precioMin")
        const precio_max = document.getElementById("precioMax")

        precio_min.addEventListener("change", () => {
            this.filtrarPorPrecio()
            this.filtroMaterial()
            this.mostrarEnDOM()
            this.conteoBulones()
        })

        precio_max.addEventListener("change", () => {
            this.filtrarPorPrecio()
            this.filtroMaterial()
            this.mostrarEnDOM()
            this.conteoBulones()
        })
    }


    filtrarPorPrecio(min = 0, max = Infinity) {
        this.listaBulones = []
        this.cargarBulones()

        this.listaBulones = this.listaBulones.filter(bulon => min <= bulon.precio && bulon.precio <= max)

    }

    ordenarPorMenorPrecio() {
        this.listaBulones.sort((a, b) => a.precio - b.precio)
        this.mostrarEnDOM()
    }
    ordenarPorMayorPrecio() {
        this.listaBulones.sort((a, b) => b.precio - a.precio)
        this.mostrarEnDOM()
    }

    agregar(bulon) {
        if (bulon instanceof Bulon) {
            this.listaBulones.push(bulon)
        }
    }

    cargarBulones() {
        this.agregar(new Bulon(1, "BULON CABEZA HEXAGONAL CALIDAD 4.6 DIN 931", 171, "Hierro dulce. Rosca - Metrico MA (Paso Grueso). DIN 931 con cuello. Terminación Natural / Zincado electrolítico Azul", 1, "Hierro Dulce", "assets/img/1.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(2, "BULON CABEZA HEXAGONAL CALIDAD 4.6 DIN 933", 184, "Hierro dulce. Rosca - Metrico MA (Paso Grueso). DIN 933 con cuello. Terminación Natural / Zincado electrolítico Azul", 1, "Hierro Dulce", "assets/img/2.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(3, "BULON CABEZA HEXAGONAL CALIDAD 8.8 DIN 931", 210, "Acero templado. Rosca - Metrico MA (Paso Grueso). DIN 931 con cuello. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/3.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(4, "BULON CABEZA HEXAGONAL CALIDAD 8.8 ROSCA MB DIN 960", 235, "Acero templado. Rosca - Metrico MB (Paso Fino). DIN 960 con cuello. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/4.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(5, "BULON CABEZA HEXAGONAL CALIDAD 8.8 ROSCA MB DIN 961", 243, "Acero templado. Rosca - Metrico MB (Paso Fino). DIN 961 todo rosca. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/5.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(6, "BULON CABEZA HEXAGONAL CALIDAD 8.8 ROSCA MC DIN 960", 264, "Acero templado. Rosca - Metrico MC (Paso Fino). DIN 960 con cuello. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/6.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(7, "BULON CABEZA HEXAGONAL CALIDAD 8.8 ROSCA MC DIN 961", 269, "Acero templado. Rosca - Métrico MC (Paso Fino). DIN 961 todo rosca. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/7.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(8, "BULON CABEZA HEXAGONAL GRADO 5 ROSCA UNC", 321, "Acero templado. Rosca - Pulgada UNC (Paso Grueso). Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/8.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(9, "BULON CABEZA HEXAGONAL GRADO 5 ROSCA UNF", 326, "Acero templado. Rosca - Pulgada UNF (Paso Fino). Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/9.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(10, "BULON CABEZA HEXAGONAL GRADO 5 ROSCA WTW", 340, "Acero templado. Rosca - Pulgada WTW (Paso Grueso). Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/10.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(11, "BULON CABEZA HEXAGONAL ROSCA MA CALIDAD 8.8 DIN 933", 274, "Acero templado. Rosca - MA (Paso Grueso). DIN 933 Todo Rosca. Terminación Zincado electrolítico Dorado", 1, "Acero Templado", "assets/img/11.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(12, "BULON HEXAGONAL CALIDAD 10.9 DIN 931 ACERO", 217, "Acero templado. Rosca - Metrico MA (Paso Grueso). DIN 931 con cuello. Terminación Pavonado Negro", 1, "Acero Templado", "assets/img/12.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(13, "BULON HEXAGONAL CALIDAD 10.9 DIN 933 ACERO", 299, "Acero templado. Rosca - Metrico (Paso Grueso). Terminación Pavonado Negro", 1, "Acero Templado", "assets/img/13.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(14, "TORNILLO CABEZA HEXAGONAL ROSCA UNC HIERRO", 249, "Hierro dulce. Rosca - Pulgada UNC (Paso Grueso). Terminación Zincado electrolítico Azul/ Natural", 1, "Hierro Dulce", "assets/img/14.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(15, "TORNILLO CABEZA HEXAGONAL ROSCA WTW 1/2-12", 314, "Hierro dulce. Rosca - Pulgada WTW (Paso Grueso). Solo 1/2 - 12 hilos. Terminación Zincado electrolítico Azul/ Natural", 1, "Hierro Dulce", "assets/img/15.png", "bulon tornillo rosca metal acero hierro"))
        this.agregar(new Bulon(16, "TORNILLO CABEZA HEXAGONAL ROSCA WTW 1/2-18", 365, "Hierro dulce. Rosca - Pulgada WTW (Paso Fino). Solo 1/2 - 18 hilos. Terminación Zincado electrolítico Azul/ Natural", 1, "Hierro Dulce", "assets/img/16.png", "bulon tornillo rosca metal acero hierro"))
    }

    mostrarEnDOM() {
        let contenedor_bulones = document.getElementById("contenedor_bulones")

        contenedor_bulones.innerHTML = ""

        this.listaBulones.forEach(bulon => {
            contenedor_bulones.innerHTML += bulon.descripcionBulon()
        })

        this.listaBulones.forEach(bulon => {
            const btn_ap = document.getElementById(`ap-${bulon.id}`)

            btn_ap.addEventListener("click", () => {
                carrito.agregar(bulon)
                carrito.guardarEnStorage()
                carrito.mostrarEnDOM()
            })
        })
        this.conteoBulones()
    }
}

class Carrito {
    constructor() {
        this.listaCarrito = []
    }

    agregar(bulonAgregar) {

        let existe = this.listaCarrito.some(bulon => bulon.id == bulonAgregar.id)

        if (existe) {
            let bulon = this.listaCarrito.find(bulon => bulon.id == bulonAgregar.id)
            bulon.aumentarCantidad()
            this.guardarEnStorage()
            this.mostrarEnDOM()
            this.mostrarTotal()
        } else {
            if (bulonAgregar instanceof Bulon) {
                this.listaCarrito.push(bulonAgregar)
                this.mostrarTotal()
            }
        }
    }

    eliminar(bulonAEliminar) {
        let indice = this.listaCarrito.findIndex(bulon => bulon.id == bulonAEliminar.id)
        this.listaCarrito.splice(indice, 1)
        this.guardarEnStorage()
        this.mostrarEnDOM()
        this.mostrarTotal()
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    obtenerStorage() {
        let listaCarritoJSON = localStorage.getItem("listaCarrito")
        if (listaCarritoJSON !== null) {
            let listaCarritoJS = JSON.parse(listaCarritoJSON)
            let listaAux = []
            listaCarritoJS.forEach(bulon => {
                let nuevoBulon = new Bulon(bulon.id, bulon.nombre, bulon.precio, bulon.descripcion, bulon.cantidad, bulon.material, bulon.img, bulon.alt)
                listaAux.push(nuevoBulon)
            })
            this.listaCarrito = listaAux
        }
    }

    eliminarStorage() {
        localStorage.removeItem("listaCarrito")
    }

    mostrarEnDOM() {
        let cantCarrito = 0
        this.listaCarrito.forEach(bulon => {
            cantCarrito = cantCarrito + bulon.cantidad
        });

        let contenedor_carrito = document.getElementById("contenedor_carrito")
        let tituloCarrito = document.getElementById("modalLabel")
        tituloCarrito.innerHTML = "Llevas " + cantCarrito + " productos agregados."
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(bulon => {
            contenedor_carrito.innerHTML += bulon.descripcionCarrito();
        })

        this.listaCarrito.forEach(bulon => {
            const btn_aumentar = document.getElementById(`aumentar-${bulon.id}`)

            btn_aumentar.addEventListener("click", () => {
                this.agregar(bulon)
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        this.listaCarrito.forEach(bulon => {
            const btn_disminuir = document.getElementById(`disminuir-${bulon.id}`)

            btn_disminuir.addEventListener("click", () => {
                bulon.disminuirCantidad()
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        this.listaCarrito.forEach(bulon => {
            const btn_ep = document.getElementById(`ep-${bulon.id}`)

            btn_ep.addEventListener("click", () => {
                this.eliminar(bulon)
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        let vaciarCarrito = document.getElementById("vaciarCarrito")
        vaciarCarrito.addEventListener("click", () => {
            this.eliminarStorage()
            location.reload()
        })
    }

    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, bulon) => acumulador + bulon.precio * bulon.cantidad, 0)
    }
    mostrarTotal() {
        const precio_total = document.getElementById("precio_total")
        const btn_precio_total = document.getElementById("btn_precio_total")
        precio_total.innerText = `Precio Total: $${this.calcularTotal()}`
        btn_precio_total.innerHTML = `<i class="fa-light fa-cart-shopping"></i>&nbsp;&nbsp;Tu Pedido&nbsp;&nbsp;&nbsp;<b>$${this.calcularTotal()}</b>`
    }
}

const CP = new BulonController()
const carrito = new Carrito()


carrito.obtenerStorage()
carrito.mostrarEnDOM()
carrito.mostrarTotal()

CP.cargarBulones()
CP.mostrarEnDOM()
CP.filtroPrecio()

const restablecerFiltros = document.getElementById("restablecerFiltros")
const rotarFlechas = document.getElementById("rotarFlechas")

restablecerFiltros.addEventListener("mouseover", function () {
    rotarFlechas.setAttribute('class', 'fa-regular fa-arrows-rotate fa-spin')
})
restablecerFiltros.addEventListener("mouseout", function () {
    rotarFlechas.setAttribute('class', 'fa-regular fa-arrows-rotate')
})

function addAnimation(button) {
    button.classList.add('animacion')
    button.innerHTML = 'Añadir al Pedido &nbsp;&nbsp;<i class="fa-light fa-cart-shopping-fast"></i>'
    setTimeout(() => {
        button.classList.remove('animacion')
        button.innerHTML = 'Añadir al Pedido <i class="fa-light fa-cart-shopping"></i>'
    }, 1000)
}
let irAlPago = document.getElementById("pagar");
irAlPago.addEventListener("click", () => {
    if (localStorage.length != 0) {
        localStorage.removeItem("listaCarrito")
        Swal.fire({
            title: 'Gracias por su compra!',
            text: 'Vuelva pronto!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    } else {
        Swal.fire({
            title: 'Añade productos al carrito!!',
            text: 'Todavia no has añadido productos!',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
});