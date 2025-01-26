import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";
import useFetch from "../../hooks/useFetch";
import type { Project } from "../../types/Project";
import { Fragment } from "react";

export default function Project() {
	const { data, error, loading } = useFetch<{ data: Array<Project> }>("GET", "/projects");

	return (
		<section className="p-8 flex flex-col gap-8">
			<h1 className="text-3xl">Project</h1>

			<ProjectForm />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{Array.isArray(data?.data) &&
					data?.data.map((project) => {
						return (
							<Fragment key={project.id}>
								<ProjectCard project={project} />
								<ProjectCard project={project} />
								<ProjectCard project={project} />
								<ProjectCard project={project} />
							</Fragment>
						);
					})}
			</div>

			{error && <p>{error.message}</p>}

			{loading && <p>Loading...</p>}
		</section>
	);
}
