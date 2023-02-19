import { useState, useEffect } from "react";

import BalanceChart from "./balance-chart";
import ButtonBar from "./button-bar";

import styled from "styled-components";
import TextField from "@mui/material/TextField";

const SymbolFeatureContainer = styled.div`
  width: 65vw;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 20px 15px 15px 15px;

    li.symbol-table {
      display: flex;
      height: 45px;
      margin-top: 5px;
      padding: 0px 0px 0px 15px;
      border: solid 1px;
      border-radius: 8px;
      align-items: center;
      cursor: pointer;

      > .name {
        width: 30%;
      }

      > div.toggle-box {
        display: flex;
        width: 62%;
        justify-content: space-between;
      }
    }
  }

  .search-bar {
    width: 50%;
    margin: 15px 0;

    input {
      font-size: 36px;
      font-weight: bold;
    }
  }
`;

export default function Wallet() {
  const [symbolList, setSymbolList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetch("https://api.binance.com/api/v3/ticker/price").then((res) =>
      res
        .json()
        .then((data) => {
          return filterTheUsdt(data).map((pair, index) => ({
            ...pair,
            id: index,
            select: false,
            symbol: pair.symbol.replace("USDT", ""),
            amount: 0,
          }));
        })
        .then((usdPairs) => {
          const newUsdPars = applyLocalStorageData(usdPairs);
          setSymbolList(newUsdPars);
          setFilteredResults(newUsdPars);
        })
    );
  }, []); // Give [] for initial. (Dependencies Array)

  /**
   * Match a single character present in the list below [\wusdt].
   * {4} matches the previous token exactly 4 times from the end.
   * example: *****usdt => capital ignore.
   */
  const filterTheUsdt = (list) => {
    const usdRegex = new RegExp(`(USDT)$`, "i");
    return list.filter((pair) => pair.symbol.match(usdRegex));
  };

  const applyLocalStorageData = (usdPars) => {
    const newUsdPars = [...usdPars];
    const storageDetail = JSON.parse(localStorage.getItem("walletSnapshot"));
    storageDetail !== null &&
      storageDetail.forEach((storageData) => {
        newUsdPars[storageData.id].select = storageData.select;
        newUsdPars[storageData.id].amount = storageData.amount;
      });
    return newUsdPars;
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
  const selectRow = (id) => {
    let updatePair = [...filteredResults];
    updatePair[id].select = !updatePair[id].select;
    setFilteredResults(updatePair);
  };

  const setAmount = (e, id) => {
    const inputAmount = e.target.value;
    let updateFilteredResults = [...filteredResults];
    updateFilteredResults[id].amount = inputAmount;
    setFilteredResults(updateFilteredResults);
    let updateSymbolList = [...symbolList];
    updateSymbolList[id].amount = inputAmount;
    setSymbolList(updateSymbolList);
  };

  const priceFormat = (x) => {
    return Number.parseFloat(x).toFixed(2) + " USDT";
  };

  const cleanData = () => {
    console.log("Clear");
    localStorage.removeItem("walletSnapshot");
    let updateSymbolList = [...symbolList];
    updateSymbolList.forEach((pair) => {
      pair.amount = 0;
      pair.select = false;
    });
    setSymbolList(updateSymbolList);
    setFilteredResults(updateSymbolList);
  };

  return (
    <>
      <BalanceChart symbolList={symbolList}></BalanceChart>
      <SymbolFeatureContainer>
        <TextField
          id="standard-search"
          label="Search for Crypto currencies ..."
          type="search"
          variant="standard"
          className="search-bar"
          onChange={(e) => searchHandler(e)}
        />
        <ButtonBar
          symbolList={symbolList}
          handleCleanData={cleanData}
        ></ButtonBar>
        <ul>
          {filteredResults.map((symbol, index) => (
            <li
              className="symbol-table"
              key={symbol.symbol}
              onClick={(e) => selectRow(index)}
            >
              <input
                type="checkbox"
                readOnly
                checked={filteredResults[index].select}
              />
              <div className="name">{symbol.symbol.replace("USDT", "")}</div>
              {/* TODO: need more convenience UI */}
              <div className="toggle-box">
                <div className="current-price">{priceFormat(symbol.price)}</div>
                {filteredResults[index].select && (
                  <input
                    onClick={(e) => e.stopPropagation()}
                    type="number"
                    step="any"
                    value={symbol.amount}
                    placeholder={`Input ${symbol.symbol} volume`}
                    onChange={(e) => setAmount(e, symbol.id)}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </SymbolFeatureContainer>
    </>
  );
}
