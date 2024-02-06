import React from "react";

const DepthChart = ({ data, chartColor, maxValue, isSellOrder, heading }) => {
  const compileChartData = (dataSet, reverse) => {
    let runningTotal = 0;
    const processedData = dataSet.map(([rate, volume]) => {
      runningTotal += parseFloat(volume);
      const valueAtPrice = parseFloat(rate) * runningTotal;
      return { rate, volume, runningTotal, valueAtPrice };
    });
    return reverse ? processedData.reverse() : processedData;
  };

  const chartData = compileChartData(data, isSellOrder);

  const orderOption = ["Rate", "Volume", "Value at Price"];
  return (
    <div className="depth-chart">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="text-center my-5 text-xl">{heading}</caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {orderOption.map((order, index) => (
              <th
                key={`${order}_${index}`}
                style={{ color: chartColor }}
                scope="col"
                className="px-6 py-3"
              >
                {order}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((chart, index) => (
            <tr
              key={`${chart}_${index}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 w-1/3">
                {parseFloat(chart.rate).toFixed(2)}
              </td>
              <td className="px-6 py-4 w-1/3">
                {parseFloat(chart.volume).toFixed(5)}
              </td>
              <td className="px-6 py-4 w-1/3">
                {chart.valueAtPrice.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepthChart;
