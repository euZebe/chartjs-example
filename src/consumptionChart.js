import Chart from "chart.js";

const generateChart = formattedData => {
  const ctx = "myChart";
  new Chart(ctx, {
    type: "line",
    data: {
      // several datasets would be for several lines to draw
      datasets: [
        {
          label: "consommation d'électricité",
          data: formattedData,
          /* did you know color can be defined as a 4 (or 8) hexa string ?
           * We often see a 3 or 6 hexa string, but one (or two) more digits can define transparency
           */
          borderColor: "#d44a"
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            scaleLabel: {
              display: true,
              labelString: "Date"
            },
            time: {
              unit: "day",
              displayFormats: {
                day: "ddd DD/MM"
              }
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "consommation (kw)"
            }
          }
        ]
      }
    }
  });
};

export default generateChart;

