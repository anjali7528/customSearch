import { ReactElement } from "react";
import { user } from "../../Types/types";
import styles from "./badge.module.css";

interface IBadge {
  selectedUser: user;
  onItemClick?: () => void;
  children: ReactElement;
}

const Badge = ({ selectedUser, onItemClick, children }: IBadge) => {
  return (
    <div className={styles.badge} onClick={onItemClick}>
      <img
        src={selectedUser?.image}
        alt="icon"
        className={styles.imgContainer}
      />
      <div className={styles.textDiv}>
        <span>
          {selectedUser?.name?.first} {selectedUser?.name?.last}
        </span>
        {children}
      </div>
    </div>
  );
};

export default Badge;
