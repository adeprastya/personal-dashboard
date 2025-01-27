import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | null = null): [T | null, (newValue: T) => void] {
	const [value, setValue] = useState<T | null>(() => {
		try {
			const jsonValue = localStorage.getItem(key);

			if (jsonValue === null || jsonValue === "undefined") {
				localStorage.setItem(key, JSON.stringify(initialValue));
				return initialValue;
			}

			return JSON.parse(jsonValue) as T;
		} catch (err) {
			console.error(`__Error reading localStorage key "${key}":`, err);
			return initialValue;
		}
	});

	const setStoredValue = (newValue: T) => {
		try {
			setValue(newValue);
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch (err) {
			console.error(`__Error saving localStorage key "${key}":`, err);
		}
	};

	return [value, setStoredValue];
}
