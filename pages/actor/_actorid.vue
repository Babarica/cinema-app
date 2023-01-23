<template>
    <transition name="test" mode="out-in">
            <section class="actor">
            <navbar></navbar>
            <vcontainer>
                <back></back>
                <loading v-if="$fetchState.pending"></loading>
                <div v-else class="actor-inner">
                    <img class="actor-image" :src="this.actor.posterUrl" alt="actor">
                    <div class="actor-box">
                        <h2 class="actor-title">{{this.actor.nameRu}}</h2>
                        <table class="actor-data">
                            <tr>
                                <td class="actor-about">Карьера:</td>
                                <td class="actor-info">{{this.actor.profession}}</td>
                            </tr>
                            <tr>
                                <td class="actor-about">Рост:</td>
                                <td class="actor-info" v-if="this.actor.growth !== 0">{{this.actor.growth}} см</td>
                                <td class="actor-info" v-else>Неизвестен</td>
                            </tr>
                            <tr>
                                <td class="actor-about">Дата рождения:</td>
                                <td class="actor-info" v-if="this.actor.birthday">{{this.actor.birthday.split('-').reverse().join('.')}}.г</td>
                                <td class="actor-info" v-else>-</td>
                            </tr>
                            <tr>
                                <td class="actor-about">Место рождения:</td>
                                <td class="actor-info" v-if="this.actor.birthplace">{{this.actor.birthplace}}</td>
                                <td class="actor-info" v-else>-</td>
                            </tr>
                            <tr>
                                <td class="actor-about">Всего фильмов:</td>
                                <td class="actor-info">{{this.actor.films.length}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </vcontainer>
            <mobile-nav></mobile-nav>
        </section>
    </transition>
</template>


<script>
export default {
    data(){
        return {
            actor: null,
            movies: null
        }
    },
    async fetch(){
        await this.getActorInfo()
    },
    methods: {
        async getActorInfo(){
            const data = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v1/staff/${this.$route.params.actorid}`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            })
            const result = await data
            this.actor = result 
        }
    }
}
</script>

<style scoped>
    .actor {
        padding: 26px 0px 68px 0px;
    }
    .actor-inner {
        margin-top: 100px;
        display: flex;
    }
    .actor-image {
        border-radius: 12px;
        width: 250px;
        height: 400px;
    }
    .test-enter-active,
    .test-leave-active {
    transition: opacity 0.5s ease;
    }

    .test-enter-from,
    .test-leave-to {
    opacity: 0;
    }
    .actor-box {
        margin-left: 70px;
    }
    .actor-title {
        font-family: 'Rufina', sans-serif;
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        margin-bottom: 47px;
    }
    tr {
        border-bottom: 0.8px solid black;
    }
    tr:hover {
        background-color: #EB315E;
        border: none;
        color: #fff;
        transition: all 0.3s ease;
    }
    tr:last-child {
        border: none;
    }
    .actor-about {
        padding: 27px 140px 24px 40px;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
    }
    .actor-info {
        padding: 27px 100px 24px 0px;
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }
    @media(max-width: 950px){
            .actor-inner {
                flex-direction: column;
            }
            .actor-image {
                margin: 0 auto;
            }
            .actor-title {
                text-align: center;
            }
            .actor-box {
                margin: 0 auto;
            }
            .actor-info {
                padding-right: 50px;
            }
            .actor-about {
                padding-right: 50px;
            }
    }
    @media(max-width: 360px){
        .actor-info {
            padding: 20px;
        }
        .actor-about {
            padding: 20px;
        }
    }
</style>