import { useExpenceTrackerContext } from "../ExpenceTrackerApp/ExpenceTracker";
import Transaction from "../Transaction/Transaction";
import styles from "./transactionsList.module.css";
const TransactionList = () => {
  const { state, dispatch } = useExpenceTrackerContext();

  return (
    <div className={styles.transactionsContainer}>
      {state.allTransactions.map((t) => {
        return (
          <Transaction
            key={t.id}
            id={t.id}
            title={t.title}
            cash={t.cash}
            type={t.transactionType}
          />
        );
      })}
    </div>
  );
};

export default TransactionList;
