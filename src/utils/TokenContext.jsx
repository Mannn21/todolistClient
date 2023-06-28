import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useRefreshToken from "./useToken";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
	const [refresh, setRefresh] = useState(false);
	const refreshHooks = { refresh, setRefresh };
	const tokenData = useRefreshToken();
	const {exp, handleExp, handleName, handleId, handleToken} = tokenData

	const axiosJWT = axios.create();
	axiosJWT.interceptors.request.use(
		async config => {
			const now = new Date();
			if (exp * 1000 < now.getTime()) {
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/refresh`
				);
				config.headers.Authorization = `Bearer ${response.data.payload.details.data}`;
				handleToken(response.data.payload.details.data);
				const decoded = jwt_decode(response.data.payload.details.data);
				handleName(decoded.name);
				handleExp(decoded.exp);
				handleId(decoded.user_id);
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	return (
		<TokenContext.Provider value={{ tokenData, refreshHooks, axiosJWT }}>
			{children}
		</TokenContext.Provider>
	);
};

export const useToken = () => {
	return useContext(TokenContext);
};
