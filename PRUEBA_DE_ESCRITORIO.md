# Prueba de Escritorio y Guía de Sustentación
**Programa:** Análisis y Desarrollo de Software (ADSO) — Ficha: 3312744  
**Instructor:** Diego Fernando Calderón Silva  
**Quiz:** La Escalera Más Larga  

---

## 1. Reglas Obligatorias Cumplidas
- [x] **Un solo ciclo (while)**: Sin ciclos anidados, sin un segundo ciclo y sin recursividad.
- [x] **N se lee como número**, no como texto.
- [x] **Prohibido el uso de cadenas, listas, arreglos o funciones del lenguaje** que conviertan, inviertan, ordenen o busquen máximos (sin `.toString()`, sin arrays, sin `Math.max`).
- [x] **Solo variables enteras, operadores aritméticos** (`+`, `-`, `*`, `/`, `%`), comparaciones (`==`, `>=`, `>`) y condicionales (`if` / `else`).

---

## 2. Código del Algoritmo (Lógica Pura)

```typescript
function encontrarEscaleraMasLarga(n: number): { longitud: number; escalera: number } {
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

    // Si el dígito actual es exactamente 1 menor que el de su derecha, continúa la escalera
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

    // Al recorrer de derecha a izquierda, si encontramos una escalera con longitud
    // mayor o igual (>=), la de más a la izquierda reemplazará a la anterior.
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
```

---

## 3. Prueba de Escritorio para el Caso N = 4512893 (Hecha a mano para la entrega)

### Valores iniciales:
- `numeroRestante` = 4512893
- `digitoDerecha` = -1
- `longitudActual` = 0
- `escaleraActual` = 0
- `multiplicador` = 1
- `maxLongitud` = 0
- `maxEscalera` = 0

### Tabla vuelta por vuelta:

| Vuelta | `n` (inicio) | `digitoActual` | `digitoDerecha` | Condición (`digitoActual == digitoDerecha - 1`) | `longitudActual` | `escaleraActual` | `multiplicador` | `maxLongitud` | `maxEscalera` | `n` (fin) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | 4512893 | 3 | -1 | 3 == -2 (Falso) | 1 | 3 | 10 | 1 | 3 | 451289 |
| **2** | 451289 | 9 | 3 | 9 == 2 (Falso) | 1 | 9 | 10 | 1 | 9 | 45128 |
| **3** | 45128 | 8 | 9 | 8 == 8 (**Verdadero**) | 2 | 89 | 100 | 2 | 89 | 4512 |
| **4** | 4512 | 2 | 8 | 2 == 7 (Falso) | 1 | 2 | 10 | 2 | 89 | 451 |
| **5** | 451 | 1 | 2 | 1 == 1 (**Verdadero**) | 2 | 12 | 100 | 2 | 12 | 45 |
| **6** | 45 | 5 | 1 | 5 == 0 (Falso) | 1 | 5 | 10 | 2 | 12 | 4 |
| **7** | 4 | 4 | 5 | 4 == 4 (**Verdadero**) | 2 | 45 | 100 | 2 | 45 | 0 |

### Resultado Final:
- **Longitud máxima:** `2`
- **Escalera más larga:** `45`

---

## 4. Verificación con Todos los Casos de Prueba del Numeral 4

| Entrada (N) | Longitud Esperada | Escalera Esperada | Obtenido en el Programa | Estado |
|:---:|:---:|:---:|:---:|:---:|
| `1234` | 4 | 1234 | Longitud: 4, Escalera: 1234 | **✓ PASÓ** |
| `9785672` | 3 | 567 | Longitud: 3, Escalera: 567 | **✓ PASÓ** |
| `891234567` | 7 | 1234567 | Longitud: 7, Escalera: 1234567 | **✓ PASÓ** |
| `4512893` | 2 | 45 | Longitud: 2, Escalera: 45 | **✓ PASÓ** |
| `7777` | 1 | 7 | Longitud: 1, Escalera: 7 | **✓ PASÓ** |
| `987654321` | 1 | 9 | Longitud: 1, Escalera: 9 | **✓ PASÓ** |
| `5` | 1 | 5 | Longitud: 1, Escalera: 5 | **✓ PASÓ** |

---

## 5. Guía para Sustentar ante el Instructor

Si el instructor te pregunta cómo funciona:
1. **¿Por qué de derecha a izquierda?**
   - Porque permite extraer los dígitos uno por uno mediante módulo (`n % 10`) y división entera (`(n - digito) / 10`) sin necesidad de conocer de antemano el número de dígitos ni usar un segundo ciclo.
2. **¿Cómo se detecta una escalera al revés?**
   - Una escalera de izquierda a derecha sube de 1 en 1 (ej. 4 y luego 5).
   - Por ende, si la recorremos de derecha a izquierda, el dígito de la izquierda debe ser exactamente `digitoDerecha - 1` (ej. 4 == 5 - 1).
3. **¿Cómo se construye el número de la escalera sin usar strings?**
   - Usando un multiplicador de potencias de 10: `escaleraActual = digitoActual * multiplicador + escaleraActual`.
   - Ejemplo con 8 y 9: primero `9`, multiplicador `10`. Luego llega `8`: `8 * 10 + 9 = 89`. Multiplicador pasa a `100`.
4. **¿Cómo se cumple la regla de "si hay varias con la misma longitud máxima, mostrar la de más a la izquierda"?**
   - Como vamos de derecha a izquierda, las escaleras de la izquierda se evalúan **después** que las de la derecha.
   - Al usar la condición `longitudActual >= maxLongitud` (con mayor o igual), si una escalera a la izquierda empata en longitud con una de la derecha, la de la izquierda la sobreescribe automáticamente, quedando la más a la izquierda.
