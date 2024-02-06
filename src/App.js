import React, { useState } from "react";
import MarketOverview from "./components/MarketOverview";
import PriceChart from "./components/PriceChart";

const symbolOption = [
  { value: "BTCUSDT", name: "BTC/USDT" },
  { value: "ETHBTC", name: "ETH/BTC" },
  { value: "LTCUSDT", name: "LTC/USDT" },
  { value: "XRPUSDT", name: "XRP/USDT" },
];

const timeFrame = [
  { value: "1m", name: "1 min" },
  { value: "5m", name: "5 min" },
  { value: "15m", name: "15 min" },
  { value: "1h", name: "1 h" },
  { value: "12h", name: "12 h" },
];

function App() {
  const [symbol, setSymbol] = useState({ value: "BTCUSDT", name: "BTC/USDT" });
  const [time, setTime] = useState("1m");

  const handleSymbolChange = (event) => {
    const selectedSymbol = symbolOption.find(
      (c) => c.value === event.target.value
    );
    if (selectedSymbol) {
      setSymbol(selectedSymbol);
    }
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="container mx-auto px-20 mt-5">
      <div className="col-span-12 flex justify-between gap-10">
        <div className=" text-3xl text-slate-300">Trading View</div>
        <div className="flex justify-start gap-16">
          <div>
            <select
              id="symbol-option"
              value={symbol.value}
              onChange={handleSymbolChange}
              className="px-5 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            >
              {symbolOption.map((symbol, index) => (
                <option key={`${symbol.value}_${index}`} value={symbol.value}>
                  {symbol.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              id="time-frame"
              value={time}
              onChange={handleTimeChange}
              className="bg-gray-50 text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            >
              {timeFrame.map((time, index) => (
                <option key={`${time.value}_${index}`} value={time.value}>
                  {time.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-10 border border-gray-800">
        <div className="col-span-12 flex justify-center">
          <PriceChart tradingPair={symbol.value} timeSpan={time} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 my-10">
        <MarketOverview tradingPair={symbol.value} timeSpan={time} />
      </div>
    </div>
  );
}

export default App;
