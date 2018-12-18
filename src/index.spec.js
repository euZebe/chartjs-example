import { mapInputToChartFormat, sortByDate } from ".";

describe("mapInputToChartFormat", () => {
  it("should return the empty array given as input", () => {
    expect(mapInputToChartFormat([])).toEqual([]);
  });

  it("should convert {t, conso} to {x, y}, x being a date", () => {
    const data = [
      { t: "2018-01-18", conso: 23.34 },
      { t: "2018-01-18", conso: 23.34 }
    ];
    expect(mapInputToChartFormat(data)).toEqual([
      { x: new Date("2018-01-18"), y: 23.34 },
      { x: new Date("2018-01-18"), y: 23.34 }
    ]);
  });
});

describe("sortByDate", () => {
  it("should sort input data by date", () => {
    expect(
      sortByDate([
        { x: new Date("2018-02-18"), y: 12 },
        { x: new Date("2018-01-18"), y: 23.34 }
      ])
    ).toEqual([
      { x: new Date("2018-01-18"), y: 23.34 },
      { x: new Date("2018-02-18"), y: 12 }
    ]);
  });
});
