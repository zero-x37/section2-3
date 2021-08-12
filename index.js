const fetch = require('node-fetch');
const cheerio = require('cheerio');

let id = process.argv.slice(2)[0];

(async () => {
  const opts = {
    headers: {
      cookie: 'hasCookie=true',
    },
  };
  fetch('https://codequiz.azurewebsites.net/', opts)
    .then((res) => res.text())
    .then((body) => {
      const $ = cheerio.load(body);
      const rows = {};
      const tr = $('tr').toArray();
      tr.forEach((e) => {
        const row = [];
        $(e)
          .find('td')
          .toArray()
          .forEach((el) => {
            row.push($(el).text().replace(' ', ''));
          });
        if (row[0]) {
          rows[row[0]] = row[1];
        }
      });
      console.log(rows[id]);
    });
})();
