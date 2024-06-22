import Login from "./components/login/Login";
import SingUp from "./components/signup/SignUp";
import "./App.css";
import Home from "./components/home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute/ProtectedRoute";
import ProtectLoginRoute from "./ProtectRoute/ProtectLoginRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route>
					<Route
						path="/login"
						element={
							<ProtectLoginRoute>
								<Login />
							</ProtectLoginRoute>
						}
					/>
					<Route path="/signup" element={<SingUp />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
