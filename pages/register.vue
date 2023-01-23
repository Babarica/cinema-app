<template>
    <vcontainer>
        <div class="register-form">
            <div class="register-border">
                <h1 class="register-title">Create an Account</h1>
                <span class="error-msg" v-show="errMsg">{{errMsg}}</span>
                <input @keyup="sumbit" class="first-input"  type="email" placeholder="Email" v-model="email" />
                <input @keyup="retCorr" class="second-input" type="password" placeholder="Password" v-model="password" />
                <input @keyup="retCorr" class="third-input" type="password" placeholder="Password" v-model="secondPassword">
                <button class="register-sumbit" @click="register">Submit</button>
                <button class="register-google" @click="singInWithGoogle">Register with Google</button>
            </div>
        </div>
    </vcontainer>
</template>
<script setup>
import { ref, useRouter, useStore } from '@nuxtjs/composition-api'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import saveData  from '@/functions/saveData.js'
const store = useStore();
const email = ref("");
const errMsg = ref();
const password = ref("");
const secondPassword = ref("")
const router = useRouter()
const register = () => {
    if(password.value === secondPassword.value){
        const user = createUserWithEmailAndPassword( getAuth(), email.value, password.value)
        .then((data)=>{
            store.commit('saveCurUid', data.user.uid)
            saveData(store.state.uid, data.user.email)
            router.push('/profile')
            setTimeout(()=>{
                location.reload()
            }, 2000)
        })
        .catch(error => {
           switch (error.code){
                case "auth/invalid-email":
                    errMsg.value = "invalid-email";
                    document.querySelector('.first-input').classList.add('error')
                    break;
                case "auth/wrong-password":
                    errMsg.value = "incorrect password";
                    document.querySelector('.second-input').classList.add('error')
                    document.querySelector('.third-input').classList.add('error')
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"
                    document.querySelector('.second-input').classList.add('error')
                    document.querySelector('.first-input').classList.add('error')
                    document.querySelector('.third-input').classList.add('error')
                    break;
            }
        })
    }
    else {
        errMsg.value = "Passwords are not the same"
        document.querySelector('.third-input').classList.add('error')
        document.querySelector('.second-input').classList.add('error')
        
    }
    
}
const sumbit = () => {
    document.querySelector('.first-input').classList.remove('error')
    document.querySelector('.second-input').classList.remove('error')
    document.querySelector('.third-input').classList.remove('error')
    errMsg.value = null
}
const retCorr = () => {
    document.querySelector('.second-input').classList.remove('error')
    document.querySelector('.third-input').classList.remove('error')
    errMsg.value = null
}
const singInWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result)=>{
        // store.state.uid = result.user;
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
    .register-form {
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }
    .error-msg {
        position: absolute;
        top: 24%;
        color: #EB315E;
    }
    .error {
        border: 1px solid red;
    }
    .register-border {
        border: 1px solid #EB315E;
        position: relative;
        padding: 77px 383px 161px;
        border-radius: 51px;
        display: flex;
        flex-direction: column;
    }
    .register-title {
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 32px;
        line-height: 39px;
        margin-bottom: 45px;
        text-align: center;
    }
    .first-input {
        margin-bottom: 18px;
    }
    input {
        font-family: 'Inter', sans-serif;
        width: 344px;
        padding: 9px 0px 8px 19px;
        border-radius: 4px;
        border: 1px solid #000;
        outline: none;
    }
    .register-sumbit {
        margin-top: 33px;
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
    .second-input {
        margin-bottom: 18px;
    }
    .register-google {
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
    @media(max-width: 1150px){
        .register-border {
            border: none;
            padding: 0;
        }
    }
    @media(max-width: 400px){
        .first-input {
            width: 280px;
        }
        .second-input {
            width: 280px;
        }
        .third-input {
            width: 280px;
        }
    }
</style>