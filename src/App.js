import "./App.css";
import { Switch } from "react-router-dom";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Private from "./routes/private";
import Public from "./routes/public";
import Dashboard from "./pages/dashboard/dashboard";
import Pagination from "./pages/pagination/pagination";

function App() {
	return (
		<div className="App">
			<Switch>
				<Private path="/" exact component={Home} />
				<Public path="/auth" component={Auth} />
				<Public path="/login" component={Login} />
				<Public path="/register" component={Register} />
				<Private path="/dashboard" component={Dashboard} />
				<Private path="/allBlogs" component={Pagination} />
			</Switch>
		</div>
	);
}

export default App;
