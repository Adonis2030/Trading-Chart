import React from "react";
import useMarketDepth from "../../utils/useMarketDepth";
import DepthChart from "./DepthChart";

const MarketOverview = ({ tradingPair, timeSpan }) => {
  const { marketDepth, fetchError } = useMarketDepth(tradingPair, timeSpan);

  if (fetchError) {
    return <div className="fetch-error">Error: {fetchError.message}</div>;
  }

  if (!marketDepth.buyOrders.length || !marketDepth.sellOrders.length) {
    return (
      <div className="w-full min-h-32">
        <div className="loading-spinner text-center"></div>
      </div>
    );
  }

  const totalBuyOrders = marketDepth.buyOrders.reduce(
    (total, [_, qty]) => total + parseFloat(qty),
    0
  );
  const totalSellOrders = marketDepth.sellOrders.reduce(
    (total, [_, qty]) => total + parseFloat(qty),
    0
  );
  const highestVolume = Math.max(totalBuyOrders, totalSellOrders);

  return (
    <>
      <div className="col-span-6">
        <DepthChart
          data={marketDepth.buyOrders}
          chartColor="#00d964"
          maxValue={highestVolume}
          isSellOrder={false}
          heading="Buy Orders"
        />
      </div>
      <div className="col-span-6">
        <DepthChart
          data={marketDepth.sellOrders}
          chartColor="#ba0402"
          maxValue={highestVolume}
          isSellOrder={true}
          heading="Sell Orders"
        />
      </div>
    </>
  );
};

export default MarketOverview;
