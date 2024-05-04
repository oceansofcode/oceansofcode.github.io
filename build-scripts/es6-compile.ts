/* eslint-disable immutable/no-mutation */
import { promises as fs, existsSync, mkdirSync } from 'fs';
import { MinifyOutput, minify } from 'terser';

// Assumes tsc has already been run and the compiled TS is in the ./build directory
// TODO: Move JS from src -> dist
const scriptSrcDir = '../src/scripts';
const scriptBuildDir = '../build/scripts';
const scriptDistDir = '../dist/scripts';
const es5Path = '/es5';

if (!existsSync(scriptDistDir)) {
    mkdirSync(scriptDistDir);
}

const readScriptDir = async directory => fs.readdir(directory, { withFileTypes: true, recursive: true });

// Manually move any precompiled / minified JS in the src directory. i.e. polyfills.
(await readScriptDir(scriptSrcDir))
    .filter(dir => !dir.isDirectory() && dir.name.includes('.js'))
    .forEach(jsFile => {
        const filePath = `${jsFile.path}/${jsFile.name}`;
        fs.readFile(filePath, { encoding: 'utf-8' })
            .then(readFile => fs.writeFile(filePath.replace(scriptSrcDir, scriptDistDir), readFile));
    });


// Read the buildDir recursively to get every compiled js file excluding it's map.
const buildDirFiles = (await readScriptDir(scriptBuildDir))
    .filter(dir => !dir.isDirectory() && !dir.path.includes(es5Path) && !dir.name.includes('.js.map'))
    .map(file => {
        const fileName = file.name;
        const filePath = `${file.path}/${fileName}`;
        const mapName = `${fileName}.map`;
        const mapPath = `${filePath}.map`;
        const fileDistPath = filePath.replace(scriptBuildDir, scriptDistDir);
        const mapDistPath = mapPath.replace(scriptBuildDir, scriptDistDir);

        return {
            fileName,
            mapName,
            filePath,
            mapPath,
            fileDistPath,
            mapDistPath
        };
    }
    );

// TODO: This may fail if there is a nested directory
// Create the distribution directory for each file if it doesn't exist
buildDirFiles.forEach(buildDirFile => {
    const distDir = buildDirFile.fileDistPath.substring(0, buildDirFile.fileDistPath.lastIndexOf('/'));

    if (!existsSync(distDir)) {
        mkdirSync(distDir);
    }
});

// Generator function to add the contents of the file to the buildFile object
async function* fileContents(buildFiles) {
    for (const buildFile of buildFiles) {
        buildFile.fileContent = await fs.readFile(buildFile.filePath, { encoding: 'utf8' });
        buildFile.mapContent = await fs.readFile(buildFile.mapPath, { encoding: 'utf-8' });
        yield buildFile;
    }
}

// Consumes the fileContents generator to add source maps and minify the JS
for await (const buildFile of fileContents(buildDirFiles)) {
    const minifyOptions = {
        module: true,
        sourceMap: {
            content: buildFile.mapContent,
            url: buildFile.mapName
        }
    };

    const minifiedContent: MinifyOutput = await minify(buildFile.fileContent, minifyOptions);

    await Promise.all([
        fs.writeFile(buildFile.fileDistPath, minifiedContent.code as string),
        fs.writeFile(buildFile.mapDistPath, minifiedContent.map as string)
    ]);

    // Outputs the compression ratio
    const stats = await Promise.all([
        fs.stat(buildFile.filePath),
        fs.stat(buildFile.fileDistPath)
    ]);

    const buildSize = stats[0].size;
    const distSize = stats[1].size;

    const reduction = ((((distSize / buildSize) * 100) - 100) * -1).toFixed(0);

    console.log(`${buildFile.fileName} - ${buildSize} => ${distSize} Reduction of ${reduction}%\n`);
}
