const path = require('path');
const fsAsync = require('fs').promises;

const TASK_FILE = 'text.txt';
const filePath = path.join(__dirname, `${TASK_FILE}`);
let text = '';

const readStream = async (filePath) => {
  const file = await fsAsync.open(filePath);
  const stream = file.createReadStream({ encoding: 'utf8' });

  stream.on('data', (chunk) => (text += chunk));
  stream.on('end', () => console.log(text));
};

readStream(filePath);
