<template>
    <vcontainer>
        <div class="login-form">
            <div class="login-border">
                <h1 class="login-title">Sign in</h1>
                <span class="error-msg" v-show="errMsg">{{errMsg}}</span>
                <div class="mail">
                    <input v-focus @keyup="sumbit" type="email" class="fist-input" placeholder="Email" v-model="email" />
                    <img class="icon" :src="corImg" alt="icon">
                </div>
                <input class="second-input" @keyup="retCorr" type="password" placeholder="Password" v-model="password" />
                <button class="login-google" @click="singInWithGoogle">sign with Google account</button>
                <button class="login-sumbit" @click="register">Enter</button>
                <button class="login-registration" @click="router.push('/register')">registration</button>
            </div>
        </div>
    </vcontainer>
</template>
<script setup>
import { ref, useRouter,useStore } from '@nuxtjs/composition-api'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import saveData  from '@/functions/saveData.js'
import { doc } from 'prettier';
const email = ref("");
const password = ref("");
const errMsg = ref()
const corImg = ref('/images/login/envelope.png')
const iconEm = ref('/images/login/check.png');
const iconCr = ref('/images/login/envelope.png');
const router = useRouter()
const store = useStore();
const register = () => { 
    const user = signInWithEmailAndPassword( getAuth(), email.value, password.value)
    .then((data)=>{
        store.commit('saveCurUid', data.user.uid)
        router.push('/profile')
        setTimeout(()=>{
            location.reload()
        }, 2000)
        
    })
    .catch(error => {
        switch (error.code){
            case "auth/invalid-email":
                errMsg.value = "invalid-email";
                document.querySelector('.fist-input').classList.add('error')
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                document.querySelector('.fist-input').classList.add('error')
                break;
            case "auth/wrong-password":
                errMsg.value = "incorrect password";
                document.querySelector('.second-input').classList.add('error')
                break;
            default:
                errMsg.value = "Email or password was incorrect"
                document.querySelector('.second-input').classList.add('error')
                document.querySelector('.fist-input').classList.add('error')
                break;
        }
    })
    
}
const retCorr = () => {
    document.querySelector('.second-input').classList.remove('error')
    errMsg.value = null
}
const sumbit = () => {
    document.querySelector('.fist-input').classList.remove('error')
    document.querySelector('.second-input').classList.remove('error')
    errMsg.value = null
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(email.value === ''){
        corImg.value = iconCr.value
    }
    if(email.value.match(pattern)){
        corImg.value = iconEm.value
    }
    else {
        corImg.value = iconCr.value
    }
    
    
    
}
const singInWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result)=>{
        store.commit('saveCurUid', result.user.uid)
        saveData(store.state.uid, result.user.email);
        router.push("/profile");    
        setTimeout(()=>{
            location.reload()
        }, 2000)
    })
    .catch((error) => {
        console.log(error.code);
    });
}
</script>
<style scoped>
    .error {
        border: 1px solid red;
    }
    .login-google {
        text-align: center;
        margin-top: 6px;
        border: none;
        background: none;
        font-size: 12px;
        line-height: 15px;
        text-decoration-line: underline;
        color: #9D9D9D;
        margin-bottom: 22px;
        cursor: pointer;
    }
    .mail {
        position: relative;
    }
    .login-registration {
        border: none;
        background: none;
        margin-top: 7px;
        text-decoration-line: underline;
        cursor: pointer;
    }
    .login-title {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 32px;
        line-height: 39px;
        margin-bottom: 45px;
        text-align: center;
    }
    .icon {
        position: absolute;
        max-height: 20px;
        max-width: 20px;
        right: 3%;
        top: 13%;
    }
    .login-sumbit {
        padding: 9px 0px;
        font-weight: 700;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 19px;
        background: #EB315E;
        border: 1px solid #FFFFFF;
        border-radius: 4px;
        cursor: pointer;
    }
    input {
        font-family: 'Inter', sans-serif;
        width: 344px;
        padding: 9px 0px 8px 19px;
        border-radius: 4px;
        border: 1px solid #000;
        outline: none;
    }
    .fist-input {
        margin-bottom: 18px;
    }
    .error-msg {
        position: absolute;
        top: 27%;
        color: #EB315E;
    }
    .login-border {
        border: 1px solid #EB315E;
        position: relative;
        padding: 77px 383px 161px;
        border-radius: 51px;
        display: flex;
        flex-direction: column;
    }
    .login-form {
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }
    @media(max-width: 1150px){
        .login-border {
            border: none;
            padding: 0;
        }
    }
    @media(max-width: 400px){
        .fist-input {
            width: 280px;
        }
        .second-input {
            width: 280px;
        }
    }
</style>