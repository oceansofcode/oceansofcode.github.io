/* eslint-disable immutable/no-mutation */
import { promises as fs, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

// Define the widths based on named sizing
const width = {
    small: 1280,
    large: 1920,
};

const imgSrcDir = '../src/images';
const imgDistDir = '../dist/images';

// Ensure the main image dist directory and size subfolders exist
if (!existsSync(imgDistDir)) {
    mkdirSync(imgDistDir);
}

for (const size in width) {
    const sizeDistDir = `${imgDistDir}/${size}`;
    if (!existsSync(sizeDistDir)) {
        mkdirSync(sizeDistDir);
    }
}

const imgs = (await fs.readdir(imgSrcDir, { withFileTypes: true, recursive: true }))
    .filter(dir => !dir.isDirectory())
    .map(file => {
        const name = file.name;
        const path = file.path;
        const fullPath = `${path}/${name}`;

        return {
            name,
            path,
            fullPath
        };
    });

async function* imageFileGenerator(imgs) {
    for (const img of imgs) {
        console.log(`\nYielding ${img.name}`);

        img.contents = await fs.readFile(img.fullPath);
        yield img;
    }
}

// Read each image one at a time from the generator and run sharp on them.
for await (const image of imageFileGenerator(imgs)) {
    for (const size in width) {
        console.log(`Creating ${size} size for image ${image.name}`);

        const imgSizeDistPath = `${imgDistDir}/${size}/${image.name}`.replace(/\.(png|jpg)$/, '.webp');
        console.log(imgSizeDistPath);

        sharp(image.fullPath)
            .resize(width[size])
            .webp({ quality: 80 })
            .toFile(imgSizeDistPath);
    }
}