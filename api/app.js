const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Caminho absoluto para a pasta do projeto
const rootDir = path.join(__dirname, '../');

// Servir os arquivos estáticos da interface Astro (build)
app.use(express.static(path.join(rootDir, 'dist')));

// Ler o arquivo JSON de notícias
function getNews() {
    const filePath = path.join(rootDir, 'public/data', 'News.json'); // Apontar para a pasta correta
    if (!fs.existsSync(filePath)) {
        return { error: 'File not found' };
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// Rota da API para obter as notícias
app.get('/api/news', (req, res) => {
    const news = getNews();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(news, null, 2));
});

// Redirecionar todas as outras rotas para o index.html (SPA do Astro)
app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'dist', 'index.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
