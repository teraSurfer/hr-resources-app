<template>
  <b-container class="mt-4 d-flex justify-content-center" fluid>
    <b-card
      header-class="border-0 text-center"
      header-bg-variant="primary"
      class="shadow-sm border-0 w text-center"
    >
      <template v-slot:header>
        <h3 class="mb-0 text-white">User Profile</h3>
      </template>
      <b-img-lazy class="rounded-circle" src="https://picsum.photos/150/150/?image=25">
      </b-img-lazy>
      <b-card-text >
        <h4 class="my-3">{{user.given_name}} {{user.family_name}}</h4>
        <p class="mb-1">{{user.email}}</p>
        <p class="mb-1">{{user.phone_number}}</p>
        <p class="my-2">
          Show User id?
          <b-btn @click.stop.prevent="show = !show" size="sm" variant="transparent">
            <fa :icon="show ? 'eye' : 'eye-slash'"></fa>
          </b-btn>
        </p>
        <p class="mb-1" v-if="show">
          {{user.sub}}
        </p>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    user: {},
    show: false
  }),
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const usr = await this.$Amplify.Auth.currentSession();
      const {
        given_name,
        family_name,
        email,
        phone_number,
        sub
      } = usr.idToken.payload;
      this.user = { given_name, family_name, email, phone_number, sub };
    }
  }
};
</script>

<style lang="scss" scoped>
.w {
  width: 40em;
}
</style>