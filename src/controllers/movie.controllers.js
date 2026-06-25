// validaciones
import Movie from '../models/movie.model.js';

// funcion auxiliar
function validacionCampos ({ title, genre, duration, year, synopsis}){
    // se devuelve un array de string con los errores
    const errors = [];

    // titulo obligatorio
    if (typeof title !== 'string' || title.trim() === ''){
        errors.push('El campo title es obligatorio y debe tipo texto.');
    }

    // genre obligatorio
    if (typeof genre !== 'string' || genre.trim() === ''){
        errors.push('El campo genre es obligatorio y debe ser tipo texto.');
    }

    // duracion obligatorio, entero, mayor a 0, no string y no decimal
    if (duration === undefined || duration === null || duration === ''){
        errors.push('El campo duration es obligatorio.');
    } else if (typeof duration !== 'number' || !Number.isInteger(duration) || duration <= 0) {
        errors.push('El campo duration debe ser un numero entero mayor a 0 (no se aceptan: texto, decimales o negativos ni cero).');
    }

    // year obligatorio, entero de 4 digitos, entre 1888 y el año actual
    const añoActual = new Date().getFullYear();
    if (year === undefined || year === null || year === ''){
        errors.push('El campo year es obligatorio.')
    } else if (typeof year !== 'number' || !Number.isInteger(year) || String(Math.abs(year)).length !== 4 || year < 1888 || year > añoActual) {
        errors.push('El campo year debe ser un numero entero de 4 digitos (entre el año 1888 y el año actual).');
    }

    // synopsis opcional en string
    if (synopsis !== undefined && synopsis !== null && typeof synopsis !== 'string'){
        errors.push('El campo synopsis debe ser tipo texto.');
    }
    return errors;
}
