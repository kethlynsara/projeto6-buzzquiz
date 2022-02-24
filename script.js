const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
let titulo = document.querySelector(".tituloQuiz").value;
let imagem = document.querySelector(".criarQuizInfoBasica .imagemQuiz").value;
let inputLength;
let quizzSelecionado = "";
let idQuizz = "";
let perguntas = null;
let niveis = null;
let todasPerguntas = [];
let pergunta = [];


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
    <div class="quizzesCriadosUsuario" data-identifier="user-quizzes" data-identifier="quizz-card">
        <div class="topo-quizzesCriadosUsuario">
            <h3>Seus Quizzes</h3>
            <ion-icon id="iconCriarQuiz" onclick="aparecerTelaCriarQuizzes()" name="add-circle" data-identifier="create-quizz"></ion-icon>
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
                <div class="quizzesCriadosPorTodos-Imagens" onclick="aparecerTela2(${quizz.id})" data-identifier="general-quizzes" data-identifier="quizz-card">
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
    console.log(quizzSelecionado);

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
            <div class="pergunta pergunta${i}"  style="background-color: ${quizzSelecionado['questions'][i]['color']}" data-identifier="question">
                <p class="perguntaSelecionada${i}">${quizzSelecionado['questions'][i]['title']}</p>
            </div>
            <div class="respostas respostas${i}"></div>        
        `;
        pergunta = document.querySelector(`.perguntaSelecionada${i}`);
        console.log(pergunta);
        console.log(pergunta.innerText);
        for (let j = 0; j < quizzSelecionado.questions[i].answers.length; j++) {
            let respostas = document.querySelector(`.box${i} .respostas`);
            quizzSelecionado.questions[i].answers.sort(comparador);
            respostas.innerHTML += `
            <div class="resposta respostas${i}" onclick="verificarRespostas(this, 'imagem-quizz${j}', 'texto-quizz${j}', 'nao-selecionado')" data-identifier="answer">
                <div class="opcao">
                    <img class="imagem-quizz${j} nao-selecionado" src="${quizzSelecionado.questions[i].answers[j].image}"
                        alt="resposta1">
                </div>
                <p class="p${j} texto-quizz${j} nao-selecionado">${quizzSelecionado.questions[i].answers[j].text}</p>
            </div>
            `;
        }

    }
}  

let imagemSelecionada = null;
let pSelecionado = null;
let pSelecionadoN;

function aplicarOpacidade(respostaSelecionada) {
    respostaSelecionada.classList.add("selecionado");

    const divRespostas = respostaSelecionada.parentNode;

    //transforma node list em array
    const possiveisRespostas = Array.from(
        divRespostas.querySelectorAll(".resposta")
    );

    possiveisRespostas.forEach((possivelResposta) =>  {
        if (!possivelResposta.classList.contains("selecionado")) {
            possivelResposta.classList.add("opacidade");
        }
    });
}

function verificarRespostas(elemento, imagem, p, naoSelecionado) {
    aplicarOpacidade(elemento);
    console.log(elemento);
    elemento.classList.add("selecionado");
    if (elemento.classList.contains("selecionado") ) {
        imagemSelecionada = imagem;
        pSelecionado = p;
        console.log(imagemSelecionada);
        console.log(pSelecionado);
    }
    if (imagem.classList.contains("nao-selecionado")) {
        pSelecionadoN = naoSelecionado;
        console.log(pSelecionadoN);
    }

    for (let j = 0; j < quizzSelecionado.questions.length; j++) {
        //  console.log(`pergunta ${j}:`)
        //  console.log(quizzSelecionado.questions[j]);
        for (let k = 0; k < quizzSelecionado.questions[j].answers.length; k++) {
            //  console.log(`resposta ${k} - pergunta ${j}:`)
            //  console.log(quizzSelecionado.questions[j].answers[k]);
            // console.log(pSelecionado);
            // console.log(imagemSelecionada);
            let textoResposta = document.querySelector(`.${pSelecionado}`);
            let imgResposta = document.querySelector(`.${imagemSelecionada}`);
            let p = document.querySelector(`.texto-quizz${k}`);
            let imgResposta2 = document.querySelector(`.imagem-quizz${k}`);
            console.log(textoResposta.innerText);
            console.log(imgResposta.src);
            if (textoResposta.innerText === quizzSelecionado.questions[j].answers[k].text && imgResposta.src === quizzSelecionado.questions[j].answers[k].image) {
                if (quizzSelecionado.questions[j].answers[k].isCorrectAnswer === true) {
                    textoResposta.classList.add("resposta-certa");
                    imgResposta.classList.add("opacidadeNone");
                    // console.log("resposta certa");
                } else {
                    // console.log("resposta errada");
                    textoResposta.classList.add("resposta-errada");
                    imgResposta.classList.add("opacidadeNone");
                }
            }
            else if (textoResposta.innerText !== p.innerText) {
                imgResposta2.classList.add("opacidade");
            }

        }
    }

}

// console.log(`pergunta ${j}:`)
// console.log(quizzSelecionado.questions[j]);
function comparador() {
    return Math.random() - 0.5;
}

let vetor = [];

function perguntasERespostasQuizz(quizzes) {

    for (let i = 0; i < quizzes.length; i++) {
        vetor.push(quizzes[i]);
    }
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
        <div class="criarQuizPerguntas-CaixaPergunta desaparecer${i}" onclick="abrirFecharPerguntas('${i}','${i}')" data-identifier="expand">
            <h4 class="tituloPergunta">Pergunta ${i}</h4>
            <ion-icon name="create-outline"></ion-icon>
        </div>

        <div class="criarQuizPerguntas criarQuizPerguntas${i} escondido">
            <input class="perguntaQuizz${i}" type="text" placeholder="Texto da pergunta" data-identifier="question" >
            <input class="corQuizz${i}" type="text" placeholder="Cor de fundo da pergunta" data-identifier="question" >

            <h4>Resposta correta</h4>
            <input class="respostaUmCorretaQuizz${i}" type="text" placeholder="Resposta correta" data-identifier="question" >
            <input class="imagemUrlCorreta${i}" type="text" placeholder="URL da imagem" data-identifier="question" >

            <h4>Respostas incorretas</h4>
            <input class="respostaIncorretaUmQuizz${i}" type="text" placeholder="Resposta incorreta 1" data-identifier="question" >
            <input class="imagemUrlIncorretaUm${i}" class="input-espaco" type="text" placeholder="URL da imagem 1" data-identifier="question" >

            <input class="respostaIncorretaDoisQuizz${i}" type="text" placeholder="Resposta incorreta 2" data-identifier="question" >
            <input class="imagemUrlIncorretaDois${i}" class="input-espaco" type="text" placeholder="URL da imagem 2" data-identifier="question" >

            <input class="respostaIncorretaTresQuizz${i}" type="text" placeholder="Resposta incorreta 3" data-identifier="question" >
            <input class="imagemUrlIncorretaTres${i}" type="text" placeholder="URL da imagem 3" data-identifier="question" >
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

