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
    }

    eventosEnEscucha() {
        document.getElementById("material").addEventListener("change", () => {
            this.filtroMaterial()
        });

        const precioMin = document.getElementById("precioMin")
        precioMin.addEventListener("change", () => {
            let precioMinimo = parseFloat(precioMin.value) || 0
            let precioMaximo = parseFloat(precioMax.value) || Infinity
            this.filtrarPorPrecio(precioMinimo, precioMaximo)
            this.filtroMaterial()
        })

        const precioMax = document.getElementById("precioMax")
        precioMax.addEventListener("change", () => {
            let precioMinimo = parseFloat(precioMin.value) || 0
            let precioMaximo = parseFloat(precioMax.value) || Infinity
            this.filtrarPorPrecio(precioMinimo, precioMaximo)
            this.filtroMaterial()
        })

        document.getElementById("ordenMenor").addEventListener("click", () => {
            this.ordenarPorMenorPrecio()
        });

        document.getElementById("ordenMayor").addEventListener("click", () => {
            this.ordenarPorMayorPrecio()
        });

        document.getElementById("restablecerFiltros").addEventListener("click", () => {
            this.restablecerFiltros()
        });
    }

    filtrarPorPrecio(min = 0, max = Infinity) {
        this.listaBulones = []
        this.cargarBulones()
        this.listaBulones = this.listaBulones.filter(bulon => min <= bulon.precio && bulon.precio <= max)
    }

    filtroMaterial() {
        let selectedMaterial = document.getElementById("material").value
        let precioMinimo = parseFloat(document.getElementById("precioMin").value) || 0
        let precioMaximo = parseFloat(document.getElementById("precioMax").value) || Infinity

        this.listaBulones = []
        this.cargarBulones()
        if (selectedMaterial !== "Todos") {
            this.listaBulones = this.listaBulones.filter(bulon => bulon.material === selectedMaterial)
        }

        this.listaBulones = this.listaBulones.filter(bulon => precioMinimo <= bulon.precio && bulon.precio <= precioMaximo)
        this.mostrarEnDOM()
    }

    ordenarPorMenorPrecio() {
        this.listaBulones.sort((a, b) => a.precio - b.precio)
        this.mostrarEnDOM()
    }

    ordenarPorMayorPrecio() {
        this.listaBulones.sort((a, b) => b.precio - a.precio)
        this.mostrarEnDOM()
    }

    restablecerFiltros() {
        const materialSelect = document.getElementById("material")
        const precioMin = document.getElementById("precioMin")
        const precioMax = document.getElementById("precioMax")
        materialSelect.value = "Todos"
        precioMin.value = ""
        precioMax.value = ""

        this.listaBulones = []
        this.cargarBulones()
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

    conteoBulones() {
        let cantidadBulones = this.listaBulones.length
        const conteoHTML = document.getElementById("conteoHTML")
        conteoHTML.innerHTML = `Cant. de productos: <b class="bCant">(` + cantidadBulones + `)</b>`
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
            cantCarrito += bulon.cantidad
        });

        let contenedor_carrito = document.getElementById("contenedor_carrito")
        document.getElementById("modalLabel").innerHTML = "Llevas " + cantCarrito + " productos agregados."
        contenedor_carrito.innerHTML = ""
        this.listaCarrito.forEach(bulon => {
            contenedor_carrito.innerHTML += bulon.descripcionCarrito();
        })

        this.listaCarrito.forEach(bulon => {
            document.getElementById(`aumentar-${bulon.id}`).addEventListener("click", () => {
                this.agregar(bulon)
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        this.listaCarrito.forEach(bulon => {
            document.getElementById(`disminuir-${bulon.id}`).addEventListener("click", () => {
                bulon.disminuirCantidad()
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        this.listaCarrito.forEach(bulon => {
            document.getElementById(`ep-${bulon.id}`).addEventListener("click", () => {
                this.eliminar(bulon)
                this.guardarEnStorage()
                this.mostrarEnDOM()
                this.mostrarTotal()
            })
        })

        document.getElementById("vaciarCarrito").addEventListener("click", () => {
            this.eliminarStorage()
            location.reload()
        })
    }

    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, bulon) => acumulador + bulon.precio * bulon.cantidad, 0)
    }
    mostrarTotal() {
        document.getElementById("precio_total").innerText = `Precio Total: $${this.calcularTotal()}`
        document.getElementById("btn_precio_total").innerHTML = `<i class="fa-light fa-cart-shopping"></i>&nbsp;&nbsp;Tu Pedido&nbsp;&nbsp;&nbsp;<b>$${this.calcularTotal()}</b>`
    }
}

const CP = new BulonController()
const carrito = new Carrito()


carrito.obtenerStorage()
carrito.mostrarEnDOM()
carrito.mostrarTotal()

CP.cargarBulones()
CP.mostrarEnDOM()
CP.eventosEnEscucha()

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

document.getElementById("pagar").addEventListener("click", () => {
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