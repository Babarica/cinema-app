<template>
    <div class="profile-nav">
        <button v-if="isLoggedIn" @submit.prevent class="leave-btn" @click="handleSignOut"><img src="~/static/images/navbar/signout.png"></button>
        <button @submit.prevent @click="signInProfile" class="profile-btn"></button>
    </div>
</template>
<script setup>
    import { onMounted, ref, useRouter} from '@nuxtjs/composition-api'
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
    const isLoggedIn = ref(false);
    const router = useRouter();
    let auth;
    onMounted(()=>{
        auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                isLoggedIn.value = true;
            }
            else {
                isLoggedIn.value = false;
            }
        })
    })
    const handleSignOut = () => {
        signOut(auth).then(()=>{
            router.push("/")
        })
    }
    const signInProfile= () =>{
        if(isLoggedIn.value){
            router.push("/profile")
            
        }
        else {
            router.push("/login")
        }
    }
</script>
<style scoped>
    .leave-btn {
        border: none;
        background: none;
        margin-right: 6px;
        cursor: pointer;
    }
    .profile-btn {
        border: none;
        background: none;
        width: 38px;
        height: 37px;
        background-image: url(~/static/images/navbar/profile.svg);
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .profile-nav {
        display: flex;
        align-items: center;
    }
</style>