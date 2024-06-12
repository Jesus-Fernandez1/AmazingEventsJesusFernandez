let urleventos = "https://aulamindhub.github.io/amazing-api/events.json";

let cardDetails = document.querySelector(".cardDetails");
let idDetails = new URL(window.location.href).searchParams.get("id");

fetch(urleventos)
  .then(response => response.json())
  .then(data => {

    let events = data.events;

    let tarjeta = events.filter(evento => evento._id == idDetails);

    if (tarjeta.length > 0) {
      let evento = tarjeta[0];

      let assistanceHTML = '';

      if (evento.assistance) {

        assistanceHTML = `
          <dt class="col-ms-4">Assistance:</dt>
          <dd class="col-ms-8">${evento.assistance}</dd>
        `;
      }
      
      cardDetails.innerHTML = `
        <div class="col-md-6 mb-md-0 p-md-4 d-flex align-items-center">
          <img src="${evento.image}" class="w-100 sombra" alt="...">
        </div>
        <div class="col-md-6 p-4 ps-md-0">
          <dl class="row">
            <dt class="col-ms-4">Name:</dt>
            <dd class="col-ms-8">${evento.name}</dd>
            <dt class="col-ms-4">Date:</dt>
            <dd class="col-ms-8">${evento.date}</dd>
            <dt class="col-ms-4">Description:</dt>
            <dd class="col-ms-8">${evento.description}</dd>
            <dt class="col-ms-4">Category:</dt>
            <dd class="col-ms-8">${evento.category}</dd>
            <dt class="col-ms-4">Place:</dt>
            <dd class="col-ms-8">${evento.place}</dd>
            <dt class="col-ms-4">Capacity:</dt>
            <dd class="col-ms-8">${evento.capacity}</dd>
            ${assistanceHTML}
            <dt class="col-ms-4">Price:</dt>
            <dd class="col-ms-8">${evento.price}</dd>
          </dl>
        </div>
      `;
    } else {
      cardDetails.innerHTML = "<p>Event not found.</p>";
    }
  })

