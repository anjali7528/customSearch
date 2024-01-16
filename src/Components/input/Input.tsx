import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../dropDown/Dropdown";
import { user } from "../../Types/types";
import styles from "./input.module.css";

interface IInput {
  setChipData: React.Dispatch<React.SetStateAction<user[]>>;
  userData: user[];
}

const Input = ({ setChipData, userData }: IInput) => {
  const [filteredData, setFilteredData] = useState<user[]>();
  const inputField = useRef();

  useEffect(() => {
    if (inputField.current) {
      renderList((inputField.current as any).value);
    }
  }, [userData]);

  const renderList = (value: string) => {
    if (value.length === 0) {
      setFilteredData([]);
      return;
    }
    setFilteredData(
      userData?.filter((user) => {
        const fullName = `${user?.name?.first} ${user?.name?.last}`;
        return fullName.toLowerCase().includes(value.toLowerCase());
      }) || []
    );
  };

  const onItemClick = (user: user) => {
    setFilteredData((prevState) =>
      prevState?.filter((item) => item?.id?.value !== user.id.value)
    );
    setChipData((prevState) => [...prevState, user]);
  };

  const handleKeyDown = (e: any) => {
    const { selectionStart } = e.target;
    const { keyCode } = e;
    if (
      (inputField.current as any).value.length === 0 &&
      selectionStart === 0 &&
      keyCode === 8
    ) {
      setChipData((prevState) => prevState.slice(0, -1));
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        onChange={(e) => renderList(e.target.value)}
        ref={inputField as any}
        className={styles.input}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Dropdown filteredData={filteredData || []} onItemClick={onItemClick} />
    </div>
  );
};

export default Input;
