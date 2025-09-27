import React, { useState, useEffect } from "react";
import {
	obtenerViernesActualizado,
	obtenerEstadoSistema,
	forzarActualizacion,
	calcularViernesEnDosSemanasFormateado,
} from "../utils/dateUtils";

export default function AdminFechas() {
	const [estadoSistema, setEstadoSistema] = useState({});
	const [viernesActual, setViernesActual] = useState("");
	const [fechaPersonalizada, setFechaPersonalizada] = useState("");
	const [ultimaActualizacion, setUltimaActualizacion] = useState("");

	const actualizarDatos = () => {
		const estado = obtenerEstadoSistema();
		setEstadoSistema(estado);

		const viernes = obtenerViernesActualizado("es");
		setViernesActual(viernes);

		setUltimaActualizacion(new Date().toLocaleString("es-ES"));
	};

	useEffect(() => {
		actualizarDatos();

		// Actualizar cada minuto para mostrar el contador en tiempo real
		const intervalo = setInterval(actualizarDatos, 60000);

		return () => clearInterval(intervalo);
	}, []);

	const handleForzarActualizacion = () => {
		if (fechaPersonalizada) {
			forzarActualizacion(new Date(fechaPersonalizada));
		} else {
			forzarActualizacion();
		}
		actualizarDatos();
		alert("✅ Sistema actualizado correctamente");
	};

	const formatearFecha = fecha => {
		if (!fecha) return "No definida";
		return new Date(fecha).toLocaleString("es-ES");
	};

	const obtenerColorEstado = necesitaActualizacion => {
		return necesitaActualizacion ? "#ff6b6b" : "#51cf66";
	};

	return (
		<div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
			<h1>🛠️ Administrador del Sistema de Fechas</h1>
			<p style={{ color: "#666", marginBottom: "30px" }}>
				Sistema automático que recalcula el viernes de dentro de dos semanas cada 15 días
			</p>

			{/* Estado Actual */}
			<div
				style={{
					backgroundColor: "#f8f9fa",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: `2px solid ${obtenerColorEstado(estadoSistema.necesitaActualizacion)}`,
				}}
			>
				<h2>📊 Estado Actual del Sistema</h2>

				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
					<div>
						<strong>🎯 Viernes Calculado:</strong>
						<br />
						<span style={{ fontSize: "18px", color: "#0066cc" }}>{viernesActual}</span>
					</div>
					<div>
						<strong>⏰ Estado:</strong>
						<br />
						<span
							style={{
								color: obtenerColorEstado(estadoSistema.necesitaActualizacion),
								fontWeight: "bold",
							}}
						>
							{estadoSistema.necesitaActualizacion ? "🔴 Necesita Actualización" : "🟢 Actualizado"}
						</span>
					</div>
				</div>

				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
					<div>
						<strong>📅 Fecha de Cálculo Inicial:</strong>
						<br />
						{formatearFecha(estadoSistema.fechaCalculoInicial)}
					</div>
					<div>
						<strong>🔄 Próxima Actualización:</strong>
						<br />
						{formatearFecha(estadoSistema.proximaActualizacion)}
					</div>
				</div>

				{estadoSistema.diasHastaActualizacion !== null && (
					<div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
						<strong>⏳ Días hasta próxima actualización:</strong> {estadoSistema.diasHastaActualizacion} días
					</div>
				)}
			</div>

			{/* Panel de Control */}
			<div style={{ backgroundColor: "#fff3cd", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
				<h2>🎮 Panel de Control</h2>

				<div style={{ marginBottom: "15px" }}>
					<label htmlFor="fechaPersonalizada" style={{ display: "block", marginBottom: "5px" }}>
						📆 Fecha base para recalcular (opcional):
					</label>
					<input
						type="date"
						id="fechaPersonalizada"
						value={fechaPersonalizada}
						onChange={e => setFechaPersonalizada(e.target.value)}
						style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginRight: "10px" }}
					/>
					<small style={{ color: "#666" }}>Si no seleccionas fecha, usará la fecha actual</small>
				</div>

				<button
					onClick={handleForzarActualizacion}
					style={{
						backgroundColor: "#007bff",
						color: "white",
						padding: "12px 24px",
						borderRadius: "6px",
						border: "none",
						cursor: "pointer",
						fontSize: "16px",
						marginRight: "10px",
					}}
				>
					🔄 Forzar Actualización
				</button>

				<button
					onClick={actualizarDatos}
					style={{
						backgroundColor: "#28a745",
						color: "white",
						padding: "12px 24px",
						borderRadius: "6px",
						border: "none",
						cursor: "pointer",
						fontSize: "16px",
					}}
				>
					🔍 Refrescar Estado
				</button>
			</div>

			{/* Información Técnica */}
			<div style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "8px" }}>
				<h2>🔧 Información Técnica</h2>

				<div style={{ marginBottom: "15px" }}>
					<strong>⚙️ Funcionamiento del Sistema:</strong>
					<ul style={{ marginTop: "5px" }}>
						<li>El sistema calcula automáticamente el viernes de dentro de 2 semanas</li>
						<li>Se actualiza automáticamente cada 15 días desde la fecha de cálculo inicial</li>
						<li>Puedes forzar una actualización manual en cualquier momento</li>
						<li>El estado se conserva durante toda la sesión de la aplicación</li>
					</ul>
				</div>

				<div style={{ marginBottom: "15px" }}>
					<strong>📝 Última actualización de esta página:</strong> {ultimaActualizacion}
				</div>

				{estadoSistema.inicializado && (
					<div style={{ backgroundColor: "#e9ecef", padding: "15px", borderRadius: "4px" }}>
						<strong>🔍 Detalles del Sistema:</strong>
						<pre style={{ marginTop: "10px", fontSize: "12px" }}>{JSON.stringify(estadoSistema, null, 2)}</pre>
					</div>
				)}
			</div>

			{/* Comparación */}
			<div style={{ backgroundColor: "#d4edda", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
				<h2>🔄 Comparación: Sistema Automático vs Manual</h2>

				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
					<div>
						<h3>🤖 Sistema Automático (se actualiza cada 15 días)</h3>
						<div style={{ backgroundColor: "white", padding: "15px", borderRadius: "4px" }}>
							{obtenerViernesActualizado("es")}
						</div>
					</div>
					<div>
						<h3>📅 Cálculo Manual (siempre desde hoy)</h3>
						<div style={{ backgroundColor: "white", padding: "15px", borderRadius: "4px" }}>
							{calcularViernesEnDosSemanasFormateado(new Date(), "es")}
						</div>
					</div>
				</div>
			</div>

			<div style={{ marginTop: "30px", textAlign: "center", color: "#666" }}>
				<small>
					💡 Tip: Puedes usar <code>obtenerViernesActualizado()</code> en cualquier parte de tu aplicación y siempre
					obtendrás la fecha correcta, actualizada automáticamente cada 15 días.
				</small>
			</div>
		</div>
	);
}
