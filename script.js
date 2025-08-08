document.getElementById("btn-perguntar").addEventListener("click", async () => {
  const apiKey = document.getElementById("api-key").value.trim();
  const modelo = document.getElementById("modelo-gemini").value;
  const pergunta = document.getElementById("pergunta").value.trim();

  if (!apiKey) {
    alert("Por favor, insira sua API Key.");
    return;
  }

  if (!pergunta) {
    alert("Digite uma pergunta.");
    return;
  }

  /*  let respostaDiv = document.getElementById("resposta");
  if (!respostaDiv) {
    respostaDiv = document.createElement("div");
    respostaDiv.id = "resposta";
    respostaDiv.classList.add("resposta");
    document.querySelector(".conteudo").appendChild(respostaDiv);
  } */

  // Pega os elementos do box de resposta
  const respostaBox = document.getElementById("resposta-ia");
  const respostaTextoDiv = document.getElementById("texto-resposta");

  respostaBox.style.display = "block";
  respostaTextoDiv.innerText = "Carregando resposta...";

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

    const data = await response.json();

    const respostaTexto =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Nenhuma resposta recebida.";

    respostaTextoDiv.innerText = respostaTexto;
  } catch (erro) {
    respostaTextoDiv.innerText =
      "Erro ao acessar a API. Verifique sua chave e tente novamente.";
    console.error(erro);
  }
});
