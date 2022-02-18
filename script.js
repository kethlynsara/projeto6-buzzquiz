/* -------------------------------------------- variáveis de controle ------------------------------------------------ */
const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let titulo = document.querySelector(".tituloQuiz").value;
let imagem = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
let inputLength;

/* -------------------------------------------- Layout Mobile (Tela 1) ----------------------------------------------- */
// Requisição de todos os quizzes 
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
        <div class="quizzesCriadosPorTodos-Imagens">
          <img src="${quizz.image}" />
          <p>${quizz.title}</p>
        </div>
      `;
        }
    });

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
