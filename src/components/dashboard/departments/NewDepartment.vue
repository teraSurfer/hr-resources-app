<template>
  <b-card class="border-0" header-class="border-0">
    <template v-slot:header>
      <b-btn-toolbar class="align-items-center">
        <b-btn @click="back" size="sm" variant="transparent mr-2 rounded-circle">
          <fa icon="arrow-left" />
        </b-btn>
        <h6 class="mb-0">Create new department</h6>
      </b-btn-toolbar>
    </template>
    <b-form @submit.stop.prevent="formSubmit">
      <b-form-group class="form" label="Department Name:">
        <b-input-group>
          <b-input
            v-model="department_name"
            class="border-primary"
            placeholder="Department Name"
          ></b-input>
        </b-input-group>
      </b-form-group>
      <div class="d-flex justify-content-center">
        <b-btn variant="primary" type="submit" :disabled="loading">
          Create Department 
          <b-spinner v-if="loading" type="grow" class="align-middle"></b-spinner>
        </b-btn>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import swal from "sweetalert";
export default {
  data: () => ({
    loading: false,
    department_name: ""
  }),
  methods: {
    async formSubmit() {
      this.loading = true;
      if (this.validateForm()) {
        try {
          await this.$Amplify.API.put(
            "hrapi",
            "/departments",
            {
              body: {
                department_name: this.department_name
              },
              response: true
            }
          );
          swal({
            title: 'Created Department',
            icon: 'success'
          })
          this.loading = false;
        } catch (err) {
          console.log(err);
          swal({
            title: 'Sorry',
            text: 'Try again in sometime.',
            icon: 'Error'
          })
          this.loading = false;
        }
      } else {
        swal({
          title: "Oh no!",
          text: "Department name cannot be less than 3 characters.",
          icon: "error"
        });
      }
    },
    validateForm() {
      return (this.department_name.length>3);
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

