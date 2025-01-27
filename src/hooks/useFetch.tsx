import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

export default function useFetch<T = unknown>(
	method: AxiosRequestConfig["method"] = "GET",
	url: AxiosRequestConfig["url"],
	options: AxiosRequestConfig = {}
) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("__Use Fetch Running");

		const fetch = async () => {
			setLoading(true);

			try {
				const res = await axios({
					method,
					url: import.meta.env.VITE_API_URL + url,
					...options
				});
				setData(res.data);
			} catch (err) {
				setError(err as AxiosError);
			} finally {
				setLoading(false);
			}
		};

		fetch();
	}, [method, url]);

	return { data, error, loading };
}

export const axiosFetch = async (
	method: AxiosRequestConfig["method"],
	url: AxiosRequestConfig["url"],
	options: AxiosRequestConfig = {}
) => {
	const result = {
		result: null as unknown,
		error: null as AxiosError | null
	};

	try {
		console.log("__axiosFetch Running...");

		const res = await axios({
			method,
			url: import.meta.env.VITE_API_URL + url,
			...options
		});
		result.result = res.data;
	} catch (err) {
		result.error = err as AxiosError;
	}
	return result;
};
