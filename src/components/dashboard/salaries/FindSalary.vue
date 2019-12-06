<template>
    <b-card class="border-0" header-class="border-0" footer-class="border-0">
    <template v-slot:header>
      <b-btn-toolbar class="justify-content-between align-items-center">
        <b-btn-group>
          <b-btn @click="back" size="sm" variant="transparent mr-2 rounded-circle">
            <fa icon="arrow-left" />
          </b-btn>
          <b-btn size="sm" @click="triggerPayroll" class="rounded-0 ml-2" variant="dark">
            Trigger Payroll
          </b-btn>
        </b-btn-group>
        <h6 class="mb-0">Payroll</h6>
        <b-input-group size="sm">
          <template v-slot:append>
            <b-btn variant="dark" size="sm">
              <fa icon="search" />
            </b-btn>
          </template>
          <b-input placeholder="Search Payroll" class="border-0"></b-input>
        </b-input-group>
      </b-btn-toolbar>
    </template>
     <b-table
      sticky-header
      :fields="tableHeaders"
      bordered
      :busy="isLoading"
      table-variant="white"
      :items="salaries"
      responsive
    >
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner type="grow" class="align-middle"></b-spinner>
          <b-spinner type="grow" class="align-middle"></b-spinner>
          <b-spinner type="grow" class="align-middle"></b-spinner>
        </div>
      </template>
      <template v-slot:cell(salary)="data">
        $ {{data.item.salary}}
      </template>
     </b-table>
    </b-card>
</template>

<script>
import swal from 'sweetalert';
export default {
    data: () => ({
        tableHeaders: [
            {key: 'employee_id', label: 'Employee ID'},
            {key: 'salary', label: 'Salary'},
            {key: 'from_date', label: 'From Date'},
            {key: 'to_date', label: 'To Date'}
        ],
        isLoading: false,
        salaries: [],
        limit: 10
    }),
    mounted() {
        this.loadSalaries();
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        async loadSalaries() {
            this.isLoading = true;
            const response = await this.$Amplify.API.get("hrapi", `/salaries?limit=${this.limit}`);
            this.salaries = response;
            this.isLoading = false;
        },
        triggerPayroll() {
          setTimeout(() => {
            swal("Success", "Payroll job is now running", "success")
          }, 2500);
        }
    }
}
</script>