import styles from "./transaction.module.css";
import { FaTrash, FaPenNib } from "react-icons/fa";
import { useExpenceTrackerContext } from "../ExpenceTrackerApp/ExpenceTracker";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import Tooltip from "../Common/Tooltip/Toooltip";
import digitSeprator from "../../Utils/digitSeprator";
import digitHider from "../../Utils/digitHider";
import InputRadio from "../InputRadio/InputRadio";

const Transaction = ({ title, cash, id, type }) => {
  const cashString = digitSeprator(cash);
  const { state, dispatch } = useExpenceTrackerContext();
  const [showTransaction, setShowTransaction] = useState(0);
  const [showCash, setshowCash] = useState(0);
  const [showEdit, setShowEdit] = useState(0);
  const [number, setNumber] = useState("");
  const [inputTitle, setinputTitle] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [fade, setFade] = useState(0);
  const unique_id = uuid();

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
  const editHandler = () => {
    showEdit ? setShowEdit(0) : setShowEdit(1);
    setTimeout(() => setFade(1), 50);
  };
  const editTransactionHandler = () => {
    const initialType = type;
    const newType = transactionType;
    // if (title === "" && number === "")  
      if (initialType === newType) {
        if (type === "income") {
          dispatch({
            id: id,
            cash: parseInt(number) ? parseInt(number) : parseInt(cash),
            title: inputTitle ? inputTitle : title,
            type: "editIncomeTransaction",
          });
        }
        if (type === "expence") {
          dispatch({
            id: id,
            cash: parseInt(number) ? parseInt(number) : parseInt(cash),
            title: inputTitle ? inputTitle : title,
            type: "editExpenceTransaction",
          });
        }
      } else {
        if (newType === "income") {
          dispatch({ id: id, type: "deleteExpenceTransaction" });
          dispatch({
            id: unique_id,
            title: inputTitle ? inputTitle : title,
            cash: parseInt(number) ? parseInt(number) : parseInt(cash),
            transactionType: transactionType,
            type: "addIncomeTransaction",
          });
        }
        if (newType === "expence") {
          dispatch({ id: id, type: "deleteIncomeTransaction" });
          dispatch({
            id: unique_id,
            title: inputTitle ? inputTitle : title,
            cash: parseInt(number) ? parseInt(number) : parseInt(cash),
            transactionType: transactionType,
            type: "addExpenceTransaction",
          });
        }
      }
    setShowEdit(0);
  };

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
            {cashString.length > 5
              ? digitHider(cashString, 0, 10)
              : cashString + " "}
            تومان
          </span>
        </div>
        <div className={styles.transactionIcons}>
          <span className={styles.transactionEdit} onClick={editHandler}>
            <FaPenNib />
          </span>
          <span className={styles.transactionDelete} onClick={deleteHandler}>
            <FaTrash />
          </span>
        </div>
      </div>

      {showEdit ? (
        <form className={styles.formBlock} style={{ scale: `${fade}` }}>
          <label>
            <input
              onChange={(e) => setinputTitle(e.target.value)}
              placeholder="عنوان جدید را وارد کنید ..."
              type="text"
            />
          </label>
          <label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              placeholder="مبلغ جدید را وارد کنید ..."
              type="number"
            />
          </label>
          <section className={styles.radioBlock}>
            <InputRadio
              label="درآمد"
              value="income"
              checked={transactionType === "income"}
              onClick={setTransactionType}
            />
            <InputRadio
              label="هزینه"
              value="expence"
              checked={transactionType === "expence"}
              onClick={setTransactionType}
            />
          </section>
          <div className={styles.buttonsBlock}>
            <button
              className={styles.submitButton}
              onClick={(e) => editTransactionHandler(e)}
            >
              {" "}
              ویرایش
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setShowEdit(0)}
            >
              انصراف
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default Transaction;
