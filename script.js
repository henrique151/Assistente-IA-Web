const mensagensErro = {
  401: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  403: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  429: "Você atingiu o limite de uso da API. Aguarde alguns minutos e tente novamente.",
  500: "O serviço está com instabilidade no momento. Tente novamente mais tarde.",
  400: "Não foi possível processar sua solicitação. Verifique os dados e tente novamente.",
};

const btn = document.getElementById("btn-perguntar");
const btnText = document.getElementById("btn-text");
const feedbackErro = document.getElementById("feedback-erro");
const perguntaTextarea = document.getElementById("pergunta");
const contagemCaracteres = document.getElementById("char-count");
const apiKeyInput = document.getElementById("api-key");
const modeloSelect = document.getElementById("modelo-gemini");
const containerResposta = document.getElementById("container-resposta");
const respostaDiv = document.getElementById("resposta");
const MAXIMO_CARACTERES = 500;

const perguntaExibida = document.getElementById("pergunta-exibida");

const apiKeySalva = localStorage.getItem("apiKey");
if (apiKeySalva) {
  apiKeyInput.value = apiKeySalva;
  salvarKeyCheckbox.checked = true;
}

apiKeyInput.addEventListener("input", () => {
  if (salvarKeyCheckbox.checked) {
    localStorage.setItem("apiKey", apiKeyInput.value.trim());
  } else {
    localStorage.removeItem("apiKey");
  }
});

perguntaTextarea.addEventListener("input", () => {
  const currentLength = perguntaTextarea.value.length;
  contagemCaracteres.textContent = `${currentLength}/${MAXIMO_CARACTERES}`;
});

perguntaTextarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    btn.click();
  }
});

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
}

btn.addEventListener("click", async () => {
  esconderErro();

  const apiKey = apiKeyInput.value.trim();
  const modelo = modeloSelect.value;
  const pergunta = perguntaTextarea.value.trim();

  if (!apiKey) {
    mostrarErro("🔑 Por favor, insira sua API Key para continuar.");
    return;
  }

  if (!pergunta) {
    mostrarErro("💬 Por favor, digite uma pergunta antes de continuar.");
    return;
  }
  definirCarregando(true);
  containerResposta.style.display = "block";
  respostaDiv.innerText = "Carregando resposta...";

  perguntaExibida.innerHTML = `<strong>Sua pergunta:</strong> ${pergunta}`;
  perguntaExibida.style.display = "block";

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

    respostaDiv.style.display = "block";
    containerResposta.scrollIntoView({ behavior: "smooth", block: "end" });
  } catch (erro) {
    mostrarErro("Erro na conexão. Verifique sua internet e tente novamente.");
    console.error(erro);
    respostaDiv.innerText = "Nenhuma resposta recebida.";
  } finally {
    definirCarregando(false);
  }
});

const btnLimpar = document.getElementById("btn-limpar");

if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    perguntaTextarea.value = "";
    contagemCaracteres.textContent = `0/${MAXIMO_CARACTERES}`;

    respostaDiv.innerText = "";

    containerResposta.style.display = "none";
  });
}
