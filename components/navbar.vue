<template>
    <div class="real-nav" :class="{'scroll-nav' : scrollednav}">
        <nav class="navbar">
        <NuxtLink prefetch class="logo-link" :to="{name: 'index'}">CinDon</NuxtLink>
        <button @click="toggleMobile" class="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="nav-input">
            <input @focus="()=>{this.live = true}"  @keyup.enter='searchMovie' @blur="outFocus" class="nav-search" v-model="searchInput" type="text" placeholder="Найти..."> 
            <button class="nav-btn" @click="searchMovie">Найти</button>
            <div class="live-search" v-show="movies && movies.length !== 0">
                <div v-show="live" v-for="movie in this.movies" :key="movie.id">
                    <nuxt-link  class="live-link" :to="{ name: 'movie-movieid', params: {movieid: movie.filmId || movie.kinopoiskId} }">{{movie.nameEn || movie.nameRu}}<span class="live-rating" v-if="movie.rating !== 'null'">{{movie.rating}}</span><span class="live-rating" v-else>-</span></nuxt-link>
                    <!-- <p class="live-rating" v-if="movie.rating !== 'null'">{{movie.rating}}</p>
                    <p class="live-rating" >-</p> -->
                </div>
            </div>
        </div>
        <base-profile class="profile" />
        </nav>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
   data(){
    return {
        live: true,
        searchInput: '',
        menu: false,
        movies: null,
        scrollednav: false,
    }
   },
   mounted(){
        window.addEventListener("scroll", this.updateScroll)
   },
   methods: {
        outFocus(){
            setTimeout(()=>{this.live = false}, 100)
        },
        ...mapMutations([
            "toggleMobile"
        ]),
        async searchMovie(){ 
            this.$router.push({name: "search-searchid", params: {searchid: this.searchInput}});
            this.searchInput = ''
        },
        updateScroll(){
            const scrollPosition = window.scrollY;
            if(scrollPosition > 110){
                this.scrollednav = true
                return;
            }
            this.scrollednav = false
        },
        translit(str){
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
            },
            async takeMovies(){
                const data = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${this.translit(this.searchInput)}&page=1`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json', 
                },
            })
            const result = await data
            this.movies = result.films.splice(0,5)
            
        },
   },
   
   watch: {
    searchInput(newSearchInput, oldSearchInput){
        if(newSearchInput.includes('')){
            this.takeMovies()
        }
    }
   }
}
</script>
<style scoped>
    .live-link {
        text-decoration: none;
        color: black;
        font-family: 'Rufina',sans-serif;
        display: block;
        padding: 10px 5px;
        display: flex;
        justify-content: space-between;
    }
    .real-nav {
        transition: all 0.3s ease-in-out;
    }
    .live-link:hover {
        background: #C7C7C7;
    }
    .scroll-nav {
        background-color: #fff;
        left: 0;
        top: 0;
        z-index: 10;
        right: 0;
        position: fixed;
        margin: 0 auto;
        padding: 26px 0px;
        box-shadow: 4px 2px 4px #C7C7C7;
        transition: all 0.3s ease-in-out;
    }
    .live-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .live-search {
        position: absolute;
        display: flex;
        z-index: 9;
        width: 99.6%;
        flex-direction: column;
        top: 97%;
        border: 1px solid black;
        background-color: #ffff;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1140px;
        padding: 0px 15px;
        margin: 0 auto;
        transition: all 0.3s ease-in-out;
    }
    .navbar-burger {
        height: 22px;
        width: 40px;
        position: relative;
        border: none;
        background: none;
        cursor: pointer;
        display: none;
    }
    .logo-link {
        font-family: 'Rufina',sans-serif;
        text-decoration-line: underline;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 70.19%;
        color: #000000;
    }
    .navbar-burger span {
        position: absolute;
        display: block;
        width: 40px;
        height: 4px;
        background-color: black;
        content: "";
        left: 0;
    }
    .live-rating {
        color: #EB315E;
        font-family: 'Rufina',sans-serif;
        padding-right: 5px;
    }
    .navbar-burger span:first-child {
        top: 3px;
    }
    .navbar-burger span:last-child {
        top: 19px;
    }
    .nav-search {
        padding: 7px 0px 7px 12px;
        width: 604px;
        border: 1px solid #000000;
        outline: none;
    }
    .nav-input::after {
        display: block;
        position: absolute;
        content: "";
        background: url(~/static/images/index/find.png);
        width: 20px;
        right: 0;
        height: 20px;
        z-index: 3;
        top: 20%;
        right: 12%;
    }
    .nav-search::placeholder {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #989898;
        font-weight: normal;
    }
    .nav-input {
        display: flex;
        position: relative;
    }
    .nav-input button {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        font-family: 'Inter', sans-serif;
        background: none;
        border: 1px solid #000000;
        padding: 7px 14px 7px 14px;
        cursor: pointer;
    }
    @media(max-width: 950px){
        .logo-link {
            display: none;
        }
        .navbar-burger {
            display: block;
        }
        .nav-input::after {
            right: 19%;
        }
        .nav-search {
            width: 352px;
        }
    }
    @media(max-width: 620px){
        .nav-search {
            width: 300px;
            padding: 7px 4px 7px 12px;
            overflow: hidden;
        }
        .nav-btn {
            display: none;
        }
        .nav-input::after {
            right: 6%;
        }
    }
    @media(max-width: 520px){
        .profile {
            display: none;
        }
        .navbar {
            justify-content: space-around;
        }
    }
    @media(max-width: 420px){
        .nav-search {
            width: 200px;
        }
        .navbar {
            padding: 0;
        }
    }
</style>
