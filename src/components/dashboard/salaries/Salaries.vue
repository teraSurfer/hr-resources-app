<template>
  <b-container>
    <b-breadcrumb class="mt-2 mb-0 bg-light" :items="items"></b-breadcrumb>
    <b-card class="border-0 shadow-sm">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </b-card>
  </b-container>
</template>

<script>
export default {
  computed: {
    items() {
      return [
        { text: "Dashboard", to: "/dashboard/home" },
        { text: "Salaries", to: "/dashboard/salaries" },
        { text: this.$route.name }
      ];
    }
  }
};
</script>