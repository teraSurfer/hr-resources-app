<template>
  <b-card class="border-0 shadow-sm wh" header-bg-variant="primary">
    <template v-slot:header>
      <h6 class="mb-0 text-center text-white">Departments</h6>
    </template>
    <commit-chart :data="datas" :styles="styles"/>
  </b-card>
</template>

<script>
import CommitChart from "./charts/CommitChart";
export default {
  components: {
    CommitChart
  },
  data() {
    return {
      styles: {
        height: '100%',
        position: 'relative'
      },
      datas: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: "#6d74d8",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.wh {
  height: 20em;
}
</style>