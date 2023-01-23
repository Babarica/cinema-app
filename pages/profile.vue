<template>
    <div>
        <div class="profile">
            <navbar />
            <vcontainer>
                <div class="profile-inner">
                    <div class="profile-date">
                        <h2 class="profile-title">Мой профиль</h2>
                        <div class="profile-ava">
                            <img class="profile-image" @mouseenter="showInput" @mouseleave="closeInput" :src="imageUrl" alt="image" />
                            <label class="profile-inp" :class="{active: isActive}" @mouseenter="showInput" for="inputProf">
                                выбрать фото
                                <input id="inputProf" type="file" @change="onFileSelected">
                            </label>
                            <button @mouseenter="showInput" class="profile-image__default" :class="{active: isActive}" v-show="imageUrl !== '/images/navbar/user_profile.jpg'" @click="deleteImg"></button>
                            <p class="profile-image__error" v-show="imgError">*Только Jpg формат</p>
                        </div>
                        <h2 class="profile-subtitle">Имя пользователя</h2>
                        <div class="profile-block">
                            <p class="profile-user__name" :class="{none: none}" v-if="this.userDate.username">
                                {{this.userDate.username}}
                                <span class="profile-user__change" @click="changeName">изменить</span>
                            </p>
                            <p class="profile-user__name" :class="{none: none}" v-else> 
                                {{this.userDate.email}}
                                <span class="profile-user__change" @click="changeName">изменить</span>
                            </p>
                            <span class="error-message" v-show="curName">{{errMsg}}</span>
                            <input class="profile-change" v-model.trim="name" @keyup="nonSum" v-on:keyup.enter='sumbit' type="text" v-show="none">
                        </div>
                    </div>
                    <div class="profile-movies">
                        <ch-movies></ch-movies>
                    </div>
                </div>
                <div class="profile-history">
                    <watched-slider ></watched-slider>
                </div>
            </vcontainer>
            <mobile-nav></mobile-nav>
            <main-footer></main-footer>
        </div>
    </div>
</template>

<script>
import { getStorage, ref as stRef, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage"
import { getDatabase, child, ref, get, push, update } from "firebase/database";


export default {
        meta: 
        {
            requiresAuth: true 
        },
        data(){
            return {
                imgError: false,
                errMsg: null,
                none: false,
                curName: false,
                name: null,
                isActive: false,
                prevName: null,
                userDate: {},
                selectedImage: null,
                imageUrl: '/images/navbar/user_profile.jpg',
                imageName: 'default',
             
            }
        },
     methods: {
        deleteImg(){
            this.imageUrl = '/images/navbar/user_profile.jpg'
            const storage = getStorage()
            const desertRef = stRef(storage,  `${this.$store.state.uid}`);
            deleteObject(desertRef).then(() => {
            // File deleted successfully
            }).catch((error) => {
                console.error(error)
            });

        },  
        nonSum(){
            this.curName = false
        },
        hideInput(){
            this.none = false
        },
        sumbit(){
            this.curName = false
            const profile = document.querySelector('.profile-change')
            if(this.name.split('').length<10 && this.name.split('').length !== 0){
                this.none = false
                this.userDate.username = this.name
                this.saveImage()
            }
            else if(this.name.split('').length == 0) {
                this.none = false
                this.userDate.username = this.prevName
            }   
            else if (this.name.split('').length >= 10){
                this.errMsg = "Имя не может быть больше 10 символов"
                this.name = ''
                this.curName = true
                profile.focus()
            }
            

        },
        closeInput(){
            this.isActive = false
        },
        showInput(){
            this.isActive = true
        },
        changeName(){
            this.prevName = this.name || this.userDate.username
            this.none = true
            this.name = ''
            const profile = document.querySelector('.profile-change')
            setTimeout(()=>  profile.focus(),100)
            profile.addEventListener("focusout", ()=> this.sumbit())
        },
        onFileSelected(event){
            this.imgError = false
            let reader = new FileReader();
            this.imageName = event.target.files[0];
            if(this.imageName){
                switch(event.target.files[0].name.split(".").splice(-1,1)[0]){
                    case "jpg":
                        if((event.target.files[0].size/1024)>1024){
                            alert('error')
                        }
                        else {
                        reader.addEventListener("load", () => {
                            this.imageUrl = reader.result;
                            this.saveImage()
                        }, false);
                        reader.readAsDataURL(event.target.files[0])
                        }
                        break;
                    default: 
                    this.imgError = true
                }
            }
            
        },

        saveImage(){
            if(this.name){
                const db = getDatabase();
                const newPostKey = push(child(ref(db), this.$store.state.uid)).key;
                const postData = {
                    username: this.name,
                    email: this.userDate.email,
                }
                const updates = {};
                updates['/users/' +this.$store.state.uid + '/'] = postData;
                return update(ref(db), updates);
            }
            else {
                this.curName = true
            }
            if(this.imageUrl !=='/images/navbar/user_profile.jpg' && this.imageUrl){
                    let men = this.imageUrl
                    if(men.split('').splice(0, 5).join('') == 'https'){
                        return
                    }
                    else {
                        const storage = getStorage();
                        const storageRef = stRef(storage, `${this.$store.state.uid}`);
                        uploadBytes(storageRef, this.imageName).then((snapshot) => {
                        });
                    }
            }
        }
        },
    mounted(){
        if(this.$store.state.uid == null || undefined) {
            this.$store.commit('saveUid')
            const dbRef = ref(getDatabase());
            const storage = getStorage();
            // Получаю изображение пользователя
                getDownloadURL(stRef(storage, `${this.$store.state.uid}`))
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    this.imageUrl = url;
                })
                .catch((error) => {
                    switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                    }
                });
            

            // Получаю данные пользователя (имя, почта, uid)
            get(child(dbRef, `users/${this.$store.state.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                this.userDate = snapshot.val()
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        }
        else {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/${this.$store.state.uid}`)).then((snapshot) => {
                
            if (snapshot.exists()) {
               this.userDate = snapshot.val()
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
                console.error(error);
            });

            const storage = getStorage();
            if(this.imageUrl !=='/images/navbar/user_profile.jpg'){
                
                getDownloadURL(stRef(storage, `${this.$store.state.uid}`))
               .then((url) => {
                   const xhr = new XMLHttpRequest();
                   xhr.responseType = 'blob';
                   xhr.onload = (event) => {
                   const blob = xhr.response;
                   };
                   xhr.open('GET', url);
                   xhr.send();
                   this.imageUrl = url;
               })
               .catch((error) => {
                   console.error(error)
               });
            }
        }
    }
}
</script>

<style scoped>
    .profile-title {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 36px;
        line-height: 34px;
        margin-bottom: 40px;
    }
    .profile-inner {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    .profile-block {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .profile-image__default {
        opacity: 0;
        position: absolute;
        background: url(~/static/images/profile/close.svg) no-repeat center;
        width: 30px;
        border: none;
        height: 30px;
        background-color: #EB315E;
        border-radius: 4px;
        top: 10px;
        right: 14px;
        transition: all 0.4s;
        cursor: pointer;
    }
    .profile {
        padding: 26px 0px 0px 0px;
    }
    .profile-change {
        margin-right: 72px;
        padding: 6px;
        border-radius: 2px;
        border: 1px solid #000;
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        max-height: 18px;
    }
    .error-message {
        position: absolute;
        top: 135%;
        color:#EB315E;
        font-family: 'Rufina', sans-serif;
        font-size: 12px;
    }
    .profile-ava {
        position: relative;
    }
    .none {
        display: none;
    }
    .profile-image__error {
        color:#EB315E;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .profile-inp {
        position: absolute;
        left: 20%;
        top: 70%;
        font-family: 'Inter',sans-serif;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        background-color: #EB315E;
        padding: 6px 15px;
        color: #fff;
        border-radius: 8px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.4s;
    }


    .profile-inp input {
        display: none;
    }
    .profile-image {
        width: 331px;
        margin-bottom: 20px;
        height: 424px;
        border-radius: 7px;
        
    }
    .profile-subtitle {
        font-family: 'Rufina',sans-serif;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 11px;
    }
    .profile-user__change {
        color: #EB315E;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-decoration-line: underline;
        cursor: pointer;
        padding-left: 10px;
    }
    .profile-user__name {
        font-family: 'Inter',sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 29px;
        
    }
    .active {
        opacity: 1;
    }
    @media(max-width: 970px){
        .profile-inner {
            flex-direction: column;
        }
        .profile-ava {
            max-width: 331px;
            margin: 0 auto;
        }
        .profile-date {
            text-align: center;
            margin-bottom: 40px;
        }
        .profile-block {
            justify-content: center;
            display: flex;
        }
    }
    @media(max-width: 362px){
        .profile-image {
            width: 260px;
            height: 328px;
        }
    }
</style>