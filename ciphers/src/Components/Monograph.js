import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Monograph extends Component{
  render() {
    const data = formatData(this.props.letterFreqs);
    const chartOptions = {
      title: {
              display: true,
              text: "Monogram Frequencies"
      },
      scales: {
          xAxes: [{
              barPercentage: 0.5,
              barThickness: 10,
              maxBarThickness: 10,
              minBarLength: 2,
              gridLines: {
                  offsetGridLines: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Monograms'
              }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '%'
            }
          }]
      }
    }
    return (
        <Bar data={data} options={chartOptions} />
      );
  }
}

function formatData(letterFreqs){
  var freqs = [];
  var count = Object.values(letterFreqs).reduce(
    function(accumulator, currentValue)
      {return accumulator + currentValue});
  //Ensure all letters have at least been initialized. a-z is char codes 97-122.
  for(var i=97; i<123; i++){
    if(!letterFreqs[String.fromCharCode(i)]) letterFreqs[String.fromCharCode(i)] = 0;

    freqs.push(100*(letterFreqs[String.fromCharCode(i)]/count));
  }
  var keys = Object.keys(letterFreqs).sort(); //Alphabetical sort
  return {
    labels: keys,
    datasets:[
		   {
  			label: "Text Given Frequencies",
  			data: freqs,
        backgroundColor: "rgba(25, 129, 174, 1)",
        borderWidth: 1,
        borderColor: '#777',
        hoverBorderWidth: 2,
        hoverBorderColor: '#000'
		  },
      {
       label: "Typical Frequencies",
       data:
       [8.55 ,1.60 ,3.16 ,3.87 ,12.10 ,2.18 ,2.09 ,4.96 ,7.33 ,0.22 ,0.81 ,4.21 ,
         2.53 ,7.17 ,7.47 ,2.07 ,0.10 ,6.33 ,6.73 ,8.94 ,2.68 ,1.06 ,1.83 ,0.19 ,1.72 ,0.11],
       backgroundColor: "rgba(57, 188, 1, 1)",
       borderWidth: 1,
       borderColor: '#777',
       hoverBorderWidth: 2,
       hoverBorderColor: '#000'
/*
Typical Monogram frencies.
A :  8.55        K :  0.81        U :  2.68
B :  1.60        L :  4.21        V :  1.06
C :  3.16        M :  2.53        W :  1.83
D :  3.87        N :  7.17        X :  0.19
E : 12.10        O :  7.47        Y :  1.72
F :  2.18        P :  2.07        Z :  0.11
G :  2.09        Q :  0.10
H :  4.96        R :  6.33
I :  7.33        S :  6.73
J :  0.22        T :  8.94
*/
}
	 ]
  };
}

export default Monograph;
