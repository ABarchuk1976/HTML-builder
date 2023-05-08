const fsAsync = require('fs').promises;
const path = require('path');

const STYLES_DIR = 'styles';
const DIST_DIR = 'project-dist';
const BUNDLE_CSS = 'bundle.css';
const stylesPath = path.join(__dirname, STYLES_DIR);
const distPath = path.join(__dirname, DIST_DIR);
const stylesFile = path.join(__dirname, DIST_DIR, BUNDLE_CSS);

const stylesBundle = async (bundleOptions) => {
  const { stylesPath, stylesFile } = bundleOptions;

  await fsAsync.mkdir(distPath, { recursive: true });
  const files = await fsAsync.readdir(stylesPath, { withFileTypes: true });

  await fsAsync.appendFile(stylesFile, '');
  await fsAsync.writeFile(stylesFile, '');

  files.forEach(async (file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const data = await fsAsync.readFile(path.join(stylesPath, file.name));
      await fsAsync.appendFile(stylesFile, data);
    }
  });
};

stylesBundle({ stylesPath, stylesFile });
