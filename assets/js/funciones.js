/* Funciones para la Maquina Expendedora */
function compra_maquinaExpendedora() {
    let dinero = Number(prompt("¿Cuanto dinero desea ingresar a la Maquina Expendedora?"))
    let producto = prompt("Elija uno de los productos disponibles: Gaseosa, Alfajor, Chicles, Papas Fritas, Galletitas Dulces")
    alert(maquinaExpendedora(dinero, producto))
}
function maquinaExpendedora(dinero, producto) {
    switch (producto) {
        case "Gaseosa":
            if (dinero > 385) {
                let vuelto = dinero - 385
                return "Aqui tienes tu " + producto + " fresquita, y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
            } else {
                let restanIngresar = 385 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Alfajor":
            if (dinero > 220) {
                let vuelto = dinero - 220
                return "Aqui tienes tu " + producto + ", y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
            } else {
                let restanIngresar = 220 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Chicles":
            if (dinero > 185) {
                let vuelto = dinero - 185
                return "Aqui tienes tus " + producto + ", y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
            } else {
                let restanIngresar = 185 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Papas Fritas":
            if (dinero > 478) {
                let vuelto = dinero - 478
                return "Aqui tienes tus " + producto + " crocantes, y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
            } else {
                let restanIngresar = 478 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Galletitas Dulces":
            if (dinero > 328) {
                let vuelto = dinero - 328
                return "Aqui tienes tus " + producto + ", y este es tu vuelto: $" + vuelto + ".-" + "\n\n¡Gracias por su compra!"
            } else {
                let restanIngresar = 328 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
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

