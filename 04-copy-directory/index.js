const fsAsync = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

const copyDir = async (copyOptions) => {
  const { sourcePath, copyPath } = copyOptions;
  await fsAsync.rm(copyPath, { recursive: true, force: true });
  await fsAsync.mkdir(copyPath, { recursive: true, force: true });

  const files = await fsAsync.readdir(sourcePath);

  files.forEach(async (file) => {
    const filePath = path.join(sourcePath, file);
    const fileCopyPath = path.join(copyPath, file);

    const stats = await fsAsync.stat(filePath);

    if (stats.isFile()) {
      fsAsync.copyFile(filePath, fileCopyPath);
    }
  });
};

copyDir({ sourcePath, copyPath });
