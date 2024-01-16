import { useEffect, useState } from "react";
import Input from "./Components/input/Input";
import Badge from "./Components/badge/Badge";
import { user } from "./Types/types";
import { fetchUserData } from "./API/api";
import styles from "./App.module.css";

function App() {
  const [chipData, setChipData] = useState<user[]>([]);
  const [usersData, setUsersData] = useState<user[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserData = await fetchUserData();
      if (fetchedUserData) {
        setUsersData(fetchedUserData);
      }
    };
    fetchData();
  }, []);

  const unselectBadge = (selectedUser: user) => {
    setChipData((prevState) =>
      prevState.filter((user) => user.id.value !== selectedUser.id.value)
    );
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.outerDiv}>
        <div className={styles.chipContainer}>
          {chipData?.map((item, index) => (
            <Badge key={item.id.value || index} selectedUser={item}>
              <span onClick={() => unselectBadge(item)}>&#10005;</span>
            </Badge>
          ))}
        </div>
        <Input
          setChipData={setChipData}
          userData={usersData.filter((item) => !chipData.includes(item))}
        />
      </div>
    </div>
  );
}

export default App;
