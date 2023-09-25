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
            this.filtrar()
        });

        document.getElementById("precioMin").addEventListener("change", () => {
            this.filtrar()
        })

        document.getElementById("precioMax").addEventListener("change", () => {
            this.filtrar()
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

        this.cargarBulones()
    }

    filtrar() {
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

    async cargarBulones() {
        try {
            const response = await fetch('bulones.json');
            const data = await response.json();
            this.listaBulones = [];
            data.forEach((bulonData) => {
                const bulon = new Bulon(
                    bulonData.id,
                    bulonData.nombre,
                    bulonData.precio,
                    bulonData.descripcion,
                    bulonData.cantidad,
                    bulonData.material,
                    bulonData.img,
                    bulonData.alt
                )
                this.agregar(bulon)
            })
            this.mostrarEnDOM()
        } catch (error) {
            console.error('Error al cargar los bulones desde el archivo JSON:', error)
        }
    }

    mostrarEnDOM() {
        let contenedor_bulones = document.getElementById("contenedor_bulones");
        contenedor_bulones.innerHTML = "";

        const filtroMaterial = document.getElementById("material").value;
        const precioMinimo = parseFloat(document.getElementById("precioMin").value) || 0;
        const precioMaximo = parseFloat(document.getElementById("precioMax").value) || Infinity;

        const bulonesFiltrados = this.listaBulones.filter((bulon) => {
            return (filtroMaterial === "Todos" || bulon.material === filtroMaterial) &&
                (precioMinimo <= bulon.precio && bulon.precio <= precioMaximo);
        });

        bulonesFiltrados.forEach((bulon) => {
            contenedor_bulones.innerHTML += bulon.descripcionBulon();
        });

        bulonesFiltrados.forEach((bulon) => {
            const btn_ap = document.getElementById(`ap-${bulon.id}`);
            btn_ap.addEventListener("click", () => {
                carrito.agregar(bulon);
                carrito.guardarEnStorage();
                carrito.mostrarEnDOM();
            });
        });

        this.conteoBulones(bulonesFiltrados);
    }

    conteoBulones(lista) {
        let cantidadBulones = lista.length
        document.getElementById("conteoHTML").innerHTML = `Cant. de productos: <b class="bCant">(` + cantidadBulones + `)</b>`
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

const BC = new BulonController()
const carrito = new Carrito()


carrito.obtenerStorage()
carrito.mostrarEnDOM()
carrito.mostrarTotal()

BC.eventosEnEscucha()

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
                location.reload()
            }
        })
    } else {
        Swal.fire({
            title: 'Añade productos al carrito!!',
            text: 'Todavia no has añadido productos!',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        })
    }
})