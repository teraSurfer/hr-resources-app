<template>
  <div class="app">
    <navbar />
     <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import {components, AmplifyEventBus} from 'aws-amplify-vue';
export default {
  components: {
    Navbar,
    ...components
  },
  async mounted() {
    AmplifyEventBus.$on('authState', async (authState) => {
      switch(authState) {
        case 'signedIn': {
          this.$store.dispatch('user_auth/LOGGED_IN')
          const currentSession = await this.$Amplify.Auth.currentSession();
          const usrGrps = currentSession.idToken.payload['cognito:groups'].split(',');
          if(usrGrps.indexOf('SuperUsers') > -1){
            this.$store.dispatch('user_auth/SUPER_USER', true);
          } else {
            this.$store.dispatch('user_auth/SUPER_USER', false);
          }
          this.$router.push('/dashboard');
          break;
        }
        case 'signedOut': {
          this.$store.dispatch('user_auth/LOGGED_OUT');
          this.$store.dispatch('user_auth/SUPER_USER', false);
          this.$router.push('/login');
          break;
        }
        default: 
          break;
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/scss/app.scss';
.app {
  height: 100%;
}
.content {
    min-height: 76vh;
}
</style>
