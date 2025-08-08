const mensagensErro = {
  401: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  403: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  429: "Você atingiu o limite de uso da API. Aguarde alguns minutos e tente novamente.",
  500: "O serviço está com instabilidade no momento. Tente novamente mais tarde.",
  400: "Não foi possível processar sua solicitação. Verifique os dados e tente novamente.",
};

let isLoading = false;

const btn = document.getElementById("btn-perguntar");
const btnText = document.getElementById("btn-text");
const carregamento = document.getElementById("gif-carregamento");
const feedbackErro = document.getElementById("feedback-erro");

function mostrarErro(mensagem) {
  feedbackErro.innerText = mensagem;
  feedbackErro.style.display = "block";
}

function esconderErro() {
  feedbackErro.innerText = "";
  feedbackErro.style.display = "none";
}

function definirCarregando(ativo) {
  btn.disabled = ativo;
  btnText.innerText = ativo ? "Carregando..." : "Perguntar";
  carregamento.style.display = ativo ? "inline-block" : "none";
}

btn.addEventListener("click", async () => {
  esconderErro();

  const apiKey = document.getElementById("api-key").value.trim();
  const modelo = document.getElementById("modelo-gemini").value;
  const pergunta = document.getElementById("pergunta").value.trim();

  if (!apiKey) {
    mostrarErro("Por favor, insira sua API Key.");
    return;
  }

  if (!pergunta) {
    mostrarErro("Digite uma pergunta.");
    return;
  }

  let respostaDiv = document.getElementById("resposta");
  if (!respostaDiv) {
    respostaDiv = document.createElement("div");
    respostaDiv.id = "resposta";
    respostaDiv.classList.add("resposta");
    document.querySelector(".conteudo").appendChild(respostaDiv);
  }

  definirCarregando(true);
  respostaDiv.innerText = "Carregando resposta...";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: pergunta }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      mostrarErro(mensagensErro[response.status] || "Erro desconhecido.");
      respostaDiv.innerHTML = "Nenhuma resposta recebida.";
      return;
    }

    const data = await response.json();

    const respostaTexto =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Nenhuma resposta recebida.";
    respostaDiv.innerText = respostaTexto;
  } catch (erro) {
    mostrarErro("Erro na conexão. Verifique sua internet e tente novamente.");
    console.error(erro);
    respostaDiv.innerText = "Nenhuma resposta recebida.";
  } finally {
    definirCarregando(false);
  }
});
