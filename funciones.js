
export function crearTarjeta(tarjeta) {
    let nuevaTarjeta = document.createElement("div");
    nuevaTarjeta.classList.add("tarjeta", "card", "mx-2", "col-4", "text-bg-dark", "mb-3", "sombra");
    nuevaTarjeta.style.width = "18rem";

    nuevaTarjeta.innerHTML = `
        <img src="${tarjeta.image}" class="card-img-top" alt="${tarjeta.name}" style="height: 200px;">
        <div class="card-body">
            <h4 class="card-title">${tarjeta.name}</h4>
            <p class="card-text">${tarjeta.description}</p>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <p>Precio: ${tarjeta.price} USD</p>
            <a href="details.html?id=${tarjeta._id}" class="btn btn-primary mb-3">details</a>
        </div>
    `;
    return nuevaTarjeta;
}

export function generarCheckboxes(categorias, contenedorCheckboxes) {
    categorias.forEach(categoria => {
        contenedorCheckboxes.innerHTML += `
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="${categoria}" value="${categoria}">
                <label class="form-check-label" for="${categoria}">${categoria}</label>
            </div>
        `;
    });
}

export function filtrarEventos(data, categoriasSeleccionadas, busqueda) {
    let eventosFiltrados = [];

    if (categoriasSeleccionadas.length === 0) {
        eventosFiltrados = data.events;
    } else {
        eventosFiltrados = data.events.filter(evento => categoriasSeleccionadas.includes(evento.category));
    }

    eventosFiltrados = eventosFiltrados.filter(evento => {
        let nombreEvento = evento.name.trim().toLowerCase();
        let descripcionEvento = evento.description.trim().toLowerCase();
        return nombreEvento.includes(busqueda) || descripcionEvento.includes(busqueda);
    });

    return eventosFiltrados;
}

export function obtenerCategoriasSeleccionadas(checkboxes) {
    let categoriasSeleccionadas = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            categoriasSeleccionadas.push(checkbox.id);
        }
    });
    return categoriasSeleccionadas;
}

