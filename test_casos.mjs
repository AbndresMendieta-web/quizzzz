// Script de validación de los casos de prueba del PDF
import { encontrarEscaleraMasLarga } from './src/component/logicaEscalera.ts';

const casos = [
  { n: 1234, lonEsperada: 4, escEsperada: 1234 },
  { n: 9785672, lonEsperada: 3, escEsperada: 567 },
  { n: 891234567, lonEsperada: 7, escEsperada: 1234567 },
  { n: 4512893, lonEsperada: 2, escEsperada: 45 },
  { n: 7777, lonEsperada: 1, escEsperada: 7 },
  { n: 987654321, lonEsperada: 1, escEsperada: 9 },
  { n: 5, lonEsperada: 1, escEsperada: 5 },
];

console.log('--- VERIFICACIÓN CASOS DE PRUEBA DEL QUIZ ---');
let aprobados = 0;

for (const caso of casos) {
  const res = encontrarEscaleraMasLarga(caso.n);
  const pasa = res.longitud === caso.lonEsperada && res.escalera === caso.escEsperada;
  console.log(
    `Entrada: ${caso.n} | Esperado: (Lon: ${caso.lonEsperada}, Esc: ${caso.escEsperada}) | Obtenido: (Lon: ${res.longitud}, Esc: ${res.escalera}) => ${pasa ? '✓ CORRECTO' : '✗ FALLÓ'}`
  );
  if (pasa) aprobados++;
}

console.log(`\nResultado: ${aprobados} de ${casos.length} casos aprobados.`);
if (aprobados !== casos.length) {
  process.exit(1);
}
