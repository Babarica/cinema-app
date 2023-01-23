<template>
    <div>
        <button @click="saveMovie" :class="{ active: active }" class="movie-add">    
        </button>
    </div>
</template>

<script>
import { getDatabase, child, ref, set, push, update, onValue  } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
    data(){
        return {
            description: null,
            active: false,
        }
    },
    props: {
            movie: {
                type: Object,
                required: true
            },
        },
    methods: {
        async takeDescr(){
            const result = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.movie.kinopoiskId}`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const resultFilter = await result
            this.description = resultFilter.shortDescription 
        },
        saveMovie(){
            this.takeDescr()
            if(this.active == true){
                const db = getDatabase();
                this.$store.commit('saveUid')
                const updates = {}
                const movie = null
                updates['/users/' + this.$store.state.uid + '/' + '/movies/' + this.movie.kinopoiskId + '/'] = movie;
                this.active = false;
                return update(ref(db), updates);
            }
            else {
                let auth = getAuth();
                onAuthStateChanged(auth, (user)=>{
                    if(user){
                        this.active = true
                        const db = getDatabase();
                        this.$store.commit('saveUid')
                        const newPostKey = push(child(ref(db), '/movies/')).key;
                        const movie = {
                            name: this.movie.nameRu,
                            id: this.movie.kinopoiskId,
                            rating: this.movie.ratingKinopoisk,
                            description: this.description,
                            image: this.movie.posterUrlPreview,
                            year: this.movie.year,
                            watched: false,
                        }
                        const updates = {}
                        updates['/users/' + this.$store.state.uid  + '/' + '/movies/' + this.movie.kinopoiskId + '/'] = movie;
                        return update(ref(db), updates);
                    }
                    else {
                        this.$router.push("/login");
                    }
                })
            }
        },
    },
    mounted(){
            setTimeout(()=>{
                const auth = getAuth();
                const uid = auth.currentUser.uid;
                const db = getDatabase();
                const starCountRef = ref(db, '/users/' + uid + '/' + '/movies/' + this.movie.kinopoiskId + '/');
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    if(data !== null){
                        this.active = true
                    }
                });
            }, 700)
    }
}
</script>

<style scoped>
    .movie-add {
        width: 32px;
        height: 34px;
        border-radius: 3px;
        border: none;
        background-color: #EB315E;
        position: relative;
        cursor: pointer;
    }
    .movie-add::after {
        position: absolute;
        content: '';
        display: block;
        height: 21px;
        width: 22px;
        background: url(~/static/images/movie/bxs_bookmark.svg) no-repeat center;
        left: 18%;
        top: 20%;
    }
    .movie-add.active::after {
        background: url(~/static/images/movie/bxs_bookmarkGreen.png) no-repeat center;
    }

</style>