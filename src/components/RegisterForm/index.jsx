import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import styled from "./index.module.css";

const RegisterSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short")
		.max(70, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid Email").required("Required"),
	password: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
	confPassword: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
});

const RegisterForm = () => {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister =  (name, email, password, confPassword) => {
		const requestData = {
			name,
			email,
			password,
			confPassword,
		};
		axios({
			method: "POST",
			url: `${import.meta.env.VITE_BASE_URL}/`,
			data: requestData
		}).then(result => {
				navigate("/");
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
						Daftar dan nikmati fiturnya untuk membantu mengelola kegiatanmu.
					</span>
					{error === "" ? null : (
						<span className={styled.errorText}>{error}</span>
					)}
				</div>
				<Formik
					initialValues={{
						name: "",
						email: "",
						password: "",
						confPassword: "",
					}}
					validationSchema={RegisterSchema}
					onSubmit={values => {
						handleRegister(
							values.name,
							values.email,
							values.password,
							values.confPassword
						);
					}}>
					{({ errors, touched }) => (
						<Form className={styled.formWrapper}>
							{/* Email Input */}
							<div className={styled.inputWrapper}>
								<label htmlFor="name" className={styled.label}>
									Name
								</label>
								<Field
									id="name"
									name="name"
									type="text"
									className={styled.field}
									placeholder="user123"
									autoComplete="off"
								/>
								{errors.name && touched.name ? (
									<div className={styled.error}>{errors.name}</div>
								) : null}
							</div>
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
							{/* Confirm Password */}
							<div className={styled.inputWrapper}>
								<label htmlFor="confPassword" className={styled.label}>
									Confirm Password
								</label>
								<Field
									id="confPassword"
									name="confPassword"
									type="password"
									className={styled.field}
									placeholder="*******"
								/>
								{errors.confPassword && touched.confPassword ? (
									<div className={styled.error}>{errors.confPassword}</div>
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
						Sudah punya akun ?
						<Link to="/" className={styled.linkRegister}>
							Klik Disini
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
