import { useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
    const [token, setToken] = useState("")
	const [email, setEmail] = useState("")
    const [name, setName] = useState("");
	const [exp, setExp] = useState("");
	const [id, setId] = useState("");
	const navigate = useNavigate()

	const handleName = (e) => {
		setName(e)
	}

	const handleExp = (e) => {
		setExp(e)
	}

	const handleId = (e) => {
		setId(e)
	}

	const handleToken = (e) => {
		setToken(e)
	}

	const handleEmail = e => {
		setEmail(e)
	}

	const getRefreshToken = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/refresh`
			);
			setToken(response.data.payload.details.data);
			const decoded = jwt_decode(response.data.payload.details.data);
			setEmail(decoded.email)
			setName(decoded.name);
			setExp(decoded.exp);
			setId(decoded.user_id);
		} catch (error) {
			navigate("/");
		}
	};

    return {name, exp, id, email, token, handleName, handleEmail, handleExp, handleId, handleToken, getRefreshToken}
};

export default useRefreshToken;
