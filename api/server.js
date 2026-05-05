const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
// permite que o frontend (rodando em outra origem) acesse a API
app.use(cors());
// rota que retorna todas as citações
app.get('/dados', (req, res) => {
  // monta o caminho absoluto até o arquivo JSON, independente de onde o servidor for iniciado
  const filePath = path.join(__dirname, '../data/dados.json');
  // lê e faz o parse do JSON — readFileSync é síncrono(projeto simples)
  const dados = JSON.parse(fs.readFileSync(filePath));

  res.json(dados);
});
// inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});