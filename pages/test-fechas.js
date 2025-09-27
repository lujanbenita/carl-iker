import React, { useState, useEffect } from "react";
import {
	calcularViernesEnDosSemanasD,
	calcularViernesEnDosSemanasFormateado,
	ejemploUso,
	obtenerViernesActualizado,
	obtenerEstadoSistema,
} from "../utils/dateUtils";

export default function TestFechas() {
	const [fechaPersonalizada, setFechaPersonalizada] = useState("");
	const [resultados, setResultados] = useState({});
	const [sistemaAutomatico, setSistemaAutomatico] = useState({});

	useEffect(() => {
		// Ejecutar ejemplo en consola
		ejemploUso();

		// Calcular con fecha actual
		calcularResultados();

		// Obtener datos del sistema automático
		actualizarSistemaAutomatico();
	}, []);

	const actualizarSistemaAutomatico = () => {
		const estado = obtenerEstadoSistema();
		const viernesAutomatico = obtenerViernesActualizado("objeto");
		setSistemaAutomatico({
			estado,
			viernes: viernesAutomatico,
		});
	};

	const calcularResultados = (fechaBase = new Date()) => {
		const fecha = fechaBase instanceof Date ? fechaBase : new Date(fechaBase);

		setResultados({
			fechaBase: fecha.toLocaleDateString("es-ES"),
			viernesDate: calcularViernesEnDosSemanasD(fecha),
			viernesEspañol: calcularViernesEnDosSemanasFormateado(fecha, "es"),
			viernesISO: calcularViernesEnDosSemanasFormateado(fecha, "iso"),
			viernesObjeto: calcularViernesEnDosSemanasFormateado(fecha, "objeto"),
		});
	};

	const handleFechaChange = e => {
		const nuevaFecha = e.target.value;
		setFechaPersonalizada(nuevaFecha);

		if (nuevaFecha) {
			calcularResultados(new Date(nuevaFecha));
		} else {
			calcularResultados();
		}
	};

	return (
		<div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
			<h1>🧪 Calculadora de Viernes en Dos Semanas</h1>

			{/* Sistema Automático */}
			{sistemaAutomatico.viernes && (
				<div style={{ backgroundColor: "#e8f5e8", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
					<h2>🤖 Sistema Automático (se actualiza cada 15 días)</h2>
					<div style={{ backgroundColor: "white", padding: "15px", borderRadius: "4px", marginBottom: "15px" }}>
						<strong>Viernes calculado:</strong> {sistemaAutomatico.viernes.fechaFormateada}
						<br />
						<small>
							Próxima actualización: {sistemaAutomatico.viernes.proximaActualizacion?.toLocaleDateString("es-ES")}(
							{sistemaAutomatico.viernes.diasHastaActualizacion} días restantes)
						</small>
					</div>
					<button
						onClick={actualizarSistemaAutomatico}
						style={{
							backgroundColor: "#28a745",
							color: "white",
							padding: "8px 16px",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						🔄 Actualizar Sistema
					</button>
				</div>
			)}

			<h2>📅 Calculadora Manual</h2>
			<div style={{ marginBottom: "20px" }}>
				<label htmlFor="fecha">Fecha base (opcional, por defecto es hoy):</label>
				<input
					type="date"
					id="fecha"
					value={fechaPersonalizada}
					onChange={handleFechaChange}
					style={{ marginLeft: "10px", padding: "5px" }}
				/>
			</div>

			{resultados.fechaBase && (
				<div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
					<h2>Resultados:</h2>

					<div style={{ marginBottom: "15px" }}>
						<strong>Fecha Base:</strong> {resultados.fechaBase}
					</div>

					<div style={{ marginBottom: "15px" }}>
						<strong>Viernes en 2 semanas (objeto Date):</strong>
						<br />
						{resultados.viernesDate?.toString()}
					</div>

					<div style={{ marginBottom: "15px" }}>
						<strong>Formato Español:</strong>
						<br />
						{resultados.viernesEspañol}
					</div>

					<div style={{ marginBottom: "15px" }}>
						<strong>Formato ISO:</strong>
						<br />
						{resultados.viernesISO}
					</div>

					<div style={{ marginBottom: "15px" }}>
						<strong>Objeto Detallado:</strong>
						<br />
						<pre style={{ backgroundColor: "#e9e9e9", padding: "10px", borderRadius: "4px" }}>
							{JSON.stringify(resultados.viernesObjeto, null, 2)}
						</pre>
					</div>
				</div>
			)}

			<div style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
				<h3>Cómo usar las funciones:</h3>
				<pre style={{ backgroundColor: "#f0f0f0", padding: "15px", borderRadius: "4px" }}>
					{`// Importar las funciones
import { 
    calcularViernesEnDosSemanasD, 
    calcularViernesEnDosSemanasFormateado 
} from '../utils/dateUtils';

// Uso básico (desde hoy)
const viernes = calcularViernesEnDosSemanasD();

// Uso con fecha personalizada
const fechaBase = new Date('2024-01-15');
const viernes = calcularViernesEnDosSemanasD(fechaBase);

// Formato español
const viernesEspañol = calcularViernesEnDosSemanasFormateado(fechaBase, 'es');

// Formato ISO
const viernesISO = calcularViernesEnDosSemanasFormateado(fechaBase, 'iso');

// Objeto completo
const viernesObjeto = calcularViernesEnDosSemanasFormateado(fechaBase, 'objeto');`}
				</pre>
			</div>
		</div>
	);
}
