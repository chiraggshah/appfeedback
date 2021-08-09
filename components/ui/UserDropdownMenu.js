import cn from "classnames";
import { useState } from "react";
import Avatar from "boring-avatars";

import s from "./DropdownMenu.module.css";

const UserDropdownMenu = ({ user }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <button className={s.avatarButton} onClick={() => setDisplay(!display)}>
        <Avatar
          size={32}
          name={user.email}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </button>

      {display && (
        <ul className={s.dropdownMenu}>
          <li>
            <div className={cn(s.linkGeneral)}>{user.email}</div>
          </li>

          <li>
            <a
              href="/api/auth/logout"
              className={cn(s.linkGeneral, s.logoutLink)}
              onClick={() => setDisplay(false)}
            >
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdownMenu;
