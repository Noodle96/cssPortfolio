const {src,dest,watch,series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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
function dev(){
    watch('src/scss/**/*.scss',css);
    // watch('src/scss/app.scss', css);
}
exports.css = css;
exports.dev = dev;
exports.default = series(css,dev); // inicia las tareas serialmente
// exports.default = parallel(css,dev); // Inicia las tareas paralelamente