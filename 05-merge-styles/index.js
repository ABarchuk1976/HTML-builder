const fsAsync = require('fs').promises;
const path = require('path');

const SOURCE_DIR = 'styles';
const BUNDLE_DIR = 'project-dist';
const BUNDLE_FILE = 'bundle.css';
const sourcePath = path.join(__dirname, SOURCE_DIR);
const bundleFile = path.join(__dirname, BUNDLE_DIR, BUNDLE_FILE);

const createBundle = async () => {
  const files = await fsAsync.readdir(sourcePath, { withFileTypes: true });

  files.forEach(async (file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const data = await fsAsync.readFile(sourcePath + '/' + file.name);
      await fsAsync.appendFile(bundleFile, data);
    }
  });
};

createBundle();
