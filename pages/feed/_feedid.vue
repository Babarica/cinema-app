<template>
    <div class="feed">
        <navbar />
        <vcontainer>
            <div class="scroll" :class="{show:isActive}">
                <p class="scroll-text">Вверх</p>
                <div id="toTop" @click="toTop(step)"></div>
            </div>
           <div class="feed-inner">
                <div class="feed-nav">
                    <h1 class="feed-title">
                        Каталог фильмов
                    </h1>
                    <div class="feed-group" :class="{bactive: ganrOn}">
                        <p class="feed-text" :class="{bactive: ganrOn}" @click="()=>ganrOn ? ganrOn = false : ganrOn = true">Жанры</p>
                        <SelectSome
                        v-show="ganrOn"
                        :selectedSort="selectedGanr"
                        :options="sortOptionsGenre"
                        @select="optionName"/>
                    </div>
                    <div class="feed-group" :class="{bactive: countOn}">
                        <p class="feed-text" :class="{bactive: countOn}" @click="()=>countOn ? countOn = false : countOn = true">Страны</p>
                        <SelectSome
                        v-show="countOn"
                        :selectedSort="selectedCount"
                        :options="sortOptionsCount" 
                        @select="optionName"/>
                    </div>
                    <div class="feed-group" :class="{bactive: type}">
                        <p class="feed-text" :class="{bactive: type}" @click="()=>type ? type = false : type = true">Тип</p>
                        <div v-show="type" class="feed-group__type">
                            <button @click="chooseType" disabled class="feed-type">Все</button>
                            <button @click="chooseType" class="feed-type">Фильм</button>
                            <button @click="chooseType" class="feed-type">Сериал</button>
                            <button @click="chooseType" class="feed-type">Мини сериал</button>  
                        </div>  
                    </div>
                    <div class="feed-group" :class="{bactive: rate}">
                        <p class="feed-text" :class="{bactive: rate}" type @click="()=>rate ? rate = false : rate = true">Рейтинг</p>
                        <div v-show="rate" class="feed-group__rate">
                            <vue-slider
                            :tooltip-style="{ backgroundColor: '#EB315E', borderColor: '#EB315E'}" 
                            :process-style="{ backgroundColor: '#EB315E' }" 
                            v-model="value" 
                            :min="min" 
                            :max="max" 
                            :enable-cross="false">
                            </vue-slider>
                            <div class="feed-group__inner">
                                <div class="feed-group__from">
                                    <p class="feed-group__text">от</p>
                                    <input class="feed-group__inpt" @focusout="handleFocusoutMin" type="number" min="1" v-model.number="value[0]">
                                </div>
                                <div class="feed-group__before">
                                    <p class="feed-group__text">до</p>
                                    <input class="feed-group__inpt" @focusout="handleFocusoutMax" type="number" v-model.number="value[1]">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="feed-group" :class="{bactive: year}">
                        <p class="feed-text" :class="{bactive: year}" @click="()=>year ? year = false : year = true">Год</p>
                        <div v-show="year" class="feed-group__rate">
                            <vue-slider :tooltip-style="{ backgroundColor: '#EB315E', borderColor: '#EB315E'}" :process-style="{ backgroundColor: '#EB315E' }" v-model="years" :min="minY" :max="maxY" :enable-cross="false"></vue-slider>
                            <div class="feed-group__inner">
                                <div class="feed-group__from">
                                    <p class="feed-group__text">от</p>
                                    <input class="feed-group__inpt" type="number" min="1" v-model.number="years[0]">
                                </div>
                                <div class="feed-group__before">
                                    <p class="feed-group__text">до</p>
                                    <input class="feed-group__inpt" type="number" v-model.number="years[1]">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button @click.prevent="sortInput" class="feed-btn">Применить</button>
                    <button @click.prevent="defaultInput" class="feed-btn__default">Сброс</button>
                </div>
                <div class="feed-block">
                    <div class="sort-block">
                        <p class="sort-text">
                            сортировать по
                        </p>
                        <movie-select :selectedSort="selectedSort" :options="sortOptions" @select="optionSelect"></movie-select>
                    </div>
                    <div class="feed-movie__nav">
                        <a  @click="switchElems" class="feed-nav__line cactive"></a>
                        <a  @click="switchElems" class="feed-nav__block"></a>
                    </div>
                    <loading v-if="$fetchState.pending"></loading>
                    <div v-else class="feed-movies" v-show="block">
                        <div v-for="movie in this.movies" :key="movie.id">
                            <movie-with-add :movie="movie" />
                        </div>
                    </div>
                    <div class="feed-movies__lines" v-show="!block">
                        <div class="feed-movies__block" v-for="movie in this.movies" :key="movie.id">
                            <movie-line :movie="movie"></movie-line>
                        </div>
                    </div>
                </div>
           </div>
           <loading v-if="this.pages < this.total"></loading>
            <div ref="observer" class="observer"></div>
        </vcontainer>
        <mobile-nav></mobile-nav>
    </div>
</template>
<script>


export default {
    data(){
        return {
            rangeRate: 0,
            movies: [],
            total: null,
            chMovies: [],
            block: true,
            ganres: null,
            ganrOn: true,
            countOn: true,
            type: true,
            rate: false,
            year: false,
            movieType: 'ALL',
            selectedGanr: 'Все жанры',
            selectedGanrCount: null,
            selectedCount: 'Все страны',
            selectedCountCountrie: null,
            selectedSort: 'По умолчанию',
            sortOptions: [
                {value: 'date', name: "По дате"},
                {value: 'rating', name: "По рейтингу"},
                {value: 'popular', name: "По популярности"}
            ],
            sortOptionsGenre: [], 
            sortOptionsCount: [],
            isActive: false,
            sortedMovies: [],
            pages: 0,
            value: [1,10],
            years: [1900, 2022],
            minY: 1900,
            maxY: 2023,
            max: 10,
            min: 1,
            order: "NUM_VOTE",
        }
    },  
    props: {
        step:{   
            type: Number,
            default: 90 
        }
    },
    async fetch(){
        await this.sortInput(this.$route.params.feedid)
        await this.getSomeInfo()
    },
    mounted(){
        // Якорь
        window.addEventListener('scroll', this.handleScroll)
        // dynamic pagination
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.pages < this.total){
                this.loadMoreMovies()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    methods: { 
        switchElems(e){
            
            const block = document.querySelector('.feed-nav__block')
            const lines = document.querySelector('.feed-nav__line')
            if(e.srcElement.classList[0] == 'feed-nav__line'){
                    lines.classList.remove('cactive')
                    block.classList.add('cactive')
                    this.block = false
            }
            if(e.srcElement.classList[0] == 'feed-nav__block'){
                    block.classList.remove('cactive')
                    lines.classList.add('cactive')
                    this.block = true
            }
        },
        defaultInput(){
            this.selectedGanr =  'Все жанры';
            this.movieType = 'ALL';
            const types = document.querySelectorAll(".feed-type");
            types.forEach(el => el.disabled = false)
            this.selectedGanrCount =  null;
            this.selectedCount = 'Все страны';
            this.selectedCountCountrie =  null;
            this.value[0] = 1;
            this.value[1] = 10;
            this.years[0] = 1900;
            this.years[1] = 2023;
        },
        handleFocusoutMin(e){
            if(e.target.value == ''){
                this.value[0] = 1
            }
        },
        handleFocusoutMax(e){
            if(e.target.value == ''){
                this.value[1] = 10
            }
        },
        async sortInput(category){
            let cat = null
            if(typeof category === "string"){
                cat = category
            }
            else {
                cat = this.movieType
            }
            this.pages = 1
            let ganr = this.selectedGanrCount
            let countrie = this.selectedCountCountrie
            if(this.selectedGanr === 'Все жанры'){
                ganr = null
            }
            if(this.selectedCount === 'Все страны'){
                countrie = null
            }
            const result = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
                params: {
                    countries: countrie,
                    genres: ganr,
                    type: cat,
                    ratingFrom: this.value[0],
                    ratingTo: this.value[1],
                    yearFrom: this.years[0],
                    yearTo: this.years[1],
                    page: this.pages,
                    order: this.order,
                }
            });
            const resultFilter = await result
            this.total = resultFilter.totalPages
            this.movies = resultFilter.items
        },
        chooseType(e){
            const types = document.querySelectorAll(".feed-type");
            if(e.target.textContent === "Фильм"){
                this.movieType = 'FILM'
                types.forEach(el => el.disabled = false)
                e.target.disabled = true
            }
            else if(e.target.textContent === "Все"){
                this.movieType = 'ALL'
                types.forEach(el => el.disabled = false)
                e.target.disabled = true
            }
            else if(e.target.textContent === "Сериал"){
                this.movieType = 'TV_SERIES'
                types.forEach(el => el.disabled = false)
                e.target.disabled = true
            }
            else {
                this.movieType = 'MINI_SERIES'
                types.forEach(el => el.disabled = false)
                e.target.disabled = true
            }
        },  
        async getSomeInfo(){
            const filters = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
            });
            const resultTop = await filters
            this.sortOptionsGenre = resultTop.genres
            this.sortOptionsCount = resultTop.countries

        },
        handleScroll (e) {
            if (document.documentElement.scrollTop > 500) {
                this.isActive = true
            } else {
                this.isActive = false
            }
        },
        toTop(step){
        // Параметр step представляет величину временного интервала, чтобы контролировать скорость
        // Вам нужно сбросить таймер, когда вы вернетесь в начало страницы
            document.documentElement.scrollTop-=step;
            if (document.documentElement.scrollTop>0) {
                var time=setTimeout(()=>this.toTop(step),15);
            }else {
                clearTimeout(time);
            }
        },
        async loadMoreMovies(){
            let ganr = this.selectedGanrCount
            let countrie = this.selectedCountCountrie
            if(this.selectedGanr === 'Все жанры'){
                ganr = null
            }
            if(this.selectedCount === 'Все страны'){
                countrie = null
            }
            this.pages += 1
            const top = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?`,{
                headers: {
                    'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
                    'Content-Type': 'application/json',
                },
                params: {
                    countries: countrie,
                    genres: ganr,
                    type: this.movieType,
                    ratingFrom: this.min,
                    ratingFrom: this.value[0],
                    ratingTo: this.value[1],
                    yearFrom: this.years[0],
                    yearTo: this.years[1],
                    page: this.pages,
                    order: this.order,
                }
            }).catch((error)=>console.error(error))
            const resultTop = await top
            this.movies = [...this.movies, ...resultTop.items]
        },
        optionName(option){
            if(option.genre){
                this.selectedGanrCount = option.id
                this.selectedGanr = option.genre
            }
            else {
                this.selectedCountCountrie = option.id
                this.selectedCount = option.country
            }
        },  
        async optionSelect(option){
            this.selectedSort = option.name
            if(option.value == "rating"){
                if(this.movies){
                    this.order = "RATING";
                    await this.sortInput();
                }       
            }
            else if(option.value == "date"){
                if(this.movies){
                    this.order = "YEAR";
                    await this.sortInput();
                }       
            }
            else if(option.value == "popular"){
                if(this.movies){
                    this.order = "NUM_VOTE";
                    await this.sortInput();
                }
            }
        },
    }
}
</script>
<style scope>
    .feed-nav {
        display: flex;
        flex-direction: column;
        max-width: 180px;
        width: 100%;
    }
    .feed-block {
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .feed-movies__block {
        max-width: 768px;
        width: 100%;
    }
    .feed-group__inner {
        display: flex;
        justify-content: space-between;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
    .feed-movies__lines {
        display: flex;
        flex-direction: column;
        margin-top: 24px;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        padding-left: 24px;
    }
    .cactive {
        opacity: 20%;
    }
    .feed-movie__nav {
        display: flex;
        align-items: center;
        align-self: flex-end;
        margin-top: 29px;
    }
    .feed-nav__block {
        width: 30px;
        height: 30px;
        background: url(~/static/images/navFilter/sqware.svg) no-repeat;
        background-position: center;
        cursor: pointer;
    }
    .feed-nav__line {
        width: 30px;
        height: 30px;
        background: url(~/static/images/navFilter/lines.svg) no-repeat;
        background-position: center;
        cursor: pointer;
        margin-right: 8px;
    }
    .feed-group__inpt {
        max-width: 78px;
        border-radius: 3px;
        border: 1px solid #C7C7C7;
        padding: 5px 0px 3px 7px;
    }
    .feed-group__inpt:focus {
        outline: none;
    }
    .feed-inner {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .feed-btn {
        padding: 10px 55px;
        background-color: #EB315E;
        border: none;
        border-radius: 3px;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        margin-bottom: 10px;
        cursor: pointer;
        color: #FFFFFF;
    }
    .feed-btn__default {
        padding: 10px 71px;
        border: 1px solid #C7C7C7;
        background: none;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 12px;
        line-height: 15px;
        cursor: pointer;
    }
    .feed-group__inner {
        margin-top: 7px;
    }
    .scroll-text {
        position: fixed;
        top: 20px;
        left: 60px;
        opacity: 40%;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 15px;
        color: #EB315E;
    }
    .sort-block {
        display: flex;
        align-items: center;
        align-self: flex-end;
    }
    .feed-type {
        border: none;
        background: none;
        padding: 5px 9px;
        background-color: #EB315E;
        border-radius: 10px;
        cursor: pointer;
        color: #fff;
    }
    .feed-type:disabled {
        opacity: 0.6;
        cursor: inherit;
    }
    .feed-title {
        font-family: 'Rufina', sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 19px;
    }
    .feed-text {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 13px;
        padding-left: 23px;
        position: relative;
        cursor: pointer;
    }
    .feed-text::after {
        content: "";
        display: block;
        width: 13px;
        height: 10px;
        left: 0;
        position: absolute;
        top: 20%;
        background: url(~/static/images/arrow-up.png) no-repeat;
        background-position: center center;
    }
    .feed-group.bactive {
        margin-bottom: 12px;
    }
    .feed-text.bactive::after {
        transform: rotate(180deg);
    }
    
    .feed-group__type {
        display: flex;
        flex-wrap: wrap;
        gap: 12px 14px;
    }
    .sort-text {
        margin-right: 9px;
        font-family: 'Rufina', sans-serif;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }
    .scroll-text::after {
        position: absolute;
        display:block;
        width: 40px;
        height: 40px;
        left: -33px;
        top: -13px;
        background: url('~/static/images/up-arrow.svg') no-repeat center;
        content: '';
    }
    .scroll {
        opacity: 0;
        cursor: initial;
        display: none;
    }
    .scroll.show {
        opacity: 1;
        cursor: pointer;
        display: block;
        transition: all 0.3s ease-in-out;
    }
    .feed-movies {
        display: flex;
        flex-wrap: wrap;
        gap: 40px 40px;
        margin-top: 37px;
        justify-content: center;
    }
    .feed {
        padding: 26px 0px 68px 0px;
        position: relative;
    }
    .observer {
        height: 38px;
    }
    #toTop {
        padding-right: 50px;
        width: 100px;
        height: 100%;
        display: flex;
        background-position: center;
        background-repeat: no-repeat;
        position: fixed;
        top: 0;
        left: 0;
    }
    #toTop:hover {
        background-color: #EB315E;
        opacity: 20%;
        transition: background-color 0.3s ease-in-out;
    }
    @media(max-width: 920px){
        .feed-movie__nav {
            display: none;
        }
    }
    @media(max-width: 560px){
        .feed-inner {
            flex-direction: column;
        }
        .feed-nav {
            margin: 0 auto;
        }
        .sort-block {
            align-self: center;
        }
        .feed-block {
            margin-top: 30px;
        }
    }
</style>