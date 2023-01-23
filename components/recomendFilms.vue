<template>
    <vcontainer>
        <h2 class="title">Рекомендации</h2>
        <div class="movies">
            <div @mouseenter="someMore" @mouseleave="someSmall" v-for="movie in this.recFilms" :key="movie.filmId">   
                   <movie :movie="movie"></movie>
            </div>
        </div>
        <button @click="showMore" class="add-movies">Показать еще</button>
    </vcontainer>
</template>


<script>

export default {
    data(){
        return {
            recFilms: [],
            pages: 1
        }
    },
     methods: {
        someMore(e){
            e.target.classList.add('active')
        },
        someSmall(e){
            e.target.classList.remove('active')
        },
        async showMore(){
            if(this.pages<13){
                this.pages++
                const top = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
                params: {
                    page: this.pages
                }
                }).catch((error)=>console.error(error))
                const resultTop = await top
                const recomend = this.getRandomValues(19,10)
                const newFilms = []
                for(let j = 0; j<10; j++){
                    newFilms.push(resultTop.films[recomend[j]])
                }  
                this.recFilms = [...this.recFilms, ...newFilms]
            }
            
        },
        async getRecommendFilms(){
            const top = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1`,{
            headers: {
                'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                'Content-Type': 'application/json',
            },
            })
            const resultTop = await top
            const recomend = this.getRandomValues(19,10)
            const recFilm = []
            for(let j = 0; j<10; j++){
                recFilm.push(resultTop.films[recomend[j]])
            }     
            this.recFilms = recFilm

        },
        getRandomValues(range,count){
            let m = {};
            let a = [];
            for (let i = 0; i < count; ++i) {
            let r = Math.floor(Math.random() * (range - i));
            a.push(((r in m) ? m[r] : r) + 1);
            let l = range - i - 1;
            m[r] = (l in m) ? m[l] : l;
            }
            return a
        }, 
    },
    async fetch(){
        await this.getRecommendFilms()
    }
}
</script>

<style scoped>
    .title {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        margin-bottom: 66px;
    }
    .movies {
        display: flex;
        flex-wrap: wrap;
        gap: 20px 75px;
        justify-content: space-between;
    }
    .add-movies {
        display: block;
        margin: 20px auto 0px;
        background: none;
        border: none;
        background-color: #EB315E;
        border-radius: 4px;
        padding: 10px;
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        cursor: pointer;
        color: #FFFFFF;

    }
    @media(max-width: 520px){
    .title {
            text-align: center;
      }
    }
    @media(max-width: 360px){
        .movies {
            justify-content: center;
        }
    }
</style>