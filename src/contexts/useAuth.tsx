import { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router";

type AuthData = string | null;

export type AuthContextType = {
	auth: AuthData;
	signIn: (authData: AuthData) => void;
	signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	const [auth, setAuth] = useLocalStorage<AuthData>("personal-dashboard-auth", null);

	useEffect(() => {
		if (auth) navigate("/project");
	}, [auth, navigate]);

	const signIn = (authData: AuthData) => {
		setAuth(authData);
		navigate("/project");
	};

	const signOut = () => {
		setAuth(null);
		navigate("/");
	};

	return <AuthContext.Provider value={{ auth, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("__useAuth must be used within an AuthContextProvider");
	}
	return context;
}
