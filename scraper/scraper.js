const puppeteer = require('puppeteer');
const fs = require('fs');

async function coletarDados() {
  // abre uma instância do navegador em segundo plano
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let todosDados = [];

    // percorre as páginas 1 até 5 do site
  for (let i = 1; i <= 5; i++) {
    await page.goto(`https://quotes.toscrape.com/page/${i}`);

        // page.evaluate executa código dentro do navegador (tem acesso ao DOM)
    // o segundo argumento (i) é passado como parâmetro para dentro da função
    
    const dados = await page.evaluate((paginaAtual) => {
      // seleciona todos os blocos de citação da página
      const quotes = document.querySelectorAll('.quote');

      return Array.from(quotes).map(q => ({
        texto: q.querySelector('.text')?.innerText || "",
        autor: q.querySelector('.author')?.innerText || "",
        linkAutor: q.querySelector('a')?.href || "",
        // coleta todas as tags e retorna só o texto de cada uma
        tags: Array.from(q.querySelectorAll('.tag')).map(t => t.innerText),
        pagina: paginaAtual
      }));
    }, i);
      // junta os dados dessa página com os das anteriores
    todosDados = [...todosDados, ...dados];
  }
// salva tudo em um arquivo JSON formatado (null, 2 = indentação de 2 espaços)
  fs.writeFileSync('./data/dados.json', JSON.stringify(todosDados, null, 2));

  console.log('Dados salvos');
  await browser.close();
}

coletarDados();