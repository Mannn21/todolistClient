import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import styled from "./index.module.css";
import { useToken } from "../../utils/TokenContext.jsx";
import { useNavigate } from "react-router-dom";

export default function NavbarWithCTAButton() {
	const { tokenData, axiosJWT } = useToken();
	const { token } = tokenData;
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axiosJWT.delete(`${import.meta.env.VITE_BASE_URL}/logout`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Navbar fluid rounded className={styled.container}>
			<Link to="/dashboard">
				<img alt="ToList" className="mr-3 h-6 sm:h-9" src="/icon.svg" />
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
					ToList App
				</span>
			</Link>
			<Navbar.Collapse>
				<Link to="/dashboard">
					<p>Dashboard</p>
				</Link>
				<Link to="/statistic">Statistic</Link>
				<Link to="/history">History</Link>
				<Link to="/profile">Profile</Link>
			</Navbar.Collapse>
			<div className="flex md:order-2">
				<Button gradientDuoTone="purpleToBlue" onClick={() => handleLogout()}>
					Logout
				</Button>
				<Navbar.Toggle />
			</div>
		</Navbar>
	);
}
