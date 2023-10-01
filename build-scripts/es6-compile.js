/* eslint-disable immutable/no-mutation */
import { promises as fs } from 'fs';
import { minify } from 'terser';

// Assumes tsc has already been run and the compiled TS is in the ./build directory
const distDir = '../dist/scripts';
const buildDir = '../build/scripts';
const es5Path = '/es5';

const buildDirFiles = (await fs.readdir(buildDir, { withFileTypes: true, recursive: true }))
    .filter(dir => !dir.isDirectory() && !dir.path.includes(es5Path) && !dir.name.includes('.js.map'))
    .map(file => {
        const fileName = file.name;
        const filePath = `${file.path}/${fileName}`;
        const mapName = `${fileName}.map`;
        const mapPath = `${filePath}.map`;
        const fileDistPath = filePath.replace(buildDir, distDir);
        const mapDistPath = mapPath.replace(buildDir, distDir);

        return {
            fileName,
            mapName,
            filePath,
            mapPath,
            fileDistPath,
            mapDistPath
        };
    });

async function* fileContents(buildFiles) {
    for (const buildFile of buildFiles) {
        buildFile.fileContent = await fs.readFile(buildFile.filePath, { encoding: 'utf8' });
        buildFile.mapContent = await fs.readFile(buildFile.mapPath, { encoding: 'utf-8' });
        yield buildFile;
    }
}

for await (const buildFile of fileContents(buildDirFiles)) {
    const minifyOptions = {
        module: true,
        sourceMap: {
            content: buildFile.mapContent,
            url: buildFile.mapName
        }
    };

    const minifiedContent = await minify(buildFile.fileContent, minifyOptions);

    await Promise.all([
        fs.writeFile(buildFile.fileDistPath, minifiedContent.code),
        fs.writeFile(buildFile.mapDistPath, minifiedContent.map)
    ]);
    
    const stats = await Promise.all([
        fs.stat(buildFile.filePath),
        fs.stat(buildFile.fileDistPath)
    ]);

    const buildSize = stats[0].size;
    const distSize = stats[1].size;

    console.log(`${buildFile.fileName} - ${buildSize} => ${distSize} Reduction of ${(((distSize / buildSize) * 100).toFixed(0) - 100) * -1}%\n`);
}
