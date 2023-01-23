import { getAuth } from 'firebase/auth'
export const state = () => ({
    uid: null,
    filmName: null,
    resultFilm: null,
    mobile: false,
})
export const getters = {
    movieDate(state){
        return state.resultFilm
    },
    mobileModal(state){
        return state.mobile
    }
}
export const actions = {
}
export const mutations = {
    saveUid(state){
        const auth = getAuth();
        const user = auth.currentUser.uid;
        state.uid = user
    },
    saveCurUid(state, uid){
        state.uid = uid
    },
    toggleMobile(state){
        if(state.mobile){
            state.mobile = false
        }
        else {
            state.mobile = true
        }
    },
    saveCurKid(state, name){
        state.filmName = name
    },
    getMovies(state, movies){
        state.resultFilm = movies
    }

}
