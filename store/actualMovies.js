
export const state = () => ({
    newFilms: null
})
export const getters = {
    movieActual(state){
        return state.newFilms
    }
}
export const actions = {
}
export const mutations = {
    showNewFilms(state, films){
        state.newFilms = films
    },
}
