import { account } from "@/appwrite/appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { GithubUsernameSchema } from "@/Validation/ValidationSchema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GithubProfile from "./GithubProfile";

function Home() {
	const [User, setUser] = useState<any | null>(null);
	const [GithubUser, setGithubUser] = useState<string | boolean>("");
	const navigate = useNavigate();

	const queryClient = new QueryClient();

	useEffect(() => {
		(async () => {
			try {
				const user = await account.get();
				setUser(user);
			} catch (error) {
				setUser(null);
			}
		})();
	}, []);

	const formik = useFormik({
		initialValues: {
			username: "",
		},
		validationSchema: GithubUsernameSchema,
		onSubmit: (values) => {
			setGithubUser(values.username);
		},
	});

	return (
		<div className="w-full">
			<div className="px-20 py-10 w-full  flex justify-between">
				<div>
					{User ? (
						<div>
							<p className="text-5xl font-[Cursive]">Welcome,{`${User.name}`}</p>
							<p className=" ">Email: {`${User.email}`}</p>
						</div>
					) : (
						"Loading..."
					)}
				</div>

				<Button
					className="mt-5 w-fit"
					onClick={() => {
						const logout = account
							.deleteSession("current")
							.then(() => {
								{
									navigate("/login");
									console.log("LogedOut");
								}
							})
							.catch(() => console.log("LogOut failed"));

						toast.promise(logout, {
							loading: " Logging out ...",
							success: "logout successful",
							error: "Error",
						});
					}}
				>
					Logout
				</Button>
			</div>
			{/* Github User Profile */}
			<div className="text-center mt-20">
				<h1 className="text-5xl font-serif">Github Profile</h1>
				<form onSubmit={formik.handleSubmit} className=" mt-5 flex justify-center">
					<div className=" border-black border-[2px] w-fit flex justify-center  rounded-lg p-[2px]">
						<div>
							<Input type="search" placeholder="Github username" id="username" {...formik.getFieldProps("username")} className="w-fit rounded-lg bg-white " />
						</div>

						<Button type="submit" className="bg-slate-500 hover:bg-red-500 px-10 rounded-lg">
							Search
						</Button>
					</div>
				</form>
				{formik.touched.username && formik.errors.username ? <div className="text-red-600">{formik.errors.username}</div> : null}

				<div className=" flex justify-center">
					{GithubUser ? (
						<QueryClientProvider client={queryClient}>
							<GithubProfile username={GithubUser} />
						</QueryClientProvider>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Home;
