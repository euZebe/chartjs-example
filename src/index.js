import Chart from "chart.js";

/**
 * this is just a function to display debug elements ; new content is happend in a new paragraph
 */
const displayInfo = function(content) {
  document.getElementById("info").innerHTML += `<p>${content}<br>`;
};

// convert the stringified date to a JS date object, and map "conso" field to y
export const mapInputToChartFormat = data =>
  data.map(({ t, conso }) => ({ x: new Date(t), y: conso }));

export const sortByDate = data => data.sort((d1, d2) => d1.x - d2.x);

displayInfo("fetching data...");
fetch("https://www.json-generator.com/api/json/get/cfjkLIgfCa?indent=2")
  // get the data to a JSON format
  .then(response => response.json())
  // just to check what data is fetched
  .then(data => {
    displayInfo(`fetched data: ${JSON.stringify(data)}`);
    return data;
  })
  .then(mapInputToChartFormat)
  // sort data, so that graph is not messy (comment it to check the result otherwise :-) )
  .then(sortByDate)
  // just to check formatted data as the expected shape
  .then(data => {
    displayInfo(`formated data: ${JSON.stringify(data)}`);
    return data;
  })
  // here we are ! Creating a chart
  .then(formattedData => {
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
  });
