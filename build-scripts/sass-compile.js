/* eslint-disable immutable/no-mutation */
import { promises as fs, existsSync, mkdirSync } from 'fs';
import * as sass from 'sass';

const styleSrcDir = '../src/styles';
const styleDistDir = '../dist/styles';

const pagesDistDir = `${styleDistDir}/pages`;

const mainSrcName = 'main.scss';
const mainDistName = 'main.css';
const sourceMapUrl = '/*# sourceMappingURL=main.css.map */';

const getSourceMapUrl = mapName => `/*# sourceMappingURL=${mapName} */`;

const pagesDir = `${styleSrcDir}/pages`;

const scssOptions = { style: 'compressed', sourceMap: true, sourceMapIncludeSources: true };

if (!existsSync(styleDistDir)) {
    mkdirSync(styleDistDir);
}

if (!existsSync(pagesDistDir)) {
    mkdirSync(pagesDistDir);
}

const mainCompiledScss = sass.compile(`${styleSrcDir}/${mainSrcName}`, scssOptions);
mainCompiledScss.css += `\n\n${sourceMapUrl}`;

Promise.all([
    fs.writeFile(`${styleDistDir}/${mainDistName}`, mainCompiledScss.css),
    fs.writeFile(`${styleDistDir}/${mainDistName}.map`, JSON.stringify(mainCompiledScss.sourceMap))
]).then(() => console.log('Wrote main.css and main.css.map'));

const pageScssFiles = (await fs.readdir(pagesDir, { withFileTypes: true, recursive: true }))
    .filter(dir => !dir.isDirectory())
    .map(file => {
        const srcFileName = file.name;
        const distFileName = srcFileName.replace('.scss', '.css');
        const filePath = `${file.path}/${srcFileName}`;
        const fileDistPath = filePath.replace(styleSrcDir, styleDistDir).replace('.scss', '.css');
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

pageScssFiles.forEach(pageScssFile => {
    const distDir = pageScssFile.fileDistPath.substring(0, pageScssFile.fileDistPath.lastIndexOf('/'));

    if (!existsSync(distDir)) {
        mkdirSync(distDir);
    }
});  

const compiledPagesCss = pageScssFiles.map(scss => { return { ...scss, compiledCss: (sass.compile(scss.filePath, scssOptions)) }; });

compiledPagesCss.forEach(compiledPageCss => compiledPageCss.compiledCss.css += `\n\n${getSourceMapUrl(compiledPageCss.mapName)}`);

const writePagesCssFunctions = compiledPagesCss
    .map(compiledPage => [() => fs.writeFile(compiledPage.fileDistPath, compiledPage.compiledCss.css), () => fs.writeFile(compiledPage.mapPath, JSON.stringify(compiledPage.compiledCss.sourceMap))])
    .flat();

Promise.all(writePagesCssFunctions.map(writePagesCssFunction => writePagesCssFunction()))
    .then(() => console.log('Wrote pages CSS'));