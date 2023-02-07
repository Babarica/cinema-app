<template>
  <div class="index">
    <navbar />
    <mobile-nav></mobile-nav>
    <div class="preview">
      <vcontainer>
        <div class="preview-inner">
          <h1 class="preview-title">Каталог фильмов</h1>
          <p class="preview-description">программа помогающая найти фильм для хорошего вечера</p>
          <NuxtLink class="preview-btn" to="/feed">Найти фильм</NuxtLink>
        </div>
      </vcontainer>
    </div>
    
    <new-films></new-films>
    <recomend-films></recomend-films>
    <main-footer></main-footer>
    
  </div>
</template>

<script>
import mobileNav from '~/components/mobileNav.vue';


export default {
  components: { mobileNav },
  data(){
    return {
      newFilms: [],
    }
  },
  async fetch(){
    await this.getMovies()
  },
  methods: {
    async getMovies(){
      var now = new Date();
      const year = now.getFullYear()
      let mothnes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const month = mothnes[now.getMonth()]
      const data = this.$axios.$get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${year}&month=${month}`,{
        headers: {
            'X-API-KEY': 'ca3c2af1-471d-47a8-8494-92c7e76804f5',
            'Content-Type': 'application/json',
        },
      }).catch(err=> {
        console.log(err.response)
      })
      const result = await data
      const randomNew = this.getRandomValues(30,5)
      for(let j = 0; j<5; j++){
        this.newFilms.push(result.items[randomNew[j]])
      }
      this.$store.commit('actualMovies/showNewFilms',  this.newFilms)
      
    },
    getRandomValues(range,count){
      let m = {};
      let a = [];
      for (let i = 0; i < count; ++i) {
        let r = Math.floor(Math.random() * (range - i));
        a.push(((r in m) ? m[r] : r) + 1);
        let l = range - i - 1;
        m[r] = (l in m) ? m[l] : l;
      }
      return a
    }
  }
}
</script>
<style scoped>
  .preview-inner {
    font-family: 'Rufina',sans-serif;
    padding-top: 94px;
  }
  .preview-title {
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    color: #FFFFFF;
    margin-bottom: 22px;
  }
  .preview-btn {
    padding: 10px;
    background-color: #EB315E;
    color:#FFFFFF;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    text-decoration: none;
  }
  .preview-description {
    max-width: 331px;
    color: #FFFFFF;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 33px;
  }
  .preview {
    margin-top: 100px;
    min-height: 520px;
    width: 100%;
    background-image: url('~/static/images/index/preview.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .index {
    padding: 26px 0px 0px 0px;
    position: relative;
  }
  
</style>