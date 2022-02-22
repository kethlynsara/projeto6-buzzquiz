/* -------------------------------------------- variáveis de controle ------------------------------------------------ */
const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let titulo = document.querySelector(".tituloQuiz").value;
let imagem = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
let inputLength;
let quizzSelecionado = "";
let idQuizz = "";



/* -------------------------------------------- Layout Mobile (Tela 1) ----------------------------------------------- */

function buscarQuizzes() {
    const quizzes = axios.get(`${BUZZQUIZZAPI}`)
    quizzes.then((message) => { exibirQuizzes(message) });
    quizzes.catch(exibirErro);
}

// Sucesso na requisição
function exibirSucesso(resposta) {
    console.log(resposta.data);
    console.log("Sua requisição foi completada com sucesso!");
}

// Falha na requisição
function exibirErro(erro) {
    console.log(erro.response);
}

// Validação de URL
function validarUrl(url) {

    const validacaoURL = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');

    if (!!validacaoURL.test(url)) {

        return true;

    } else {

        return false;
    }

}

// Função que faz exibir todos os quizzes na tela
function exibirQuizzes(resposta) {
    let main = document.querySelector(".main-tela1");

    main.innerHTML += `
    <div class="quizzesCriadosUsuario">
        <div class="topo-quizzesCriadosUsuario">
            <h3>Seus Quizzes</h3>
            <ion-icon id="iconCriarQuiz" onclick="aparecerTelaCriarQuizzes()" name="add-circle"></ion-icon>
        </div>
            <img src="https://criticalhits.com.br/wp-content/uploads/2020/12/J.-K.-Rowling-lancara-quatro-novos-livros-da-saga-Harry-Potter.jpg"
        alt="Harry Potter">
            <a href="#" target="_blank">O quão Potterhead é você?</a>
        <div class="quizzesCriadosPorTodos">
            <h3>Todos os Quizzes</h3>
        </div>
    </div>
    `;

    const div = document.querySelector(".quizzesCriadosPorTodos");
    const quizzes = resposta.data;

    quizzes.forEach(quizz => {
        if (validarUrl(quizz.image) === true) {
            div.innerHTML += `
                <div class="quizzesCriadosPorTodos-Imagens" onclick="aparecerTela2(${quizz.id})">
                    <img src="${quizz.image}"/>
                    <p>${quizz.title}</p>
                </div>
            `;
        }
    });

    perguntasERespostasQuizz(quizzes);

}
buscarQuizzes();


function aparecerTelaCriarQuizzes() {
    let desaparecerTelaSuperior = document.querySelector(".header-tela1");
    desaparecerTelaSuperior.classList.add("escondido");

    let desaparecerTelaMeio = document.querySelector(".main-tela1");
    desaparecerTelaMeio.classList.add("escondido");

    let aparecerTelaSuperior = document.querySelector(".header-tela3-1");
    aparecerTelaSuperior.classList.remove("escondido");

    let aparecerTelaMeio = document.querySelector(".main-tela3-1");
    aparecerTelaMeio.classList.remove("escondido");
}

/* -------------------------------------------- Layout Mobile (Tela 1) ----------------------------------------------- */


/* -------------------------------------------- Layout Mobile (Tela 2) ----------------------------------------------- */

function aparecerTela2(id) {
    idQuizz = id;
    let imagem = document.querySelector(".quizzesCriadosPorTodos-Imagens img");
    let p = document.querySelector(".quizzesCriadosPorTodos-Imagens p");
    let headerTela1 = document.querySelector(".header-tela1");
    let mainTela1 = document.querySelector(".main-tela1");
    let headerTela2 = document.querySelector(".header-tela2");
    let mainTela2 = document.querySelector(".tela2");
    headerTela1.classList.add("escondido");
    mainTela1.classList.add("escondido");
    headerTela2.classList.remove("escondido");
    mainTela2.classList.remove("escondido");

    quizzSelecionado = (vetor.filter((obj) => obj.id === id))[0];
    headerTela2.innerHTML = `<h1>BuzzQuizz</h1>`;
    mainTela2.innerHTML += `
            <!-- Título e imagem do quizz -->
            <div class="quizz-header">
                <img src="${quizzSelecionado.image}">
                <p class="titulo-quizz">${quizzSelecionado.title}</p>
            </div>
            `;

    for (let i = 0; i < quizzSelecionado.questions.length; i++) {
        mainTela2.innerHTML += `
        <div class="box-respostas box${i}">
            <div class="pergunta"  style="background-color: ${quizzSelecionado['questions'][i]['color']}">
                <p>${quizzSelecionado['questions'][i]['title']}</p>
            </div>
            <div class="respostas respostas${i}"></div>        
        `;        
        for (let j = 0; j < quizzSelecionado.questions[i].answers.length; j++) {
            let respostas = document.querySelector(`.box${i} .respostas`);
            quizzSelecionado.questions[i].answers.sort(comparador);
            respostas.innerHTML +=`
            <div class="resposta respostas${i}" onclick="vericarRespostas()">
                <div class="opcao">
                    <img class="imagem-quizz" src="${quizzSelecionado.questions[i].answers[j].image}"
                        alt="resposta1">
                </div>
                <p class="p${j} texto-quizz${j}">${quizzSelecionado.questions[i].answers[j].text}</p>
            </div>
            `;
        }
    }
}

function vericarRespostas(quizzClicado) {
    for(let i = 0; i < vetor.length; i++) {
        if (idQuizz === vetor[i].id)  {
            for(let j = 0; j < vetor[i].questions.length; j++) {
                for(let k = 0; k < vetor[i].questions[j].answers.length; k++) {
                    let imagem = document.querySelector(`.respostas${i} .imagem-quizz`);
                    let p = document.querySelector(`.respostas${i} .texto-quizz${k}`);
                    if (vetor[i].questions[j].answers[k].isCorrectAnswer === 'true') {
                        respostaCerta(p, imagem);
                    } else {
                        respostaErrada(p, imagem);
                    }
                }
            }      
            i = vetor.length + 1; 
        }
    }
}

function respostaCerta(p, imagem) {
    p.setAttribute("style", "color: #009C22");
    // p.style.cssText = 'color: #009C22';
    // imagem.document.classList.add("opacity");
}
function respostaErrada(p, imagem) {
    // p.setAttribute("style", "color: #FF0B0B");
    // p.style.cssText = 'color: #FF0B0B';
    imagem.document.classList.add("opacity");
}

function comparador() { 
	return Math.random() - 0.5; 
}

let vetor = [];

function perguntasERespostasQuizz(quizzes) {

    for (let i = 0; i < quizzes.length; i++) {
        vetor.push(quizzes[i]);
    }
}


/* -------------------------------------------- Layout Mobile (Tela 2) ----------------------------------------------- */


/* -------------------------------------------- Layout Mobile (Tela 3.1) --------------------------------------------- */

// Função que conta a quantidade de caracteres digitada
let contadorCaracteres = document.querySelector(".tituloQuiz");

contadorCaracteres.addEventListener("keypress", function (caracteres) {
    inputLength = contadorCaracteres.value.length;

});

// Validação das informações digitadas em cada input
function criarPerguntas() {

    let perguntas = null;
    let niveis = null;

    let tituloCaracteres = document.querySelector(".tituloQuiz").value;
    let validacaoURL = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
    perguntas = parseInt(document.querySelector(".criarQuizInfoBasica .perguntasQuiz").value);
    niveis = parseInt(document.querySelector(".criarQuizInfoBasica .niveisQuiz").value);

    let countCaracteres = tituloCaracteres.length;


    if (((inputLength >= 20 && inputLength <= 65) || countCaracteres >= 20 || contadorCaracteres <= 65) && (perguntas === 3) && (niveis === 2 || niveis === 3) && (validarUrl(validacaoURL))) {

        aparecerSegundaTela();

    }

}

// Aparecimento da tela seguinte para criação do quizz
function aparecerSegundaTela() {


    let desaparecerTelaSuperior = document.querySelector(".header-tela3-1");
    desaparecerTelaSuperior.classList.add("escondido");

    let desaparecerTelaMeio = document.querySelector(".main-tela3-1");
    desaparecerTelaMeio.classList.add("escondido");

    let aparecerTelaSuperior = document.querySelector(".header-tela3-2");
    aparecerTelaSuperior.classList.remove("escondido");

    let aparecerTelaMeio = document.querySelector(".main-tela3-2");
    aparecerTelaMeio.classList.remove("escondido");

}

/* -------------------------------------------- Layout Mobile (Tela 3.1) --------------------------------------------- */
