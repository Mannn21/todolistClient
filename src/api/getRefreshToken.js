import axios from "axios";
import jwt_decode from "jwt-decode";
import { useToken } from "../utils/TokenContext.jsx";

export const getRefreshToken = () => {
	const { tokenData } = useToken();
	const { handleName, handleExp, handleId, handleToken } = tokenData;

	const axiosJWT = axios.create;
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

	return { axiosJWT };
};
