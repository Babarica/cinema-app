<template>
    <div class="movie-select">
        <p class="title" :class="{active: areOptionsVisible}" @click="areOptionsVisible = !areOptionsVisible">{{selectedSort}}</p>
        <div v-if="areOptionsVisible" class="options">
            <p @click="selectOption(option)" class="option" v-for="option in options"  :key="option.value">{{option.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: ()=> []
        },
        selectedSort: {
            Type: String,
            default: ''
        }
    },
    data() {
        return {
            areOptionsVisible: false
        }
    },
    methods: {
        selectOption(option){
            this.$emit('select', option)
            this.areOptionsVisible = false
        },
        hideSelected(){
            this.areOptionsVisible = false
        }
    },
    mounted(){
        document.addEventListener('click', this.hideSelected.bind(this), true)
    },
    beforeDestroy(){
        document.removeEventListener('click', this.hideSelected)
    }
}
</script>

<style scoped>
    p {
        margin: 0;
    }
    .options {
        border: 1px solid #EB315E;
        position: absolute;
        top: 10px;
        right: 2px;
        width: 164px;
        text-align: center;
        font-family: 'Rufina', sans-serif;
        font-weight: 100;
        border-radius: 0px 0px 20px 20px;
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 17px;
        z-index: 7;
        background: #fff;
    }
    .option {
        padding: 5px;
        color: black;
        cursor: pointer;
    }
    .option:hover {
        background:#EB315E;
        color: #ffff;
    }
    .option:first-child {
        border: none;
        margin-top: 25px;
    }
    .option:last-child {
        border-radius: 0px 0px 17px 17px;
    }
    .movie-select {
        position: relative;
        width: 170px;
    }
    .title {
        padding: 7px 20px;
        background: #EB315E;
        border-radius: 17px;
        position: relative;
        z-index: 9;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        position: relative;
        color: #ffff;
    }
    .title::after {
        position: absolute;
        content: '';
        display: block;
        width: 14px;
        height: 10px;
        background: url('~/static/images/filter.png');
        background-repeat: no-repeat;
        right: 14px;
        transition: all 0.2s ease-in-out;
        top: 33%;
    }
    .title.active::after {
        transform: rotate(180deg);
    }
    @media(max-width: 362px){
        .movie-select {
            width: 150px;
        }   
        .options {
            right: 2px;
            width: 144px;
        }
    }
</style>