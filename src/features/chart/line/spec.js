const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  width: 400,
  height: 200,
  description: "Website views over time.",
  data: {
    name: "table",
    values: []
  },
  mark: { type: "line", tooltip: true },
  encoding: {
    y: { field: "count", type: "quantitative" },
    x: { field: "date", type: "temporal" },
    color: { field: "website" }
  }
};

export default spec;
