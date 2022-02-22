const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let titulo = document.querySelector(".tituloQuiz").value;
let imagem = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
let inputLength;
let perguntas = null;
let niveis = null;
let todasPerguntas = [];
let itens = [];
let itensObjeto = {
    title: "",
    color: "",
    answers: [
        {
            text: "",
            image: "",
            isCorrectAnswer: "",
        },
        {
            text: "",
            image: "",
            isCorrectAnswer: "",
        }
    ]
};

function buscarQuizzes() {
    const quizzes = axios.get(`${BUZZQUIZZAPI}`);
    quizzes.then((message) => { exibirQuizzes(message) });
    quizzes.catch(exibirErro);
}

function exibirSucesso(resposta) {
    console.log(resposta.data);
    console.log("Sua requisição foi completada com sucesso!");
}

function exibirErro(erro) {
    console.log(erro.response);
}

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
            </div>
        <div class="quizzesCriadosPorTodos">
            <h3>Todos os Quizzes</h3>
        </div>
   
    `;

    let div = document.querySelector(".quizzesCriadosPorTodos");
    const quizzes = resposta.data;

    quizzes.forEach(quizz => {
        if (validarUrl(quizz.image) === true) {
            div.innerHTML += `
                <div class="quizzesCriadosPorTodos-Imagens" onclick="aparecerTela2(this)">
                    <img src="${quizz.image}"/>
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

function aparecerTela2(quizzSelecionado) {
    console.log("executou");
    const headerTela1 = document.querySelector(".header-tela1");
    const mainTela1 = document.querySelector(".main-tela1");
    const headerTela2 = document.querySelector(".header-tela2");
    const mainTela2 = document.querySelector(".tela2");
    headerTela1.classList.add("escondido");
    mainTela1.classList.add("escondido");
    headerTela2.classList.remove("escondido");
    mainTela2.classList.remove("escondido");
}

let contadorCaracteres = document.querySelector(".tituloQuiz");

contadorCaracteres.addEventListener("keypress", function (caracteres) {
    inputLength = contadorCaracteres.value.length;

});

function criarPerguntas() {

    let tituloCaracteres = document.querySelector(".tituloQuiz").value;
    let validacaoURL = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
    perguntas = parseInt(document.querySelector(".criarQuizInfoBasica .perguntasQuiz").value);
    niveis = parseInt(document.querySelector(".criarQuizInfoBasica .niveisQuiz").value);

    let countCaracteres = tituloCaracteres.length;


    if (((inputLength >= 20 && inputLength <= 65) || countCaracteres >= 20 || contadorCaracteres <= 65) && (perguntas >= 3) && (niveis === 2 || niveis === 3) && (validarUrl(validacaoURL))) {

        aparecerSegundaParteTerceiraTela();
        selecionarPerguntas();

    } else {
        alert("Preencha os dados corretamente!");
    }

}

function aparecerSegundaParteTerceiraTela() {

    let desaparecerTelaSuperior = document.querySelector(".header-tela3-1");
    desaparecerTelaSuperior.classList.add("escondido");

    let desaparecerTelaMeio = document.querySelector(".main-tela3-1");
    desaparecerTelaMeio.classList.add("escondido");

}

function selecionarPerguntas() {

    let aparecerTelaSuperior = document.querySelector(".header-tela3-2");
    aparecerTelaSuperior.classList.remove("escondido");

    let aparecerTelaMeio = document.querySelector(".main-tela3-2");
    aparecerTelaMeio.classList.remove("escondido");

    let aparecerTelaInferior = document.querySelector(".footer-tela3-2");
    aparecerTelaInferior.classList.remove("escondido");

    let perguntasQuizz = document.querySelector(".main-tela3-2");

    for (let i = 1; i <= perguntas; i++) {

        perguntasQuizz.innerHTML +=
            `
        <div class="criarQuizPerguntas-CaixaPergunta desaparecer${i}" onclick="abrirFecharPerguntas('${i}','${i}')">
            <h4 class="tituloPergunta">Pergunta ${i}</h4>
            <ion-icon name="create-outline"></ion-icon>
        </div>

        <div class="criarQuizPerguntas criarQuizPerguntas${i} escondido">
            <input class="perguntaQuizz${i}" type="text" placeholder="Texto da pergunta">
            <input class="corQuizz${i}" type="text" placeholder="Cor de fundo da pergunta">

            <h4>Resposta correta</h4>
            <input class="respostaUmCorretaQuizz${i}" type="text" placeholder="Resposta correta">
            <input class="imagemUrlCorreta${i}" type="text" placeholder="URL da imagem">

            <h4>Respostas incorretas</h4>
            <input class="respostaIncorretaUmQuizz${i}" type="text" placeholder="Resposta incorreta 1">
            <input class="imagemUrlIncorretaUm${i}" class="input-espaco" type="text" placeholder="URL da imagem 1">

            <input class="respostaIncorretaDoisQuizz${i}" type="text" placeholder="Resposta incorreta 2">
            <input class="imagemUrlIncorretaDois${i}" class="input-espaco" type="text" placeholder="URL da imagem 2">

            <input class="respostaIncorretaTresQuizz${i}" type="text" placeholder="Resposta incorreta 3">
            <input class="imagemUrlIncorretaTres${i}" type="text" placeholder="URL da imagem 3">
        </div>
        `;


    }

}

function abrirFecharPerguntas(botaoSelecionar) {

    let selecionado = document.querySelector(".criarQuizPerguntas" + botaoSelecionar);
    selecionado.classList.toggle("escondido");

    let botaoSelecionado = document.querySelector(".desaparecer" + botaoSelecionar);
    botaoSelecionado.classList.toggle("escondido");

}

function pegarDados(indice) {

    let nomeTitulo = document.querySelector('.perguntaQuizz' + indice).value;
    let cor = document.querySelector('.corQuizz' + indice).value;
    let respostaCorreta = document.querySelector('.respostaUmCorretaQuizz' + indice).value;
    let imagemUrl = document.querySelector('.imagemUrlCorreta' + indice).value;
    let respostaIncorretaUm = document.querySelector('.respostaIncorretaUmQuizz' + indice).value;
    let urlIncorretaUm = document.querySelector('.imagemUrlIncorretaUm' + indice).value;
    let respostaIncorretaDois = document.querySelector('.respostaIncorretaDoisQuizz' + indice).value;
    let urlIncorretaDois = document.querySelector('.imagemUrlIncorretaDois' + indice).value;
    let respostaIncorretaTres = document.querySelector('.respostaIncorretaTresQuizz' + indice).value;
    let urlIncorretaTres = document.querySelector('.imagemUrlIncorretaTres' + indice).value;
}

function juntarDados() {

    for (let i = 1; i <= perguntas; i++) {
        pegarDados(i);
    }
    itens.push(todasPerguntas);
    console.log(itens);
    converterEmObjeto();

}

function converterEmObjeto() {
    const objeto = Object.assign({}, itens);
    console.log(objeto);
}

