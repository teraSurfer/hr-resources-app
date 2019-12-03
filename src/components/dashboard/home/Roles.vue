<template>
  <b-card
    class="border-0 shadow-sm wh"
    header-bg-variant="primary"
    footer-bg-variant="white"
    footer-border-variant="0 text-center"
  >
    <template v-slot:header>
      <h6 class="mb-0 text-center text-white">User Mangement</h6>
    </template>
    
    <template v-slot:footer>
      <b-btn size="sm" variant="primary">View Users</b-btn>
    </template>
  </b-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wh {
  height: 20em;
}
</style>