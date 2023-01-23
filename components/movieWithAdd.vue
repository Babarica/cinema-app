<template>
    <div class="movie">
        <img class="movie-img" :src="movie.posterUrl" alt="img">
        <div class="movie-name">
            <p class="movie-title">{{movie.nameRu ? movie.nameRu : "Название отсутсвует"}}</p>
            <p class="movie-date">{{movie.year}}</p>
        </div>
        <p class="movie-rating">{{movie.rating || movie.ratingKinopoisk ? movie.rating || movie.ratingKinopoisk : "-"}}</p>
        <div class="movie-inner">
            <div class="movie-ganr__inner">
                <p class="movie-ganr" v-for="ganr in movie.genres" :key="ganr.id">
                    {{ganr.genre}}
                </p>
            </div>
            <add-movie-block :movie="movie"></add-movie-block>
        </div>
        
        <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: movie.filmId || movie.kinopoiskId} }"></nuxt-link>
    </div>
</template>


<script>
export default {
    props: {
        movie: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
    .movie-img {
        width: 140px;
        height: 200px;
        box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
    }
     .movie-name {
        max-width: 150px;
        display: flex;
        margin-top: 7px;
        justify-content: space-between;
        margin-bottom: 6px;
    }
    .movie-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .link {
        position: absolute;
        width: 150px;
        height: 83%;
        top: 0;
    }
    .movie-ganr__inner {
        display: flex;
        max-width: 105px;
        flex-wrap: wrap;
        gap: 0px 5px;
    }
    .movie-ganr {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #9A9A9A;
    }
    .movie {
        position: relative;
        font-family: 'Inter', sans-serif;
        transition: 0.5s;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .movie-rating {
        position: absolute;
        width: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 31px;
        left: 40%;
        color: #fff;
        background-color: #EB315E;
        top: -15px;
        border: 1px solid #FF8181;
        border-radius: 50%;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px
    }
    .movie-title {
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
        max-width: 106px;
    }
    .movie-date {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
    }
</style>