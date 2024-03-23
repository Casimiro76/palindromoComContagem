const express = require('express');
const bodyParser = require('body-parser');
const diacritics = require('diacritics');

const app = express();
const port = 3000;

// Middleware para analisar o corpo da solicitação como JSON
app.use(bodyParser.json());

// Rota POST para analisar a string e fornecer resultados
app.post('/analyze', (req, res) => {
  const input = req.body.input || '';

  // Limpar a string removendo espaços, pontuações e acentos
  const cleanedInput = removeSpecialCharacters(input);

  // Contagem de ocorrências de cada caractere
  const characterCount = countCharacters(cleanedInput);

  // Verificar se é um palíndromo
  const isPalindrome = checkPalindrome(cleanedInput);

  // Formatar a resposta no formato JSON especificado
  const response = {
    palindromo: isPalindrome,
    ocorrencias_caracteres: characterCount
  };

  res.json(response);
});

// Função para remover espaços, pontuações e acentos da string
function removeSpecialCharacters(str) {
  return diacritics.remove(str.replace(/\s+/g, '').replace(/[^\w\s]/gi, ''));
}

// Função para contar as ocorrências de cada caractere na string
function countCharacters(str) {
  const characterCount = {};
  for (let char of str) {
    characterCount[char] = (characterCount[char] || 0) + 1;
  }
  return characterCount;
}

// Função para verificar se a string é um palíndromo
function checkPalindrome(str) {
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
