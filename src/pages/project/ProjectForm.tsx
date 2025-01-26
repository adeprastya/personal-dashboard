import { useRef, useState } from "react";
import InputField from "../../components/shared/InputField";
import type { ProjectPayload } from "../../types/Project";

const sty = {
	input: "w-full h-8 border border-neutral-600 rounded-sm focus:outline-neutral-600",
	inputTech: "w-30 h-8 border border-neutral-600 rounded-sm focus:outline-neutral-600",
	button:
		"w-fit h-8 px-5 rounded-sm tracking-wider text-white bg-neutral-900 hover:bg-neutral-700 focus:bg-neutral-700 focus:outline-2 focus:outline-neutral-900 transition-all",
	buttonGhost:
		"w-fit h-8 px-5 rounded-sm tracking-wider text-neutral-950 bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-200 focus:outline-2 focus:outline-neutral-300 transition-all"
};

const projectPayload: ProjectPayload = {
	title: "",
	description: "",
	technologies: [""],
	site_url: "",
	source_code_url: "",
	demo_url: ""
};

export default function ProjectForm() {
	const [payload, setPayload] = useState(projectPayload);

	const formRef = useRef<HTMLFormElement>(null);
	const [expandedForm, setExpandedForm] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Filter out empty technologies
		const filteredPayload = {
			...payload,
			technologies: payload.technologies.filter((tech) => tech.trim() !== "")
		};

		console.log(filteredPayload);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setPayload((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleTechChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const value = e.target.value;

		setPayload((p) => {
			const updatedTechnologies = [...p.technologies];
			updatedTechnologies[index] = value;

			if (value.trim() && index === updatedTechnologies.length - 1) {
				updatedTechnologies.push("");
			}

			return { ...p, technologies: updatedTechnologies };
		});
	};

	return (
		<div className="max-w-md min-w-2xs border border-neutral-200 rounded-lg shadow-sm">
			<button
				type="button"
				className="cursor-pointer w-full py-1 px-4 text-xl bg-neutral-100 flex justify-between"
				onClick={() => setExpandedForm((p) => !p)}
			>
				<span>Add New Project</span>
				<span>{expandedForm ? "/\\" : "\\/"}</span>
			</button>

			<form
				onSubmit={handleSubmit}
				ref={formRef}
				className="px-4 transition-all duration-300 overflow-clip flex flex-col gap-6"
				style={{ height: expandedForm ? `${formRef.current?.scrollHeight}px` : "0" }}
			>
				<div />

				<InputField label="Title" name="title" required onChange={handleChange} className={sty.input} />

				<InputField
					label="Description"
					name="description"
					type="textarea"
					required
					onChange={handleChange}
					className={sty.input}
				/>

				<div>
					<p className="leading-none mb-2">Technologies</p>

					<div className="flex flex-wrap gap-2">
						{payload.technologies.map((tech, i) => (
							<InputField
								key={i}
								label={`Tech ${i + 1}`}
								name={`tech_${i}`}
								required={i == 0}
								onChange={(e) => handleTechChange(e, i)}
								value={tech}
								className={`${sty.inputTech} ${i !== 0 && tech === "" ? "opacity-40" : ""}`}
							/>
						))}
					</div>
				</div>

				<InputField label="Site URL" name="site_url" onChange={handleChange} className={sty.input} />

				<InputField label="Source Code URL" name="source_code_url" onChange={handleChange} className={sty.input} />

				<InputField label="Demo URL" name="demo_url" onChange={handleChange} className={sty.input} />

				<div className="flex gap-2 pb-4">
					<button type="submit" className={sty.button}>
						Submit
					</button>

					<button type="reset" className={sty.buttonGhost} onClick={() => setPayload(projectPayload)} title="Clear">
						Clear
					</button>
				</div>
			</form>
		</div>
	);
}