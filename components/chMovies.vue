<template>
    <div class="movies">
        <loading v-if="$fetchState.pending"></loading>
        <div v-else>
            <div :class="{zero: (this.$store.state.profile.movies == undefined || null)}" class="movie-nav">
                <h2 :class="{zero: (this.$store.state.profile.movies == undefined || null)}" class="movies-subtitle">Выбранные фильмы</h2>
                <div v-show="this.$store.state.profile.movies !== null" class="movie-selected__nav">
                    <p class="selected-descr">Сортировать по:</p>
                    <movie-select :selectedSort="selectedSort"  @select="optionSelect" :options="sortOptions"/>
                </div>    
            </div>
            <div :class="{zero: (this.$store.state.profile.movies == undefined || null)}" class="movie-none" v-if="(this.$store.state.profile.movies == undefined || null) || this.$store.state.profile.movies.length === 0">
                <p class="movie-none__text">Список пуст</p>
            </div>
            <div v-else>
                <div v-for="movie in sortedMov" :key="movie.id">
                    <ch-movie :movie="movie"></ch-movie>
                </div>
                <div class="movie-nav">
                    <div>
                        <button v-show="pageCount>1" @click="pageCur(one)" :disabled="(one-1) == pageNum ? true : false " class="movie-btn" v-for="one in pageCount" :key="one.id">{{one-1}}</button>
                    </div>
                    <p class="movie-total">Всего: {{this.$store.state.profile.movies ? this.$store.state.profile.movies.length : 0}}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    data(){
        return {
            curState: this.$store.state.profile.pageNumber,
            selectedSort: 'По умолчанию',
            sortOptions: [
                {value: 'name', name: "По названию"},
                {value: 'rating', name: "По рейтингу"}
            ],
            sortedMovies: []
        }
    },  
    computed: {
        ...mapGetters("profile",[
            "sliceMovies",
            "pageCount",
            "pageNum",
            "sliceSortedMovies"
        ]),
        sortedMov(){
            if(this.sortedMovies.length){
                return this.sliceSortedMovies
            }
            else{
                return this.sliceMovies
            }
        }
    },
    async fetch(){
        this.$store.dispatch('profile/fetchCur')
    },
    methods: {
        ...mapMutations("profile",[
            "pageCur",
            "nullSortedCheckMovies",
            "sortedRatingMovies",
            "sortedNameMovies"
        ]),
        optionSelect(option){
            this.selectedSort = option.name
            this.sortedMovies = []
            if(option.value == "rating"){
                this.nullSortedCheckMovies()
                if(this.sliceMovies){
                    this.sortedRatingMovies(option)
                }
                
            }
            else if(option.value == "name"){
                this.nullSortedCheckMovies()
                if(this.sliceMovies){
                    this.sortedNameMovies(option)
                }
            }
        },
    }
}
</script>

<style scoped>
    .movie-none {
        display: flex;
        align-items: center;
        height: 50vh;
        justify-content: flex-start;
    }
    .movie-none__text {
        font-family: 'Rufina', sans-serif;
        font-size: 20px;
    }
    .movies-find {
        text-decoration: none;
        border: none;
        max-height: 35px;
        color: #fff;
        background: #EB315E;
        padding: 10px;
        font-family: 'Inter',sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        cursor: pointer;
    }
    .selected-descr {
        margin-right: 9px;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
    }
    .movies-subtitle {
        font-family: 'Rufina',sans-serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 31px;
        margin-right: 52px;
        
    }
    .movie-selected__nav {
        display: flex;
        align-items: center;
        margin-bottom: 30px;
    }
    .movie-btn {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 16px;
        color:#9B9B9B;
        border: none;
        background: none;
        line-height: 19px;
        padding: 0;
        padding-right: 5px;
    }
    .movie-nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .movie-total {
        font-family: 'Rufina',sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
    }
    .movie-btn:hover{
        cursor: pointer;
    }
    .movie-btn:focus {
        color:black;
    }
    .zero {
        justify-content: center;
        margin-right: 0;
    }
    .movie-btn:disabled{
        cursor:not-allowed;
        color: black;
    }
    @media(max-width: 520px){
        .movies-subtitle {
            margin-right: 20px;
            font-size: 18px;
            line-height: 21px;
        }
    }
    @media(max-width: 460px){
        .selected-descr {
            display: none;
        }
        .movie-nav {
            justify-content: space-between;
        }
    }
</style>