<template>
    <div>
        <p class="no-review" v-if="this.movieRevies.length === 0">Нет рецензий</p>
        <div v-else class="reviews">
            <loading v-if="$fetchState.pending"></loading>
            <div class="review" v-else v-for="(review, index) in this.some" :index="index" :key="review.id">
                <div class="image-nav">
                    <p class="user-name">{{review.author}}</p>
                    <img class="user-image" src="~/static/images/navbar/user_profile.jpg" alt="">
                </div>
                <div class="review-text">
                    <p class="review-title">{{review.title}}</p>
                    <p class="review-description" v-html="review.description"></p>
                    <a class="review-show" @click="showDescr(index)">показать еще</a>
                </div>
                <div class="review-rating">
                    <div class="review-rating__nav">
                        <div class="review-score">
                            <p class="review-pos">{{review.positiveRating}}</p>
                            <p class="review-neg">{{review.negativeRating}}</p>
                        </div>
                        <p class="review-rating__grade">
                            {{review.type === "POSITIVE" ? "Позитивный" : "Негативный"}}
                        </p>
                    </div>
                    
                </div>
            </div>
            <a v-show="movieRevies.length > 5" @click="()=>{this.some = [...this.movieRevies]; this.bactive = true}" :class="{bactive: bactive}" class="show-facts">Показать все</a>
        </div>
    </div>
</template>


<script>
export default {
    data(){
    return {
            movieRevies: [],
            some: [],
            active: false,
            bactive: false
        }
    },
    props: {
            movie: {
                type: Number,
                required: false
            },
        },
    async fetch(){
        await this.getReviews()
    },
    methods: {
        showDescr(id){
            const reviews = document.querySelectorAll('.review-description')
            const shows = document.querySelectorAll('.review-show')
            shows[id].classList.add('bactive')
            reviews[id].classList.add('active')
        },
        async getReviews(){
            const reviews = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${this.movie}/reviews`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const movieReviews = await reviews
            const movieItems = movieReviews.items
            this.movieRevies = movieReviews.items
            this.some = [...movieItems].splice(0,5)
        }
    }
}
</script>

<style scoped>
    .no-review {
        display: block;
        text-align: center;
        padding-top: 60px;
        font-size: 18px;
        font-family: 'Rufina', sans-serif;
    }
    .user-image {
        max-width: 183px;
        max-height: 234px;
    }
    .review-show {
        font-size: 13px;
        font-family: "Rufina", sans-serif;
        color: #EB315E;
        font-weight: 100;
        cursor: pointer;
    }
    .review {
        display: flex;
        margin-top: 15px;
        padding: 16px 100px 40px 63px;
        background: #EDEDED;
    }
    .review-description {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #797979;
        max-height: 249px;
        overflow: hidden;
        
    }

    .reviews {
        margin-top: 20px;
    }
    .review-rating {
        margin-left: 24px;
    }
    .review-score {
        display: flex;
        gap: 20px;
        justify-content: center;
        margin-bottom: 10px;
    }
    .review-title {
        margin-bottom: 10px;
        font-family: "Rufina", sans-serif;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
    }
    .user-name {
        margin-bottom: 6px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
    }
    .image-nav {
        margin-right: 55px;
        text-align: center;
    }
    .review-pos {
        color: rgb(34, 190, 34);
    }
    .review-neg {
        color: rgb(231, 67, 67);
    }
    .bactive {
        display: none;
    }
    .show-facts {
        text-align: center;
        display: block;
        margin-top: 10px;
        color: #EB315E;
        cursor: pointer;
    }
    .active {
        text-overflow: inherit;
        max-height: none;
    }
    .bactive {
        display: none;
    }
    @media(max-width: 920px){
        .review {
            padding: 16px 20px 40px 20px;
        }
    }
    @media(max-width: 620px){
        .review {
            flex-direction: column;
        }
        .review-rating {
            order: 2;
        }
        .review-text {
            order: 3;
        }
        .review-rating {
            margin-left: 0;
        }
        .image-nav {
            margin-right: 0;
        }
        .review-title {
            margin-top: 10px;
        }
        .review-rating {
            margin-top: 10px;
        }
        .review-description {
            max-height: 95px;
        }
        .active {
            text-overflow: inherit;
            max-height: none;
        }
        .review-rating__nav {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }
    }
</style>