<template>
    <div class="mob">
        <transition 
        name="slide-fade"
        >
            <div class="mob-nav" v-if="this.$store.state.mobile">
                <a @click="changeOnIndex" class="logo-link">Главная</a>
                <a @click="closeWithChange(films)" class="link">Фильмы</a>
                <a @click="closeWithChange(serial)" class="link">Серилы</a>
                <a @click="closeWithChange(cartoon)" class="link">Мини Сериалы</a>
                <a @submit.prevent @click="signInProfile" class="profile-link">Профиль</a>
                <a v-if="isLoggedIn" @submit.prevent class="leave-btn" @click="handleSignOut">Выйти</a>
                <button @click="toggleMobile" class="close">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>  
            </div>
        </transition>
        
        <a v-show="this.$store.state.mobile" @click="toggleMobile" class="mob-close"></a>
    </div>
    
</template>


<script>
import { onMounted, ref, useRouter} from '@nuxtjs/composition-api'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { mapGetters, mapMutations } from 'vuex';
export default {
    data(){
        return {
            films: "FILM",
            serial: "TV_SERIES",
            cartoon: "MINI_SERIES",
            isLoggedIn: false,
        }
    },
    mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
        })
    },
    methods: {
        closeWithChange(cat){
            this.$router.push({ name: 'feed-feedid', params: { feedid: cat } })
            this.toggleMobile()
        },
        handleSignOut(){
            const auth = getAuth();
            signOut(auth).then(()=>{
                this.$router.push("/")
            })
        },
        changeOnIndex(){
            this.$router.push("/")
            this.toggleMobile()
        },
        signInProfile(){
            if(this.isLoggedIn){
                this.toggleMobile()
                this.$router.push("/profile")
            }
            else {
                this.toggleMobile()
                this.$router.push("/login")
            }
        },
        ...mapMutations([
            "toggleMobile"
        ]),
        
    },
    computed: {
        ...mapGetters([
            "mobileModal"
        ])
    },
    watch: {
        mobileModal(newMobileModal, oldMobileModal){
            if(newMobileModal == true){
                document.body.style.overflow = 'hidden'
                return;
            }
            document.body.style.overflow = 'auto'
        }
    }
    
}
</script>

<style scoped>
    .logo-link {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 70.19%;
        color: #000000;
        margin-bottom: 20px;
        cursor: pointer;
    }
    .leave-btn {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 70.19%;
        margin-top: 20px;
        cursor: pointer;
    }
    .close {
        position: absolute;
        height: 40px;
        width: 40px;
        background: none;
        border: none;
        cursor: pointer;
        right: 20px;
    }
    .profile-link {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 70.19%;
        cursor: pointer;
        margin-top: 20px;
    }
    .close span {
        width: 30px;
        height: 4px;
        display: block;
        background: black;
        position: absolute;
    }
    .close span:nth-child(0){
        top: -10px;
    }
    .close span:nth-child(1){
        top: 0px;
    }
    .close span:nth-child(2){
        top: 10px;
    }
    .close span:nth-child(0):hover{
        transform: translateX(20reg);
    }
    .mob-close {
        position: absolute;
        width: 100%;
        height: 100%;
        background: none;
        top: 0;
        z-index: 33;
        background-color: gray;
        cursor: pointer;
        backdrop-filter: blur(12px);
        opacity: 0.4;
    }
    .link {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 70.19%;
        color: #000000;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .mob-nav {
        display: flex;
        flex-direction: column;
    }
    .mob-nav {
        z-index: 99;
        width: 220px;
        position: fixed;
        height: 100%;
        background: #fff;
        top: 0;
        padding: 29px 0px 0px 35px;
    }
    .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>