const words = [
  "sol",
  "gato",
  "livro",
  "escola",
  "abacaxi",
  "cachorro",
  "bicicleta",
  "computador",
  "maravilhoso",
  "independente",
];

const wordDisplay = document.getElementById("palavra");
const errorsDisplay = document.getElementById("erros");
const keyboard = document.getElementById("teclado");
const messageDisplay = document.getElementById("mensagem");
const newGameContainer = document.getElementById("novo-jogo");
const state = {
  palavra: sortearPalavra(),
  acertos: [],
  erros: [],
};

function sortearPalavra() {
  return words[Math.floor(Math.random() * words.length)];
}

function normalizar(letra) {
  return letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function jogarLetra(letra, button) {
  const letraNormalizada = normalizar(letra);
  button.disabled = true;

  if ([...state.palavra].some((item) => normalizar(item) === letraNormalizada)) {
    state.acertos.push(letraNormalizada);
  } else {
    state.erros.push(letra);
    errorsDisplay.textContent = state.erros.join(" ");
  }

  wordDisplay.textContent = [...state.palavra]
    .map((item) =>
      state.acertos.includes(normalizar(item)) ? item : "_"
    )
    .join(" ");

  verificarFim();
}

function verificarFim() {
  const venceu = [...state.palavra].every((letra) =>
    state.acertos.includes(normalizar(letra))
  );

  if (venceu || state.erros.length >= 6) {
    messageDisplay.textContent = venceu
      ? "Você venceu!"
      : `Fim de jogo! A palavra era ${state.palavra}.`;
    keyboard.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
    newGameContainer.textContent = "";
    const newGameButton = document.createElement("button");
    newGameButton.type = "button";
    newGameButton.textContent = "Novo jogo";
    newGameButton.addEventListener("click", reiniciar);
    newGameContainer.append(newGameButton);
  }
}

function reiniciar() {
  state.palavra = sortearPalavra();
  state.acertos = [];
  state.erros = [];
  wordDisplay.textContent = Array.from(state.palavra, () => "_").join(" ");
  errorsDisplay.textContent = "";
  messageDisplay.textContent = "";
  keyboard.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
  newGameContainer.textContent = "";
}

wordDisplay.textContent = Array.from(state.palavra, () => "_").join(" ");
keyboard.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => jogarLetra(button.textContent, button));
});