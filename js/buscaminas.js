let x = 0;
let y = 0;
let acabado = false;

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

    acabado = false;
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

/* Función que recibe unas coordenadas y muestra
   el número de minas adyacentes en esa posición.
   Si es mina, muestra una imagen de una mina y se acaba el juego */
function obreCasella(i, j) {
    if (acabado) return;
    let casilla = getCasilla(i, j);
    if (esMina(i,j)) {
        acabado = true;
        mostrarMines();
        alert("Has perdido! 💀");
        return;
    } else {
        if (casilla.getAttribute("data-num-mines") == "0") {
            mostrarCasellesZero(i, j);
        }
        casilla.innerHTML = casilla.getAttribute("data-num-mines");
        if (checkVictoria()) {
            acabado = true;
            mostrarMines();
            alert("Has ganado! 🤑");

        }
    }
}

// Getter de casilla
function getCasilla(i, j) {
    return document.getElementById(`${i}_${j}`);
}


/* Función que recorre el tablero del buscaminas
   y pone una mina en una casilla con un 17% de probabilidades */
function setMines() {
    let num_mines = Math.round((x * y) * 0.17);
    while (num_mines > 0) {
        let i = Math.floor(Math.random() * x) + 1;
        let j = Math.floor(Math.random() * y) + 1;
        let casilla = getCasilla(i, j);
        if (casilla == null || esMina(i, j)) continue;
        casilla.setAttribute("data-mina", "true");
        num_mines--;
    }
}

/* Función que recorre el tablero del buscaminas
   y en cada casilla almacena el número de minas adyacentes
   en un atributo 'data-mina' */
function calculaAdjacents() {
    // Bucles for para recorrer el tablero
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            let casilla = getCasilla(i, j);
            let adjacents = 0;
            // Bucles for para recorrer las casillas adyacentes
            for (let k = i-1; k <= i+1; k++) {
                for (let l = j-1; l <= j+1; l++) {
                    let casellaAdjacent = getCasilla(k, l);
                    if (casellaAdjacent == null) continue;
                    if (casellaAdjacent.getAttribute("data-mina") == "true") {
                        adjacents++;
                    }
                }
            }
            casilla.setAttribute("data-num-mines", adjacents);
        }
    }
}

/* Función que recibe las coordenadas
   y comprueba si la casilla de esa posición es una mina */
function esMina(i, j) {
    let casilla = getCasilla(i, j);
    if (casilla.getAttribute("data-mina") == "true") { return true; }
    return false;
}

/* Función que muestra todas las minas del tablero */
function mostrarMines() {
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            if (esMina(i,j)) {
                getCasilla(i, j).innerHTML = "<img src= img_pescamines/mina20px.jpg>";
            }
        }
    }
}

/* Función que recibe las coordenadas de una casilla con 0 minas adyacentes
   y muestra todas las casillas adyacentes a esta.
   Si una de estas casillas tiene 0 minas adyacentes, hará lo mismo de forma recursiva */
function mostrarCasellesZero(i, j) {
    // Bucles for para recorrer las casillas adyacentes
    for (let k = i-1; k <= i+1; k++) {
        for (let l = j-1; l <= j+1; l++) {
            let casilla = getCasilla(k, l);
            if (casilla != null) {
                let num_mines = casilla.getAttribute("data-num-mines");
                if (casilla.innerHTML != num_mines) {
                    casilla.innerHTML = num_mines;
                    if (num_mines == 0) mostrarCasellesZero(k, l); 
                }
            }
        }
    }
}

/* Función que comprueba si todas las casillas que no sean minas
   están descubiertas */
function checkVictoria() {
    // Bucles for para recorrer el tablero
    for (let i = 1; i <= x; i++) {
        for (let j = 1; j <= y; j++) {
            let casilla = getCasilla(i, j);
            let num_mines = casilla.getAttribute("data-num-mines");
            if (esMina(i, j)) continue;
            if (casilla.innerHTML != num_mines) return false;
        }
    }
    return true;
}