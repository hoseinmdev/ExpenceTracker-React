import ExpenceTrackerApp from "./components/ExpenceTrackerApp/ExpenceTracker";
import InputRadio from "./components/InputRadio/InputRadio";
import ShowExpence from "./components/ShowExpence/ShowExpence";
import Transaction from "./components/Transaction/Transaction";
import TransactionList from "./components/TransactionList/TransactionList";

const App = () => {
  return (
    <div>
      <ExpenceTrackerApp>
        <ShowExpence />
        {/* <Transaction/> */}
        <TransactionList/>
      </ExpenceTrackerApp>
    </div>
  );
};

export default App;
