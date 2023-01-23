<template>
    <transition name="test" mode="out-in">
        <section class="movie">
            <navbar></navbar>
            <vcontainer>
                <back></back>
                <loading v-if="$fetchState.pending"></loading>
                <div v-else class="movie-inner">
                    <div class="movie-block">
                        <div class="movie-name">
                            <div class="movie-box">
                                <h2 class="movie-title">
                                    {{ this.movie.nameRu || this.movie.nameEn}}
                                </h2>
                                <p v-if="this.age !== null" class="movie-rating">
                                    {{this.age}}+
                                </p>
                            </div>
                            <p class="movie-time">
                                {{this.movie.filmLength || 0 }} мин
                            </p>
                        </div>
                        <img class="movie-img" :src="this.movie.posterUrl" alt="">
                    </div>
                    <div class="movie-block">
                        <div class="movie-group">
                            <a v-show="movieTrailer" class="movie-trailer" :href="movieTrailer">Смотреть трейлер</a>
                            <p v-if='this.movie.ratingKinopoisk !==null' class="movie-rating__kinopoisk">
                                {{this.movie.ratingKinopoisk}}
                            </p>
                            <p v-else class="movie-rating__kinopoisk">
                                -
                            </p>
                            <add-movie-btn :movie="movie"></add-movie-btn>
                        </div>
                        <p class="movie-subtitle">О фильме</p>
                        <p class="movie-description">
                            {{this.movie.description}}
                        </p>
                        <div class="movie-info">    
                            <div class="movie-about">
                                <p class="movie-about__info">Год производства:</p>
                                <p class="movie-about__info">Страна:</p>
                                <p class="movie-about__info">Жанр:</p>
                                <p class="movie-about__info">Режиссер:</p>
                                <p class="movie-about__info">Сценарий:</p>
                                <p class="movie-about__info">Продюсер:</p>
                                <p class="movie-about__info">Оператор:</p>
                                <p class="movie-about__info">Композитор:</p>
                                <p class="movie-about__info">Монтаж:</p>
                                <p class="movie-about__info">Бюджет:</p>
                                <p class="movie-about__info">Сборы в России:</p>
                            </div>
                            <div class="movie-data">
                                <p class="movie-data__info">{{this.movie.year}}</p>
                                <p class="movie-data__info"><span class="movie-data__item" v-for="country in this.movie.countries" :key="country.id">{{country.country}}</span></p>
                                <p class="movie-data__info"><span class="movie-data__item" v-for="genre in this.movie.genres.slice(0, 3)" :key="genre.id">{{genre.genre}}</span></p>
                                <p class="movie-data__info"><span class="movie-data__item" v-for="editor in this.editors" :key="editor.id">{{editor.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.scenaries.length == 0">-</span><span class="movie-data__item" v-for="scenar in this.scenaries" :key="scenar.id">{{scenar.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.producers.length == 0">-</span><span class="movie-data__item" v-for="producer in this.producers" :key="producer.id">{{producer.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.operators.length == 0">-</span><span class="movie-data__item" v-for="operator in this.operators" :key="operator.id">{{operator.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.compositors.length == 0">-</span><span class="movie-data__item" v-for="compositor in this.compositors" :key="compositor.id">{{compositor.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.montagers.length == 0">-</span><span v-else class="movie-data__item" v-for="montager in this.montagers" :key="montager.id">{{montager.nameRu}}</span></p>
                                <p class="movie-data__info"><span v-if="this.budget.length == 0">-</span><span v-else>{{this.budget[0].amount}} {{this.budget[0].symbol}}</span></p>
                                <p class="movie-data__info"><span v-if="this.rus.length == 0">-</span><span v-else>{{this.rus[0].amount}} {{this.rus[0].symbol}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <loading v-if="$fetchState.pending"></loading>
                <div v-else>
                    <div class="movie-nav">
                        <a class="movie-nav__item active" @click="changeNavPoints">В главных ролях</a>
                        <a class="movie-nav__item" @click="changeNavPoints">Интересные факты</a>
                        <a class="movie-nav__item" @click="changeNavPoints">Картинки</a>
                        <a class="movie-nav__item" @click="changeNavPoints">Рецензии критиков</a>
                    </div>
                    <movie-images v-if="this.images" :movie="Number(this.$route.params.movieid)"></movie-images>
                    <movie-facts v-if="this.facts" :movie="Number(this.$route.params.movieid)"></movie-facts>
                    <movie-reviews v-if="this.reviews" :movie="Number(this.$route.params.movieid)"></movie-reviews>
                    <actor-slider v-if="this.actors.length !== 0 && mainActors" class="movie-actors"  :actors="this.actors"></actor-slider>
                    <similar-films v-if="this.recomends.length !== 0" @reset="getSingleMovie" class="movie-recomend"  :recomends="this.recomends"></similar-films>
                </div>
            </vcontainer>
            <mobile-nav></mobile-nav>
        </section>
    </transition>
    
</template>


<script>
export default {
    transition: {
    name: 'test',
    mode: 'out-in'
    },
    data(){
        return {
            movie: {},
            age: null,
            money: null,
            editors: [],
            scenaries: [],
            producers: [],
            operators: [],
            montagers: [],
            compositors: [],
            budget: null,
            rus: null,
            actors: [],
            recomends: [],
            mainActors: true,
            facts: false,
            images: false,
            reviews: false,
            movieTrailer: null,
        }
    },
    async fetch(){
        await this.getSingleMovie(this.$route.params.movieid)
    },
    methods: {
        changeNavPoints(e){
            const points = document.querySelectorAll('.movie-nav__item')
            if(e.target.innerHTML == "В главных ролях"){
                for(let i =0; i<points.length; i++){
                    points[i].classList.remove('active')
                }
                this.mainActors = true;
                this.facts = false;
                this.images = false;
                this.reviews = false;
                points[0].classList.add('active')
            }
            else if(e.target.innerHTML == "Интересные факты"){
                for(let i =0; i<points.length; i++){
                    points[i].classList.remove('active')
                }
                this.mainActors = false;
                this.facts = true;
                this.images = false;
                this.reviews = false;
                points[1].classList.add('active')
            }
            else if(e.target.innerHTML == "Картинки"){
                for(let i =0; i<points.length; i++){
                    points[i].classList.remove('active')
                }
                this.mainActors = false;
                this.facts = false;
                this.images = true;
                this.reviews = false;
                points[2].classList.add('active')
            }
            else if(e.target.innerHTML == "Рецензии критиков"){
                for(let i =0; i<points.length; i++){
                    points[i].classList.remove('active')
                }
                this.mainActors = false;
                this.facts = false;
                this.images = false;
                this.reviews = true;
                points[3].classList.add('active')
            }
        },
        async getSingleMovie(id){
            try{
                const data = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,{
                    headers: {
                        'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                        'Content-Type': 'application/json',
                    },
                })
                const result = await data
                this.movie = result
                result.ratingAgeLimits ?  this.age = result.ratingAgeLimits.split('').splice(3).join('') : this.age = null
            }
            catch(e){
                console.log(e.name + ": " + e.message)
            }
            
            try{
                const money = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/box_office`,{
                    headers: {
                        'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                        'Content-Type': 'application/json',
                    },
                    })
                const resultM = await money
                if(resultM.length !==0){
                    this.budget = resultM.items.filter(item => item.type == "BUDGET")
                    this.rus = resultM.items.filter(item => item.type == "RUS")
                }
                this.money = resultM
            }
            catch(e){
                console.log(e.name + ": " + e.message)
            }
            try{
                const people = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
                })
                const resultP = await people;
                this.editors = resultP.filter(word => word.professionText == "Режиссеры")
                this.editors = this.editors.splice(0,2)
                this.scenaries = resultP.filter(word => word.professionText == "Сценаристы")
                this.scenaries = this.scenaries.splice(0,2)
                this.producers = resultP.filter(word => word.professionText == "Продюсеры")
                this.producers = this.producers.splice(0,2)
                this.operators = resultP.filter(word => word.professionText == "Операторы")
                this.montagers = resultP.filter(word => word.professionText == "Монтажеры")
                this.compositors = resultP.filter(word => word.professionText == "Композиторы")

                this.actors = resultP.filter(word => word.professionText == "Актеры")
                this.actors = this.actors.splice(0,10)
                
            }
            catch(e){
                console.log(e.name + ": " + e.message)
            }
            
             
            try {
                const similar = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`,{
                    headers: {
                        'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                        'Content-Type': 'application/json',
                    },
                })
                const resultS = await similar
                this.recomends = resultS.items
                this.recomends = this.recomends.splice(0,5)
            }
            catch(e){
                console.log(e.name + ": " + e.message)
            }
            try {
                const trailer = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`,{
                    headers: {
                        'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                        'Content-Type': 'application/json',
                    },
                })
                const resultT = await trailer
                if(resultT.items.length !== 0){
                    this.movieTrailer = resultT.items[0].url
                }
                
            }
           catch(e){
            console.log(e.name + ": " + e.message)
           }

           
        }
    },
} 
</script>

<style scoped>
    .test-enter-active,
    .test-leave-active {
    transition: opacity 0.5s ease;
    }

    .test-enter-from,
    .test-leave-to {
    opacity: 0;
    }
    .movie {
        font-family: 'Inter', sans-serif;
        padding: 26px 0px 68px 0px;
    }
    .movie-nav__item {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        color: #000000;
        cursor: pointer;
        opacity: 40%;
    }
    .movie-trailer {
        margin-right: auto;
        text-decoration: none;
        padding: 10px;
        background: #EB315E;
        border-radius: 4px;
        color: #fff;
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
    }
    .movie-inner {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
    }
    .movie-name {
        margin-bottom: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .movie-nav {
        display: flex;
        gap: 46px;
        margin-top: 59px;
    }
    .movie-title {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        color: #000000;
        line-height: 44px;
        max-width: 280px;
    }
    .movie-box {
        display: flex;
        align-items: center;
    }
    .movie-rating {
        border: 1.2px solid black;
        border-radius: 25px;
        padding: 3px;
        margin-top: 7px;
        margin-left: 12px;
    }
    .movie-actors {
        margin-top: 60px;
    }
    .active {
        opacity: 1;
    }
    .movie-time {
        font-weight: 500;
        white-space: nowrap;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        margin-left: 4px;
        margin-top: 4px;
    }
    .movie-group {
        display: flex;
        margin-bottom: 37px;
        margin-top: 65px;
        justify-content: flex-end;
        align-items: center;
    }
    .movie-img {
        max-width: 491px;
        max-height: 610px;
    }

    .movie-rating__kinopoisk {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        color: #EB315E;
        margin-right: 45px;
    }
    .movie-subtitle {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 17px;
    }
    .movie-data__item {
        margin-right: 5px;
    }
    .movie-description {
        max-width: 445px;
        margin-bottom: 79px;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
    .movie-info {
        display: flex;
    }
    .movie-about {
        margin-right: 39px;
    }
    .movie-about__info {
        margin-bottom: 17px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
    }
    .movie-data__info {
        margin-bottom: 17px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
    }
    @media(max-width: 920px){
        .movie-inner {
            flex-direction: column;
        }
        .movie-name {
            justify-content: space-around;
        }
        .movie-block {
            margin: 0 auto;
        }
        .movie-description {
            margin-bottom: 40px;
        }
        .movie-nav {
            align-items: center;
        }
    }
    @media(max-width: 640px){
        .movie-nav__item {
            font-size: 16px;
        }
    }
    @media(max-width: 540px){
        .movie-nav {
            flex-direction: column;
            gap: 10px 0px;
        }
    }
    @media(max-width: 450px){
        .movie-img {
            max-width: 300px;
            max-height: 400px;
        }
        .movie-rating__kinopoisk {
            font-size: 1.8rem;
            margin-right: 20px;
        }
        .movie-trailer {
            margin-right: 20px;
        }
        .movie-group {
            justify-content: inherit;
        }
    }
    @media(max-width: 360px){
        .movie-data__info {
            display: flex;
            flex-wrap: wrap;
        }
        .movie-trailer {
            margin-right: 10px;
        }
        .movie-rating__kinopoisk {
            margin-right: 10px;
        }
        .movie-rating__kinopoisk {
            font-size: 1.3rem;
        }
    }
</style>