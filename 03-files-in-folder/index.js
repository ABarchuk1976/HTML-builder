const fsAsync = require('fs').promises;
const path = require('path');

const dirPath = path.join(__dirname, './secret-folder');

const readFiles = async (dirPath) => {
  const files = await fsAsync.readdir(dirPath);

  files.forEach(async (file) => {
    try {
      const fileStats = await fsAsync.stat(dirPath + '/' + file);
      if (fileStats.isFile()) {
        const idx = file.lastIndexOf('.');
        const fileName = file.substring(0, idx);
        const ext = file.substring(idx + 1);
        const fileSize = String(fileStats.size / 1024) + ' Kb';

        console.log(`${fileName} - ${ext} - ${fileSize}`);
      }
    } catch (error) {
      console.log('Mistake');
    }
  });
};

readFiles(dirPath);
