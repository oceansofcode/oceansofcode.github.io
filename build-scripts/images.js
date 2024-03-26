import { promises as fs, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

// TODO: Have this spit out multiple image sizes to use as src sets
/*imagemin(['src/images/*.{jpg,png}'], {
    destination: 'dist/images',
    plugins: [
        webp({
            quality: 50,
            method: 6,
            resize: { width: 1280, height: 1080 }
        })
    ]
});
*/

const largeWidth = 1280;
const smallWidth = 400;

const imgSrcDir = '../src/images';
const imgDistDir = '../dist/images';

if (!existsSync(imgDistDir)) {
    mkdirSync(imgDistDir);
}

const imgs = (await fs.readdir(imgSrcDir, { withFileTypes: true, recursive: true }))
    .filter(dir => !dir.isDirectory())
    .map(img => `${img.path}/${img.name}`);

console.log(imgs);