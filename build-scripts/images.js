import imagemin from 'imagemin';
import webp from 'imagemin-webp';

// TODO: Have this spit out multiple image sizes to use as src sets
imagemin(['src/images/*.{jpg,png}'], {
    destination: 'dist/images',
    plugins: [
        webp({
            quality: 50,
            method: 6,
            resize: { width: 1280, height: 1080 }
        })
    ]
});