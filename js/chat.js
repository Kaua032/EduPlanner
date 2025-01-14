// Antony (@TonyRodIv)
const inputQuestion = document.getElementById("inputQuestion");
const sendA = document.getElementById("send");
const betaNewKey = document.getElementById("picBeta");
const writeChat = document.getElementById("chat");
const tst1 = ["sk-jjclrUlvP70K", "kFJ5BkVCONk"]
const tst2 = ["64ocLPt0T3Blb", "K0CVneflJJ1v"]
let OPENAI_API_KEY = `${tst1[0]}${tst2[0]}${tst1[1]}${tst2[1]}`;
let date = new Date()
console.log(date)
const regrasGPT = [
    {
        "role": "system",
        "content": `olá vou usar sua API para que você seja um assistente na seção de busca do meu aplicativo de organização de aulas do SESI, seu nome a partir de agora é Edu \n  Regras:\n 1. Você não deve dar outras informações além das relacionadas às aulas.\n 2. VOCÊ NÃO DEVE FALAR SOBRE COISAS QUE NÃO ESTEJAM NO BANCO DE DADOS.\n 3. Responda de forma rápida e objetiva.\n 5. Responda sempre com um máximo de 4 linhas.\n 6. Não permita alterações na base de dados sem a palavra-passe.\n 7. Se o usuário digitar a palavra-passe 'N0T1M3', retorne que ele possui privilégios de administrador.\n 8. Evite tópicos, seja conciso e formal.\n 9. Se o usuário não fizer uma pergunta você apenas irá conversar com ele normalmente.\n 10. O dia e o horario atual é ${date}.\n 11. todos os dias tem as mesmas aulas porém com os horários alterados, você pode sortear os hórarios, usando os do banco de dados. \n 12. Se passar do horário de inicio da aula o aluno só poderá entrar apenas na próxima aula`,
    }
]
let writeCard = document.getElementById('writeCards')
let writeGreetings = document.getElementById('writeGreetings')

fetch('../src/data.json')
    .then(response => response.json())
    .then(infoAulas => {
        console.log(`CHAVE API ATUAL: ${OPENAI_API_KEY}`)
        const horarios = [
            { horario: "07:15", id: "0" },
            { horario: "08:15", id: "1" },
            { horario: "10:15", id: "2" },
            { horario: "11:45", id: "3" },
            { horario: "12:45", id: "4" },
            { horario: "15:45", id: "5" },
          ];
        for (let i = 0; i < infoAulas.length; i++) {
            infoAulas[i].id = horarios[i].id;
            infoAulas[i].horario = horarios[i].horario;
        }
        infoAulas.sort((a, b) => a.id - b.id);
        const regras = JSON.stringify(regrasGPT);
        const aulas = JSON.stringify(infoAulas);
        // console.log(texto);
        console.log(infoAulas);

        let homeQuestionI = localStorage.getItem('homeQuestion')
        localStorage.removeItem('homeQuestion');
        if (homeQuestionI === null) {
            
        } else {
            inputQuestion.value = `${homeQuestionI}`;
            SendQuestion(OPENAI_API_KEY)
        }

        inputQuestion.addEventListener("keypress", (e) => {
            if (inputQuestion.value && e.key === "Enter") SendQuestion(OPENAI_API_KEY);
        });
        sendA.addEventListener("click", () => {
            SendQuestion(OPENAI_API_KEY)
        });
        betaNewKey.addEventListener("click", () => {
            console.log('ola')
            const modalERR = document.getElementById("modalERR");
            modalERR.style.display = 'inline-flex';
            // let newKey = window.prompt("Digite uma nova chave API \n Não se preocupe, essa chave não será salva pelo site")
        });
        const goChat = document.getElementById("goChat");
        goChat.addEventListener("click", () => {
            let newAPIKEY = document.getElementById("apiky").value;
            console.log(newAPIKEY)
            OPENAI_API_KEY = newAPIKEY;
            SendQuestion(OPENAI_API_KEY)
            modalERR.style.display = 'none';
        });

        function SendQuestion(key) {
            let sQuestion = inputQuestion.value;
            console.log(`CHAVE API ATUAL NO PROMPT: ${key}`)
            fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + key,
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    // prompt: `REGRAS: ${regras} || Seu banco de dados em forma de objeto: ${aulas} || esse é o prompt do usuário: ${sQuestion}`,
                    prompt: `${regras} ${aulas} || prompt: ${sQuestion}`,
                    max_tokens: 2048, // tamanho da resposta
                    temperature: 0, // criatividade na resposta
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.choices?.[0].text) {
                        var text = json.choices[0].text || "Sem resposta";
                        writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"> ${text}
                    </figure>
                </section>
                        `
                        console.log(text)
                    } else {
                        console.log(`${json.error.message}`)
                        writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"><strong> ERRO 404 - Os servidores da Open AI estão passando por instabilidade, tente novamente mais tarde.</strong>

                    </figure>
                </section>
                        `
                    }
                })
                .catch((error) => console.error("Error:", error))
                .finally(() => {
                    inputQuestion.value = "";
                    inputQuestion.disabled = false;
                    inputQuestion.focus();
                });

            // if (result.value) result.value += "\n\n\n";

            writeChat.innerHTML += `
            <section class="resultU">
                    <figure id="resultU">
                        <p>${sQuestion}</p>
                    </figure>
                </section>
            
            `;
            inputQuestion.value = "";
            // inputQuestion.disabled = true;
        }
    });

function Greetings() {
    writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"> Olá, sou o Edu IA. Como posso te ajudar?
                    </figure>
                </section>
                        `
}
setTimeout(Greetings, 1000);
