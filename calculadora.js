"use strict";

let parametros = process.argv.slice(2);
let numero1 = parseFloat(parametros[0]);
let numero2 = parseFloat(parametros[1]);
let numero3 = parseFloat(parametros[2]);

let plantilla = `
 La suma es ${numero1 + numero2 + numero3}
 La multiplicacion es ${numero1 * numero2 * numero3}`;

console.log(plantilla);
