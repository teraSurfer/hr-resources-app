<template>
       <section class="banner">
            <header class="viewport-header">
            <div class="image-wrap">
                <video autoplay muted loop style="height: 100%; width: 100%; object-fit: cover;">
                    <source src="/img/videos/bg.mp4" type="video/mp4">
                </video>
            </div>
            <div class="banner-overlay"></div>
            <div class="banner-content text-light">
                <div class="text-center">
                    <fa size="5x" icon="handshake" />
                    <h2 class="banner-title display-1">Human Resources - app</h2>
                    <h4>Manage your HR with ease.</h4>
                    <b-btn size="lg" v-if="!isLoggedIn" to="/login" variant="outline-light" class="mt-4"> <b>Get Started</b> <fa icon="chevron-right" /></b-btn>
                    <b-btn size="lg" v-if="isLoggedIn" to="/dashboard" variant="outline-light" class="mt-4"> <b>Get Started</b> <fa icon="chevron-right" /></b-btn>
                </div>
            </div>
            </header>
        </section>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters['user_auth/loggedIn']
        }
    }
}
</script>

<style lang="scss">
.banner {
    margin-top: 3rem;
}
.viewport-header {
    height: 86vh;
    text-align: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    color: $accent;
}
.image-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: -99;
    background-size: cover;
}
.banner-overlay {
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    background: $dark-gray;
    opacity: .7;
}
    .banner-content{
        display: block;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .banner-title{
        font-size: 3.5em;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }
</style>
