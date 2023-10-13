// Antony (@TonyRodIv)
let writeCard = document.getElementById("writeCards");
let writeGreetings = document.getElementById("writeGreetings");
let inputQuestion = document.getElementById("chatInit");
const numerosSorteados = [];
for (let i = 0; i < 6; i++) {
  numerosSorteados.push(localStorage.getItem(`CardOrder${i}`));
}
const horarios = [
  { horario: "07:15", id: "0" },
  { horario: "08:15", id: "1" },
  { horario: "10:15", id: "2" },
  { horario: "11:45", id: "3" },
  { horario: "12:45", id: "4" },
  { horario: "15:45", id: "5" },
];
const aulas = []

fetch("../src/data.json")
  .then((response) => response.json())
  .then((infoAulas) => {
    for (let i = 0; i < infoAulas.length; i++) {
      infoAulas[i].id = horarios[i].id;
      infoAulas[i].horario = horarios[i].horario;
    }

    infoAulas.sort((a, b) => a.id - b.id);
    for (let i = 0; i < infoAulas.length; i++) {
      writeCard.innerHTML += `
        <figure class="${infoAulas[i].cor} normalCard" onclick="card${infoAulas[i].id}()">
          <div class="cardImg">
            <article class="infoCard">
              <p class="titleCard">
                ${infoAulas[i].nomeDaAula}
              </p>
              <p class="infoClass">
                SALA: <span class="infoClassSpan">${infoAulas[i].sala}</span> <br>
                ANDAR: <span class="infoClassSpan">${infoAulas[i].andar}</span> <br>
                BLOCO: <span class="infoClassSpan">${infoAulas[i].bloco}</span> <br>
                DURAÇÃO: <span class="infoClassSpan">${infoAulas[i].duracao}</span>
              </p>
              <p class="textBoldCard">
                Hoje as ${infoAulas[i].horario}
              </p>
            </article>
            <article class="infoBar">
              <p class="textBoldCard">
              ${infoAulas[i].professor}
              </p>
              <img src="${infoAulas[i].icon}" class="teacherImg" alt="" srcset="">
            </article>
          </div>
        </figure>
      `;
    }
    writeGreetings.innerHTML = `<p>
    <span class="greetings">
        Bom dia, Alice!! <br>
    </span>
    Sua <span class="blueWelcome">Primeira aula</span> do dia será no primeiro pavimento, Sala ${infoAulas[0].sala}
</p>`;
    aulas = infoAulas
});

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") {
    localStorage.setItem("homeQuestion", `${inputQuestion.value}`);
    window.location.href = "./timeKeeperAI.html";
  }
});

function card0() {
  localStorage.setItem("cardDetail", 0);
  localStorage.setItem("horario", horarios[0].horario);
  window.location.href = "./taskDetail.html";
}
function card1() {
  localStorage.setItem("cardDetail", 1);
  localStorage.setItem("horario", horarios[1].horario);
  window.location.href = "./taskDetail.html";
}
function card2() {
  localStorage.setItem("cardDetail", 2);
  localStorage.setItem("horario", horarios[2].horario);
  window.location.href = "./taskDetail.html";
}
function card3() {
  localStorage.setItem("cardDetail", 3);
  localStorage.setItem("horario", horarios[3].horario);
  window.location.href = "./taskDetail.html";
}
function card4() {
  localStorage.setItem("cardDetail", 4);
  localStorage.setItem("horario", horarios[4].horario);
  window.location.href = "./taskDetail.html";
}
function card5() {
  localStorage.setItem("cardDetail", 5);
  localStorage.setItem("horario", horarios[5].horario);
  window.location.href = "./taskDetail.html";
}
