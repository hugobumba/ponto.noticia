const fs = require('fs');
const path = require('path');
const scrapeObservador = require('./scrapers/scrapeObservador');
const scrapeCmJornal = require('./scrapers/scrapeCmJornal');
const scrapeSicNoticias = require('./scrapers/scrapeSicNoticias');
const scrapeCnnPortugal = require('./scrapers/scrapeCnnPortugal');
const scrapeRtp = require('./scrapers/scrapeRtp');
const scrapeEuroNews = require('./scrapers/scrapeEuroNews');

async function mainScraper() {
    // Caminho completo para a pasta 'data' e o arquivo 'news.json'
    const jsonFilePath = path.join(__dirname, 'data', 'news.json');

    const results = await Promise.all([
        scrapeObservador(),
        scrapeCmJornal(),
        scrapeSicNoticias(),
        scrapeCnnPortugal(),
        scrapeRtp(),
        scrapeEuroNews(),
    ]);

    const allNews = results.flat();

    // Garantir que a pasta 'data' exista
    if (!fs.existsSync(path.join(__dirname, 'data'))) {
        fs.mkdirSync(path.join(__dirname, 'data'));
    }

    // Escrever o arquivo JSON na pasta 'data'
    fs.writeFileSync(jsonFilePath, JSON.stringify(allNews, null, 2), 'utf-8');
    console.log('Done! Check: ' + jsonFilePath);
}

mainScraper();
