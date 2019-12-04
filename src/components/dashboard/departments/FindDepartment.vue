<template>
  <b-card class="border-0" header-class="border-0" footer-class="border-0">
    <template v-slot:header>
      <b-btn-toolbar class="justify-content-between align-items-center">
        <b-btn-group>
          <b-btn @click="back" size="sm" variant="transparent mr-2 rounded-circle">
            <fa icon="arrow-left" />
          </b-btn>
          <b-btn size="sm" class="rounded-0" to="/dashboard/departments/new" variant="dark">
            Add Department
            <fa icon="plus" />
          </b-btn>
        </b-btn-group>
        <h6 class="mb-0">Department List</h6>
        <b-input-group size="sm">
          <template v-slot:append>
            <b-btn variant="dark" size="sm">
              <fa icon="search" />
            </b-btn>
          </template>
          <b-input placeholder="Search Departments" class="border-0"></b-input>
        </b-input-group>
      </b-btn-toolbar>
    </template>
    <b-table
      sticky-header
      :fields="tableHeaders"
      bordered
      :busy="isLoading"
      table-variant="white"
      :items="departments"
      responsive
    >
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner type="grow" class="align-middle"></b-spinner>
          <b-spinner type="grow" class="align-middle"></b-spinner>
          <b-spinner type="grow" class="align-middle"></b-spinner>
        </div>
      </template>
      <template v-slot:cell(actions)="data">
        <b-btn-group>
          <b-btn size="sm" variant="dark">
            <fa icon="pen" />
          </b-btn>
          <b-btn size="sm" variant="dark">
            <fa icon="trash" />
          </b-btn>
        </b-btn-group>
      </template>
      <template v-slot:table-caption>
        <b-btn-toolbar class="align-content-center justify-content-between">
          <p class="mb-0 small text-muted">Fetched {{departments.length}} rows.</p>
          <b-btn-group>
            <b-btn size="sm" variant="transparent" class="rounded-0 mr-2">
              <fa icon="chevron-left" />
            </b-btn>
            <b-btn size="sm" variant="transparent" class="rounded-0">
              <fa icon="chevron-right" />
            </b-btn>
          </b-btn-group>
          <b-form-group class="ml-2" size="sm">
            <b-form-select v-model="limit" :options="options"></b-form-select>
          </b-form-group>
        </b-btn-toolbar>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import swal from "sweetalert";
export default {
  data: () => ({
    tableHeaders: [
      { key: "department_id", label: "Department ID" },
      { key: "department_name", label: "Department Name" },
      { key: "actions", label: "Actions" }
    ],
    isLoading: false,
    departments: [],
    limit: 5,
    options: [
      { value: 5, text: "5 Row" },
      { value: 10, text: "10 Rows" },
      { value: 25, text: "25 Rows" }
    ]
  }),
  created() {
    this.loadDepartments();
  },
  methods: {
    async loadDepartments() {
      this.isLoading = true;
      try {
        let response = await this.$Amplify.API.get("hrapi", "/departments", {
          response: true
        });
        this.departments = response.data.Items;
        this.isLoading = false;
      } catch (err) {
        swal({
          title: "Oh no!",
          text: "Please try refreshing the page.",
          icon: "error"
        });
        this.isLoading = false;
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
