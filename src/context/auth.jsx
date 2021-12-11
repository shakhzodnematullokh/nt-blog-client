import { createContext, useEffect, useState } from "react";

const Auth = createContext();

function Provider({ children }) {
	const [token, setToken] = useState(JSON.parse(window.localStorage.getItem("token")));

	useEffect(() => {
		if (token) {
			window.localStorage.setItem("token", JSON.stringify(token));
		} else {
			window.localStorage.clear();
		}
	}, [token]);

	return <Auth.Provider value={{ token, setToken }}>{children}</Auth.Provider>;
}

export { Provider, Auth };
