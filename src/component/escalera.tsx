import { useState, useId } from "react";
import {
  encontrarEscaleraMasLarga,
  generarPruebaEscritorio,
} from "./logicaEscalera";
import "./escalera.css";

const CASOS_PRUEBA = [
  { n: 1234, lonEsperada: 4, escEsperada: 1234 },
  { n: 9785672, lonEsperada: 3, escEsperada: 567 },
  { n: 891234567, lonEsperada: 7, escEsperada: 1234567 },
  { n: 4512893, lonEsperada: 2, escEsperada: 45 },
  { n: 7777, lonEsperada: 1, escEsperada: 7 },
  { n: 987654321, lonEsperada: 1, escEsperada: 9 },
  { n: 5, lonEsperada: 1, escEsperada: 5 },
];

export default function Escalera() {
  const [inputVal, setInputVal] = useState<string>("4512893");
  const [error, setError] = useState<string>("");
  const [resultado, setResultado] = useState<{ longitud: number; escalera: number } | null>(() =>
    encontrarEscaleraMasLarga(4512893)
  );
  const [mostrarTabla, setMostrarTabla] = useState<boolean>(true);
  const inputId = useId();

  const procesarNumero = (valorStr: string) => {
    setInputVal(valorStr);
    const num = Number(valorStr);

    if (!valorStr.trim()) {
      setError("Por favor ingresa un número.");
      setResultado(null);
      return;
    }

    if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
      setError("El número debe ser un entero positivo.");
      setResultado(null);
      return;
    }

    if (valorStr.includes("0")) {
      setError("Regla del quiz: El número NO debe contener el dígito 0.");
      setResultado(null);
      return;
    }

    if (valorStr.length > 9) {
      setError("Regla del quiz: El número debe tener entre 1 y 9 dígitos.");
      setResultado(null);
      return;
    }

    setError("");
    const res = encontrarEscaleraMasLarga(num);
    setResultado(res);
  };

  const numeroActual = Number(inputVal);
  const esNumeroValido = !error && !isNaN(numeroActual) && numeroActual > 0;
  const filasTraza = esNumeroValido ? generarPruebaEscritorio(numeroActual) : [];

  return (
    <div className="escalera-container">
      <header className="escalera-header">
        <span className="badge">ADSO · Ficha 3312744</span>
        <h1>Quiz: La Escalera Más Larga</h1>
        <p className="subtitle">
          Encuentra la secuencia continua de dígitos donde cada uno es exactamente 1 unidad mayor que el de su izquierda.
        </p>
      </header>

      {/* Reglas obligatorias */}
      <section className="card rules-card">
        <h3>Reglas Obligatorias Cumplidas</h3>
        <ul className="rules-list">
          <li><strong>1 solo ciclo (while)</strong>: Sin ciclos anidados, sin segundo ciclo y sin recursividad.</li>
          <li><strong>N se lee como número</strong>: Procesamiento aritmético puro (módulo y división entera).</li>
          <li><strong>Sin cadenas, listas o funciones prohibidas</strong>: No se usan strings, arrays ni Math.max en la lógica.</li>
          <li><strong>Variables y operadores enteros</strong>: Solo suma, resta, multiplicación, división entera y comparaciones.</li>
        </ul>
      </section>

      {/* Entrada interactiva */}
      <section className="card input-card">
        <div className="input-group">
          <label htmlFor={inputId}>Ingrese un número entero N (1 a 9 dígitos, sin 0):</label>
          <div className="input-row">
            <input
              id={inputId}
              type="text"
              value={inputVal}
              onChange={(e) => procesarNumero(e.target.value)}
              placeholder="Ej. 4512893"
              className={error ? "input-error" : ""}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => procesarNumero(inputVal)}
            >
              Calcular
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Botones de casos de prueba rápidos */}
        <div className="quick-cases">
          <span className="quick-label">Casos del PDF oficial:</span>
          <div className="case-buttons">
            {CASOS_PRUEBA.map((caso) => (
              <button
                key={caso.n}
                type="button"
                className={`case-btn ${inputVal === String(caso.n) ? "active" : ""}`}
                onClick={() => procesarNumero(String(caso.n))}
              >
                {caso.n}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados */}
      {resultado && (
        <section className="card results-card">
          <h2>Resultado</h2>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">Longitud Máxima</span>
              <span className="result-value highlight">{resultado.longitud}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Escalera Más Larga</span>
              <span className="result-value escalera-number">{resultado.escalera}</span>
            </div>
          </div>
        </section>
      )}

      {/* Prueba de escritorio para sustentación */}
      <section className="card trace-card">
        <div className="trace-header">
          <div>
            <h3>Prueba de Escritorio (Vuelta por Vuelta)</h3>
            <p className="trace-desc">
              Requerida para la entrega y sustentación ante el instructor Diego Fernando Calderón Silva.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setMostrarTabla(!mostrarTabla)}
          >
            {mostrarTabla ? "Ocultar Tabla" : "Mostrar Tabla"}
          </button>
        </div>

        {mostrarTabla && esNumeroValido && (
          <div className="table-responsive">
            <table className="trace-table">
              <thead>
                <tr>
                  <th>Vuelta</th>
                  <th>n (inicio)</th>
                  <th>digito</th>
                  <th>digito_der</th>
                  <th>Condición (digito == digito_der - 1)</th>
                  <th>lon_actual</th>
                  <th>esc_actual</th>
                  <th>mult</th>
                  <th>max_lon</th>
                  <th>max_esc</th>
                  <th>n (fin)</th>
                </tr>
              </thead>
              <tbody>
                {filasTraza.map((fila) => (
                  <tr key={fila.vuelta}>
                    <td className="bold">{fila.vuelta}</td>
                    <td>{fila.nInicio}</td>
                    <td className="bold highlight-digit">{fila.digitoActual}</td>
                    <td>{fila.digitoDerecha === -1 ? "-" : fila.digitoDerecha}</td>
                    <td className={fila.cumpleCondicion ? "tag-yes" : "tag-no"}>
                      {fila.digitoDerecha === -1
                        ? "Inicio (NO)"
                        : fila.cumpleCondicion
                        ? `${fila.digitoActual} == ${fila.digitoDerecha} - 1 (SÍ)`
                        : `${fila.digitoActual} == ${fila.digitoDerecha} - 1 (NO)`}
                    </td>
                    <td>{fila.longitudActual}</td>
                    <td className="bold">{fila.escaleraActual}</td>
                    <td>{fila.multiplicador}</td>
                    <td className="bold highlight-max">{fila.maxLongitud}</td>
                    <td className="bold highlight-max">{fila.maxEscalera}</td>
                    <td>{fila.nFin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tabla comparativa de todos los casos del numeral 4 */}
      <section className="card summary-card">
        <h3>Verificación de Casos del Numeral 4</h3>
        <div className="table-responsive">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Entrada (N)</th>
                <th>Longitud Esperada</th>
                <th>Escalera Esperada</th>
                <th>Obtenido</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {CASOS_PRUEBA.map((caso) => {
                const res = encontrarEscaleraMasLarga(caso.n);
                const exito =
                  res.longitud === caso.lonEsperada && res.escalera === caso.escEsperada;
                return (
                  <tr key={caso.n}>
                    <td className="mono">{caso.n}</td>
                    <td>{caso.lonEsperada}</td>
                    <td className="mono">{caso.escEsperada}</td>
                    <td className="mono">
                      Lon: {res.longitud}, Esc: {res.escalera}
                    </td>
                    <td>
                      <span className={`status-badge ${exito ? "badge-success" : "badge-fail"}`}>
                        {exito ? "✓ Correcto" : "✗ Error"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
