<template>
  <b-container>
      <h3>Departments</h3>
  </b-container>
</template>

<script>
export default {
  data: () => ({
    items: [
        { text: "Dashboard", to: "/dashboard/home" },
        { text: "Departments", to: "/dashboard/departments" }
    ]
  })
};
</script>