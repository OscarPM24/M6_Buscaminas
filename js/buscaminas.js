let x = 0;
let y = 0;

function iniciarPartida() {
    x = parseInt(prompt("Número de filas (entre 10 y 30)"));
    y = parseInt(prompt("Número de columnas (entre 10 y 30"));

    // Comprobación dimensiones del tablero
    x = checkNumero(x);
    y = checkNumero(y);

    // Creación del tablero
    crearTaulell();

    //Creación de minas
    setMines();

    //Cálculo de minas adyacentes
    calculaAdjacents();
}

/* Función que comprueba si el número de filas/columnas
   es menor que 10 o mayor que 30 */
function checkNumero(num) {
    if (num < 10) return num = 10;
    if (num > 30) return num = 30;
    return num;
}

/* Función que crea el tablero de buscaminas
   según las filas y columnas dadas anteriormente */
function crearTaulell() {
    let divTaulell = document.getElementById("taulell");
    let taulell = "<table>";
    for (let i = 1; i <= x; i++) {
        taulell += "<tr>"
        for (let j = 1; j <= y; j++) {
            taulell += `<td id="${i}_${j}" data-mina="false">`;
            taulell += `<img src="img_pescamines/fons20px.jpg" onclick="obreCasella(${i}, ${j})">`;
            taulell += "</td>";
        }
        taulell += "</tr>";
    }
    taulell += "</table>";
    divTaulell.innerHTML = taulell;
}

function obreCasella(i, j) {
    let casella = document.getElementById(`${i}_${j}`);
    if (esMina(i,j)) {
        mostrarMines();
    } else {
        if (casella.getAttribute("data-num-mines") == "0") {
            mostrarCasellesZero(i, j);
        }
        casella.innerHTML = casella.getAttribute("data-num-mines");
    }
}

/* Función que recorre el tablero del buscaminas
   y pone una mina en una casilla con un 17% de probabilidades */
function setMines() {
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            let casella = document.getElementById(`${i}_${j}`);
            let rand = Math.random(); 
            if (rand <= 0.17) {
                casella.setAttribute("data-mina", "true");
            }
        }
    }
}

function calculaAdjacents() {
    // Bucles for para recorrer el tablero
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            let casella = document.getElementById(`${i}_${j}`);
            let adjacents = 0;
            // Bucles for para recorrer las casillas adyacentes
            for (let k = i-1; k <= i+1; k++) {
                for (let l = j-1; l <= j+1; l++) {
                    let casellaAdjacent = document.getElementById(`${k}_${l}`);
                    if (casellaAdjacent == null) continue;
                    if (casellaAdjacent.getAttribute("data-mina") == "true") {
                        adjacents++;
                    }
                }
            }
            casella.setAttribute("data-num-mines", adjacents);
        }
    }
}

function esMina(i, j) {
    let casella = document.getElementById(`${i}_${j}`);
    if (casella.getAttribute("data-mina") == "true") { return true; }
    return false;
}

function mostrarMines() {
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            if (esMina(i,j)) {
                let casella = document.getElementById(`${i}_${j}`).innerHTML = "<img src= img_pescamines/mina20px.jpg>";
            }
        }
    }
}

function mostrarCasellesZero(i, j) {
    // Bucles for para recorrer las casillas adyacentes
    for (let k = i-1; k <= i+1; k++) {
        for (let l = j-1; l <= j+1; l++) {
            let casella = document.getElementById(`${k}_${l}`);
            if (casella != null) {
                let num_mines = casella.getAttribute("data-num-mines");
                if (casella.innerHTML != num_mines) {
                    casella.innerHTML = num_mines;
                    if (num_mines == 0) mostrarCasellesZero(k, l); 
                }
            }
        }
    }
}

// if (casella != null && casella.getAttribute("data-num-mines") == "0" && casella.innerHTML != casella.getAttribute("data-num-mines")) {
//     casella.innerHTML = casella.getAttribute("data-num-mines");
//     mostrarCasellesZero(i,j);
    
// }