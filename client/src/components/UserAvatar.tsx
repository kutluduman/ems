import Avatar from "@mui/material/Avatar";

import { stringAvatar } from "../utils";

interface UserAvatarProps {
  name?: string;
  surname?: string;
}

const UserAvatar = ({ name, surname }: UserAvatarProps) => {
  return <Avatar {...stringAvatar(`${name} ${surname}`)} />;
}
export default UserAvatar;