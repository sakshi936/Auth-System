import Login from "./pages/Login";
import SingUp from "./pages/SignUp";
import "./App.css";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute/ProtectedRoute";
import ProtectLoginRoute from "./ProtectRoute/ProtectLoginRoute";

function App() {
	// const router = createBrowserRouter(
	// 	createRoutesFromElements(
	// 		<Route>
	// 			{/* <Route path="/" element={<Login />} /> */}

	// 			{/* <Route path="/home" element={<Home />} /> */}

	// 			<Route
	// 				path="/login"
	// 				element={
	// 					<ProtectLoginRoute>
	// 						<Login />
	// 					</ProtectLoginRoute>
	// 				}
	// 			/>
	// 			<Route path="/signup" element={<SingUp />} />
	// 			<Route
	// 				path="/"
	// 				element={
	// 					<ProtectedRoute>
	// 						<Home />
	// 					</ProtectedRoute>
	// 				}
	// 			/>
	// 		</Route>
	// 	)
	// );

	return (
		// <>
		// 	<RouterProvider router={router} />
		// </>

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
