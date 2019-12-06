<template>
  <b-card
    class="border-0 shadow-sm wh"
    header-bg-variant="dark"
    footer-bg-variant="white"
    footer-border-variant="0 text-center"
  >
    <template v-slot:header>
      <h6 class="mb-0 text-center text-white">Payroll Management</h6>
    </template>
    <div class="text-center">
      <p class="font-weight-bold">Salaries this month</p>
      <h3 class="display-2 mb-0 mt-4 text-dark">{{count}}</h3>
    </div>
    <template v-slot:footer>
      <b-btn size="sm" to="/dashboard/salaries" variant="dark">View Salaries</b-btn>
    </template>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    count: 0
  }),
  mounted() {
    this.loadCount();
  },
  methods: {
    async loadCount() {
      let response = await this.$Amplify.API.get('hrapi', '/salaries/count');
      this.count = response.count;
    }
  }
};
</script>

<style lang="scss" scoped>
.wh {
  height: 20em;
}
</style>