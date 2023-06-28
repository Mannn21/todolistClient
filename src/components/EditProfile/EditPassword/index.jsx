import React from "react";
import { Formik, Field, Form } from "formik";
import styled from "../../../styles/global.module.css";
import * as Yup from "yup";
import { useToken } from "../../../utils/TokenContext.jsx";

const EditPasswordSchema = Yup.object().shape({
	newPassword: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
	oldPassword: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
	confNewPassword: Yup.string()
		.min(4, "Too Short!")
		.max(80, "Too Long!")
		.required("Required"),
});

const EditPassword = () => {
	const { refreshHooks, tokenData, axiosJWT } = useToken();
	const { refresh, setRefresh } = refreshHooks;
	const { token, email } = tokenData;

	const handleUpdatePassword = async (email, password, newPassword, confNewPassword) => {
		const requestData = {
			email,
			password,
			newPassword,
			confNewPassword
		}
		await axiosJWT.put(`${import.meta.env.VITE_BASE_URL}/`, requestData, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(() => {
			setRefresh(!refresh)
		})
	}

	return (
		<Formik
			initialValues={{
				newPassword: "",
				confNewPassword: "",
				oldPassword: "",
			}}
			validationSchema={EditPasswordSchema}
			onSubmit={(values, {resetForm}) => {
				handleUpdatePassword(email, values.oldPassword, values.newPassword, values.confNewPassword)
				resetForm()
			}}>
			{({ errors, touched }) => (
				<Form className={styled.form}>
					<div className={styled["input-wrapper"]}>
						<label htmlFor="newPassword" className={styled.label}>
							Masukkan Password Baru :
						</label>
						<div className={styled["input-box"]}>
							<Field
								className={styled.input}
								name="newPassword"
								type="password"
								id="newPassword"
							/>
							{errors.newPassword && touched.newPassword ? (
								<span className={styled.error}>*{errors.newPassword}</span>
							) : null}
						</div>
					</div>
					<div className={styled["input-wrapper"]}>
						<label htmlFor="confNewPassword" className={styled.label}>
							Konfirmasi Password Baru :
						</label>
						<div className={styled["input-box"]}>
							<Field
								className={styled.input}
								name="confNewPassword"
								type="password"
								id="confNewPassword"
							/>
							{errors.confNewPassword && touched.confNewPassword ? (
								<span className={styled.error}>*{errors.confNewPassword}</span>
							) : null}
						</div>
					</div>

					<div className={styled["input-wrapper"]}>
						<label htmlFor="oldPassword" className={styled.label}>
							Masukkan Password Anda :
						</label>
						<div className={styled["input-box"]}>
							<Field
								className={styled.input}
								name="oldPassword"
								type="password"
								id="oldPassword"
							/>
							{errors.oldPassword && touched.oldPassword ? (
								<span className={styled.error}>*{errors.oldPassword}</span>
							) : null}
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

export default EditPassword;
