/* eslint-disable immutable/no-mutation */
import { promises as fs, existsSync, mkdirSync } from 'fs';
import * as sass from 'sass';

const styleSrcDir = '../src/styles';
const styleDistDir = '../dist/styles';

const sheetsDistDir = `${styleDistDir}/sheets`;

const mainSrcName = 'main.scss';
const mainDistName = 'main.css';
const sourceMapUrl = '/*# sourceMappingURL=main.css.map */';

const getSourceMapUrl = mapName => `/*# sourceMappingURL=${mapName} */`;

const sheetsSrcDir = `${styleSrcDir}/sheets`;

const scssOptions = { style: 'compressed', sourceMap: true, sourceMapIncludeSources: true };

if (!existsSync(styleDistDir)) {
    mkdirSync(styleDistDir);
}

if (!existsSync(sheetsDistDir)) {
    mkdirSync(sheetsDistDir);
}

const mainCompiledScss = sass.compile(`${styleSrcDir}/${mainSrcName}`, scssOptions);
mainCompiledScss.css += `\n\n${sourceMapUrl}`;

Promise.all([
    fs.writeFile(`${styleDistDir}/${mainDistName}`, mainCompiledScss.css),
    fs.writeFile(`${styleDistDir}/${mainDistName}.map`, JSON.stringify(mainCompiledScss.sourceMap))
]).then(() => console.log('Wrote main.css and main.css.map'));

const sheetFiles = (await fs.readdir(sheetsSrcDir, { withFileTypes: true, recursive: true }))
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

sheetFiles.forEach(sheetFile => {
    const distDir = sheetFile.fileDistPath.substring(0, sheetFile.fileDistPath.lastIndexOf('/'));

    if (!existsSync(distDir)) {
        mkdirSync(distDir);
    }
});  

const compiledCssFiles = sheetFiles.map(scss => { return { ...scss, compiledCss: (sass.compile(scss.filePath, scssOptions)) }; });

compiledCssFiles.forEach(compiledCssFile => compiledCssFile.compiledCss.css += `\n\n${getSourceMapUrl(compiledCssFile.mapName)}`);

const writeSheetFunctions = compiledCssFiles
    .map(compiledSheet => [() => fs.writeFile(compiledSheet.fileDistPath, compiledSheet.compiledCss.css), () => fs.writeFile(compiledSheet.mapPath, JSON.stringify(compiledSheet.compiledCss.sourceMap))])
    .flat();

Promise.all(writeSheetFunctions.map(writeCss => writeCss()))
    .then(() => console.log('Wrote style sheet'));