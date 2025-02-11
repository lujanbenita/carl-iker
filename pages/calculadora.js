import { useState, useEffect } from "react";

const copyToClipboard = value => {
	navigator.clipboard
		.writeText(value.toString())
		.then(() => {
			//console.log("Copied to clipboard:", value);
		})
		.catch(err => {
			console.error("Failed to copy:", err);
		});
};

const Calculadora = () => {
	const [amount, setAmount] = useState(null);
	const [result, setResult] = useState(null);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const amountValue = parseFloat(amount);
		if (!isNaN(amountValue) && amountValue !== 0) {
			// Calcular para precio SIN IVA
			const IVA = amountValue * 0.21;
			const recargoEquivalenciaSinIVA = amountValue * 0.052;
			const totalSinIVA = amountValue + IVA + recargoEquivalenciaSinIVA;

			// Calcular para precio CON IVA
			const baseSinIVA = amountValue / 1.21;
			const recargoEquivalenciaConIVA = baseSinIVA * 0.052;
			const totalConIVA = amountValue + recargoEquivalenciaConIVA;

			setResult({
				IVA,
				recargoEquivalenciaSinIVA,
				totalSinIVA,
				recargoEquivalenciaConIVA,
				totalConIVA,
			});

			copyToClipboard(totalSinIVA.toFixed(2));
		} else {
			setResult(null);
		}
	}, [amount]);

	const incrementar = () => {
		setAmount(prev => (prev !== null ? parseFloat(prev) + 1 : 1));
	};

	const decrementar = () => {
		setAmount(prev => {
			const newValue = prev !== null ? parseFloat(prev) - 1 : 0;
			return newValue > 0 ? newValue : null;
		});
	};

	const increase = () => {
		setQuantity(prev => (prev !== null ? parseFloat(prev) + 1 : 1));
	};

	const decrease = () => {
		setQuantity(prev => {
			const newValue = prev !== null ? parseFloat(prev) - 1 : 0;
			return newValue > 0 ? newValue : null;
		});
	};

	const handleChange = e => {
		const value = e.target.value;
		setAmount(value === "" ? null : parseFloat(value));
		copyToClipboard(value === "" ? 0 : parseFloat(value));
	};

	const handleQuantity = e => {
		const value = e.target.value;
		console.log("value", value);
		setQuantity(value === "" ? null : parseFloat(value));
	};

	return (
		<main className="main">
			<div className="container-calculator">
				<h2 className="title">Calculadora de Recargo de Equivalencia</h2>

				<p className="cantidad">Cantidad</p>

				<div className="results">
					{result && (
						<div className="result-with-iva result">
							<div className="result-container">
								<h3>Precio SIN IVA:</h3>
								<p>IVA: {result.IVA.toFixed(2)} €</p>
								<p>RE: {result.recargoEquivalenciaSinIVA.toFixed(2)} €</p>
							</div>
							<p className="total">
								Total: <span className="total-price"> {result.totalSinIVA.toFixed(2)} €</span>
							</p>
						</div>
					)}
					<div className="input-container">
						<button className="quantity-btn" onClick={decrementar}>
							-
						</button>
						<input
							type="number"
							className="quantity-input"
							min="0"
							step="1"
							value={amount || ""}
							onChange={handleChange}
						/>
						<button className="quantity-btn" onClick={incrementar}>
							+
						</button>
					</div>

					{result && (
						<div className="result-without-iva result">
							<div className="result-container">
								<h3>Precio CON IVA:</h3>
								<p>RE: {result.recargoEquivalenciaConIVA.toFixed(2)} €</p>
							</div>
							<p className="total">
								Total: <span className="total-price"> {result.totalConIVA.toFixed(2)} €</span>
							</p>
						</div>
					)}
				</div>

				<div className="results">
					<p className="quantity-text">Unidades</p>
					{result && (
						<div className="result-with-iva result">
							<div className="result-container">
								<h3>Precio SIN IVA:</h3>
								<p>IVA: {(result.IVA * quantity).toFixed(2)} €</p>
								<p>RE: {(result.recargoEquivalenciaSinIVA * quantity).toFixed(2)} €</p>
							</div>
							<p className="total">
								Total: <span className="total-price"> {(quantity * result.totalSinIVA).toFixed(2)} €</span>
							</p>
						</div>
					)}
					<div className="input-container">
						<button className="quantity-btn" onClick={decrease}>
							-
						</button>
						<input
							type="number"
							className="quantity-input"
							min="0"
							step="1"
							value={quantity || ""}
							onChange={handleQuantity}
						/>
						<button className="quantity-btn" onClick={increase}>
							+
						</button>
					</div>

					{result && (
						<div className="result-without-iva result">
							<div className="result-container">
								<h3>Precio CON IVA:</h3>
								<p>RE: {(result.recargoEquivalenciaConIVA * quantity).toFixed(2)} €</p>
							</div>
							<p className="total">
								Total: <span className="total-price"> {(result.totalConIVA * quantity).toFixed(2)} €</span>
							</p>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Calculadora;
