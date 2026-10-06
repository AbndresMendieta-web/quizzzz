/**
 * Quiz de lógica de programación: La escalera más larga
 * Programa: Análisis y Desarrollo de Software (ADSO) - Ficha 3312744
 * Instructor: Diego Fernando Calderón Silva
 *
 * Reglas obligatorias:
 * 1. Un solo ciclo (for o while): sin ciclos anidados, sin un segundo ciclo y sin recursividad.
 * 2. N se lee como número, no como texto.
 * 3. Prohibido usar cadenas, listas, arreglos o funciones del lenguaje que conviertan,
 *    inviertan, ordenen o busquen máximos.
 * 4. Solo se permiten variables enteras, operadores aritméticos (suma, resta, multiplicación,
 *    división entera y módulo), comparaciones y condicionales.
 */

export interface ResultadoEscalera {
  longitud: number;
  escalera: number;
}

/**
 * Encuentra la longitud y el número de la escalera más larga en N.
 * Si hay empate en longitud máxima, devuelve la que está más a la izquierda.
 */
export function encontrarEscaleraMasLarga(n: number): ResultadoEscalera {
  let numeroRestante: number = n;
  let digitoDerecha: number = -1;
  let longitudActual: number = 0;
  let escaleraActual: number = 0;
  let multiplicador: number = 1;

  let maxLongitud: number = 0;
  let maxEscalera: number = 0;

  // Un solo ciclo procesando los dígitos de derecha a izquierda
  while (numeroRestante > 0) {
    const digitoActual: number = numeroRestante % 10;
    numeroRestante = (numeroRestante - digitoActual) / 10;

    // Si el dígito a la izquierda es exactamente una unidad menor que el de su derecha
    if (digitoActual === digitoDerecha - 1) {
      longitudActual = longitudActual + 1;
      escaleraActual = digitoActual * multiplicador + escaleraActual;
      multiplicador = multiplicador * 10;
    } else {
      // Inicia una nueva escalera de longitud 1
      longitudActual = 1;
      escaleraActual = digitoActual;
      multiplicador = 10;
    }

    // El operador >= garantiza que si hay varias escaleras con la misma longitud máxima,
    // la que está más a la izquierda (procesada después) es la seleccionada.
    if (longitudActual >= maxLongitud) {
      maxLongitud = longitudActual;
      maxEscalera = escaleraActual;
    }

    digitoDerecha = digitoActual;
  }

  return {
    longitud: maxLongitud,
    escalera: maxEscalera,
  };
}

/**
 * Estructura para registrar los pasos de la prueba de escritorio
 */
export interface FilaPruebaEscritorio {
  vuelta: number;
  nInicio: number;
  digitoActual: number;
  digitoDerecha: number;
  cumpleCondicion: boolean;
  longitudActual: number;
  escaleraActual: number;
  multiplicador: number;
  maxLongitud: number;
  maxEscalera: number;
  nFin: number;
}

/**
 * Genera la prueba de escritorio vuelta por vuelta para la sustentación.
 */
export function generarPruebaEscritorio(n: number): FilaPruebaEscritorio[] {
  let numeroRestante = n;
  let digitoDerecha = -1;
  let longitudActual = 0;
  let escaleraActual = 0;
  let multiplicador = 1;
  let maxLongitud = 0;
  let maxEscalera = 0;

  let vuelta = 0;
  const filas: FilaPruebaEscritorio[] = [];

  while (numeroRestante > 0) {
    vuelta++;
    const nInicio = numeroRestante;
    const digitoActual = numeroRestante % 10;
    numeroRestante = (numeroRestante - digitoActual) / 10;

    const cumple = (digitoActual === digitoDerecha - 1);
    if (cumple) {
      longitudActual = longitudActual + 1;
      escaleraActual = digitoActual * multiplicador + escaleraActual;
      multiplicador = multiplicador * 10;
    } else {
      longitudActual = 1;
      escaleraActual = digitoActual;
      multiplicador = 10;
    }

    if (longitudActual >= maxLongitud) {
      maxLongitud = longitudActual;
      maxEscalera = escaleraActual;
    }

    filas.push({
      vuelta,
      nInicio,
      digitoActual,
      digitoDerecha,
      cumpleCondicion: cumple,
      longitudActual,
      escaleraActual,
      multiplicador,
      maxLongitud,
      maxEscalera,
      nFin: numeroRestante,
    });

    digitoDerecha = digitoActual;
  }

  return filas;
}
