<template>
  <b-card
    class="border-0 shadow-sm wh"
    header-bg-variant="primary"
    footer-bg-variant="white"
    footer-border-variant="0 text-center"
  >
    <template v-slot:header>
      <h6 class="mb-0 text-center text-white">User Mangement</h6>
    </template>
    <div class="text-center">
      <p class="font-weight-bold">User Groups</p>
      <h3 class="display-2 mb-0 mt-4 text-primary">{{count}}</h3>
    </div>
    <template v-slot:footer>
      <b-btn size="sm" to="/dashboard/users" variant="primary">View Users</b-btn>
    </template>
  </b-card>
</template>

<script>
export default {
  data: () => ({
    count: 0
  }),
  async mounted() {
    this.loadCount();
    // console.log(await this.$Amplify.API.post(
    //   "AdminQueries",
    //   "/addUserToDepartment",
    //   {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `${(await this.$Amplify.Auth.currentSession())
    //           .getAccessToken()
    //           .getJwtToken()}`
    //       },
    //       body: {
    //         username: '6ad0042e-f76d-438c-bd97-b5ee38ea99b9',
    //         department_name: 'Engineering'
    //       }
    //     }
    // ))
  },
  methods: {
    async loadCount() {
      let response = await this.$Amplify.API.get(
        "AdminQueries",
        "/listGroupsForUser?username=5e04dcd0-e900-4fcd-be04-001519900cdb",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await this.$Amplify.Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`
          }
        }
      );
      this.count = response.Groups.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.wh {
  height: 20em;
}
</style>