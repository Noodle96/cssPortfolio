const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
function css(done){
    //COMPILAR SASS
    // 1 IDENTIFICAR EL ARCHIVO SASS
    // 2 COMPILAR ESE ARCHIVO
    // 3 GUARDAR EL CSS
    src('src/scss/app.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(dest('build/css'));
    done();
}
function dev(){
    watch('src/scss/app.scss', css);
}
exports.css = css;
exports.dev = dev;