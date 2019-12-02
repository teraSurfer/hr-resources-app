<template>
    <b-navbar :variant="variant" :class="classes" type="dark" toggleable="lg">
        <b-navbar-brand to="/">
            <h6 class="mb-0">Human Resources</h6>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse">
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/" >Home</b-nav-item>
                <b-nav-item v-if="!isLoggedIn" to="/login">Login</b-nav-item>
                <b-nav-item v-if="isLoggedIn" to="/dashboard">Dashboard</b-nav-item>
                <b-nav-item-dropdown v-if="isLoggedIn" :text="username">
                    <b-dropdown-item to="/profile">
                        Profile
                    </b-dropdown-item>
                    <b-dropdown-item @click="logout">
                        Logout
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import {AmplifyEventBus} from 'aws-amplify-vue';
import swal from 'sweetalert';
export default {
    computed: {
        variant() {
            let v = this.$route.path;
            return (v === '/' ) ? 'dark' : 'primary';
        },
        classes() {
            let v = this.$route.path;
            return (v === '/' ) ? 'z':'shadow-sm z';
        },
        isLoggedIn() {
            return this.$store.getters['user_auth/loggedIn']
        }
    },
    data: () => ({
        username: 'Achalaesh Lanka'
    }),
    methods: {
        async logout() {
            try {
               const log = await this.$Amplify.Auth.signOut();
               AmplifyEventBus.$emit('authState', 'signedOut');
               console.log(log);
               swal({
                   title: 'Logged out',
                   icon: 'success'
               })
            } catch(err) {
                console.error(err);
                swal({
                    title: 'Sorry',
                    text: 'We weren\'t able to log you out. Please try again.',
                    icon: 'error'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
 .z {
     z-index: 999;
 }
</style>
