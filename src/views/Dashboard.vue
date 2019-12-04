<template>
    <b-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </b-container>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.zz {
  overflow-x: hidden;
}
</style>