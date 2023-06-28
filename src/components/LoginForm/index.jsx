import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "./index.module.css";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
});

const LoginForm = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (email, password) => {
		const requestData = {
			email,
			password,
		};
		axios({
			method: "POST",
			url: `${import.meta.env.VITE_BASE_URL}/login`,
			data: requestData,
		})
			.then(result => {
				navigate("/dashboard");
			})
			.catch(err => {
				setError(err.response.data.payload.status);
			});
	};

	return (
		<div className={styled.container}>
			<div className={styled.wrapper}>
				<div className={styled.headerWrapper}>
					<h1 className={styled.headerLogin}>Login to ToList</h1>
					<span className={styled.textLogin}>
						Masuk dan nikmati fiturnya untuk membantu mengelola kegiatanmu.
					</span>
					{error === "" ? null : (
						<span className={styled.errorText}>{error}</span>
					)}
				</div>
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={LoginSchema}
					onSubmit={values => {
						handleLogin(values.email, values.password);
					}}>
					{({ errors, touched }) => (
						<Form className={styled.formWrapper}>
							{/* Email Input */}
							<div className={styled.inputWrapper}>
								<label htmlFor="email" className={styled.label}>
									Email
								</label>
								<Field
									id="email"
									name="email"
									type="email"
									className={styled.field}
									placeholder="user123@gmail.com"
									autoComplete="off"
								/>
								{errors.email && touched.email ? (
									<div className={styled.error}>{errors.email}</div>
								) : null}
							</div>
							{/* Password Input */}
							<div className={styled.inputWrapper}>
								<label htmlFor="password" className={styled.label}>
									Password
								</label>
								<Field
									id="password"
									name="password"
									type="password"
									className={styled.field}
									placeholder="*******"
								/>
								{errors.password && touched.password ? (
									<div className={styled.error}>{errors.password}</div>
								) : null}
							</div>
							<button type="submit" className={styled.button}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
				<div className={styled.footer}>
					<span className={styled.spanFooter}>
						Belum punya akun ?
						<Link to="/register" className={styled.linkRegister}>
							Klik Disini
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
