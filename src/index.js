import Chart from "chart.js";

const displayInfo = function(content) {
  document.getElementById("info").innerHTML += `<p>${content}<br>`;
};

displayInfo("fetching data...");
fetch("https://www.json-generator.com/api/json/get/bVThjHGjtu")
  .then(response => response.json())
  .then(data => {
    displayInfo(`data fetched: ${JSON.stringify(data)}`);
    return data;
  })
  .then(data => data.map(({ t, conso }) => ({ x: new Date(t), y: conso })))
  .then(data => data.sort((d1, d2) => d1.x - d2.x))
  .then(data => {
    displayInfo(`data formated: ${JSON.stringify(data)}`);
    return data;
  })
  .then(formattedData => {
    const ctx = "myChart";
    new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "My First dataset",
            data: formattedData
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                format: "yyyy MM dd"
              },
              scaleLabel: {
                display: true,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "value"
              }
            }
          ]
        }
      }
    });
  });
