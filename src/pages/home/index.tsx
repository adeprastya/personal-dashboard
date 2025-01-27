import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../../contexts/useAuth";

const sty = {
	container: "w-full min-h-dvh p-8 flex flex-col justify-center items-center gap-8",

	title: "font-semibold tracking-wide text-3xl",
	desc: "font-semibold tracking-wide text-2xl",

	button:
		"cursor-pointer w-fit h-8 px-5 rounded-sm tracking-wider text-white bg-neutral-900 hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-2 focus:outline-neutral-900 transition-all"
};

export default function Home() {
	const { signIn } = useAuth();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (searchParams.has("success") && searchParams.has("message")) {
			alert(searchParams.get("success") + " " + searchParams.get("message"));
		}

		if (searchParams.get("success") === "true" && searchParams.has("token")) {
			signIn(searchParams.get("token"));
		}
	});

	const handleSignin = () => {
		window.location.href = import.meta.env.VITE_API_URL + "/auth/google";
	};

	return (
		<section className={sty.container}>
			<h1 className="text-5xl font-semibold">Personal Dashboard</h1>

			<p className="text-2xl">This is just a private dashboard to manage my personal data</p>

			<button onClick={handleSignin} className={sty.button}>
				Sign In
			</button>
		</section>
	);
}
