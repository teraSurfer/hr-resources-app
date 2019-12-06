<template>
  <b-container>
    <b-breadcrumb class="mt-2 mb-0 bg-light" :items="items"></b-breadcrumb>
    <b-card-group class="text-dark" deck>
      <departments />
      <salaries />
      <roles />
    </b-card-group>
    <b-card class="shadow-sm border-0 mt-2 hw" variant="white">
      <h4 class="text-dark text-center">All Users</h4>
      <b-table
        sticky-header
        :fields="tableHeaders"
        bordered
        hover
        :busy="isLoading"
        table-variant="white"
        :items="users"
        responsive
        @row-clicked="open($event)"
      >
        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <b-spinner type="grow" class="align-middle"></b-spinner>
            <b-spinner type="grow" class="align-middle"></b-spinner>
          </div>
        </template>
      </b-table>
      <b-btn-toolbar class="justify-content-between">
        <p class="mb-0 text-muted small">Fetched {{users.length}} rows</p>
        <b-btn-group class="xy">
          <b-btn
            size="sm"
            @click="loadUsers('back')"
            :disabled="current == 1"
            variant="outline-dark"
          >
            <fa icon="chevron-left" />
          </b-btn>
          <b-btn :disabled="reachedEnd" @click="loadUsers('next')" size="sm" variant="outline-dark">
            <fa icon="chevron-right" />
          </b-btn>
        </b-btn-group>
        <b-form-group class="ml-2" size="sm">
          <b-form-select v-model="limit" :options="options"></b-form-select>
        </b-form-group>
      </b-btn-toolbar>
    </b-card>
    <b-modal centered hide-footer header-bg-variant="white" class="border-0" id="data-modal">
      <template v-slot:modal-header>
        <h6 class="mb-0 text-center">User Details</h6>
      </template>
      <h6>Name: {{selectedRow.given_name}} {{selectedRow.family_name}}</h6>
      <h6>Email: {{selectedRow.email}}</h6>
      <h6>Phone Number: {{selectedRow.phone_number}}</h6>
    </b-modal>
  </b-container>
</template>

<script>
import Departments from "./Departments";
import Salaries from "./Salaries";
import Roles from "./Roles";
export default {
  components: {
    Departments,
    Salaries,
    Roles
  },
  data: () => ({
    users: [],
    isLoading: false,
    tableHeaders: [
      {
        key: "given_name",
        label: "First Name"
      },
      {
        key: "family_name",
        label: "Last Name"
      },
      {
        key: "email",
        label: "Email"
      },
      {
        key: "phone_number",
        label: "Phone Number"
      },
      {
        key: "sub",
        label: "User ID"
      },
      {
        key: "custom:department",
        label: "Department"
      }
    ],
    items: [
      { text: "Dashboard", to: "/dashboard/home" },
      { text: "Home", to: "/dashboard/home" }
    ],
    limit: 5,
    options: [
      { value: 5, text: "5 Rows" },
      { value: 10, text: "10 Rows" },
      { value: 25, text: "25 Rows" }
    ],
    tokens: [""],
    current: 0,
    reachedEnd: false,
    selectedRow: {}
  }),
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers(direction = "next") {
      this.isLoading = true;
      let token = "";
      if (direction === "next") {
        token = this.tokens[this.current];
      } else {
        token = this.tokens[this.current - 1];
      }
      console.log(this.limit, token);
      const response = await this.$Amplify.API.get(
        "AdminQueries",
        "/listUsers?limit=" + this.limit + "&token=" + token,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await this.$Amplify.Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`
          }
        }
      );
      if (response.NextToken && direction === "next") {
        this.tokens.push(response.NextToken);
      } else {
        this.reachedEnd = true;
      }
      if (direction !== "next" && this.reachedEnd) {
        this.reachedEnd = false;
      }
      if (direction !== "next") --this.current;
      else ++this.current;
      console.log(response)
      this.processUsers(response.Users);
      this.isLoading = false;
    },
    processUsers(users) {
      let usrAtributes = users.map(usr => {
        let u = {};
        usr.Attributes.map(attr => {
          u[attr.Name] = attr.Value;
        });
        return u;
      });
      this.users = usrAtributes;
    },
    open(row) {
      this.selectedRow = row;
      this.$bvModal.show("data-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.xy {
  height: 2em;
}
.hw {
  max-height: 40em;
}
</style>