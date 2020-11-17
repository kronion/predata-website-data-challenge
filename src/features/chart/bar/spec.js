const spec = {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  width: 400,
  height: 200,
  padding: { left: 5, right: 5, top: 5, bottom: 5 },

  data: [
    {
      name: "table",
      values: []
    }
  ],

  signals: [
    {
      name: "tooltip",
      value: {},
      on: [
        { events: "rect:mouseover", update: "datum" },
        { events: "rect:mouseout", update: "{}" }
      ]
    }
  ],

  scales: [
    {
      name: "xscale",
      type: "band",
      domain: { data: "table", field: "language" },
      range: "width"
    },
    {
      name: "yscale",
      domain: { data: "table", field: "views" },
      nice: true,
      range: "height"
    }
  ],

  axes: [
    { orient: "bottom", scale: "xscale" },
    { orient: "left", scale: "yscale" }
  ],

  marks: [
    {
      type: "rect",
      from: { data: "table" },
      encode: {
        enter: {
          x: { scale: "xscale", field: "language", offset: 1 },
          width: { scale: "xscale", band: 1, offset: -1 },
          y: { scale: "yscale", field: "views" },
          y2: { scale: "yscale", value: 0 }
        },
        update: {
          fill: { value: "steelblue" }
        },
        hover: {
          fill: { value: "red" }
        }
      }
    },
    {
      type: "text",
      encode: {
        enter: {
          align: { value: "center" },
          baseline: { value: "bottom" },
          fill: { value: "#333" }
        },
        update: {
          x: {
            scale: "xscale",
            signal: "tooltip.language",
            band: 0.5
          },
          y: {
            scale: "yscale",
            signal: "tooltip.views",
            offset: -2
          },
          text: { signal: "tooltip.views" },
          fillOpacity: [{ test: "datum === tooltip", value: 0 }, { value: 1 }]
        }
      }
    }
  ]
};

export default spec;
