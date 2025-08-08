document.getElementById("btn-perguntar").addEventListener("click", async () => {
  const apiKey = document.getElementById("api-key").value.trim();
  const modelo = document.getElementById("modelo-gemini").value;
  const pergunta = document.getElementById("pergunta").value.trim();
  const btn = document.getElementById("btn-perguntar");
  
  let respostaDiv = document.getElementById("resposta");
  if (!respostaDiv) {
    respostaDiv = document.createElement("div");
    respostaDiv.id = "resposta";
    respostaDiv.classList.add("resposta");
    document.querySelector(".conteudo").appendChild(respostaDiv);
  }

  // Função para exibir mensagens
  const mostrarMensagem = (mensagem, tipo = "info") => {
    respostaDiv.innerHTML = `<p class="${tipo}">${mensagem}</p>`;
  };

  // Validações
  if (!apiKey) return mostrarMensagem("🔑 Por favor, insira sua API Key.", "erro");
  if (!pergunta) return mostrarMensagem("💬 Digite uma pergunta antes de continuar.", "erro");

  // Desativar botão e mostrar carregamento
  btn.disabled = true;
  mostrarMensagem("<span class='loading'></span> Carregando resposta...");


  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: pergunta }]
        }]
      })
    });

    const data = await response.json();

    const respostaTexto = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Nenhuma resposta recebida.";
    respostaDiv.innerText = respostaTexto;

  } catch (erro) {
    respostaDiv.innerText = "Erro ao acessar a API. Verifique sua chave e tente novamente.";
    console.error(erro);
  }
});
