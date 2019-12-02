<template>
    <b-container>
      <router-view />
    </b-container>
</template>

<script>
export default {
  computed: {
    routeName() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.zz {
  overflow-x: hidden;
}
</style>