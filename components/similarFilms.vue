<template>
    <div class="recomends">
        <vcontainer>
            <h2 class="recomends-title">Также Рекомендуем</h2>
            <div class="recomends-inner">
                <div class="recomend-film" v-for="recomend in this.recomends" :key="recomend.filmId">
                    <img :src="recomend.posterUrl" alt="" class="recomends-image">
                    <p class="recomend-name">{{recomend.nameRu}}</p>
                    <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: recomend.filmId} }"></nuxt-link>
                </div>
            </div>
        </vcontainer>
        
    </div>
    
</template>
<script>

export default {
    props: {
        recomends: {
            type: Array,
            required: true
        }
    },
    methods: {
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
    .recomend-film {
        position: relative;
    }
    .recomends-inner {
        display: flex;
        justify-content: space-between;
    }
    .recomends-title {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 41px;
    }
    .recomends {
        margin-top: 53px;
    }
    .recomends-image {
        width: 150px;
        height: 200px;
        border-radius: 4px;
        box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
    }
    .recomend-name {
        max-width: 140px;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        margin-top: 13px;
    }
    @media(max-width: 920px){
        .recomends-inner {
            flex-wrap: wrap;
        }
        .recomends {
            margin-top: 90px;
        }
    }
    @media(max-width: 360px){
        .recomends-inner {
            justify-content: center;
        }
    }
</style>