import React from "react";
import useAuth from "../../hooks/useAuth";

function Login() {
	const [setToken] = useAuth(false);

	const handleLogin = (e) => {
		e.preventDefault();

		const input = document.querySelectorAll(".input");

		const credentials = {
			username: input[0].value,
			password: input[1].value,
		};

		fetch("https://ntblog.herokuapp.com/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		})
			.then((res) => res.json())
			.then((data) => setToken(data.token))
			.catch((e) => console.log(e));
	};

	return (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleLogin}>
				<input className="input" type="text" placeholder="username" required />
				<input className="input" type="password" placeholder="password" required />
				<button>submit</button>
			</form>
		</div>
	);
}

export default Login;
