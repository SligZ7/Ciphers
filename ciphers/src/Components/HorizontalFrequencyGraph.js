import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

function HorizontalFrequencyGraph({ data, yLabel, title }) {
  const output = formatData(data);
  const chartOptions = {
    title: {
      display: true,
      text: title,
    },
    scales: {
      xAxes: [{
        barPercentage: 0.5,
        barThickness: 10,
        maxBarThickness: 10,
        minBarLength: 2,
        gridLines: {
          offsetGridLines: true,
        },
        scaleLabel: {
          display: true,
          labelString: '%',
        },
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: yLabel,
        },
      }],
    },
  };
  return (
    <HorizontalBar data={output} options={chartOptions} />
  );
}

/**
 *@param {data} to be formatted.
 *@returns {object} of formatted data.
*/
function formatData(data) {
  const frequencies = [];
  const count = Object.values(data).reduce(
    function (accumulator, currentValue) {
      return accumulator + currentValue;
    });
  const keys = Object.keys(data).sort(function (a, b) {
    return data[b] - data[a];
  }); // Sort by key value, Ascending
  keys.forEach(function (item, index) {
    frequencies.push(100 * (data[item] / count));
  }); // Fill frequncies
  return {
    labels: keys,
    datasets: [
      {
        label: 'Text Given Frequencies',
        data: frequencies,
        backgroundColor: 'rgba(25, 129, 174, 1)',
        borderWidth: 1,
        borderColor: '#777',
        hoverBorderWidth: 2,
        hoverBorderColor: '#000',
      },
    ],
  };
}

export default HorizontalFrequencyGraph;
