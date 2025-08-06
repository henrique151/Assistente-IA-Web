# 🤖 Assistente de IA Web

Este projeto é uma aplicação web fullstack desenvolvida com **HTML**, **CSS** e **JavaScript puro** (sem frameworks), com o objetivo de criar um assistente de IA funcional que se conecta à API da **OpenAI** ou **Google Gemini**.

## 📌 Visão Geral

Este projeto faz parte das Aulas 22 e 25 do curso, onde foi proposto desenvolver uma aplicação completa com integração a APIs de inteligência artificial. A aplicação permite ao usuário digitar uma pergunta, enviar para a IA, e receber uma resposta formatada e interativa.

---

## 🎯 Objetivos Gerais

Ao final do projeto, os participantes aprenderam a:

- Criar uma aplicação web interativa do zero
- Integrar com APIs externas (OpenAI/Gemini)
- Implementar validação de formulários
- Gerenciar estados de carregamento e erro

---

## 📂 Estrutura do Projeto

O projeto está organizado com uma estrutura simples e funcional, contendo os seguintes arquivos na pasta raiz:

```bash
assistente-ia-web/
│-- index.html
│-- style.css
│-- script.js
```

---

## 🧠 Conceitos Aplicados

- **HTML5**: Estruturação da interface
- **CSS3**: Estilização responsiva e visual agradável
- **JavaScript (Vanilla)**: Lógica da aplicação, manipulação do DOM, integração com APIs
- **API Fetch + async/await**: Comunicação assíncrona com OpenAI/Gemini
- **Validação de formulários**: Garantia de dados obrigatórios
- **localStorage**: Salvamento da API Key do usuário
- **Clipboard API**: Copiar resposta da IA
- **Acessibilidade e UX**: Foco em boa experiência do usuário

---

## ✅ Requisitos e Responsáveis

### Requisitos Básicos

| Requisito                   | Responsável     |
| --------------------------- | --------------- |
| Estrutura HTML Básica e CSS | Isadora, Camila |
| Interface de Entrada        | Geraldo         |
| Exibição da Resposta        | Jéssica         |
| Integração com API da IA    | Andreza         |

### Requisitos Extras

| Requisito              | Responsável |
| ---------------------- | ----------- |
| Estados e Validação    | Henrique    |
| Melhorias na Interface | Sabrina     |

---

## 📦 GitHub

| Tarefa                 | Responsável |
| ---------------------- | ----------- |
| Gerente do Repositório | Henrique    |

---

## ⚙️ Configuração e Uso

### Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git instalado na sua máquina
- Uma chave de API da [OpenAI](https://platform.openai.com/) ou do [Google AI Studio (Gemini)](https://aistudio.google.com/)

### 📋 Fluxo da Aplicação

1. O usuário obtém uma chave de API (OpenAI ou Gemini)
2. Abre a aplicação no navegador
3. Insere a chave de API no campo apropriado
4. Digita uma pergunta e clica em "Perguntar"
5. A aplicação envia os dados para a API
6. A resposta da IA é exibida na tela

### 🚀 Como Rodar o Projeto

1. **Clone o repositório:**

```bash
git clone git@github.com:henrique151/Assistente-IA-Web.git
```

2. **Acesse a pasta do projeto:**

```bash
cd Assistente-IA-Web
```

3. **Abra o arquivo `index.html`:**

> Como o projeto utiliza apenas HTML, CSS e JavaScript puros, não há necessidade de instalar dependências ou iniciar um servidor. Basta abrir o arquivo `index.html` diretamente no seu navegador.

---

## 🌿 Git e GitHub — Guia Rápido para Colaboradores

### 👩‍💻 Parte 1: Como Criar um Branch (Nova funcionalidade ou correção)

1. **Abra o terminal ou Git Bash na pasta do projeto.**

2. **Vá para a branch principal (main) e atualize:**

```bash
git checkout main      # Vai para a branch principal
git pull origin main   # Puxa as atualizações mais recentes do GitHub
```

3. **Crie uma nova branch com um nome descritivo:**

```bash
git checkout -b nome-do-seu-branch
```

> ✅ Exemplo:

```bash
git checkout -b atulizacaoREADME
```

Esse comando cria e já muda para essa nova branch.

4. **Trabalhe normalmente no seu código.**
   Faça as alterações necessárias nos arquivos.

5. **Adicione e salve as alterações com um commit:**

```bash
git add .                               # Adiciona todos os arquivos alterados
git commit -m "tarefa: atulizacaoREADME"  # Mensagem clara do que foi feito
```

6. **Envie sua branch para o GitHub:**

```bash
git push -u origin nome-do-seu-branch
```

> ✅ Exemplo:

```bash
git push -u origin atulizacaoREADME
```

Pronto! Sua branch já está no GitHub.

---

## 🚀 Parte 2: Como Fazer um Pull Request (PR)

> _Pull Request (PR) é como você avisa ao time que terminou uma parte do projeto e quer juntar com a versão principal (`main`)._

---

## 1. Envie sua branch para o GitHub

No terminal, depois de criar sua branch e fazer suas alterações, envie sua branch com:

```bash
git push -u origin nome-da-sua-branch
```

> ✅ Exemplo:

```bash
git push -u origin atulizacaoREADME
```

---

## 2. Clique no link para criar o Pull Request

Assim que você rodar o comando acima, o terminal mostrará um ou dois links, parecido com isso:

```
https://github.com/usuario/nome-do-repositorio/tree/nome-da-sua-branch
https://github.com/usuario/nome-do-repositorio/pull/new/nome-da-sua-branch
```

> ✅ Exemplo:

```
https://github.com/henrique151/assistente-ia-web/tree/atulizacaoREADME
https://github.com/henrique151/assistente-ia-web/pull/new/atulizacaoREADME
```

👉 **Clique no segundo link** (que termina com `/pull/new/nome-da-sua-branch`) para ir direto para a página de criação do Pull Request.

## 3. Preencha as informações do Pull Request

- **Título:** Escreva um resumo do que fez
  Exemplo:

  ```
  tarefa: adiciona interface de entrada com validação
  ```

- **Descrição:** Explique o que você mudou e por quê
  Exemplo:

  ```
  Criei a interface para o usuário digitar a pergunta.
  Adicionei validação para não enviar campo vazio.
  Também implementei o campo para inserir a API Key.
  ```

---

## 4. Clique em “Create pull request”

Depois de preencher tudo, clique no botão verde:
➡️ **Create pull request**

---

## 5. ❗ E se o link “Compare & pull request” **não aparecer**?

Você pode criar o Pull Request manualmente indo direto no repositório no GitHub do criador do repositório.

[https://github.com/usuario/nome-do-repositorio/](https://github.com/usuario/nome-do-repositorio)

> ✅ Exemplo:

[https://github.com/henrique151/assistente-ia-web](https://github.com/henrique151/assistente-ia-web)

Siga este caminho manualmente:

1. Clique na aba **“Pull requests”** (fica no topo, perto de "Code")
2. Clique em **“New pull request”**
3. Agora, configure assim:

   - **base:** `main`
   - **compare:** `nome-da-sua-branch` (a branch que você criou)

🔰 Exemplo:

```
base: main
compare: atualizacaoREADME
```

Aparecerá a diferença entre os códigos. Se tudo estiver certo, clique no botão **“Create pull request”**.

---

### 6. Preencha os detalhes do PR

Na tela de Pull Request, preencha:

- **Título:** Escreva um resumo do que fez
  Exemplo:

  ```
  tarefa: adiciona interface de entrada com validação
  ```

- **Descrição:** Explique o que você mudou e por quê
  Exemplo:

  ```
  Criei a interface para o usuário digitar a pergunta.
  Adicionei validação para não enviar campo vazio.
  Também implementei o campo para inserir a API Key.
  ```

---

### 🔹 6. Clique em “Create pull request”

Depois de preencher tudo, clique no botão verde:
➡️ **Create pull request**

---

## 📄 Licença

Este projeto está sob a **licença MIT**.
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
