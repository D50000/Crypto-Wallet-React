import "./App.css";
import BalanceChart from "./components/balance-chart";
import Wallet from "./components/Wallet";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Wallet</h1>
        <BalanceChart></BalanceChart>
        <Wallet></Wallet>
      </header>
    </div>
  );
}

export default App;
