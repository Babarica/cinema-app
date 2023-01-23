<template>
    <vcontainer>
        <h2 class="title">Премьеры в Российских кинотеатрах</h2>
        <div class="inner">
            <div @mouseenter="someMore" @mouseleave="someSmall" class="inner-film" v-for="film in this.$store.state.actualMovies.newFilms" :key="film.kinopoiskId">
                <img class="film-image" :src='film.posterUrl' alt="image">
                <div class="text-inner">
                    <p class="film-title">{{film.nameRu}}</p>
                    <p class="film-date">{{film.year}}</p>
                </div>
                <div class="film-ganr__inner">
                    <p class="film-ganr" v-for="ganr in film.genres" :key="ganr.id">
                        {{ganr.genre}}
                    </p>
                </div>
                <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: film.kinopoiskId} }"></nuxt-link>
            </div>
        </div>
        
    </vcontainer>
</template>


<script>
export default {

    methods: {
        someMore(e){
            e.target.classList.add('active')
        },
        someSmall(e){
            e.target.classList.remove('active')
        }
    }
}
</script>

<style scoped>
    .title {
        margin-top: 91px;
        font-family: 'Rufina',sans-serif;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        color: #000000;
        margin-bottom: 51px;
    }
    .inner {
        display: flex;
        justify-content: space-between;
        position: relative;
        flex-wrap: wrap;
        gap: 10px;
    }
    .active {
        transform: scale(1.2);
        
    }
    .film-image {
        width: 100%;
        max-height: 200px;
        border-radius: 4px;
        transition: 0.5s;
    }
    .text-inner {
        display: flex;
        font-family: 'Inter',sans-serif;
        justify-content: space-between;
        max-width: 150px;
        margin-top: 7px;
        margin-bottom: 9px;
    }
    .film-title {   
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
        max-width: 100px;
    }
    .film-date {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    }
    .film-ganr__inner {
        display: flex;
        max-width: 150px;
        flex-wrap: wrap;
    }
    .film-ganr {
        font-family: 'Inter',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #9A9A9A;
        margin-right: 5px;
    }
    .link {
        position: absolute;
        width: 150px;
        height: 100%;
        top: 0;
    }

    .inner-film {
        max-width: 160px;
        transition: 0.5s;
        margin-bottom: 50px;
    }
    @media(max-width: 520px){
    .title {
            text-align: center;
      }
    }
    @media(max-width: 360px){
        .inner {
            justify-content: center;
        }
    }
</style>