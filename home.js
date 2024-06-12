import * as funcionesGlobales from "./funciones.js";

let urleventos = "https://aulamindhub.github.io/amazing-api/events.json";


fetch(urleventos)
    .then(response => response.json())
    .then(data => {
        
        procesarDatos(data);
    });

function procesarDatos(data) {
    let padreTarjetasPasados = document.querySelector(".eventos1");
    pintarTarjetas(data.events, padreTarjetasPasados);

    // Generar checkboxes después de cargar los datos //
    let categorias = obtenerCategorias(data.events);
    let contenedorCheckboxes = document.querySelector(".contenedorCheckbox");
    funcionesGlobales.generarCheckboxes(categorias, contenedorCheckboxes);

    let checkboxes = document.querySelectorAll(".form-check-input");
    let campoBusqueda = document.querySelector('input[type="search"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            filtrarEventos(data);
        });
    });

    campoBusqueda.addEventListener("input", () => {
        filtrarEventos(data);
    });

    function filtrarEventos(data) {
        let categoriasSeleccionadas = [];
        checkboxes.forEach(item => {
            if (item.checked) {
                categoriasSeleccionadas.push(item.id);
            }
        });

        let busqueda = campoBusqueda.value.trim().toLowerCase();

        let eventosFiltrados = data.events.filter(evento => {
            let nombreEvento = evento.name.trim().toLowerCase();
            let descripcionEvento = evento.description.trim().toLowerCase();
            return (
                (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category)) &&
                (nombreEvento.includes(busqueda) || descripcionEvento.includes(busqueda))
            );
        });

        mostrarEventosFiltrados(eventosFiltrados);
    }


    function mostrarEventosFiltrados(eventosFiltrados) {
        let contenedorEventos = document.querySelector(".eventos1");
        contenedorEventos.innerHTML = "";

        if (eventosFiltrados.length === 0) {
            contenedorEventos.innerHTML =
                "<p>❌❌❌ No events found matching your search.😞🚀❌❌❌ .</p>";
        } else {
            pintarTarjetas(eventosFiltrados, contenedorEventos);
        }
    }
}

function pintarTarjetas(eventos, divPadre) {
    eventos.forEach(evento => {
        const nuevaTarjeta = funcionesGlobales.crearTarjeta(evento);
        divPadre.appendChild(nuevaTarjeta);
    });
}

function obtenerCategorias(eventos) {
    let categorias = [];
    eventos.forEach(evento => {
        if (!categorias.includes(evento.category)) {
            categorias.push(evento.category);
        }
    });
    return categorias;
}


