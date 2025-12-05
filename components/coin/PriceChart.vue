<template>
  <div class="price-chart light-background mb-2 rounded-xl p-5">
    <h3 class="text-lg font-semibold dark-text mb-2">7 Day Price Chart</h3>

    <LineChart
      v-if="chartData.labels.length"
      :chart-data="chartData"
      :options="chartOptions"
      style="height: 260px; width: 100%;"
    />

    <div v-else class="h-60 flex items-center justify-center text-gray-400">
      No chart data
    </div>


  </div>
</template>

<script>
import { Line, mixins } from "vue-chartjs";

const LineChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};

export default {
  components: { LineChart },

  props: {
    prices: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    priceValues() {
      return this.prices.map(p => p[1]);
    },

    priceChange() {
      if (this.priceValues.length < 2) return 0;
      const first = this.priceValues[0];
      const last = this.priceValues[this.priceValues.length - 1];
      return ((last - first) / first) * 100;
    },

    chartData() {
      if (!this.prices.length) return { labels: [], datasets: [] };

      return {
        labels: this.prices.map(p =>
          new Date(p[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          })
        ),
        datasets: [
          {
            label: "Price",
            data: this.priceValues,
            borderColor: this.priceChange >= 0 ? "#10b981" : "#ef4444",
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: 0
          }
        ]
      };
    },

    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{ ticks: { fontSize: 10 } }],
          yAxes: [{ ticks: { fontSize: 10 } }]
        },
        tooltips: {
          callbacks: {
            label: t => "$" + t.yLabel.toFixed(4)
          }
        }
      };
    }
  }
};
</script>

<style scoped>
.price-chart {
  margin-top: 1rem;
}
</style>
