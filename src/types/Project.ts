export type Project = {
	id: number;
	created_at: string;
	image_url: string;
	title: string;
	description: string;
	technologies: Array<string>;
	site_url?: string;
	source_code_url?: string;
	demo_url?: string;
};

export type ProjectPayload = Omit<Project, "id" | "created_at" | "image_url">;
