import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Lujanstore </title>
				<link rel="icon" href="/favicon.png" />
				<meta name="description" content="landing de Lujanstore para hacer pedidos"></meta>
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
				</style>
			</Head>

			<main>
				<div className="container-brand">
					<img src="/brand.png" alt="logo" />
					<p>Contacto: compras@lujanstore.es</p>
				</div>
				<div className="container--login">
					<div className="login-form">
						<h2>Login</h2>
						<form>
							<input type="text" placeholder="Username" required />
							<input type="password" placeholder="Password" required />
							<button type="submit">Login</button>
						</form>
					</div>
				</div>
				<div className="container--text">
					<h1>
						Estamos actualizando nuestra web para ofrecerte una mejor experiencia de navegación y compra. Muy pronto
						volveremos con mejoras y novedades.
					</h1>
					<h3>Para pedidos lujanbuyer@proton.me o compras@lujanstore.es</h3>
					<h2>
						La calculadora para RE esta habilitada{" "}
						<a href="/calculadora" target="_blank">
							aquí
						</a>
					</h2>
				</div>

				<footer className="container--footer">
					<img src="/logo.png" alt="logo" />
				</footer>
			</main>
		</>
	);
}
