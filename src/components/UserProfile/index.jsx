import Identicon from "identicon.js";
import { useToken } from "../../utils/TokenContext.jsx";
import {
	ProfileWrapper,
	ImageWrapper,
	ImageMask,
	Image,
	DataWrapper,
} from "./styled.js";

const UserProfile = () => {
    const { tokenData } = useToken();
	const { name, email } = tokenData;

	return (
		<ProfileWrapper>
			<ImageWrapper>
				<ImageMask>
					<Image
						src={`data:image/png;base64,${new Identicon(
							email,
							200
						).toString()}`}
						alt="Avatar User"
					/>
				</ImageMask>
			</ImageWrapper>
			<DataWrapper>
				<span>{name}</span>
				<span>{email}</span>
				<span>Daily Task</span>
				<ul>
					<li>Study</li>
					<li>Work</li>
					<li>Rest</li>
					<li>Other</li>
				</ul>
			</DataWrapper>
		</ProfileWrapper>
	);
};

export default UserProfile