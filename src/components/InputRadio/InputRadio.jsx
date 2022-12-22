import styles from "./inputRadio.module.css";

const InputRadio = ({ label, value, checked, onClick }) => {
  const clickHandler = () => {
    onClick(value);
  };

  return (
    <>
      <div className={styles.radioBlock} onClick={clickHandler}>
        <p>{label}</p>
        <span className={styles.radioButton}>
          <span
            className={styles.innerRadioButton}
            style={{ transform: `scale(${!checked ? 0 : 1})` }}
          ></span>
        </span>
      </div>
    </>
  );
};

export default InputRadio;
