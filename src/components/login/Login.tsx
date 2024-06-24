import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/Validation/ValidationSchema";
import { useFormik } from "formik";
import { SignIn } from "@/appwrite/Auth";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			const login = SignIn(values.email, values.password);
			toast.promise(login, {
				loading: " Logging in ...",
				success: "login successful",
				error: "Error",
			});

			try {
				await login;
				navigate("/");
			} catch (error) {
				console.error("Error logging in:", error);
			}
		},
	});

	return (
		<div className="w-[30rem] h-auto border-black border-[1px] rounded-lg p-5">
			<h1 className="text-center p-4 text-xl font-bold underline">LOGIN</h1>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="Email" className="font-semibold ">
					Email
				</label>
				<Input type="email" placeholder="Enter email" id="email" {...formik.getFieldProps("email")} />
				{formik.touched.email && formik.errors.email ? <div className="text-red-600">{formik.errors.email}</div> : null}
				<label htmlFor="Password" className="font-semibold">
					Password
				</label>
				<Input type="password" placeholder="Enter password" id="password" {...formik.getFieldProps("password")} />
				{formik.touched.password && formik.errors.password ? <div className="text-red-600">{formik.errors.password}</div> : null}
				{/* Login button */}
				<Button type="submit" className="w-full mt-5">
					Sign In
				</Button>
				<p className="mt-2">
					Don't have account?
					{
						<Link to={"/SignUp"} className="text-blue-700 underline">
							Sign Up
						</Link>
					}
				</p>
			</form>
		</div>
	);
}

export default Login;
