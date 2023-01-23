<template>
    <div @mouseenter="someMore" @mouseleave="someSmall" class="movie">
        <img :src="movie.posterUrl" alt="img" class="movie-img">
        <div class="movie-text">
            <h2 class="movie-title">{{movie.nameRu || movie.nameEn ? movie.nameRu || movie.nameEn : "Название отсутсвует"}}</h2>
            <div class="movie-date__info">
                <p class="movie-date">{{movie.year}},</p>
                <p class="movie-ganr" v-for="ganr in movie.genres" :key="ganr.id">
                    {{ganr.genre}}
                </p>
            </div>
            <div class="movie-countr">
                <p class="movie-ganr" v-for="count in movie.countries" :key="count.id">
                        {{count.country}}
                </p>
            </div>
            <p v-show="descr" @click="showDescription" class="movie-btn__show">Короткое описание</p>
            <p v-show="!descr" class="movie-description">
                {{this.description ? this.description : "Короткое описание отсутсвует"}}
            </p>
        </div>
        <div class="movie-inner">
            <p class="movie-rating">{{movie.rating || movie.ratingKinopoisk}}</p>
            <add-movie-filter :movie="movie"/>
        </div>
        <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: movie.filmId || movie.kinopoiskId} }"></nuxt-link>
    </div>
</template>


<script>
import addMovieFilter from './addMovieFilter.vue';
export default {
  components: { addMovieFilter },
    data(){
        return {
            description: null,
            descr: true,
        }
    },
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
    methods: {
        async showDescription(){
            await this.takeDescr();
            this.descr = false
        },
        someMore(e){
            e.target.classList.add('active')
        },
        someSmall(e){
            e.target.classList.remove('active')
        },
        async takeDescr(){
            const result = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.movie.kinopoiskId}`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const resultFilter = await result
            if(resultFilter.shortDescription){
                this.description = resultFilter.shortDescription 
            }
            
        },
    }
}
</script>

<style scoped>
    .link {
        position: absolute;
        width: 105px;
        height: 100%;
        top: 0;
        left: 6%;
    }
    .movie {
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        position: relative;
        padding: 30px;
        transition: all 0.27s ease-in-out;
        border-radius: 13px;
    }
    .movie-inner {
        margin-left: 60px;
    }
    .active {
        box-shadow: 0px 0px 7px #695050;  
        
    }
    .movie-date__info {
        display: flex;
        flex-wrap: wrap;
        gap: 0px 5px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #695050;
        max-width: 200px;
        width: 100%;
    }
    .movie-description {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #868585;
        margin-top: 5px;
    }
    .movie-countr {
        margin-top: 5px;
        display: flex;
        gap: 5px;
    }
    .movie-rating {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #03A744;
        text-align: center;
        margin-bottom: 7px;
    }
    .movie-title {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        max-width: 200px;
        margin-bottom: 5px;
    }
    .movie-btn__show {
        margin-top: 10px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        position: relative;
        cursor: pointer;
    }
    .movie-ganr {
        font-family: 'Inter',sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #695050;
    }
    .movie-btn__show::after {
        position: absolute;
        position: block;
        content: "";
        width: 10px;
        height: 10px;
        left: 112px;
        top: 20%;
        background: url(~/static/images/arrow-down.svg) no-repeat;
        background-position: center;
    }
    .movie-text {
        max-width: 300px;
        width: 100%;
    }
    .movie-img {
        max-width: 140px;
        width: 100%;
        max-height: 173px;
        height: 100%;
        border-radius: 4px;
        margin-right: 60px;
    }
</style>