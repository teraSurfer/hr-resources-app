<template>
  <b-card class="border-0" header-class="border-0" footer-class="border-0">
    <template v-slot:header>
      <b-btn-toolbar class="justify-content-between align-items-center">
        <b-btn-group>
          <b-btn @click="back" size="sm" variant="transparent mr-2 rounded-circle">
            <fa icon="arrow-left" />
          </b-btn>
        </b-btn-group>
        <h6 class="mb-0">User Mangement</h6>
        <b-input-group size="sm">
          <template v-slot:append>
            <b-btn variant="dark" size="sm">
              <fa icon="search" />
            </b-btn>
          </template>
          <b-input placeholder="Search Users" class="border-0"></b-input>
        </b-input-group>
      </b-btn-toolbar>
    </template>
    <b-table
      sticky-header
      :fields="tableHeaders"
      bordered
      :busy="isLoading"
      table-variant="white"
      :items="users"
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
          <b-btn @click="open(data)" size="sm" variant="dark">
            <fa icon="pen" />
          </b-btn>
          <b-btn size="sm" variant="dark">
            <fa icon="trash" />
          </b-btn>
        </b-btn-group>
      </template>
    </b-table>
    <b-btn-toolbar class="align-content-center justify-content-between">
      <p class="mb-0 text-muted small">Fetched {{users.length}} rows</p>
      <b-btn-group class="xy">
        <b-btn size="sm" @click="loadUsers('back')" :disabled="current == 1" variant="outline-dark">
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
    <b-modal id="user-update-modal" hide-footer title="Update user">
      <b-form @submit.stop.prevent="formSubmit">
        <b-form-group class="form" label="First Name:">
          <b-input-group>
            <b-input disabled :value="selectedRow.given_name" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="form" label="Last Name:">
          <b-input-group>
            <b-input disabled :value="selectedRow.family_name" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="form" label="Email:">
          <b-input-group>
            <b-input disabled :value="selectedRow.email" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="form" label="Enabled:">
          <b-form-checkbox v-model="selectedRow.enabled" name="check-button" switch>
            Enabled
          </b-form-checkbox>
        </b-form-group>
        <b-form-group class="form" label="Designation:">
          <b-input-group>
            <b-input v-model="selectedRow['custom:designation']" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <b-form-group class="form" label="Department:">
          <b-input-group>
            <b-input v-model="selectedRow['custom:department']" class="border-primary"></b-input>
          </b-input-group>
        </b-form-group>
        <div class="text-center">
          <b-btn size="sm" type="submit" variant="primary">Submit</b-btn>
        </div>
      </b-form>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  data: () => ({
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
        key: "custom:designation",
        label: "Designation"
      },
      {
        key: "enabled",
        label: "Enabled"
      },
      {
        key: "custom:department",
        label: "Department"
      },
      {
        key: "actions",
        label: "Actions"
      }
    ],
    isLoading: false,
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
    users: [],
    tokens: [""],
    current: 0,
    reachedEnd: false,
    selectedRow: {}
  }),
  mounted() {
    this.loadUsers();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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
      console.log(response);
      this.processUsers(response.Users);
      this.isLoading = false;
    },
    processUsers(users) {
      let usrAtributes = users.map(usr => {
        let u = {};
        usr.Attributes.map(attr => {
          u[attr.Name] = attr.Value;
        });
        u.enabled = usr.Enabled;
        return u;
      });
      this.users = usrAtributes;
    },
    open(row) {
      row = row.item;
      this.selectedRow = {
        enabled: row.enabled,
        ["custom:department"]: row.department,
        ["custom:designation"]: row.designation,
        ...row
      };
      this.$bvModal.show("user-update-modal");
    },
    async formSubmit() {
      console.log(this.selectedRow);
      const response = await this.$Amplify.API.post("AdminQueries", "/updateAttributes", {
        headers: {
          "Content-Type": "application/json",
            Authorization: `${(await this.$Amplify.Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`
        },
        body: {
          username: this.selectedRow.sub,
          attributes: [
            {Name: 'custom:designation', Value: this.selectedRow["custom:designation"]},
            {Name: 'custom:department', Value: this.selectedRow["custom:department"]}
          ]
        }
      });
      console.log(response);
    }
  }
};
</script>

<style lang="scss" scoped>
.xy {
  height: 2em;
}
</style>
