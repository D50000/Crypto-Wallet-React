import { useState, useEffect } from "react";

import ButtonBar from "./button-bar";

import styled from "styled-components";

const SymbolFeatureContainer = styled.div`
  width: 50vw;

  .symbolDiv {
    display: flex;
    justify-content: space-between;

    > .name {
      width: 35%;
    }
  }
`;

export default function Wallet() {
  const [symbolList, setSymbolList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price").then((res) =>
      res.json().then((data) => {
        setSymbolList(data);
        const usdPairs = filterThUsdt(data);
        setFilteredResults(usdPairs);
      })
    );
  }, []); // Give [] for initial.

  /**
   * Match a single character present in the list below [\wusdt].
   * {4} matches the previous token exactly 4 times from the end.
   * example: *****usdt => capital ignore.
   */
  const filterThUsdt = (list) => {
    const usdRegex = new RegExp(`(USDT)$`, "i");
    return list.filter((pair) => pair.symbol.match(usdRegex));
  };

  const searchHandler = (e) => {
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
    <SymbolFeatureContainer>
      <ButtonBar></ButtonBar>
      <div>
        <input
          onChange={(e) => searchHandler(e)}
          placeholder="Search..."
        ></input>
      </div>
      {filteredResults.map((symbol) => (
        <div
          className="symbolDiv"
          key={symbol.symbol}
          onClick={(e) => selectRow(symbol.symbol)}
        >
          <div className="name">{symbol.symbol}</div>
          <div className="price">{symbol.price}</div>
        </div>
      ))}
    </SymbolFeatureContainer>
  );
}
