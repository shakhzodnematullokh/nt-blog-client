import { Redirect, Route } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useAuth from "../hooks/useAuth";

function Public(props) {
	const [token] = useAuth(true);
	const isAdmin = token ? decodeToken(token).is_admin : [];

	if (token) {
		if (isAdmin === true) {
			return <Redirect to="/dashboard" />;
		} else {
			return <Redirect to="/" />;
		}
	}

	return <Route {...props} />;
}

export default Public;
