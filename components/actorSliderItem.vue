<template>
    <div class="carousel-item">
        <img :src="actor.posterUrl" alt="">
        <p class="carousel-name">{{actor.nameRu}}</p>
        <nuxt-link  class="link" :to="{ name: 'actor-actorid', params: {actorid: actor.staffId} }"></nuxt-link>
    </div>
</template>


<script>
export default {
    props: {
        actor: {
            type: Object,
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
    .carousel-name {
        text-align: center;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        margin-top: 13px;
    }
</style>