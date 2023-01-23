import { getDatabase, child, ref, get, push, update, onValue  } from "firebase/database";
import { getAuth } from 'firebase/auth'
export const state = () => ({
    movies: null,
    watchedMovies: null,
    size: 5,
    pageNumber: 0,
    active: false,
    sortedMovies: []
})
export const getters = {
    pageCount(state){
        let l = state.movies ? state.movies.length : 0; 
        let s = state.size;
        return Math.ceil(l/s)
    },
    sliceSortedMovies(state){
        return state.sortedMovies
    },
    sliceMovies: (state) => {
        const start = state.pageNumber * state.size
        const end = start + state.size
        return state.movies ? state.movies.slice(start,end): state.movies
    },
    pageNum(state){
        return state.pageNumber
    },
    watchMovies(state){
        return state.watchedMovies 
    },
}
export const actions = {
    async fetchCur(ctx){
        const db = getDatabase();
        const auth = getAuth();
        const id = auth.currentUser.uid;
        const starCountRef = ref(db, '/users/' + id + '/' + '/movies/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
                ctx.commit('showMovies',  Object.entries(data))
            }
            
        });
    },
    async fetchWatched(ctx){
        const db = getDatabase();
        const auth = getAuth();
        const id = auth.currentUser.uid;
        const starCountRef = ref(db, '/users/' + id + '/' + '/WatchedMovies/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            ctx.commit('showWatchMovies', data)
        });
    }
}
export const mutations = {
    showMovies(state, films){
        state.movies = films
    },
    sortedRatingMovies(state, option){
        state.movies = state.movies.sort((post1,post2)=>{
            return post2[1][option.value] - post1[1][option.value] 
        })  
    },
    sortedNameMovies(state, option){
        state.movies = state.movies.sort((post1,post2)=>{
            return post1[1][option.value]?.localeCompare(post2[1][option.value])
        })
    },
    showWatchMovies(state, films){
        state.watchedMovies = films
    },
    pageCur(state,id){
        state.pageNumber = id-1
    },
    sortedCheckMovies(state, films){
        state.sortedMovies = films
    },
    nullSortedCheckMovies(state){
        state.sortedMovies = []
    },
    deletMovie(state,movie){
        const db = getDatabase();
        const auth = getAuth();
        const id = auth.currentUser.uid;
        state.movies = state.movies.filter(m => m[0] !== movie[0])  
        const updates = {} 
        updates['/users/' + id + '/' + '/movies/' + movie[1].id + '/'] = null
        return update(ref(db), updates);  
        
    }
}
