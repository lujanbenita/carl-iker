import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Carl & Ker </title>
				<link rel="icon" href="/favicon.svg" />
				<meta name="description" content="landing de Carl & Ker para hacer pedidos"></meta>
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
				</style>
			</Head>

			<main>
				<div className="container-brand">
					<img src="/brand.jpg" alt="logo" />
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
					<h1>Estamos mejorando la web para facilitar la navegación</h1>
					<h3>Para pedidos carl&ker@proton.me</h3>
				</div>

				<footer className="container--footer">
					<img src="/logo.jpg" alt="logo" />
				</footer>
			</main>
		</>
	);
}
