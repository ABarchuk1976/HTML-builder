const path = require('path');
const fsAsync = require('fs/promises');

const TASK = '01-read-file';
const TASK_FILE = 'text.txt';
const filePath = path.join(__dirname, `${TASK_FILE}`);
const text = [];

const readStream = async (filePath) => {
  const file = await fsAsync.open(filePath);
  const stream = file.createReadStream({ encoding: 'utf8' });

  stream.on('data', (part) => text.push(part));
  stream.on('end', () => console.log(text.join('')));
};

readStream(filePath);
