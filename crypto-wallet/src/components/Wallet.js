import { useState, useEffect } from "react";

import ButtonBar from "./button-bar";

export default function Wallet() {
  const [symbolList, setSymbolList] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price").then((res) =>
      res.json().then((data) => {
        setSymbolList(data);
        setFilteredResults(data);
      })
    );
  }, []); // Give [] for the deps to fire once.

  const searchInput = (e) => {
    // TODO: debounce
    console.log(e.target.value);
    setSearchSymbol(e.target.value);
    if (searchSymbol === "") {
      setFilteredResults(symbolList);
    } else {
      const result = symbolList.filter((pair) => {
        const regex = new RegExp(`${searchSymbol}`, "i");
        return pair.symbol.match(regex);
      });
      setFilteredResults(result);
    }
  };

  return (
    <div>
      <span>wallet here</span>
      <ButtonBar></ButtonBar>
      <div>
        <input onChange={searchInput} placeholder="Search..."></input>
      </div>
      {filteredResults.map((symbol) => (
        <div className="container" key={symbol.symbol}>
          <div>{symbol.symbol}</div>
          <div>{symbol.price}</div>
        </div>
      ))}
    </div>
  );
}
