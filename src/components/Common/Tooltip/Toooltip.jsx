import { useState } from "react";
import styles from "./tooltip.module.css";
const Tooltip = ({ innerText, scaleSize }) => {
  const [fade, setFade] = useState(0);
  setTimeout(() => setFade(1), 100);

  return (
    <>
      <span
        className={styles.tooltip}
        style={{ scale: fade ? `${scaleSize}` : 0 }}
      >
        {innerText}
      </span>
    </>
  );
};

export default Tooltip;
