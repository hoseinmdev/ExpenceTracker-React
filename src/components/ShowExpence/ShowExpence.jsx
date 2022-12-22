import { useState } from "react";
import { useExpenceTrackerContext } from "../ExpenceTrackerApp/ExpenceTracker";
import InputRadio from "../InputRadio/InputRadio";
import styles from "./showExpence.module.css";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import Tooltip from "../Common/Tooltip/Toooltip";
import digitSeprator from "../../Utils/digitSeprator";

const ShowExpence = () => {
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(0);
  const [fade, setFade] = useState(0);
  const [showIncomes, setshowIncomes] = useState(0);
  const [showExpences, setshowExpences] = useState(0);
  const [showResult, setshowResult] = useState(0);
  const [transactionType, setTransactionType] = useState("income");
  const { state, dispatch } = useExpenceTrackerContext();
  const unique_id = uuid();

  const addTransactionHandler = (e) => {
    e.preventDefault();
    if (title !== "" && number !== "") {
      if (transactionType === "income") {
        dispatch({
          id: unique_id,
          title: title,
          cash: parseInt(number),
          transactionType: transactionType,
          type: "addIncomeTransaction",
        });
        toast.success("درآمد شما ثبت شد");
      }
      if (transactionType === "expence") {
        dispatch({
          id: unique_id,
          title: title,
          cash: parseInt(number),
          transactionType: transactionType,
          type: "addExpenceTransaction",
        });
        toast.success("هزینه شما ثبت شد");
      }
      setTitle("");
      setNumber("");
      setShowForm(0);
    } else {
      toast.error("عنوان یا مبلغ خالی است");
    }
  };

  const allIncomes = state.transactions.income.reduce(
    (acc, current) => (acc += current.cash),
    0
  );
  const allExpences = state.transactions.expence.reduce(
    (acc, current) => (acc += current.cash),
    0
  );
  const expenceResult = allIncomes - allExpences;
  const stringIncomes = digitSeprator(allIncomes);
  const stringExpences = digitSeprator(allExpences);
  const stringExpenceResult = digitSeprator(expenceResult);
  
  return (
    <>
      <div className={styles.showExpenceBlock}>
        <span className={styles.expenceResultBlock}>
          <span>موجودی شما :</span>
          <span
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setshowResult(1)}
            onMouseLeave={() => setshowResult(0)}
          >
            {showResult ? (
              <Tooltip
                innerText={`${stringExpenceResult + " تومان"}`}
                scaleSize={showResult}
              />
            ) : (
              ""
            )}
            {stringExpenceResult.length > 5
              ? stringExpenceResult.slice(0, 10) + "... "
              : " " + stringExpenceResult + " "}
            تومان
          </span>
        </span>

        <div>
          <span className={styles.userIncomeBlock}>
            {showIncomes ? (
              <Tooltip
                innerText={`${stringIncomes + " تومان"}`}
                scaleSize={showIncomes}
              />
            ) : (
              ""
            )}
            <span>درآمد شما :</span>
            <span
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setshowIncomes(1)}
              onMouseLeave={() => setshowIncomes(0)}
            >
              {stringIncomes.length > 5
                ? stringIncomes.slice(0, 6) + "... تومان"
                : stringIncomes + " تومان"}
            </span>
          </span>

          <span className={styles.userExpenceBlock}>
            {showExpences ? (
              <Tooltip
                innerText={`${stringExpences + " تومان"}`}
                scaleSize={showExpences}
              />
            ) : (
              ""
            )}
            <span>هزینه شما :</span>
            <span
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setshowExpences(1)}
              onMouseLeave={() => setshowExpences(0)}
            >
              {stringExpences.length > 5
                ? stringExpences.slice(0, 6) + "... تومان"
                : stringExpences + " تومان"}
            </span>
          </span>
        </div>

        {showForm ? (
          <form className={styles.formBlock} style={{ scale: `${fade}` }}>
            <label>
              عنوان:
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان را وارد کنید ..."
                type="text"
                value={title}
              />
            </label>
            <label>
              مبلغ:
              <input
                onChange={(e) => setNumber(e.target.value)}
                placeholder="مبلغ را وارد کنید ..."
                type="number"
                value={number}
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
            <button onClick={(e) => addTransactionHandler(e)}>
              {transactionType === "income" ? "ثبت درآمد" : "ثبت هزینه"}
            </button>
          </form>
        ) : (
          ""
        )}
        <button
          onClick={() => {
            if (showForm) {
              setFade(0);
              setTimeout(() => setShowForm(0), 150);
            } else {
              setShowForm(1);
              setTimeout(() => setFade(1), 10);
            }
          }}
        >
          {showForm ? "بستن" : "افزودن"}
        </button>
      </div>
    </>
  );
};

export default ShowExpence;
