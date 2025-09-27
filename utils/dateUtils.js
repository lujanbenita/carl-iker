/**
 * Calcula el día viernes de dentro de dos semanas
 * @param {Date} fechaBase - Fecha base para el cálculo (opcional, por defecto es hoy)
 * @returns {Date} Fecha del viernes de dentro de dos semanas
 */
export function calcularViernesEnDosSemanasD(fechaBase = new Date()) {
	// Crear una copia de la fecha base para no modificar la original
	const fecha = new Date(fechaBase);

	// Agregar 14 días (2 semanas)
	fecha.setDate(fecha.getDate() + 14);

	// Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 5 = viernes, 6 = sábado)
	const diaSemana = fecha.getDay();

	// Calcular cuántos días faltan para llegar al viernes (5)
	// Si ya es viernes o pasó, ir al siguiente viernes
	let diasHastaViernes;
	if (diaSemana <= 5) {
		diasHastaViernes = 5 - diaSemana;
	} else {
		// Si es sábado (6), faltan 6 días para el próximo viernes
		diasHastaViernes = 6;
	}

	// Ajustar la fecha al viernes
	fecha.setDate(fecha.getDate() + diasHastaViernes);

	return fecha;
}

/**
 * Calcula el día viernes de dentro de dos semanas y devuelve una fecha formateada
 * @param {Date} fechaBase - Fecha base para el cálculo (opcional, por defecto es hoy)
 * @param {string} formato - Formato de salida ('es' para español, 'iso' para ISO, 'objeto' para objeto con detalles)
 * @returns {string|object} Fecha formateada del viernes de dentro de dos semanas
 */
export function calcularViernesEnDosSemanasFormateado(fechaBase = new Date(), formato = "es") {
	const viernes = calcularViernesEnDosSemanasD(fechaBase);

	switch (formato) {
		case "es":
			const opciones = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			return viernes.toLocaleDateString("es-ES", opciones);

		case "iso":
			return viernes.toISOString().split("T")[0];

		case "objeto":
			return {
				fecha: viernes,
				dia: viernes.getDate(),
				mes: viernes.getMonth() + 1,
				año: viernes.getFullYear(),
				diaSemana: "viernes",
				fechaFormateada: viernes.toLocaleDateString("es-ES", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				}),
			};

		default:
			return viernes.toString();
	}
}

/**
 * Sistema de gestión automática de fechas que se actualiza cada 15 días
 */
let fechaCalculoInicial = null;
let viernesCalculado = null;
let fechaProximaActualizacion = null;

/**
 * Inicializa o actualiza el sistema de cálculo automático
 * @param {Date} fechaBase - Fecha base para inicializar el sistema (opcional, por defecto es hoy)
 */
function inicializarSistemaFechas(fechaBase = new Date()) {
	fechaCalculoInicial = new Date(fechaBase);
	viernesCalculado = calcularViernesEnDosSemanasD(fechaBase);

	// Calcular cuándo debe actualizarse (15 días después de la fecha base)
	fechaProximaActualizacion = new Date(fechaBase);
	fechaProximaActualizacion.setDate(fechaProximaActualizacion.getDate() + 15);
}

/**
 * Verifica si necesita actualizar el cálculo (han pasado 15 días)
 * @returns {boolean} true si necesita actualización
 */
function necesitaActualizacion() {
	if (!fechaCalculoInicial || !fechaProximaActualizacion) {
		return true;
	}

	const ahora = new Date();
	return ahora >= fechaProximaActualizacion;
}

/**
 * Función principal que calcula el viernes de dentro de dos semanas
 * y se actualiza automáticamente cada 15 días
 * @param {string} formato - Formato de salida ('es', 'iso', 'objeto', 'date')
 * @returns {string|object|Date} Fecha del viernes calculada
 */
export function obtenerViernesActualizado(formato = "es") {
	// Verificar si necesita inicialización o actualización
	if (necesitaActualizacion()) {
		console.log("🔄 Actualizando cálculo de viernes (han pasado 15 días)");
		inicializarSistemaFechas();
	}

	// Devolver el resultado en el formato solicitado
	switch (formato) {
		case "date":
			return viernesCalculado;
		case "es":
			return viernesCalculado.toLocaleDateString("es-ES", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		case "iso":
			return viernesCalculado.toISOString().split("T")[0];
		case "objeto":
			return {
				fecha: viernesCalculado,
				dia: viernesCalculado.getDate(),
				mes: viernesCalculado.getMonth() + 1,
				año: viernesCalculado.getFullYear(),
				diaSemana: "viernes",
				fechaFormateada: viernesCalculado.toLocaleDateString("es-ES", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				}),
				fechaCalculoInicial: fechaCalculoInicial,
				proximaActualizacion: fechaProximaActualizacion,
				diasHastaActualizacion: Math.ceil((fechaProximaActualizacion - new Date()) / (1000 * 60 * 60 * 24)),
			};
		default:
			return viernesCalculado.toString();
	}
}

/**
 * Obtiene información del estado del sistema de fechas
 * @returns {object} Información detallada del sistema
 */
export function obtenerEstadoSistema() {
	return {
		inicializado: fechaCalculoInicial !== null,
		fechaCalculoInicial: fechaCalculoInicial,
		viernesCalculado: viernesCalculado,
		proximaActualizacion: fechaProximaActualizacion,
		necesitaActualizacion: necesitaActualizacion(),
		diasHastaActualizacion: fechaProximaActualizacion
			? Math.ceil((fechaProximaActualizacion - new Date()) / (1000 * 60 * 60 * 24))
			: null,
	};
}

/**
 * Fuerza una actualización manual del sistema
 * @param {Date} nuevaFechaBase - Nueva fecha base (opcional, por defecto es hoy)
 */
export function forzarActualizacion(nuevaFechaBase = new Date()) {
	console.log("🔄 Forzando actualización manual del sistema de fechas");
	inicializarSistemaFechas(nuevaFechaBase);
}

/**
 * Función de ejemplo que muestra cómo usar las funciones de cálculo de fecha
 */
export function ejemploUso() {
	const hoy = new Date();
	console.log("Fecha de hoy:", hoy.toLocaleDateString("es-ES"));

	// Usando la función básica
	const viernesBasico = calcularViernesEnDosSemanasD();
	console.log("Viernes en 2 semanas (Date):", viernesBasico);

	// Usando la función con formato español
	const viernesEspañol = calcularViernesEnDosSemanasFormateado(hoy, "es");
	console.log("Viernes en 2 semanas (español):", viernesEspañol);

	// Usando la función con formato ISO
	const viernesISO = calcularViernesEnDosSemanasFormateado(hoy, "iso");
	console.log("Viernes en 2 semanas (ISO):", viernesISO);

	// Usando la función con objeto detallado
	const viernesObjeto = calcularViernesEnDosSemanasFormateado(hoy, "objeto");
	console.log("Viernes en 2 semanas (objeto):", viernesObjeto);

	// Usando el nuevo sistema automático
	console.log("\n--- SISTEMA AUTOMÁTICO ---");
	const viernesAutomatico = obtenerViernesActualizado("es");
	console.log("Viernes automático (español):", viernesAutomatico);

	const estadoSistema = obtenerEstadoSistema();
	console.log("Estado del sistema:", estadoSistema);
}
