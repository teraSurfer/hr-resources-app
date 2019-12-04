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
          <b-btn size="sm" @click="update(data)" variant="dark">
            <fa icon="pen" />
          </b-btn>
          <b-btn @click="deleteDep(data)" size="sm" variant="dark">
            <fa icon="trash" />
          </b-btn>
        </b-btn-group>
      </template>
      <template v-slot:table-caption>
        <b-btn-toolbar class="align-content-center justify-content-between">
          <p class="mb-0 small text-muted">Fetched {{departments.length}} rows.</p>
          <b-btn-group>
            <b-btn
              :disabled="current == 1"
              @click="loadDepartments('back')"
              size="sm"
              variant="transparent"
              class="rounded-0 mr-2"
            >
              <fa icon="chevron-left" />
            </b-btn>
            <b-btn
              :disabled="reachedEnd"
              @click="loadDepartments('next')"
              size="sm"
              variant="transparent"
              class="rounded-0"
            >
              <fa icon="chevron-right" />
            </b-btn>
          </b-btn-group>
          <b-form-group class="ml-2" size="sm">
            <b-form-select @change="loadDepartments('back')" v-model="limit" :options="options"></b-form-select>
          </b-form-group>
        </b-btn-toolbar>
      </template>
    </b-table>
    <b-modal id="dep-modal" v-model="modal" hide-footer>
      <b-form @submit.stop.prevent="formSubmit">
        <b-form-group class="form" label="Department Id:">
          <b-input-group>
            <b-input disabled :value="selectedRow.department_id" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="form" label="Department Name:">
          <b-input-group>
            <b-input v-model="selectedRow.department_name" class="border-primary" placeholder="Department Name"></b-input>
          </b-input-group>
        </b-form-group>
        <div class="d-flex justify-content-center">
          <b-btn variant="primary" type="submit" :disabled="loading">
            Update Department
            <b-spinner v-if="loading" type="grow" class="align-middle"></b-spinner>
          </b-btn>
        </div>
      </b-form>
    </b-modal>
  </b-card>
</template>

<script>
import swal from "sweetalert";
export default {
  data: () => ({
    modal: false,
    loading: false,
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
    ],
    tokens: [""],
    current: 0,
    reachedEnd: false,
    selectedRow: {}
  }),
  created() {
    this.loadDepartments();
  },
  methods: {
    async loadDepartments(direction = "next") {
      this.isLoading = true;
      let token = "";
      if (direction === "next") {
        token = this.tokens[this.current];
      } else {
        token = this.tokens[this.current - 1];
      }
      try {
        let response = await this.$Amplify.API.get(
          "hrapi",
          "/departments?limit=" + this.limit + "&lastkey=" + token,
          {
            response: true
          }
        );
        if (response.LastEvaluatedKey && direction === "next") {
          this.tokens.push(response.LastEvaluatedKey);
        } else {
          this.reachedEnd = true;
        }
        if (direction !== "next" && this.reachedEnd) {
          this.reachedEnd = false;
        }
        if (direction !== "next") --this.current;
        else ++this.current;
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
    },
    async deleteDep(dep) {
      try {
        let u = await swal({
          title: "Are you sure?",
          text:
            "Once deleted, you will not be able to access this course again.",
          icon: "warning",
          dangerMode: true,
          buttons: true
        });
        if (u) {
          let response = await this.$Amplify.API.del(
            "hrapi",
            `/departments/object/${dep.item.department_id}/${dep.item.department_name}`
          );
          console.log(response);
          swal("Deleted", "your file has been deleted", "success");
          this.loadDepartments("back");
        }
      } catch (err) {
        console.log(err);
      }
    },
    update(dep) {
      this.selectedRow = dep.item;
      console.log(this.selectedRow);
      this.$bvModal.show("dep-modal");
    },
    formSubmit() {
      
    }
  }
};
</script>
