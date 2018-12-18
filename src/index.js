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
  .then(data => data.map(({ t, conso }) => ({ t: new Date(t), y: conso })))
  .then(data => {
    displayInfo(`data formated: ${JSON.stringify(data)}`);
    return data;
  })
  .then(formattedData => {
    const ctx = "myChart";
    new Chart(ctx, {
      type: "line",
      data: [
        {
          x: new Date("2018-01-10"),
          y: 1
        },
        {
          t: new Date("2018-02-03"),
          y: 10
        }
      ],
      options: {
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ]
        }
      }
    });
  });
