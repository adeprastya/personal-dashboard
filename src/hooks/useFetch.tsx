import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

function useFetch<T = unknown>(
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
	url: string,
	options: AxiosRequestConfig = {}
) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("!! USE FETCH RUNNING");

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

export default useFetch;
