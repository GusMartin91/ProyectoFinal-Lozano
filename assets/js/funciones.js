function nuevaCompra() {
    let dinero = Number(prompt("¿Cuanto dinero desea ingresar a la Maquina Expendedora?"))
    let producto = prompt("Elija uno de los productos disponibles: Gaseosa, Alfajor, Chicles, Papas Fritas, Galletitas Dulces")
    alert(maquinaExpendedora(dinero, producto))
}
function maquinaExpendedora(dinero, producto) {
    switch (producto) {
        case "Gaseosa":
            if (dinero > 385) {
                let vuelto = dinero - 385
                return "Aqui tienes tu " + producto + " fresquita, y este es tu vuelto: $" + vuelto + ".-"
            } else {
                let restanIngresar = 385 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Alfajor":
            if (dinero > 220) {
                let vuelto = dinero - 220
                return "Aqui tienes tu " + producto + ", y este es tu vuelto: $" + vuelto + ".-"
            } else {
                let restanIngresar = 220 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Chicles":
            if (dinero > 185) {
                let vuelto = dinero - 185
                return "Aqui tienes tus " + producto + ", y este es tu vuelto: $" + vuelto + ".-"
            } else {
                let restanIngresar = 185 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Papas Fritas":
            if (dinero > 478) {
                let vuelto = dinero - 478
                return "Aqui tienes tus " + producto + " crocantes, y este es tu vuelto: $" + vuelto + ".-"
            } else {
                let restanIngresar = 478 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        case "Galletitas Dulces":
            if (dinero > 328) {
                let vuelto = dinero - 328
                return "Aqui tienes tus " + producto + ", y este es tu vuelto: $" + vuelto + ".-"
            } else {
                let restanIngresar = 328 - dinero
                return "Dinero insuficiente, te falta agregar $" + restanIngresar + ".-"
            }
        default:
            return "No ingresaste un producto valido o nos quedamos sin stock, vuelve a intentar"
    }
}