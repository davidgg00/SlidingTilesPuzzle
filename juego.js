class Casilla {
    constructor(imagen, id) {
        this.imagen = imagen;
        this.id = id;
    }
}

class Tablero {
    constructor(div) {
        //array de las casillas creadas
        this.casillas = new Array(8);
        this.cajatablero = div;
        //Array de las imagenes
        this.imagenes = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/Blanco.jpg"];
    }

    //Este método te crea el tablero
    crearTablero() {
        for (let i = 0; i < this.imagenes.length; i++) {
            //Generamos numero para el array de imagenes
            let ngenerado = Math.floor(Math.random() * 16);
            //Si el numero generado es undefined generaremos más hasta que no sea undefined
            while (this.imagenes[ngenerado] == undefined) {
                ngenerado = Math.floor(Math.random() * 16);
            }
            //Creamos casilla
            this.casillas[i] = new Casilla(this.imagenes[ngenerado], this.imagenes[ngenerado].substr(4, 1))
            //Ponemos en undefined el elemento del array generado.
            delete this.imagenes[ngenerado];
            //Creamos la imagen y la añadimos
            let img = document.createElement("img");
            img.src = this.casillas[i].imagen;
            img.dataset.id = this.casillas[i].id;
            this.cajatablero.appendChild(img);
        }
    }


    moverCasilla(elemento) {
        //El primer parámetro solo nos ofrece el <img> vamos a buscarlo en el array
        for (let casilla of this.casillas) {
            if (elemento.dataset.id == casilla.id) {
                //Guardamos en una variable el elemento del array seleccionado
                var casilla_seleccionada = casilla;
            }
        }
        for (let i = 0; i < this.casillas.length; i++) {
            //Si encontramos en el array la posición vacía
            if (this.casillas[i].id == "B") {
                //si hay una casilla -1 de la blanca
                if (this.casillas[i + 1] && i != 2 && i != 5) {
                    //Y es la seleccionada
                    if (this.casillas[i + 1] == casilla_seleccionada) {
                        //Creamos variable auxiliar para guardar la casilla vacía
                        let aux = this.casillas[i];
                        //Ponemos en la casilla vacía la casilla que hemos seleccionado
                        this.casillas[i] = casilla_seleccionada;
                        //Ponemos la casilla vacía en el otro lado
                        this.casillas[i + 1] = aux;
                        //Recargamos el tablero
                        this.recargarTablero();
                        this.comprobarFinJuego();
                        break;
                    }
                }
                if (this.casillas[i - 1] == casilla_seleccionada && i != 3 && i != 6) {
                    //Creamos variable auxiliar para guardar la casilla vacía
                    let aux = this.casillas[i];
                    //Ponemos en la casilla vacía la casilla que hemos seleccionado
                    this.casillas[i] = casilla_seleccionada;
                    //Ponemos la casilla vacía en el otro lado
                    this.casillas[i - 1] = aux;
                    //Recargamos el tablero
                    this.recargarTablero();
                    this.comprobarFinJuego();
                    break;
                }

                //si hay una casilla +3 de la blanca
                if (this.casillas[i + 3]) {
                    //Y es la seleccionada
                    if (this.casillas[i + 3] == casilla_seleccionada) {
                        //Creamos variable auxiliar para guardar la casilla vacía
                        let aux = this.casillas[i];
                        //Ponemos en la casilla vacía la casilla que hemos seleccionado
                        this.casillas[i] = casilla_seleccionada;
                        //Ponemos la casilla vacía en el otro lado
                        this.casillas[i + 3] = aux;
                        //Recargamos el tablero
                        this.recargarTablero();
                        this.comprobarFinJuego();
                        break;
                    }
                }
                //si hay una casilla -3 de la blanca
                if (this.casillas[i - 3] == casilla_seleccionada) {
                    //Creamos variable auxiliar para guardar la casilla vacía
                    let aux = this.casillas[i];
                    //Ponemos en la casilla vacía la casilla que hemos seleccionado
                    this.casillas[i] = casilla_seleccionada;
                    //Ponemos la casilla vacía en el otro lado
                    this.casillas[i - 3] = aux;
                    //Recargamos el tablero
                    this.recargarTablero();
                    this.comprobarFinJuego();
                    break;
                }
            }
        }
    }

    recargarTablero() {
        this.cajatablero.innerHTML = "";
        for (let i = 0; i < this.imagenes.length; i++) {
            //Creamos la imagen y la añadimos
            let img = document.createElement("img");
            img.src = this.casillas[i].imagen;
            img.dataset.id = this.casillas[i].id;
            img.addEventListener("click", () => {
                this.moverCasilla(img);
            })
            this.cajatablero.appendChild(img);
        }
    }

    comprobarFinJuego() {
        let bandera = true;
        for (let i = 0; i < this.casillas.length - 1; i++) {
            if (this.casillas[i].id != i + 1) {
                bandera = false;
            }
        }

        if (bandera == true) {
            alert("GANASTE!");
        }
    }
}