<template>
    <div>
        <button @click="saveMovie" :class="{ active: active }" class="movie-add"></button>
    </div>
</template>


<script>
import { getDatabase, child, ref, set, push, update, onValue  } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default {
    data(){
        return {
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
        saveMovie(){
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
                            description: this.movie.description,
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
                const auth = getAuth()
                const uid = auth.currentUser.uid
                const db = getDatabase();
                const starCountRef = ref(db, '/users/' + uid + '/' + '/movies/' + this.movie.kinopoiskId + '/');
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    if(data !== null){ 
                        this.active = true
                    }
                });
            }, 1000)
            
    }
}
</script>

<style scoped>
    .movie-add {
        border: none;
        background: none;
        width: 60px;
        height: 60px;
        background: url('~/static/images/film/btn.svg');
        cursor: pointer;
    }
    .movie-add.active {
        background: url('~/static/images/film/btnMin.svg');
    }
</style>