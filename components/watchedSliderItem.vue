<template>
    <div class="carousel-item">
        <img :src="watch[1].image" alt="">
        <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: watch[1].id} }"></nuxt-link>
    </div>
</template>


<script>
export default {
    props: {
        watch: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
    .link {
        position: absolute;
        width: 150px;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
    }
    .carousel-item {
        position: relative;
    }
    img {
        border-radius: 12px;
        width: 160px;
        height: 250px;
    }
</style>