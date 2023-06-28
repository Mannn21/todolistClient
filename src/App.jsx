import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import Statistic from "./Pages/Statistic"
import History from "./Pages/History";
import { TokenProvider } from "./utils/TokenContext.jsx";
import { Routes, Route } from "react-router-dom";
const App = () => {

	return (
		<TokenProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/statistic" element={<Statistic/>} />
				<Route path="/history" element={<History />}/>
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</TokenProvider>
	);
};

export default App;
