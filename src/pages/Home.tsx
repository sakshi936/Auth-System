import { account } from "@/appwrite/appwrite";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function Home() {
	const [User, setUser] = useState<any | null>(null);
	const navigate = useNavigate();

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

	return (
		<>
			<div className="border-[1px] border-black px-20 py-10">
				{User ? (
					<div>
						<p>Welcome,{`${User.name}`}</p>
						<p>Email: {`${User.email}`}</p>
					</div>
				) : (
					"Loading..."
				)}
				<Button
					className="mt-5 w-full"
					onClick={() => {
						const logout = account
							.deleteSession("current")
							.then(() => {
								{
									navigate("/");
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
				<Toaster />
			</div>
		</>
	);
}

export default Home;
