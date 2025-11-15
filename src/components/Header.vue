<template>
    <header class="header">
        <h3>{{ currentSite }}</h3>
        <nav class="navbar">
            <router-link class="router" to="/login">Login</router-link>
            <span class="nav-separator">|</span>
            <router-link class="router" to="/">Home</router-link>
        </nav>
        <div class="profile-icon">
            <img src="@/assets/me.png" alt="Logo" />
        </div>
    </header>
</template>

<script>
import { mergeProps } from 'vue';

export default {
    name: 'Header',
    computed: {
        currentSite() {
            return this.$route.name ? this.$route.name.toUpperCase() : ''
        }
    }
}

</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 1px solid #42b983;
    margin: 0;
}

.navbar {
    display: flex;
    gap: 10px;
}

.nav-separator {
    margin: 0 5px;
    color: #333;
}

.router {
    text-decoration: none;
    padding: 5px 10px;
    color: #42b983
}

.router:hover {
    background-color: #b0b0b0;
    border-radius: 3px;
}

.profile-icon img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>