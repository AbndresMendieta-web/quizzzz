import { useState, useId } from "react";

// Algoritmo que cumple estrictamente las reglas del quiz:
// 1 solo ciclo (while), sin segundo ciclo, sin arreglos, sin strings, solo aritmética básica
function calcularEscalera(n: number) {
  let numRestante = n;
  let digitoDer = -1;
  let lonActual = 0;
  let escActual = 0;
  let mult = 1;

  let maxLon = 0;
  let maxEsc = 0;

  while (numRestante > 0) {
    const digito = numRestante % 10;
    numRestante = (numRestante - digito) / 10;

    if (digito === digitoDer - 1) {
      lonActual = lonActual + 1;
      escActual = digito * mult + escActual;
      mult = mult * 10;
    } else {
      lonActual = 1;
      escActual = digito;
      mult = 10;
    }

    if (lonActual >= maxLon) {
      maxLon = lonActual;
      maxEsc = escActual;
    }

    digitoDer = digito;
  }

  return { longitud: maxLon, escalera: maxEsc };
}

const CASOS = [1234, 9785672, 891234567, 4512893, 7777, 987654321, 5];

export default function Escalera() {
  const [valor, setValor] = useState("4512893");
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<{ longitud: number; escalera: number } | null>(() =>
    calcularEscalera(4512893)
  );
  const inputId = useId();

  const procesar = (val: string) => {
    setValor(val);
    const n = Number(val);

    if (!val.trim()) {
      setError("Ingresa un número");
      setResultado(null);
      return;
    }

    if (isNaN(n) || !Number.isInteger(n) || n <= 0) {
      setError("Debe ser un número entero positivo");
      setResultado(null);
      return;
    }

    if (val.includes("0")) {
      setError("No debe contener el dígito 0");
      setResultado(null);
      return;
    }

    if (val.length > 9) {
      setError("Máximo 9 dígitos");
      setResultado(null);
      return;
    }

    setError("");
    setResultado(calcularEscalera(n));
  };

  return (
    <div className="escalera-box">
      <h1>Escalera más larga</h1>

      <div className="formulario">
        <label htmlFor={inputId}>Número (N):</label>
        <div className="fila-input">
          <input
            id={inputId}
            type="text"
            value={valor}
            onChange={(e) => procesar(e.target.value)}
            placeholder="Ej: 4512893"
          />
          <button type="button" onClick={() => procesar(valor)}>
            Calcular
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="ejemplos">
        <span>Probar casos:</span>
        <div className="botones-ejemplos">
          {CASOS.map((c) => (
            <button
              key={c}
              type="button"
              className={valor === String(c) ? "activo" : ""}
              onClick={() => procesar(String(c))}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {resultado && (
        <div className="resultado">
          <div className="resultado-item">
            <span className="etiqueta">Longitud</span>
            <span className="valor">{resultado.longitud}</span>
          </div>
          <div className="resultado-item">
            <span className="etiqueta">Escalera</span>
            <span className="valor valor-escalera">{resultado.escalera}</span>
          </div>
        </div>
      )}
    </div>
  );
}
