<template>
    <section>
        <h1>Error 404</h1>
        <nuxt-link class="home" to="/">Home</nuxt-link>
    </section>
</template>


<script>
export default {

}
</script>

<style scoped>
    section {
        margin: 0 auto;
        width: 600px;
        padding-top: 50px;
    }
    h1 {
        color: red;
        text-align: center;
        font-size: 40px;
    }
    .home {
        text-decoration: none;
        margin-top: 40px;
        text-align: center;
        font-size: 20px;
    }
</style>