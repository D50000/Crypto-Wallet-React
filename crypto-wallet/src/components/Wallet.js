import { useState, useEffect } from "react";

import ButtonBar from "./button-bar";

import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

const SymbolFeatureContainer = styled.div`
  width: 50vw;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 15px;

    li.symbol-table {
      display: flex;
      justify-content: space-between;
      border: solid 1px;
      border-radius: 20px;
      height: 45px;

      > .name {
        width: 35%;
      }
    }
  }

  .search-bar {
    width: 100%;
    margin: 10px 0;
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
    setFilteredResults(updatePair);
  };

  const setAmount = (e, index) => {
    const inputAmount = e.target.value;
    let updatePair = [...filteredResults];
    updatePair[index].amount = inputAmount;
    setFilteredResults(updatePair);
  };

  const priceFormat = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };

  const togglePairInfo = (symbol, index) => {
    if (symbol.select) {
      return (
        // <> Ghost template.
        <>
          <input
            type="number"
            step="any"
            onChange={(e) => setAmount(e, index)}
          />
          <div className="price">{priceFormat(symbol.price)}</div>
        </>
      );
    }
    return null;
  };

  return (
    <SymbolFeatureContainer>
      <TextField
        id="standard-search"
        label="Search for Crypto currencies ..."
        type="search"
        variant="standard"
        className="search-bar"
        onChange={(e) => searchHandler(e)}
      />
      {/* <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={(e) => searchHandler(e)}
          placeholder="Search..."
        /> */}
      <ButtonBar filteredResults={filteredResults}></ButtonBar>
      <ul>
        {filteredResults.map((symbol, index) => (
          <li className="symbol-table" key={symbol.symbol}>
            <input type="checkbox" onClick={(e) => selectRow(index)} />
            {/* TODO: React material ui's 'Checkbox' is laggy */}
            {/* <Checkbox defaultChecked onClick={(e) => selectRow(index)} /> */}
            <div className="name">{symbol.symbol.replace("USDT", "")}</div>
            {/* If else return html */}
            {togglePairInfo(symbol, index)}
          </li>
        ))}
      </ul>
    </SymbolFeatureContainer>
  );
}
