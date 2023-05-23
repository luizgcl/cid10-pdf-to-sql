import fs from 'node:fs';

const filePath = './cid10.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(`Erro ao ler o arquivo ${filePath}: ${err}`);
    return;
  }

  const lines = data.split('\n');
  let scriptSQL = 'INSERT INTO cid10 (code, description, active) VALUES ';

  lines.forEach((line) => {
    const codeRegex = /^([A-Z]\d{2}(?:\.\d)?)\s*/;
    const descriptionRegex = /^[A-Z]\d{2}(?:\.\d?)?\s*(.*)/;

    const codeMatch = line.match(codeRegex);
    const code = codeMatch ? codeMatch[1] : null;

    const descriptionMatch = line.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[1].trim() : null;

    if (line !== '') {
      scriptSQL += `('${code}', '${description.replace('\'', '\'\'')}', '1'),\n`;
    }
  });

  fs.writeFile('./script.sql', scriptSQL, () => {});
});