const {src,dest,watch,series, parallel} = require('gulp');
// CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//IMAGENES
const imagemin = require('gulp-imagemin');

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
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel:3}))
        .pipe(dest('build/img'));
    done();
}
function dev(){
    watch('src/scss/**/*.scss',css);
    watch('src/img/**/*',imagenes);
    // watch('src/scss/app.scss', css);
}
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes,css,dev); // inicia las tareas serialmente
// exports.default = parallel(css,dev); // Inicia las tareas paralelamente