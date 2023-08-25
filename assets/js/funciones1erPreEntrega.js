/* Funciones para la Maquina Expendedora */
function compra_maquinaExpendedora() {
    let dinero = Number(prompt("¿Cuanto dinero desea ingresar a la Maquina Expendedora?"))
    let producto = prompt("Elija uno de los productos disponibles: Gaseosa, Alfajor, Chicles, Papas Fritas, Galletitas Dulces").toLowerCase()
    alert(producto)
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

