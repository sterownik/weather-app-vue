<template>
  <v-row align="center">
    <v-col cols="12" class="pa-0 chart">
      <VueApexCharts
        id="chart"
        class="my-auto"
        align="center"
        width="550"
        :type="getType"
        :options="options"
        :series="series"
      ></VueApexCharts>
    </v-col>
  </v-row>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    VueApexCharts,
  },
  computed: {
    getType() {
      if (this.type === "Humadity") {
        return "bar";
      } else {
        return "line";
      }
    },
  },

  methods: {
    initData() {},
    updateChart(info) {
      console.log(info);
    },
  },
  watch: {
    info(value) {
      this.updateChart(value);
      this.options = {
        title: {
          text: this.type + " for " + this.title,
        },
        yaxis: {
          title: {
            text: "[m³]",
          },
        },
        xaxis: {
          title: {
            text: "data",
          },
        },
      };
      if (this.type === "Humadity") {
        this.series = [
          {
            data: [
              {
                x: this.info[0].dt_txt.substring(5, 16),
                y: this.info[1].main.humidity,
              },
              {
                y: this.info[1].main.humidity,
                x: this.info[1].dt_txt.substring(5, 16),
              },
              {
                y: this.info[2].main.humidity,
                x: this.info[2].dt_txt.substring(5, 16),
              },
              {
                y: this.info[3].main.humidity,
                x: this.info[3].dt_txt.substring(5, 16),
              },
              {
                y: this.info[4].main.humidity,
                x: this.info[4].dt_txt.substring(5, 16),
              },
              {
                y: this.info[5].main.humidity,
                x: this.info[5].dt_txt.substring(5, 16),
              },
            ],
          },
        ];
      } else {
        this.options = {
          type: "line",
          title: {
            text: this.type + " for " + this.title,
          },
          yaxis: {
            title: {
              text: "℃",
            },
          },
          xaxis: {
            title: {
              text: "data",
            },
          },
          colors: ["#F44336", "#E91E63", "#9C27B0"],
        };
        this.series = [
          {
            data: [
              {
                x: this.info[0].dt_txt.substring(5, 16),
                y: this.info[1].main.temp,
              },
              {
                y: this.info[1].main.temp,
                x: this.info[1].dt_txt.substring(5, 16),
              },
              {
                y: this.info[2].main.temp,
                x: this.info[2].dt_txt.substring(5, 16),
              },
              {
                y: this.info[3].main.temp,
                x: this.info[3].dt_txt.substring(5, 16),
              },
              {
                y: this.info[4].main.temp,
                x: this.info[4].dt_txt.substring(5, 16),
              },
              {
                y: this.info[5].main.temp,
                x: this.info[5].dt_txt.substring(5, 16),
              },
            ],
          },
        ];
      }
    },
  },
  props: ["info", "title", "type"],
  data() {
    return {
      information: "",
      options: {
        title: {
          text: "Title",
          align: "center",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        chart: {
          sparkline: {
            enabled: false,
          },
          id: "vuechart-example",
        },
        yaxis: {
          title: {
            text: "Servings",
          },
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Vue Chart",
          data: [],
        },
      ],
    };
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
#chart {
  height: 200px;
}
</style>
