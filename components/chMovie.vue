<template>
    <div class="choosen-movie">
        <div class="choosen-inner">
            <div class="choosen-rat">
                <img :src="movie[1].image" alt="" class="choosen-img">
                <p class="choosen-mark">{{movie[1].rating ? movie[1].rating : '-'}}</p>
            </div>
            <div class="choosen-block">
                <h2 class="choosen-title">{{movie[1].name ? movie[1].name : "Название отсутствует"}}<span>{{movie[1].year ? movie[1].year : "-"}}</span></h2>
                <p class="choosen-description">{{movie[1].description ? movie[1].description : "Описание отсутсвует"}}</p>
            </div>
            <div class="choosen-box">
                <div class="choosen-item"  @change="addMovie" :class="{ active: checkTrue }">
                    <input :checked="this.checkTrue" class="choosen-input" :name="movie[1].id" :id="movie[1].id" type="checkbox" value="yes">
                    <label class="choosen-label" :for='movie[1].id'>Просмотренно</label>
                </div>
                <nuxt-link  class="link" :to="{ name: 'movie-movieid', params: {movieid: movie[1].id} }">Перейти к фильму</nuxt-link>
                <a class="choosen-del" @click="deletMovie(movie)">Удалить</a>
            </div>
        </div>
    </div>
</template>
<!-- movie[1].watched -->

<script>
import { getDatabase, child, ref, push, update  } from "firebase/database";
import { mapMutations } from 'vuex';
export default {
    props: {
        movie: {
            type: Array,
            required: true
        }
    },
    computed: {
        checkTrue: function () {
            return this.movie[1].watched
        }
    },
    methods: {
        ...mapMutations("profile",[
            "deletMovie"
        ]),
        addMovie(){           
            if(this.checkTrue == true){
                const db = getDatabase();
                const updates = {}
                const movieP = {
                            name: this.movie[1].name ? this.movie[1].name : null,
                            id: this.movie[1].id ? this.movie[1].id : null,
                            rating: this.movie[1].rating || null,
                            description: this.movie[1].description ? this.movie[1].description : null,
                            image: this.movie[1].image ? this.movie[1].image : null,
                            year: this.movie[1].year ? this.movie[1].year : null,
                            watched: false,
                        }
                updates['/users/' + this.$store.state.uid + '/' + '/movies/' + this.movie[1].id + '/'] = movieP
                updates['/users/' + this.$store.state.uid + '/' + '/WatchedMovies/' + this.movie[1].id + '/'] = null;
                return update(ref(db), updates); 
            }
            else {
                const db = getDatabase();
                const newPostKey = push(child(ref(db), '/WatchedMovies/')).key;
                const Watchedmovie = this.movie
                const movieP = {
                            name: this.movie[1].name ? this.movie[1].name : null,
                            id: this.movie[1].id ? this.movie[1].id : null,
                            rating: this.movie[1].rating || null,
                            description: this.movie[1].description ? this.movie[1].description : null,
                            image: this.movie[1].image ? this.movie[1].image : null,
                            year: this.movie[1].year,
                            watched: true,
                        }
                const updates = {}
                updates['/users/' + this.$store.state.uid + '/' + '/movies/' + this.movie[1].id + '/'] = movieP
                updates['/users/' + this.$store.state.uid + '/' + '/WatchedMovies/' + this.movie[1].id + '/'] = Watchedmovie;
                return update(ref(db), updates);
                
            }
        },
    },
}
</script>

<style scoped>
    .choosen-img {
        max-width: 116px;
        max-height: 114px;
    }
    .choosen-description {
        max-width: 222px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px; 
        max-height: 90px;
        overflow: hidden;
        color: #868585;
        text-overflow: ellipsis;
    }
    .choosen-movie {
        margin-bottom: 20px;
        padding: 14px 22px 14px 16px;
        border: 1px solid #EB315E;
        border-radius: 4px;
        max-height: 142px;
    }
    .choosen-inner {
        display: flex;
        justify-content: space-between;
    }
    .choosen-rat {
        position: relative;
    }
    .choosen-mark {
        position: absolute;
        padding: 3px 8px;
        font-family: 'Inter', sans-serif;
        background:#EB315E;
        border-radius: 4px;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
        top: -10px;
        right: -14px;
    }
    .choosen-block {
        margin-left: 28px;
    }
    .choosen-title {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 8px;
        max-width: 250px;
    }
    .choosen-title span {
        margin-left: 15px;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #EB315E;
    }
    .choosen-box {
        margin-left: 49px;
        display: flex;
        flex-direction: column;
    }
    .choosen-item {
       display: flex;
       justify-content: flex-end;
       align-items: flex-end;
    }
    .choosen-item label {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #000000;
    }
    .choosen-input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }
    .link {
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        line-height: 12px;
        text-decoration-line: underline;
        color: #EB315E;
        margin-top: 14px;
        align-self: flex-end;
    }
    .choosen-del {
        font-family: 'Inter',sans-serif;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        text-decoration-line: underline;
        cursor: pointer;
        color: #867C7C;
        margin-top: 58px;
        align-self: flex-end;
    }
    .choosen-label {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
    }
    .choosen-input+label {
        display: inline-flex;
        align-items: center;
        flex-direction: row-reverse; 
        user-select: none;
        gap: 0 20px;
        cursor: pointer;
    }
    .choosen-input+label::before {
        content: '';
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #EB315E;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
    }
    .choosen-input:checked+label::before {
        border-color: #EB315E;
        background-color: #EB315E;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }
    .choosen-input:not(:disabled):not(:checked)+label:hover::before {
        border-color: #b3d7ff;
    }
    .choosen-input:not(:disabled):active+label::before {
        background-color: #b3d7ff;
        border-color: #b3d7ff;
    }
    .custom-checkbox:focus+label::before {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    @media(max-width: 520px){
        .choosen-box {
            margin-left: 20px;
        }
        .choosen-block {
            margin-left: 15px;
        }
    }
    @media(max-width: 460px){
        .choosen-box {
            margin-left: 0px;
        }
        .choosen-block {
            margin-left: 10px;
        }
        .choosen-description {
            display: none;
        }
        .choosen-title {
            display: flex;
            flex-direction: column;
            font-size: 14px;
        }
        .choosen-title span {
            margin-left: 0;
            margin-top: 10px;
        }
        .choosen-input+label {
            text-indent: -9999px;
        }
        .link {
            font-size: 10px;
        }
    }
    @media(max-width: 360px){
        .choosen-title {
            font-size: 12px;
            margin-left: 10px;
        }
        .link {
            white-space: nowrap;
        }
    }
</style>