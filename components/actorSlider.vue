<template>
    <div class="carousel-inner" @mouseenter="someMore" @mouseleave="someSmall">
        <div class="wrapper">
            <div class="carousel" :style="{ 'margin-left': '-' + (106 * currentSlideIndex) + '%' }">
                <actor-slider-item class="carousel-actor" :actor="actor" v-for="actor in actors" :key="actor.id">
                </actor-slider-item>
            </div>
        </div>
        <button class="carousel-prev" @click="prevSlide"></button>
        <button class="carousel-next" @click="nextSlide"></button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlideIndex: 0,
    }
  },
  props: {
    actors: {
        type: Array,
        required: true
    }
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
        if(this.currentSlideIndex >= this.actors.length - 9){
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
    .carousel-inner {
        position: relative;
    }
    .carousel-next {
        position: absolute;
        right: 0;
        top: 37%;
        background: none;
        border: none;
        width: 50px;
        height: 50px;
        background-image: url('~/static/images/slider/right.png');
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        opacity: 0;
        transition: 0.3s all ease-in-out;
    }
    .carousel-prev {
        position: absolute;
        left: 0;
        top: 37%;
        background: none;
        border: none;
        width: 50px;
        height: 50px;
        background-image: url('~/static/images/slider/left.png');
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
        opacity: 0;
        transition: 0.3s all ease-in-out;
    }
    .active {
        opacity: 1;
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
    .carousel-actor {
        margin-right: 60px;
    }
    @media(max-width: 620px){
        .carousel-prev {
            opacity: 1;
            bottom: -60px;
            top: inherit;
        }
        .carousel-next {
            opacity: 1;
            bottom: -60px;
            top: inherit;
        }
    }
</style>
