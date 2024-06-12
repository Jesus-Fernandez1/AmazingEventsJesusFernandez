import * as funcionesGlobales from "./funciones.js"



let urleventos = "https://aulamindhub.github.io/amazing-api/events.json";


fetch(urleventos)
    .then(response => response.json())
    .then(data => {
        
        procesarDatos(data);
    })
function procesarDatos(data) {

    let padreTarjetasPasados = document.querySelector(".eventosFuturos");

    crearTarjetasPasados(padreTarjetasPasados, data.events);


    function crearTarjetasPasados(padre, eventos) {
        let currentDate = data.currentDate;
        let eventosPasados = eventos.filter(evento => evento.date > currentDate);

        eventosPasados.forEach(evento => {
            let nuevaTarjeta = funcionesGlobales.crearTarjeta(evento);
            padre.appendChild(nuevaTarjeta);
        });
    }

    let categorias = [];

    data.events.forEach(evento => {
        if (!categorias.includes(evento.category)) {
            categorias.push(evento.category);
        }
    });

    let contenedorCheckboxes = document.querySelector(".contenedorCheckbox");
    
    funcionesGlobales.generarCheckboxes(categorias, contenedorCheckboxes)
    



    let checkboxes = document.querySelectorAll(".form-check-input");



    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            let categoriasSeleccionadas = funcionesGlobales.obtenerCategoriasSeleccionadas(checkboxes);
            let busqueda = campoBusqueda.value.trim().toLowerCase();
            let eventosFiltrados = funcionesGlobales.filtrarEventos(data, categoriasSeleccionadas, busqueda);

            let contenedorEventos = document.querySelector(".eventosFuturos");
            contenedorEventos.innerHTML = "";

            crearTarjetasPasados(contenedorEventos, eventosFiltrados);
        });
    });


    let campoBusqueda = document.querySelector('input[type="search"]');
    


    campoBusqueda.addEventListener("input", () => {
        actualizarEventos();
    });

    function actualizarEventos() {
        let busqueda = campoBusqueda.value.trim().toLowerCase();
        let categoriasSeleccionadas = funcionesGlobales.obtenerCategoriasSeleccionadas(checkboxes);

        let eventosFiltrados = funcionesGlobales.filtrarEventos(data, categoriasSeleccionadas, busqueda);
        mostrarEventosFiltrados(eventosFiltrados);
    }



    function mostrarEventosFiltrados(eventosFiltrados) {
        let contenedorEventos = document.querySelector(".eventosFuturos");
        contenedorEventos.innerHTML = "";

        if (eventosFiltrados.length === 0) {
            contenedorEventos.innerHTML = "<p>❌❌❌ No events found matching your search.😞🚀❌❌❌ .</p>";
        } else {
            crearTarjetasPasados(contenedorEventos, eventosFiltrados);
        }
    }

}