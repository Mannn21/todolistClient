import React, { useState } from "react";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import {
	EditWrapper,
	EditHeaderWrapper,
	EditHeader,
	EditModeWrapper,
	EditMode,
	Mode,
	ModeWrapper,
	FormWrapper
} from "./styled.js";

const EditProfile = () => {
	const [editState, setEditState] = useState(true);
	return (
		<EditWrapper>
			<EditHeaderWrapper>
				<EditHeader>Edit Profile</EditHeader>
			</EditHeaderWrapper>
			<FormWrapper>
				{editState === true ? (
					<>
						<EditName />
					</>
				) : (
					<>
						<EditPassword />
					</>
				)}
			</FormWrapper>
			<EditModeWrapper>
				<ModeWrapper>
					<EditMode>Option{" : "}</EditMode>
					{editState === true ? (
						<Mode onClick={() => setEditState(!editState)}>Edit Password</Mode>
					) : (
						<Mode onClick={() => setEditState(!editState)}>Edit Nama</Mode>
					)}
				</ModeWrapper>
			</EditModeWrapper>
		</EditWrapper>
	);
};

export default EditProfile;
