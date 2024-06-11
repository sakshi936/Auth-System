import Login from "./pages/Login";
import SingUp from "./pages/SignUp";
import "./App.css";
import Home from "./pages/Home";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectLoginRoute from "./ProtectLoginRoute";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				{/* <Route path="/" element={<Login />} /> */}

				{/* <Route path="/home" element={<Home />} /> */}

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
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
