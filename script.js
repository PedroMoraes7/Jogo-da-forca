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

const chosenWord = words[Math.floor(Math.random() * words.length)];
const wordDisplay = document.querySelector(".word");

wordDisplay.textContent = Array(chosenWord.length).fill("_").join(" ");