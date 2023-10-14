/* eslint-disable immutable/no-mutation */
import { promises as fs, existsSync, mkdirSync } from 'fs';
import * as sass from 'sass';

const srcDir = '../src/styles';
const distDir = '../dist/styles';
const pagesDistDir = `${distDir}/pages`;
const mainSrcName = 'main.scss';
const mainDistName = 'main.css';
const sourceMapUrl = '/*# sourceMappingURL=main.css.map */';

const getSourceMapUrl = mapName => `/*# sourceMappingURL=${mapName} */`;

const pagesDir = `${srcDir}/pages`;

const scssOptions = { style: 'compressed', sourceMap: true, sourceMapIncludeSources: true };

if (!existsSync(distDir)) {
    mkdirSync(distDir);
}

if (!existsSync(pagesDistDir)) {
    mkdirSync(pagesDistDir);
}

const mainCompiledScss = sass.compile(`${srcDir}/${mainSrcName}`, scssOptions);
mainCompiledScss.css += `\n\n${sourceMapUrl}`;

Promise.all([
   fs.writeFile(`${distDir}/${mainDistName}`, mainCompiledScss.css),
   fs.writeFile(`${distDir}/${mainDistName}.map`, JSON.stringify(mainCompiledScss.sourceMap))
]).then(() => console.log('Wrote main.css and main.css.map'));

const pageScssFiles = (await fs.readdir(pagesDir, { withFileTypes: true, recursive: true}))
    .filter(dir => !dir.isDirectory())
    .map(file => {
        const srcFileName = file.name;
        const distFileName = srcFileName.replace('.scss', '.css');
        const filePath = `${file.path}/${srcFileName}`;
        const fileDistPath = filePath.replace(srcDir, distDir).replace('.scss', '.css');
        const mapName = `${distFileName}.map`;
        const mapPath = `${fileDistPath}.map`;

        return {
            srcFileName,
            distFileName,
            filePath,
            fileDistPath,
            mapName,
            mapPath

        };
    });

const compiledPagesCss = pageScssFiles.map(scss => { return { ...scss, compiledCss: (sass.compile(scss.filePath, scssOptions)) };});

compiledPagesCss.forEach(compiledPageCss => compiledPageCss.compiledCss.css += `\n\n${getSourceMapUrl(compiledPageCss.mapName)}`);

const writePagesCssFunctions = compiledPagesCss
    .map(compiledPage => [() => fs.writeFile(compiledPage.fileDistPath, compiledPage.compiledCss.css), () => fs.writeFile(compiledPage.mapPath, JSON.stringify(compiledPage.compiledCss.sourceMap))])
    .flat();

Promise.all(writePagesCssFunctions.map(writePagesCssFunction => writePagesCssFunction()))
    .then(() => console.log('Wrote pages CSS'));