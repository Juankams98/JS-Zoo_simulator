class Visitante {
    constructor() {
    }
    cartera = Math.floor(Math.random() * (200 - 10)) + 10;
    edad = Math.floor(Math.random() * (90 - 3)) + 3;
    estudiante = Math.floor(Math.random() * (1 - (-1))) + 0;
}
class Animal {
    constructor(nombre, icon) {
        this.nombre = nombre;
        this.icon = icon;
    }
    salud = Math.floor(Math.random() * (100 - 0)) + 0;
    hambre = Math.floor(Math.random() * (100 - 0)) + 0;
    vivo = true;
}
class ObjetoTienda {
    constructor(nombre) {
        this.nombre = nombre
    }
    precio = Math.floor(Math.random() * (20 - 1)) + 1;

}
var zoo = {
    nombre: "indrazoo",
    hubicacion: "alcobendas",
    aforo: 0,
    listaVistantes: [],
    aforomax: Math.floor(Math.random() * (500 - 1)) + 1,
    dineroAcumulado: 0,
    areas: [
        {
            capacidadAnimales: 20,
            aforo: 0,
            aforoMax: 200,
            nombre: "reptiles",
            animales: [
                new Animal("cocodrilo", "🐊"),
                new Animal("dragon", "🐉"),
                new Animal("t-rex", "🦖"),
            ]
        },
        {
            capacidadAnimales: 100,
            aforo: 0,
            aforoMax: 500,
            nombre: "aves",
            animales: [
                new Animal("pigüino", "🐧"),
                new Animal("buho", "🦉"),
                new Animal("pato", "🦆")
            ]
        },
        {
            capacidadAnimales: 10,
            aforo: 0,
            aforoMax: 300,
            nombre: "mamiferos",
            animales: [
                new Animal("pedro", "🐷"),
                new Animal("vaca", "🐮"),
                new Animal("oso", "🐻")
            ]
        },
        {
            capacidadAnimales: 50,
            aforo: 0,
            aforoMax: 250,
            nombre: "peces",
            animales: [
                new Animal("pulpo", "🐙"),
                new Animal("nemo", "🐠"),
                new Animal("ballena", "🐳")
            ]
        }
    ],
    tienda: [
        new ObjetoTienda("caramelo fresa"),
        new ObjetoTienda("caramelo limón"),
        new ObjetoTienda("caramelo manzana"),
        new ObjetoTienda("chicle fresa"),
        new ObjetoTienda("chicle coca cola"),
        new ObjetoTienda("peluche elefante"),
        new ObjetoTienda("peluche dinosaurio"),
        new ObjetoTienda("peluche pedro"),
        new ObjetoTienda("hamburguesa con queso"),
        new ObjetoTienda("hamburguesa completa"),
        new ObjetoTienda("bocadillo de tortilla"),
        new ObjetoTienda("lata coca cola"),
        new ObjetoTienda("lata fanta"),
        new ObjetoTienda("lata de cerveza"),
        new ObjetoTienda("muñeco de suricato"),
        new ObjetoTienda("foto jabali"),
        new ObjetoTienda("camiseta de animales"),
        new ObjetoTienda("camiseta de elefante"),
        new ObjetoTienda("sudadera de pingüino"),
        new ObjetoTienda("sudadera dinosaurio"),
    ]
}
function ponerGris(td1, td2, td3) {
    td1.style.color = "grey";
    td2.style.color = "grey";
    td3.style.color = "grey";
    td1.style.borderColor = "grey";
    td2.style.borderColor = "grey";
    td3.style.borderColor = "grey";
    td3.style.textDecoration = "line-through";
    td1.style.textDecoration = "line-through";
    td2.style.textDecoration = "line-through";
    td1.style.backgroundColor = "transparent"
    td2.style.backgroundColor = "transparent"
    td3.style.backgroundColor = "transparent"
}
function crearEvento(eventText, icon, color) {
    let tr = document.createElement("tr");
    let tdIcon = document.createElement("td");
    let tdText = document.createElement("td");
    tdIcon.innerHTML = icon;
    tdText.innerHTML = eventText;
    tdIcon.style.backgroundColor = color;
    tdText.style.backgroundColor = color;
    tr.appendChild(tdIcon);
    tr.appendChild(tdText);
    document.querySelector("#eventContainer>table").
        insertBefore(tr,
            document.querySelector("#eventContainer>table").firstChild);

}
let hora = 0;
ejecutarCiclo();
function anadirVisitante() {
    if (zoo.aforo < zoo.aforomax) {
        zoo.aforo++
        let precioEntrada = 5;
        let visitante = new Visitante;
        if (visitante.estudiante) {
            precioEntrada = 3;
        }
        else if (visitante.edad < 14 || visitante.edad > 65) {
            precioEntrada = 0;
        }
        visitante.cartera = visitante.cartera - precioEntrada;
        zoo.dineroAcumulado = zoo.dineroAcumulado + precioEntrada;
        zoo.listaVistantes.push(visitante);

    }
    else {
        return false;
    }
    return true;
}

function ejecutarCiclo() {
    hora++;
    //CALCULAR VISITANTES
    let nNuevosVisitantes = Math.floor(Math.random() * (zoo.aforomax - zoo.aforo - 0)) + 0;
    let nVisitantesSalientes = Math.floor(Math.random() * (zoo.aforo - 0)) + 0;
    for (let i = 0; i < nNuevosVisitantes; i++) {
        if (anadirVisitante() == false) {
            nNuevosVisitantes = i;
            break;
        }
    }
    for (let i = 0; i < nVisitantesSalientes; i++) {
        zoo.aforo = zoo.aforo - 1
        nVisitanteSaliente = Math.floor(Math.random() * (zoo.aforo - 0)) + 0;
        zoo.listaVistantes.slice(nVisitanteSaliente, 1)
    }
    //COMPRA VISITANTES
    zoo.listaVistantes.forEach((e) => {
        let numR = Math.floor(Math.random() * (100 - 0)) + 0
        if (numR <= 15) {
            numObjeto = Math.floor(Math.random() * (zoo.tienda.length - 1 - 0)) + 0;
            let objeto = zoo.tienda[numObjeto]
            if (objeto.precio < e.cartera) {
                e.cartera = e.cartera - objeto.precio;
                zoo.dineroAcumulado = zoo.dineroAcumulado + objeto.precio;
            }

        }
    })
    //MOSTRAR VISITANTES
    let nVisitantesContainer = document.getElementById("nVisitantesContainer");
    nVisitantesContainer.innerHTML = "";
    let pNVisitantesTotales = document.createElement("p");
    pNVisitantesSalientes = document.createElement("p");
    pNVisitantesEntrantes = document.createElement("p");
    pDineroZoo = document.createElement("p");

    pNVisitantesTotales.innerHTML = "Visitantes en el recinto: " +
        zoo.aforo + "/" + zoo.aforomax;
    pNVisitantesSalientes.innerHTML = "Visitantes Salientes: " +
        nVisitantesSalientes;
    pNVisitantesEntrantes.innerHTML = "Visitantes Nuevos: " +
        nNuevosVisitantes;
    pDineroZoo.innerHTML = "Dinero Zoo: " + zoo.dineroAcumulado + "€";
    nVisitantesContainer.appendChild(pNVisitantesTotales);
    nVisitantesContainer.appendChild(pNVisitantesEntrantes);
    nVisitantesContainer.appendChild(pNVisitantesSalientes);
    nVisitantesContainer.appendChild(pDineroZoo);

    //ANIMALES
    container = document.getElementById("datosAnimales");
    container.innerHTML = "";
    zoo.areas.forEach((area) => {
        let title = document.createElement("h3");
        title.innerHTML = area.nombre.toUpperCase();
        let div = document.createElement("div");
        div.classList.add("areaContainer")
        let tabla = document.createElement("table");
        let thead = document.createElement("thead")
        let tr = document.createElement("tr");
        let tdNombreHead = document.createElement("td");
        tdNombreHead.innerHTML = "Nombre";
        let tdSaludHead = document.createElement("td");
        tdSaludHead.innerHTML = "Salud";
        let tdHambreHead = document.createElement("td");
        tdHambreHead.innerHTML = "Hambre";
        tr.appendChild(tdNombreHead);
        tr.appendChild(tdSaludHead);
        tr.appendChild(tdHambreHead);
        thead.appendChild(tr);
        tabla.appendChild(thead);

        let tbody = document.createElement("tbody");
        //CICLO ANIMALES
        area.animales.forEach((e) => {
            let tdNombre = document.createElement("td");
            let tdSalud = document.createElement("td");
            let tdHambre = document.createElement("td");
            if (!e.vivo) {
                ponerGris(tdNombre, tdSalud, tdHambre);
            }

            //SALUD

            //resta o suma de salud
            if (e.vivo) {
                if (Math.floor(Math.random() * (1 - (-1))) + 0) {
                    if (e.salud < 100) {
                        e.salud = e.salud + 10;
                    }
                }
                else {
                    e.salud = e.salud - 10;
                }
            }
            //muestra salud
            tdSalud.innerHTML = e.salud;

            //cambiar borders
            if (e.vivo) {
                if (e.salud < 50) {
                    tdSalud.style.borderColor = "#ff3535";
                    tdSalud.style.backgroundColor = "#ff3535";


                }
                else if (e.salud < 80) {
                    tdSalud.style.borderColor = "orange";
                    tdSalud.style.backgroundColor = "orange";
                }
                else {
                    tdSalud.style.borderColor = "#03ab03";
                    tdSalud.style.backgroundColor = "#03ab03";
                }
                //llevar veterinario
                if (e.salud < 50 && zoo.dineroAcumulado > 1000) {
                    e.salud = e.salud + 30;
                    zoo.dineroAcumulado = zoo.dineroAcumulado - 1000;
                    crearEvento(e.icon + " " + e.nombre +
                        " ha sido llevado al veterinario ", "🚑" + e.icon, "#03ab03");
                }
                // animal muerto
                if (e.salud <= 0) {
                    e.salud = 0;
                    e.vivo = false;
                    ponerGris(tdNombre, tdSalud, tdHambre);
                    crearEvento(e.icon + " " + e.nombre +
                        " ha muerto por falta de salud", e.icon + "☠️", "#ff3535");
                }
                if (e.salud > 100) {
                    e.salud = 100;
                }
            }



            //HAMBRE
            //cambiar colores
            if (e.vivo) {
                if (e.hambre > 80) {
                    tdHambre.style.borderColor = "#ff3535";
                    tdHambre.style.backgroundColor = "#ff3535";
                }
                else if (e.hambre > 50) {
                    tdHambre.style.borderColor = "orange";
                    tdHambre.style.backgroundColor = "orange";
                }
                else {
                    tdHambre.style.borderColor = "#03ab03";
                    tdHambre.style.backgroundColor = "#03ab03";
                }


                //sumar hambre
                e.hambre = e.hambre + 10;
                //alimentar
                if (e.hambre > 100 && zoo.dineroAcumulado > 1000) {
                    e.hambre = 0;
                    tdHambre.style.borderColor = "#03ab03";
                    tdHambre.style.backgroundColor = "#03ab03";
                    zoo.dineroAcumulado = zoo.dineroAcumulado - 1000;
                    crearEvento(e.icon + " " + e.nombre +
                        " ha sido alimentado", e.icon + "🍗", "#03ab03");

                }
                //comer otros animales
                if (e.vivo) {
                    let animalesVivos = 0;
                    area.animales.forEach((e) => {
                        if (e.vivo == true) {
                            animalesVivos++;
                        }
                    })
                    if (e.hambre >= 150 && animalesVivos > 1) {
                        let nAnimal
                            = Math.floor(Math.random() *
                                (area.animales.length - 0)) + 0;
                        let aux = area.animales[nAnimal]
                        while (area.animales[nAnimal].nombre == e.nombre || !area.animales[nAnimal].vivo) {
                            nAnimal
                                = Math.floor(Math.random() *
                                    (area.animales.length - 0)) + 0;
                        }
                        area.animales[nAnimal].vivo = false;
                        e.hambre = 0;
                        tdHambre.style.borderColor = "#03ab03";
                        tdHambre.style.backgroundColor = "#03ab03";
                        crearEvento(e.icon + " " + e.nombre +
                            " se ha comido a " + area.animales[nAnimal].icon + area.animales[nAnimal].nombre, e.icon + "🍗" + area.animales[nAnimal].icon, "#ff3535");
                    }
                    if (e.hambre >= 200) {
                        e.salud = 0;
                        e.vivo = false;
                        ponerGris(tdNombre, tdSalud, tdHambre);
                        crearEvento(e.icon + " " + e.nombre +
                            " ha muerto por falta de comida", e.icon + "☠️", "#ff3535");
                    }
                }
            }
            tr = document.createElement("tr");
            // añadir elementos animales
            if (!e.vivo) {
                e.icon = "☠️";
            }
            tdNombre.innerHTML = e.icon + " " +
                e.nombre.charAt(0).toUpperCase() + e.nombre.slice(1);
            tdHambre.innerHTML = e.hambre;

            tr.appendChild(tdNombre);
            tr.appendChild(tdSalud);
            tr.appendChild(tdHambre);
            tbody.appendChild(tr);
            tabla.appendChild(tbody);
        })
        div.appendChild(title);
        div.appendChild(tabla)
        container.appendChild(div);


    })
    //añadir hora al log
    let trlog = document.createElement("tr");
    let tdText = document.createElement("td");
    tdText.innerHTML = "------ HORA: " + hora + " ------";
    tdText.style.backgroundColor = "grey";
    trlog.appendChild(tdText);
    tdText.setAttribute("colspan", "2")
    document.querySelector("#eventContainer>table").
        insertBefore(trlog,
            document.querySelector("#eventContainer>table").firstChild);
}
setInterval('ejecutarCiclo()', 3000);