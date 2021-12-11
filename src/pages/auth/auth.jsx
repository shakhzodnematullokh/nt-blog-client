import React from "react";
import { Link } from "react-router-dom";
import "./auth.scss"

function Auth() {

	return (
		<div className="auth-box">
			<h1>Auth</h1>
			<div>
				<Link to="/login" className="link">
					Login
				</Link>{" "}
				<Link to="/register" className="link">
					Register
				</Link>
			</div>
		</div>
	);
}

export default Auth;
