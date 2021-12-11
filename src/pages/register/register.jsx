import React from "react";
import useAuth from "../../hooks/useAuth";
import "./register.scss"

function Register() {
	const [setToken] = useAuth(false);

	const handleRegister = (e) => {
		e.preventDefault();

		const input = document.querySelectorAll(".input");

		const credentials = {
			username: input[0].value,
			password: input[1].value,
		};

		fetch("https://ntblog.herokuapp.com/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials),
		})
			.then((res) => res.json())
			.then((data) => setToken(data.token))
			.catch((e) => console.log(e));
	};

	return (
		<div className="register-box">
			<h1>Register</h1>

			<form onSubmit={handleRegister}>
				<input className="input" type="text" placeholder="username" required />
				<input className="input" type="password" placeholder="password" required />
				<button>submit</button>
			</form>
		</div>
	);
}

export default Register;
