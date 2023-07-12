import React from "react";
import { Field, Form, Formik } from "formik";
import styled from "../../../styles/global.module.css";
import * as Yup from "yup";
import { useToken } from "../../../utils/TokenContext.jsx";

const EditNameSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	password: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
});

const EditName = () => {
	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh, setRefresh } = refreshHooks;
	const { token, email } = tokenData;

	const handleUpdateName = async (email, name, password) => {
		const requestData = {
			email: email,
			name: name,
			password: password,
		};
		await axiosJWT
			.put(`${import.meta.env.VITE_BASE_URL}/`, requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setRefresh(!refresh);
			});
	};

	return (
		<Formik
			initialValues={{
				name: "",
				password: "",
			}}
			validationSchema={EditNameSchema}
			onSubmit={(values, { resetForm }) => {
				handleUpdateName(email, values.name, values.password);
				resetForm();
			}}>
			{({ errors, touched }) => (
				<Form className={styled.form}>
					<div className={styled["form-container"]}>
						<div className={styled["input-wrapper"]}>
							<label htmlFor="name" className={styled.label}>
								Email Anda :
							</label>
							<div className={styled["input-box"]}>
								<Field
									name="email"
									type="email"
									id="email"
									value={email}
									disable
									className={styled.input}
								/>
							</div>
						</div>
						<div className={styled["input-wrapper"]}>
							<label htmlFor="name" className={styled.label}>
								Masukkan Nama Baru :
							</label>
							<div className={styled["input-box"]}>
								<Field
									// ref={nameRef}
									name="name"
									type="text"
									id="name"
									className={styled.input}
								/>
								{errors.name && touched.name ? (
									<span className={styled.error}>*{errors.name}</span>
								) : null}
							</div>
						</div>
						<div className={styled["input-wrapper"]}>
							<label htmlFor="password" className={styled.label}>
								Masukkan Password :
							</label>
							<div className={styled["input-box"]}>
								<Field
									// ref={passwordRef}
									name="password"
									type="password"
									id="password"
									className={styled.input}
								/>
								{errors.password && touched.password ? (
									<span className={styled.error}>*{errors.password}</span>
								) : null}
							</div>
						</div>
					</div>
					<button type="submit" className={styled.button}>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default EditName;
