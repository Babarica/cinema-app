<template>
    <div>
        <p v-if="this.movieFacts.length === 0" class="no-facts">Фактов нет</p>
        <div v-else class="facts">
            <loading v-if="$fetchState.pending"></loading>
            <div v-else v-for="fact in this.some" :key="fact.id">
                <p class="fact" v-html="fact.text"></p>
            </div>
            <a v-show="movieFacts.length > 5" @click="()=>{this.some = [...this.movieFacts]; this.active = true}" :class="{active: active}" class="show-facts">Показать все</a>
        </div>
    </div>
    
    
</template>


<script>
export default {
    data(){
        return {
            movieFacts: [],
            some: [],
            active: false,
        }
    },
    props: {
            movie: {
                type: Number,
                required: false
            },
        },
    async fetch(){
        await this.getFacts()
    },
    methods: {
        async getFacts(){
            const facts = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.movie}/facts`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const movieBacts = await facts
            const movieItems = movieBacts.items 
            for(let i = 0; i<movieItems.length; ++i){
                let text = movieItems[i].text;
                text = text.split('/')
                for(let j = 0; j<text.length; j++){
                    if(text[j] === "name"){
                        text[j] = "actor"
                    } 
                    if(text[j] === "film"){
                        text[j] = "movie"
                    }
                }
                text = text.join('/')
                movieItems[i].text = text
            }
            this.movieFacts = movieItems   
            this.some = [...movieItems].splice(0,5)
        }
    }
}
</script>

<style scoped>
    .no-facts {
        text-align: center;
        padding-top: 60px;
        font-size: 18px;
        font-family: 'Rufina', sans-serif;
    }
    .facts {
        margin-top: 20px;
    }
    .fact {
        margin-top: 10px;
        display: block;
        box-shadow: 0px 0px 2px #695050;
        padding: 15px;
        border-radius: 4px;
    }
    .show-facts {
        text-align: center;
        display: block;
        margin-top: 10px;
        color: #EB315E;
        cursor: pointer;
    }
    .fact ::v-deep .all {
        color: #EB315E;
        text-decoration: none;
    }
    .active {
        display: none;
    }
</style>