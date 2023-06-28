import React, { useState } from "react";
import EditName from "./EditName";
import EditPassword from "./EditPassword";
import {
	EditWrapper,
	EditHeaderWrapper,
	EditModeWrapper,
	EditMode,
	Mode,
	ModeWrapper,
} from "./styled.js";

const EditProfile = () => {
    const [editState, setEditState] = useState(true);
	return (
		<EditWrapper>
			<EditHeaderWrapper>
				<h1>Edit Profile</h1>
			</EditHeaderWrapper>
			{editState === true ? (
				<>
					<EditName />
				</>
			) : (
				<>
					<EditPassword />
				</>
			)}

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
