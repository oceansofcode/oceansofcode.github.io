import imagemin from 'imagemin';
import webp from 'imagemin-webp';

imagemin(['src/images/*.{jpg,png}'], {
    destination: 'dist/images',
    plugins: [
        webp({
            quality: 50,
            method: 6
        })
    ]
}).then(() => console.log('Images optimized'));