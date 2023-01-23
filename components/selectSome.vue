<template>
    <div class="movie-select">
        <p class="title" :class="{active: areOptionsVisible}"  @click="turnOn">{{selectedSort}}</p>
        <div v-if="areOptionsVisible" class="options">
            <p @click="selectOption(option)" class="option" v-for="option in options"  :key="option.id">{{option.genre || option.country}}</p>
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
        turnOn(){
            if(this.areOptionsVisible === true){
                this.areOptionsVisible = false
            }
            else {
                this.areOptionsVisible = true
            }
        },
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
        box-shadow: 0 2px 6px 1px #C7C7C7;
        position: absolute;
        top: 40px;
        right: -1px;
        width: 180px;
        text-align: center;
        font-family: 'Rufina', sans-serif;
        font-weight: 100;
        border-radius: 0px 0px 0px;
        font-size: 14px;
        margin-bottom: 10px;
        line-height: 17px;
        max-height: 200px;
        border-radius: 3px;
        overflow-y: auto;
        z-index: 90;
        background: #fff;
    }
    .option {
        padding: 5px;
        color: black;
        cursor: pointer;
        z-index: 2;
    }
    .option:hover {
        background:#EB315E;
        color: #ffff;
    }
    .option:last-child {
        border-radius: 0px 0px 17px 17px;
    }
    .movie-select {
        position: relative;
        width: 180px;
    }
    .title {
        padding: 11px 103px 9px 13px;
        border: 1px solid #C7C7C7;
        border-radius: 3px;
        z-index: 3;
        font-family: 'Rufina', sans-serif;
        white-space: nowrap;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        cursor: pointer;
        position: relative;
        
    }
    .title::after {
        position: absolute;
        content: '';
        display: block;
        width: 14px;
        height: 10px;
        background: url('~/static/images/arrow-down.svg');
        background-position: center;
        background-repeat: no-repeat;
        right: 14px;
        top: 33%;
    }
    .title.active::after {
        transform: rotate(180deg);
    }
</style>