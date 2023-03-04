import * as React from "react";

import styles from "./Dropdown.module.scss";

import { DropdownProps } from "./Dropdown.d";

const Dropdown: React.FC<DropdownProps> = ({
  defaultOption = null,
  options = [],
}) => {
  const [selected, setSelected] = React.useState(defaultOption);
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <section className={styles.dropdown}>
      <div className={styles.dropdownInner}>
        <ul
          className={showOptions ? styles.open : ""}
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <li className={selected === null ? styles.selected : ""}>
            Select Option
          </li>
          {options.map((option) => {
            return (
              <li
                className={selected === option ? styles.selected : ""}
                onClick={() => setSelected(option)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Dropdown;
