import React from "react";
import { Link } from "react-router-dom";

function Auth() {
	return (
		<div>
			<h1>Auth</h1>
			<Link to="/login" className="link">
				Login
			</Link>{" "}
			<Link to="/register" className="link">
				Register
			</Link>
		</div>
	);
}

export default Auth;
