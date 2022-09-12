import { useState, useEffect } from "react";

import ButtonBar from "./button-bar";

import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

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
        const usdPairs = filterTheUsdt(data).map((pair, index) => ({
          ...pair,
          id: index,
          select: false,
          symbol: pair.symbol.replace("USDT", ""),
          amount: 0,
        }));
        setSymbolList(usdPairs);
        setFilteredResults(usdPairs);
      })
    );
  }, []); // Give [] for initial.

  /**
   * Match a single character present in the list below [\wusdt].
   * {4} matches the previous token exactly 4 times from the end.
   * example: *****usdt => capital ignore.
   */
  const filterTheUsdt = (list) => {
    const usdRegex = new RegExp(`(USDT)$`, "i");
    return list.filter((pair) => pair.symbol.match(usdRegex));
  };

  /**
   * Debounce search input bar.
   * Handle the empty string input and reset the list.
   */
  const searchHandler = (e) => {
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

  /**
   * Use spread method to shallow copy the object.
   * And it will trigger react detect object's update.
   *
   * ps: If just specific change the some key/value it will still be the same object.
   */
  const selectRow = (index) => {
    let updatePair = [...filteredResults];
    updatePair[index].select = !updatePair[index].select;
    console.log(filteredResults);
    setFilteredResults(updatePair);
  };

  const togglePairInfo = (symbol) => {
    if (symbol.select) {
      return (
        // <> Ghost template.
        <>
          <input type="number" step="any" />
          <div className="price">{symbol.price}</div>
        </>
      );
    }
    return null;
  };

  return (
    <SymbolFeatureContainer>
      <ButtonBar></ButtonBar>
      <div>
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={(e) => searchHandler(e)}
          placeholder="Search..."
        />
      </div>
      {filteredResults.map((symbol, index) => (
        <div
          className="symbolDiv"
          key={symbol.symbol}
          //TODO: Fix, just trigger by tick box not whole row.
          onClick={(e) => selectRow(index)}
        >
          <input type="checkbox" />
          <div className="name">{symbol.symbol.replace("USDT", "")}</div>
          {/* If else return html */}
          {togglePairInfo(symbol)}
        </div>
      ))}
    </SymbolFeatureContainer>
  );
}
