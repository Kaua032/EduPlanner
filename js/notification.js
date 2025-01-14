// Glaucos (@BigGlaucos)
let WriteNotification = document.getElementById('Notification');

fetch('../src/notification.json')
  .then(response => response.json())
  .then(notification => {
    const numerosSorteados = [];
    while (numerosSorteados.length < 6) {
      const numero = Math.floor(Math.random() * 6);
      if (!numerosSorteados.includes(numero)) {
        numerosSorteados.push(numero);
      }
    }

    for (let i = 0; i < notification.length; i++) {
      WriteNotification.innerHTML += `
      <h2 class="Data">${notification[i].data}</h2>
      <ul id="Notification">
      <li>
          <div class="bellBackground">
            <img src="../img/Icons/Bell.svg" alt="" srcset="">
          </div>
          <div class="textWraper">
          <h2 class="NotificationTitle">${notification[i].titulo}</h2>
            <p class="Description">${notification[i].descricao}</p>
            </div>
        </li>
        <hr>
      
      </ul>     
      
      `;
    }
  });
