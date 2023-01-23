<template>
    <section class="search">
        <vcontainer>
            <navbar></navbar>
            <loading v-if="$fetchState.pending"></loading>
            <div v-else>
                <div v-if="movies && movies.length !==0">
                    <h2 class="search-title">
                        {{this.$route.params.searchName}}
                    </h2>
                    <div class="search-input">
                        <div v-for="movie in this.movies" :key="movie.filmId">
                            <movie :movie="movie"/>
                        </div>
                    </div>
                </div>
                <div class="none" v-else>Ничего не найдено</div>
            </div>
        </vcontainer>
        <mobile-nav></mobile-nav>
    </section>
</template>

<script>
export default {
    data(){
        return {
            movies: []
        }

    },
    async fetch(){
        await this.takeMovies()
    },
    methods: {
        async takeMovies(){
            const data = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.translit(this.$route.params.searchid)}&page=1`,{
            headers: {
                'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                'Content-Type': 'application/json', 
            },
            })
            const result = await data
            this.movies = result.films
        },
        translit(str)
            {
                var ru=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
                var en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
                    var res = '';
            for(var i=0, l=str.length; i<l; i++)
                { 
                    var s = str.charAt(i), n = ru.indexOf(s); 
                    if(n >= 0) { res += en[n]; } 
                    else { res += s; } 
                } 
                return res;  
            }
    }
}
</script>

<style scoped>
    .search {
        padding: 26px 0px 68px 0px;
    }
    .search-input {
        display: flex;
        justify-content: flex-start;
        gap: 20px 40px;
        flex-wrap: wrap;

    }
    .none {
        margin-top: 40px;
        font-family: 'Rufina', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70vh;
    }
    .search-title {
        margin-bottom: 40px;
        margin-top: 50px;
        font-family: 'Rufina', sans-serif;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        color: #000000;
    }
    @media(max-width: 560px){
        .search-input {
            justify-content: center;
        }
    }
</style>