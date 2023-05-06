const fsAsync = require('fs').promises;
const path = require('path');

const currentPath = path.join(__dirname, './files');
const copyPath = path.join(__dirname, './files-copy');

const copyDir = async (path, copyPath) => {
  await fsAsync.mkdir(copyPath, { recursive: true });

  const files = await fsAsync.readdir(path);

  files.forEach(async (file) => {
    const filePath = path + '/' + file;
    const fileCopyPath = copyPath + '/' + file;

    const stats = await fsAsync.stat(filePath);

    if (stats.isFile()) {
      const data = await fsAsync.readFile(filePath);

      await fsAsync.writeFile(fileCopyPath, data);
    } else {
      await copyDir(filePath, fileCopyPath);
    }
  });
};

copyDir(currentPath, copyPath);
