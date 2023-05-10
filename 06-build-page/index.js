const fsAsync = require('fs').promises;
const path = require('path');

const ASSETS_DIR = 'assets';
const STYLES_DIR = 'styles';
const STYLES_FILE = 'style.css';
const COMPONENTS_DIR = 'components';
const DIST_DIR = 'project-dist';
const TEMP_FILE = 'template.html';
const HTML_FILE = 'index.html';

const assetsPath = path.join(__dirname, ASSETS_DIR);
const stylesPath = path.join(__dirname, STYLES_DIR);
const componentsPath = path.join(__dirname, COMPONENTS_DIR);
const distPath = path.join(__dirname, DIST_DIR);
const stylesFile = path.join(distPath, STYLES_FILE);
const tempFile = path.join(__dirname, TEMP_FILE);
const htmlFile = path.join(distPath, HTML_FILE);

const createHTML = async (createOptions) => {
  const { tempFile, componentsPath, htmlFile } = createOptions;

  await fsAsync.appendFile(htmlFile, '');
  await fsAsync.writeFile(htmlFile, '');

  const tempData = await fsAsync.readFile(tempFile);
  const fragments = tempData.toString().split('{{');

  await fsAsync.writeFile(htmlFile, fragments[0]);

  for (let idx = 1; idx < fragments.length; idx += 1) {
    const parts = fragments[idx].split('}}');
    const componentsFile = `${componentsPath}/${parts[0]}.html`;

    const componentData = await fsAsync.readFile(componentsFile);
    const data = componentData.toString() + ' \n' + parts[1];

    await fsAsync.appendFile(htmlFile, data);
  }
};

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
      const data = await fsAsync.readFile(filePath);

      await fsAsync.writeFile(fileCopyPath, data);
    } else {
      await copyDir({ sourcePath: filePath, copyPath: fileCopyPath });
    }
  });
};

const stylesBundle = async (bundleOptions) => {
  const { stylesPath, stylesFile } = bundleOptions;
  const files = await fsAsync.readdir(stylesPath, { withFileTypes: true });

  await fsAsync.appendFile(stylesFile, '');
  await fsAsync.writeFile(stylesFile, '');

  files.forEach(async (file) => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const data = await fsAsync.readFile(stylesPath + '/' + file.name);
      await fsAsync.appendFile(stylesFile, data);
    }
  });
};

const bundle = async (bundleOptions) => {
  const {
    assetsPath,
    stylesPath,
    stylesFile,
    componentsPath,
    distPath,
    tempFile,
    htmlFile,
  } = bundleOptions;

  await fsAsync.mkdir(distPath, { recursive: true });
  await createHTML({ tempFile, componentsPath, htmlFile });
  await stylesBundle({ stylesPath, stylesFile });
  await copyDir({
    sourcePath: assetsPath,
    copyPath: path.join(distPath, ASSETS_DIR),
  });
};

bundle({
  assetsPath,
  stylesPath,
  stylesFile,
  componentsPath,
  distPath,
  tempFile,
  htmlFile,
});
