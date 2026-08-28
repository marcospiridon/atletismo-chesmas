const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servir os ficheiros estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Redirecionar todas as outras rotas para o index.html (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor de produção a correr na porta ${PORT}`);
});
