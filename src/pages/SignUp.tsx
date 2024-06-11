import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import SignupSchema from "@/Validation/ValidationSchema";
import { account } from "@/appwrite/appwrite";
import { ID } from "@/appwrite/appwrite";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function SignUp() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmpassword: "",
		},
		validationSchema: SignupSchema,
		onSubmit: async (values) => {
			const register = account.create(ID.unique(), values.email, values.password, values.firstName);

			toast.promise(register, {
				loading: "Registering user ...",
				error: "Ragistration failed",
				success: "Register successful",
			});

			try {
				await register;
				navigate("/");
			} catch (error) {
				console.error("Error register in:", error);
			}
		},
	});
	return (
		<div className="w-1/2 border-black border-[1px] rounded-lg p-5">
			<h1 className="text-center p-4 text-xl font-bold underline">REGISTER</h1>

			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="FName" className="font-semibold ">
					First Name
				</label>
				<Input type="text" placeholder="Enter First Name" id="firstName" {...formik.getFieldProps("firstName")} />
				{formik.touched.firstName && formik.errors.firstName ? <div className="text-red-600">{formik.errors.firstName}</div> : null}
				<label htmlFor="Lname" className="font-semibold ">
					Last Name
				</label>
				<Input type="text" placeholder="Enter Last Name" id="lastName" {...formik.getFieldProps("lastName")} />
				{formik.touched.lastName && formik.errors.lastName ? <div className="text-red-600">{formik.errors.lastName}</div> : null}

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
				<label htmlFor="Password" className="font-semibold">
					Confirm Password
				</label>
				<Input type="password" placeholder="confirm password" id="confirmpassword" {...formik.getFieldProps("confirmpassword")} />
				{formik.touched.confirmpassword && formik.errors.confirmpassword ? <div className="text-red-600">{formik.errors.confirmpassword}</div> : null}
				{/* Sign Up button */}
				<Button type="submit" className="w-full mt-5">
					SignUp
				</Button>
				<p className="mt-2">
					Already have account?
					<Link to={"/login"} className="text-blue-700 underline">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default SignUp;
