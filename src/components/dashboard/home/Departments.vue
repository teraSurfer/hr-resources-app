<template>
  <b-card
    class="border-0 shadow-sm wh"
    header-bg-variant="primary"
    footer-bg-variant="white"
    footer-border-variant="0 text-center"
  >
    <template v-slot:header>
      <h6 class="mb-0 text-center text-white">Department Mangement</h6>
    </template>
    <div class="d-flex text-center">
    <p class="small">Departments: </p>
    <h3 class="display-2 mb-0 mt-4 text-primary">{{count}}</h3>
    </div>
    <template v-slot:footer>
      <b-btn size="sm" to="/dashboard/departments" variant="primary">View Departments</b-btn>
    </template>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    count: 0
  }),
  async mounted() {
    try {
      let response = await this.$Amplify.API.get('hrapi', '/departments/total-departments');
      console.log(response);
      this.count = response;
    } catch(err) {
      console.warn(err);
    }
  }
};
</script>

<style lang="scss" scoped>
.wh {
  height: 20em;
}
</style>