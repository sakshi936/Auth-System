import { useQuery } from "@tanstack/react-query";

interface GithubUserdata {
	name: string;
	login: string;
	avatar_url: string;
	bio: string;
}

interface Githubrepodata {
	id: number;
	name: string;
	homepage: string | null;
}

interface GithubProfileProps {
	username: string;
}

export default function GithubProfile({ username }: GithubProfileProps) {
	const {
		isPending: userPending,
		error: userError,
		data: userData,
	} = useQuery<GithubUserdata>({
		queryKey: ["Userdata", username],
		queryFn: () => fetch(`https://api.github.com/users/${username}`).then((res) => res.json()),
		staleTime: 0,
	});

	const {
		isPending: repoPending,
		error: repoError,
		data: repoData,
	} = useQuery<Githubrepodata[]>({
		queryKey: ["repoData", userData],
		queryFn: () => fetch(`https://api.github.com/users/${userData?.login}/repos`).then((res) => res.json()),
	});

	if (userPending || repoPending) return "Loading...";

	if (userError || repoError) return <p className="text-red-500">{"An error has occurred: "} userError.message repoError.message</p>;

	const NewrepoData = repoData?.filter((repo) => repo.homepage !== null).slice(0, 5) || [];
	return (
		<div className="w-full md:w-[30rem] h-auto p-5 mt-9 border-[2px] border-black rounded-lg">
			<div className="flex gap-5 p-3 flex-wrap">
				<img src={userData.avatar_url} alt="avt" width={"200px"} height={"200px"} className="rounded-full" />
				<div className="text-justify">
					<p className=" mt-12 text-xl font-semibold">{userData.name}</p>

					<p>
						<span className="text-gray-500">{userData.login}</span>
						<br />
						{userData.bio}
					</p>
				</div>
			</div>

			<div className="flex justify-center">
				<ul className="w-full">
					{NewrepoData.map((repo) => (
						<li key={repo.id} className="mt-3 border-black border-[2px] w-full px-3 py-2 rounded-md">
							{" "}
							{repo.name}:{" "}
							<a href={repo.homepage || "#"} className="text-blue-600 underline">
								Live link
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
