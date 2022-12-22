import styles from "./transaction.module.css";
import { FaTrash, FaPenNib } from "react-icons/fa";
import { useExpenceTrackerContext } from "../ExpenceTrackerApp/ExpenceTracker";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import Tooltip from "../Common/Tooltip/Toooltip";
import digitSeprator from "../../Utils/digitSeprator";

const Transaction = ({ title, cash, id, type }) => {
  const { state, dispatch } = useExpenceTrackerContext();
  const [showTransaction, setShowTransaction] = useState(0);
  const [showCash, setshowCash] = useState(0);

  useEffect(() => {
    setShowTransaction(1);
  }, []);
  const deleteHandler = () => {
    toast.error("تراکنش حذف شد");
    setShowTransaction(0);
    if (type === "income") {
      setTimeout(() => {
        dispatch({ id: id, type: "deleteIncomeTransaction" });
      }, 120);
    }
    if (type === "expence") {
      setTimeout(() => {
        dispatch({ id: id, type: "deleteExpenceTransaction" });
      }, 120);
    }
  };

  const cashString = digitSeprator(cash);
  return (
    <>
      <div
        className={`${styles.transactionBlock} ${
          type === "income"
            ? styles.incomeTransaction
            : styles.expenceTransaction
        }`}
        style={{ scale: `${showTransaction}` }}
      >
        <div className={styles.transactionTitleCash}>
          <span>{title}</span>
          {showCash ? (
            <Tooltip
              innerText={`${cashString + " تومان"}`}
              scaleSize={showCash}
            />
          ) : (
            ""
          )}
          <span
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setshowCash(1)}
            onMouseLeave={() => setshowCash(0)}
          >
            {" "}
            {cash.toString().length > 5
              ? cashString.slice(0, 10) + "... تومان"
              : digitSeprator(cash) + " تومان"}
          </span>
        </div>
        <div className={styles.transactionIcons}>
          <span className={styles.transactionEdit}>
            <FaPenNib />
          </span>
          <span
            className={styles.transactionDelete}
            onClick={() => deleteHandler()}
          >
            <FaTrash />
          </span>
        </div>
      </div>
    </>
  );
};

export default Transaction;
