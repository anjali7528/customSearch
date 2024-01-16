import { user } from "../../Types/types";
import Badge from "../badge/Badge";
import styles from "./dropDown.module.css";

interface IDropdown {
  filteredData: user[];
  onItemClick: (user: user) => void;
}

const Dropdown = ({ filteredData, onItemClick }: IDropdown) => {
  return (
    <div className={styles.dropdownDiv}>
      {filteredData?.map((user, idx) => (
        <Badge key={`dropdownItem_${idx}`} selectedUser={user} onItemClick={() => onItemClick(user)}>
          <div>{user.email}</div>
        </Badge>
      ))}
    </div>
  );
};

export default Dropdown;
