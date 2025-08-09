const mensagensErro = {
  400: "Não foi possível processar sua solicitação. Verifique os dados e tente novamente.",
  401: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  403: "Sua chave de API não foi reconhecida. Verifique e tente novamente.",
  429: "Você atingiu o limite de uso da API. Aguarde alguns minutos e tente novamente.",
  500: "O serviço está com instabilidade no momento. Tente novamente mais tarde.",
};

const MAXIMO_CARACTERES = 500;

const btn = document.getElementById("btn-perguntar");
const btnText = document.getElementById("btn-text");
const feedbackErro = document.getElementById("feedback-erro");
const perguntaTextarea = document.getElementById("pergunta");
const contagemCaracteres = document.getElementById("char-count");
const apiKeyInput = document.getElementById("api-key");
const modeloSelect = document.getElementById("modelo-gemini");
const containerResposta = document.getElementById("container-resposta");
const respostaDiv = document.getElementById("resposta");
const perguntaExibida = document.getElementById("pergunta-exibida");
const salvarKeyCheckbox = document.getElementById("salvar-key");
const btnCopiar = document.getElementById("btn-copiar");
const btnLimparHistorico = document.getElementById("btn-limpar-historico");
const listaHistorico = document.getElementById("lista-historico");
const btnLimpar = document.getElementById("btn-limpar");
const apiKeySalva = localStorage.getItem("apiKey");

let historico = [];

if (apiKeySalva) {
  apiKeyInput.value = apiKeySalva;
  salvarKeyCheckbox.checked = true;
}

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
  btnLimpar.disabled = ativo;
  btnText.innerText = ativo ? "Carregando..." : "Perguntar";
}

function salvarHistorico(pergunta, resposta) {
  historico.push({ pergunta, resposta });
  renderizarHistorico();
}

function renderizarHistorico() {
  listaHistorico.innerHTML = "";
  historico.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Pergunta:</strong> <span class="pergunta">${item.pergunta}</span><br>
      <strong>Resposta:</strong> <span class="resposta">${item.resposta}</span>
    `;
    listaHistorico.appendChild(li);
  });
}

async function enviarPergunta() {
  esconderErro();

  const apiKey = apiKeyInput.value.trim();
  const modelo = modeloSelect.value;
  const pergunta = perguntaTextarea.value.trim();

  if (!apiKey)
    return mostrarErro("🔑 Por favor, insira sua API Key para continuar.");
  if (!pergunta)
    return mostrarErro("💬 Por favor, digite uma pergunta antes de continuar.");

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: pergunta }] }] }),
      }
    );

    if (!response.ok) {
      mostrarErro(mensagensErro[response.status] || "Erro desconhecido.");
      respostaDiv.innerText = "Nenhuma resposta recebida.";
      return;
    }

    const data = await response.json();
    const respostaTexto =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Nenhuma resposta recebida.";

    respostaDiv.innerHTML = marked.parse(respostaTexto);
    respostaDiv.style.display = "block";
    containerResposta.scrollIntoView({ behavior: "smooth", block: "end" });

    salvarHistorico(pergunta, respostaTexto);
  } catch (erro) {
    mostrarErro("Erro na conexão. Verifique sua internet e tente novamente.");
    console.error(erro);
    respostaDiv.innerText = "Nenhuma resposta recebida.";
  } finally {
    definirCarregando(false);
  }
}

apiKeyInput.addEventListener("input", () => {
  if (salvarKeyCheckbox.checked) {
    localStorage.setItem("apiKey", apiKeyInput.value.trim());
  } else {
    localStorage.removeItem("apiKey");
  }
});

perguntaTextarea.addEventListener("input", () => {
  contagemCaracteres.textContent = `${perguntaTextarea.value.length}/${MAXIMO_CARACTERES}`;
});

perguntaTextarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    enviarPergunta();
  }
});

btn.addEventListener("click", enviarPergunta);

if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    perguntaTextarea.value = "";
    contagemCaracteres.textContent = `0/${MAXIMO_CARACTERES}`;
    respostaDiv.innerText = "";
    containerResposta.style.display = "none";
  });
}

btnLimparHistorico.addEventListener("click", () => {
  listaHistorico.innerHTML = "";
  historico = [];
});

btnCopiar.addEventListener("click", () => {
  const textoParaCopiar = `${perguntaExibida.innerText}\n${respostaDiv.innerText}`;
  navigator.clipboard.writeText(textoParaCopiar).then(() => {
    alert("Pergunta e resposta copiadas!");
  });
});

const btnExportPDF = document.getElementById("btn-export");

btnExportPDF.addEventListener("click", () => {
  const lista = document.querySelectorAll("#lista-historico li");
  if (lista.length === 0) return alert("Não há histórico para exportar!");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  lista.forEach((item) => {
    const pergunta = item.querySelector(".pergunta")?.textContent || "";
    const resposta = item.querySelector(".resposta")?.textContent || "";
    doc.text(`Pergunta: ${pergunta}`, 10, y);
    y += 10;
    doc.text(`Resposta: ${resposta}`, 10, y);
    y += 15;

    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save("historico.pdf");
});
