import "./styles/index.css";
import ContextProvider from "./contexts/ContextProvider";
import Home from "./pages/home";
import Project from "./pages/project";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
	return (
		<BrowserRouter>
			<ContextProvider>
				<main className="w-full min-h-dvh bg-neutral-50 text-neutral-950">
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="project" element={<Project />} />
					</Routes>
				</main>
			</ContextProvider>
		</BrowserRouter>
	);
}
