
let urleventos = "https://aulamindhub.github.io/amazing-api/events.json";


let padreTabla = document.querySelector(".tabla1");


fetch(urleventos)
    .then(response => response.json())
    .then(data => {
        tablaDatos(data);
    });
function tablaDatos(data) {
    //  lista de eventos //
    const eventos = data.events;

    // eventos futuros //
    let currentDate = data.currentDate;
    let eventosfuturos = eventos.filter(evento => evento.date > currentDate);

    //  porcentaje de asistencia para cada evento //
    eventos.forEach(evento => {
        evento.porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
    });

    //  evento con el porcentaje de asistencia más alto //
    const eventoMaxAsistencia = eventos.reduce((maxEvento, evento) => {
        return evento.porcentajeAsistencia > maxEvento.porcentajeAsistencia ? evento : maxEvento;
    });

    //  evento con el porcentaje de asistencia más bajo //
    const eventoMinAsistencia = eventos.reduce((minEvento, evento) => {
        return evento.porcentajeAsistencia < minEvento.porcentajeAsistencia ? evento : minEvento;
    });

    //  evento con la mayor capacidad //
    const eventoMaxCapacidad = eventos.reduce((maxEvento, evento) => {
        return evento.capacity > maxEvento.capacity ? evento : maxEvento;
    });

    // capacidad total de los eventos en cada categoría //
    const categoriasCapacidad = {};
    eventosfuturos.forEach(evento => {
        const categoria = evento.category;
        if (!categoriasCapacidad[categoria]) {
            categoriasCapacidad[categoria] = 0;
        }
        categoriasCapacidad[categoria] += evento.capacity;
    });

    // porcentaje de asistencia y los ingresos totales por categoría de los eventos futuros //
    const categorias = {};
    eventosfuturos.forEach(evento => {
        const categoria = evento.category;
        if (!categorias[categoria]) {
            categorias[categoria] = {
                count: 0,
                revenue: 0,
                totalAssistance: 0
            };
        }
        categorias[categoria].count++;
        categorias[categoria].revenue += evento.price * evento.estimate;
        categorias[categoria].totalAssistance += evento.estimate;
    });

    //  contenido de la tabla //
    let tableContent = `
            <tr>
                <td><b>Events with highest % of assistance</b></td>
                <td><b>Events with lowest % of assistance</b></td>
                <td><b>Events with larger capacity</b></td>
            </tr>
            <tr>
                <td>${eventoMaxAsistencia.porcentajeAsistencia.toFixed(2)}% - ${eventoMaxAsistencia.name} - ${eventoMaxAsistencia.capacity}</td>
                <td>${eventoMinAsistencia.porcentajeAsistencia.toFixed(2)}% - ${eventoMinAsistencia.name} - ${eventoMinAsistencia.capacity}</td>
                <td>${eventoMaxCapacidad.name} - ${eventoMaxCapacidad.capacity}</td>
            </tr>
            <tr>
                <td colspan="3"><b>Upcoming events statistics by category</b></td>
            </tr>
            <tr>
                <td><b>Categories</b></td>
                <td><b>Revenues</b></td>
                <td><b>Percentage of assistance</b></td>
            </tr>
        `;


    for (const categoria in categorias) {
        const count = categorias[categoria].count;
        const revenue = categorias[categoria].revenue;
        const totalAssistance = categorias[categoria].totalAssistance;
        const capacity = categoriasCapacidad[categoria];
        const porcentajeAsistencia = (totalAssistance / capacity) * 100;

        tableContent += `
                <tr>
                    <td>${categoria}</td>
                    <td>${revenue}</td>
                    <td>${porcentajeAsistencia.toFixed(2)}%</td>
                </tr>
            `;
    }

    // capacidad total de los eventos en cada categoría de eventos pasados//
    const categoriasCapacidadPasados = {};

    let eventosPasados = eventos.filter(evento => evento.date < currentDate);

    eventosPasados.forEach(evento => {
        const categoria = evento.category;
        if (!categoriasCapacidadPasados[categoria]) {
            categoriasCapacidadPasados[categoria] = 0;
        }
        categoriasCapacidadPasados[categoria] += evento.capacity;
    });

    // porcentaje de asistencia y los ingresos totales por categoría entre los eventos pasados//
    const categoriasPasados = {};
    eventosPasados.forEach(evento => {
        const categoria = evento.category;
        if (!categoriasPasados[categoria]) {
            categoriasPasados[categoria] = {
                count: 0,
                revenue: 0,
                totalAssistance: 0
            };
        }
        categoriasPasados[categoria].count++;
        categoriasPasados[categoria].revenue += evento.price * evento.assistance;
        categoriasPasados[categoria].totalAssistance += evento.assistance;
    });





    // Crear el contenido de la tabla con las estadísticas por categoría de eventos pasados//
    let tableContentPasados = `
        <tr>
        <td colspan="3"><b>Past events statistics by category</b></td>
        </tr>
        <tr>
        <td><b>Categories</b></td>
        <td><b>Revenues</b></td>
        <td><b>Percentage of assistance</b></td>
        </tr>
        `;

    
    for (const categoria in categoriasPasados) {
        const count = categoriasPasados[categoria].count;
        const revenue = categoriasPasados[categoria].revenue;
        const totalAssistance = categoriasPasados[categoria].totalAssistance;
        const capacity = categoriasCapacidadPasados[categoria];
        // Utilizar la capacidad de los eventos pasados //
        const porcentajeAsistencia = capacity !== 0 ? (totalAssistance / capacity) * 100 : 0;


        tableContentPasados += `
         <tr>
            <td>${categoria}</td>
            <td>${revenue}</td>
            <td>${porcentajeAsistencia.toFixed(2)}%</td>
         </tr>
          `;
    }

    // Agregar el contenido a la tabla existente //
    const tabla = document.querySelector('.tabla1 table tbody');
    tabla.innerHTML = tableContent + tableContentPasados;
}
