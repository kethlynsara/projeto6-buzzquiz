/* ---- variáveis de controle ---- */
const BUZZQUIZZAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

// requisição de todos os quizzes 
function buscarQuizzes() {
    const quizzes = axios.get(`${BUZZQUIZZAPI}`)
    quizzes.then(exibirSucesso);
    quizzes.catch(exibirErro);
}
function exibirSucesso(resposta) {
    console.log(resposta.data);
}
function exibirErro(erro) {
    console.log(erro.response);
}

buscarQuizzes();