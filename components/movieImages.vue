<template>
    <div>
        <p v-if="this.movieImages.length === 0" class="no-images">Нет изображений</p>
        <div v-else class="images">
            <loading v-if="$fetchState.pending"></loading>
            <div v-else v-for="image in this.movieImages" :key="image.id">
                <img class="image" :src="image.imageUrl" alt="">
            </div>
        </div>
    </div>
</template>


<script>
export default {
data(){
    return {
            movieImages: []
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
            const images = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.movie}/images`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const movieImages = await images
            this.movieImages = movieImages.items
        }
    }
}
</script>

<style scoped>
.no-images {
    text-align: center;
    padding-top: 60px;
    font-size: 18px;
    font-family: 'Rufina', sans-serif;
}
.images {
    display: flex;
    gap: 10px 10px;
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center;
}
.image {
    max-width: 200px;
    max-height: 200px;
}
@media(max-width: 920px){
    .images {
        justify-content: center;
    }
}

</style>