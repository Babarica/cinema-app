<template>
    <div class="back" @click="goToPrev()">Назад</div>
</template>


<script>
export default {
    methods: {
        goToPrev(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .back {
        padding: 10px;
        background: #EB315E;
        border-radius: 4px;
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        color: #FFFFFF;
        max-width: 50px;
        text-align: center;
        margin-top: 40px;
        cursor: pointer;
    }
</style>