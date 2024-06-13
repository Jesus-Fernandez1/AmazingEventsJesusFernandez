
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
    let eventoMaxAsistencia = eventos.reduce((maxEvento, evento) => {
        return evento.porcentajeAsistencia > maxEvento.porcentajeAsistencia ? evento : maxEvento;
    });

    //  evento con el porcentaje de asistencia más bajo //
    let eventoMinAsistencia = eventos.reduce((minEvento, evento) => {
        return evento.porcentajeAsistencia < minEvento.porcentajeAsistencia ? evento : minEvento;
    });

    //  evento con la mayor capacidad //
    let eventoMaxCapacidad = eventos.reduce((maxEvento, evento) => {
        return evento.capacity > maxEvento.capacity ? evento : maxEvento;
    });

    // capacidad total de los eventos en cada categoría //
    let categoriasCapacidad = {};
    eventosfuturos.forEach(evento => {
        let categoria = evento.category;
        if (!categoriasCapacidad[categoria]) {
            categoriasCapacidad[categoria] = 0;
        }
        categoriasCapacidad[categoria] += evento.capacity;
    });

    // porcentaje de asistencia y los ingresos totales por categoría de los eventos futuros //
    let categorias = {};
    eventosfuturos.forEach(evento => {
        let categoria = evento.category;
        if (!categorias[categoria]) {
            categorias[categoria] = {
                
                revenue: 0,
                totalAssistance: 0
            };
        }
       
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


    for (let categoria in categorias) {
        
        let revenue = categorias[categoria].revenue.toLocaleString();
        let totalAssistance = categorias[categoria].totalAssistance;
        let capacity = categoriasCapacidad[categoria];
        let porcentajeAsistencia = (totalAssistance / capacity) * 100;

        tableContent += `
                <tr>
                    <td>${categoria}</td>
                    <td>${revenue}</td>
                    <td>${porcentajeAsistencia.toFixed(2)}%</td>
                </tr>
            `;
    }

    // capacidad total de los eventos en cada categoría de eventos pasados//
    let categoriasCapacidadPasados = {};

    let eventosPasados = eventos.filter(evento => evento.date < currentDate);

    eventosPasados.forEach(evento => {
        let categoria = evento.category;
        if (!categoriasCapacidadPasados[categoria]) {
            categoriasCapacidadPasados[categoria] = 0;
        }
        categoriasCapacidadPasados[categoria] += evento.capacity;
    });

    // porcentaje de asistencia y los ingresos totales por categoría entre los eventos pasados//
    let categoriasPasados = {};
    eventosPasados.forEach(evento => {
        let categoria = evento.category;
        if (!categoriasPasados[categoria]) {
            categoriasPasados[categoria] = {
                
                revenue: 0,
                totalAssistance: 0
            };
        }
        
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

    
    for (let categoria in categoriasPasados) {
       
        let revenue = categoriasPasados[categoria].revenue.toLocaleString();
        let totalAssistance = categoriasPasados[categoria].totalAssistance;
        let capacity = categoriasCapacidadPasados[categoria];
        // Utilizar la capacidad de los eventos pasados //
        let porcentajeAsistencia = capacity !== 0 ? (totalAssistance / capacity) * 100 : 0;


        tableContentPasados += `
         <tr>
            <td>${categoria}</td>
            <td>${revenue}</td>
            <td>${porcentajeAsistencia.toFixed(2)}%</td>
         </tr>
          `;
    }

    // Agregar el contenido a la tabla existente //
    let tabla = document.querySelector('.tabla1 table tbody');
    tabla.innerHTML = tableContent + tableContentPasados;
}
