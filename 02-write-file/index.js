const fsAsync = require('fs').promises;
const path = require('path');
const { stdin: input, stdout: output, exit } = require('process');
const readline = require('readline');

const TASK_FILE = 'text.txt';
const filePath = path.join(__dirname, `${TASK_FILE}`);

const writeStream = async (filePath) => {
  await fsAsync.appendFile(filePath, '');
  await fsAsync.writeFile(filePath, '');

  const inputLine = readline.createInterface({ input, output });

  output.write(
    'Type your text below. For quit press Ctrl + C or type "exit"\n'
  );

  inputLine.on('line', async (line) => {
    if (line.trim() === 'exit') exit();
    await fsAsync.appendFile(filePath, line + '\n');
  });

  process.on('exit', () => console.log('Operation terminated. See you later.'));
  process.on('SIGINT', exit);
};

writeStream(filePath);
