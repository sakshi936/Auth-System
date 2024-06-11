import Login from "./pages/Login";
import SingUp from "./pages/SignUp";
import "./App.css";
import Home from "./pages/Home";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path="/" element={<Login />} />

				{/* <Route path="/home" element={<Home />} /> */}

				{/* <Route
					path="/"
					element={
						<ProtectedRoute>
							<Login />
						</ProtectedRoute>
					}
				/> */}
				<Route path="/signup" element={<SingUp />} />
				<Route
					path="/home"
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
