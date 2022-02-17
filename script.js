/* -------------------------------------------- variáveis de controle ------------------------------------------------ */
const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";



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
    const validacaoURL = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (validacaoURL.test(url)) {
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
            <ion-icon id="iconCriarQuiz" name="add-circle"></ion-icon>
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

/* -------------------------------------------- Layout Mobile (Tela 1) ----------------------------------------------- */