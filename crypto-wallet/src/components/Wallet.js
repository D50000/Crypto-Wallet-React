import { useState, useEffect } from "react";

import ButtonBar from "./button-bar";

export default function Wallet() {
  const [symbolList, setSymbolList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price").then((res) =>
      res.json().then((data) => {
        setSymbolList(data);
        const usdRegex = new RegExp(`usdt`, "i");
        const usdPairs = data.filter((pair) => pair.symbol.match(usdRegex));
        setFilteredResults(usdPairs);
      })
    );
  }, []); // Give [] for the deps to fire once.

  const searchInput = (e) => {
    // TODO: debounce
    const input = e.target.value;
    console.log(input);
    if (input === "") {
      setFilteredResults(symbolList);
    } else {
      const result = symbolList.filter((pair) => {
        const regex = new RegExp(`${input}`, "i");
        return pair.symbol.match(regex);
      });
      setFilteredResults(result);
    }
  };

  const selectRow = (symbol) => {
    console.log(symbol);
  };

  return (
    <div>
      <span>wallet here</span>
      <ButtonBar></ButtonBar>
      <div>
        <input onChange={(e) => searchInput(e)} placeholder="Search..."></input>
      </div>
      {filteredResults.map((symbol) => (
        <div
          className="container"
          key={symbol.symbol}
          onClick={(e) => selectRow(symbol.symbol)}
        >
          <div>{symbol.symbol}</div>
          <div>{symbol.price}</div>
        </div>
      ))}
    </div>
  );
}
