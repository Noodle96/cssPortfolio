const {src,dest,watch,series, parallel} = require('gulp');
// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
    //COMPILAR SASS
    // 1 IDENTIFICAR EL ARCHIVO SASS
    // 2 COMPILAR ESE ARCHIVO
    // 3 GUARDAR EL CSS

    // add this on end to package.json
    // "browserlists":[
    //     "last 1 version",
    //     "> 1%"
    //   ]
    src('src/scss/app.scss')
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();
}
function imagenes(done){
    src('src/img/club/**/*')
        .pipe(imagemin({optimizationLevel:3}))
        .pipe(dest('build/img/'));
    done();
}

function versionWebp(){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}
function versionAvif(){
    const opciones = {
        quality:50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

function dev(){
    watch('src/scss/**/*.scss',css);
    watch('src/img/club/**/*',imagenes);
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
// exports.versionWebp = versionWebp;
// exports.versionAvif = versionAvif;
// exports.default = series(imagenes, versionWebp, versionAvif, css,dev); // inicia las tareas serialmente
exports.default = series(imagenes, css,dev); // inicia las tareas serialmente
// exports.default = parallel(css,dev); // Inicia las tareas paralelamente