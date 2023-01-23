<template>
    <div>
        <loading v-if="$fetchState.pending"></loading>
        <div v-else>
            <div class="null-list" v-if="this.$store.state.profile.watchedMovies == undefined || null"></div>
            <div v-else class="carousel-inner" @mouseenter="someMore" @mouseleave="someSmall">
                <h2 class="profile-title">Просмотренные</h2>
                <div class="wrapper">
                    <div class="carousel" :style="{ 'margin-left': '-' + (106 * currentSlideIndex) + '%' }">
                        <watched-slider-item class="carousel-watched" :watch="watch" v-for="watch in this.$store.state.profile.watchedMovies" :key="watch.id"></watched-slider-item>
                    </div>
                </div>
                <button class="carousel-prev" @click="prevSlide"></button>
                <button class="carousel-next" @click="nextSlide"></button>
            </div>
        </div>
        
    </div>
    
</template>


<script>
export default {
    data() {
        return {
            currentSlideIndex: 0,
        }
    },
    async fetch(){
        this.$store.dispatch('profile/fetchWatched')
  },    
  methods: {
    someMore(){
        document.querySelector('.carousel-prev').classList.add('active')
        document.querySelector('.carousel-next').classList.add('active')
    },
     someSmall(){
        document.querySelector('.carousel-prev').classList.remove('active')
        document.querySelector('.carousel-next').classList.remove('active')
    },
    prevSlide(){
        if(this.currentSlideIndex >0){
            this.currentSlideIndex--
        }
    },
    nextSlide(){
        if(this.currentSlideIndex >= Object.entries(this.$store.state.profile.watchedMovies).length -5){
            this.currentSlideIndex = 0
        }
        else {
            this.currentSlideIndex++
        }
        
    }
  }
}
</script>

<style scoped>
    .null-list {
        text-align: center;
        font-family: 'Rufina',sans-serif;
        font-weight: 400;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 31px;
    }
    .carousel-inner {
        position: relative;
    }
    .profile-title {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 34px;
        margin-bottom: 40px;
    }
    .carousel-next {
        position: absolute;
        right: 0;
        top: 50%;
        background: none;
        border: none;
        width: 50px;
        height: 50px;
        background-image: url('~/static/images/slider/right.png');
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }
    .carousel-prev {
        position: absolute;
        left: 0;
        top: 50%;
        background: none;
        border: none;
        width: 50px;
        height: 50px;
        background-image: url('~/static/images/slider/left.png');
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }
    .wrapper {
        max-width: 1036px;
        overflow: hidden;
        margin: 0 auto;
    }
    .carousel {
        display: flex;
        transition: all ease .5s;
    }
    .carousel-watched {
        margin-right: 60px;
    }
    
    .active {
        opacity: 1;
    }
</style>


</style>