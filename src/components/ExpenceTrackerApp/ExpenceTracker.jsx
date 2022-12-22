import { createContext, useContext, useReducer } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./expenceTrackerApp.module.css";
export const ExpenceTrackerContext = createContext();

const ExpenceTrackerApp = ({ children }) => {
  const reducer = (state, action) => {
    if (action.type === "addIncomeTransaction") {
      return {
        ...state,
        transactions: {
          income: [...state.transactions.income, action],
          expence: [...state.transactions.expence],
        },
        allTransactions: [...state.allTransactions, action],
      };
    }
    if (action.type === "addExpenceTransaction") {
      return {
        ...state,
        transactions: {
          income: [...state.transactions.income],
          expence: [...state.transactions.expence, action],
        },
        allTransactions: [...state.allTransactions, action],
      };
    }
    if (action.type === "deleteIncomeTransaction") {
      const deletedIncome = state.transactions.income.filter(
        (t) => t.id !== action.id
      );
      const allDeletedIncome = state.allTransactions.filter(
        (t) => t.id !== action.id
      );
      return {
        ...state,
        transactions: {
          income: deletedIncome,
          expence: [...state.transactions.expence],
        },
        allTransactions: allDeletedIncome,
      };
    }
    if (action.type === "deleteExpenceTransaction") {
      const deletedExpence = state.transactions.expence.filter(
        (t) => t.id !== action.id
      );
      const allDeletedExpence = state.allTransactions.filter(
        (t) => t.id !== action.id
      );
      return {
        ...state,
        transactions: {
          income: [...state.transactions.income],
          expence: deletedExpence,
        },
        allTransactions: allDeletedExpence,
      };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    transactions: { income: [], expence: [] },
    allTransactions: [],
  });

  const value = { state, dispatch };
  return (
    <div className={styles.expenceTrackerApp}>
      <h2>اپلیکیشن مدیریت مخارج</h2>
      <ExpenceTrackerContext.Provider value={value}>
        <Toaster
          toastOptions={{
            success: {
              iconTheme: {
                primary: "#1e293b",
                secondary: "white",
              },
            },
            error: {
              style: {
                color: "#dc2626",
              },
            },
            style: {
              color: "#1e293b",
            },
          }}
          position="top-left"
          reverseOrder={true}
        />
        {children}
      </ExpenceTrackerContext.Provider>
    </div>
  );
};
export const useExpenceTrackerContext = () => useContext(ExpenceTrackerContext);
export default ExpenceTrackerApp;
