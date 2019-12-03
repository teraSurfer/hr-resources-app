<template>
  <b-container>
    <b-breadcrumb class="mt-2 mb-0 bg-light" :items="items"></b-breadcrumb>
    <b-card class="border-0 shadow-sm">
      <b-btn-toolbar class="justify-content-between align-items-center">
        <h6>Department List</h6>
        <b-btn-group>
          <b-btn size="sm" variant="dark">
            Create
            <fa icon="plus" />
          </b-btn>
        </b-btn-group>
      </b-btn-toolbar>
      <b-table
        class="mt-2"
        :items="tableContent"
        responsive
        hover
        table-variant="white"
        bordered
        :fields="tableHeaders"
      ></b-table>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Dashboard", to: "/dashboard/home" },
      { text: "Departments", to: "/dashboard/departments" }
    ],
    tableHeaders: [
      {
        key: "department_id",
        label: "Department ID"
      },
      {
        key: "department_name",
        label: "Department Name"
      }
    ],
    tableContent: []
  })
};
</script>