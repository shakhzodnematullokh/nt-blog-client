import { useContext } from "react";
import { Auth } from "../context/auth";

function useAuth(setterOnly) {
	const { token, setToken } = useContext(Auth);
	return setterOnly ? [token, setToken] : [setToken];
}

export default useAuth;
