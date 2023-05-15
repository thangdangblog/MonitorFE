<script setup>
import { ref } from 'vue'

defineProps({
    msg: String,
})

const count = ref(0)
</script>

<template>
    <div class="main-dashboard">
        <div class="rate-user">
            <div class="rate-user-detail top-2">
                <div class="name">Nguyễn Văn Kiên</div>
                <div class="avatar">
                    <img src="https://amismisa.misacdn.net/APIS/PlatformAPI/api/Avatar/56c33c47-78ec-4b3a-92ba-9fdb7830a6d4/misa.jpg?&avatarID=f6bfb0d5-5817-414d-978f-8bb242a0be8d&isScale=true&width=192&height=192" alt="">
                </div>
                <div class="point">156</div>
            </div>
            <div class="rate-user-detail top-1">
                <div class="name">Nguyễn Văn Kiên</div>
                <div class="avatar">
                    <img src="https://amismisa.misacdn.net/APIS/PlatformAPI/api/Avatar/56c33c47-78ec-4b3a-92ba-9fdb7830a6d4/misa.jpg?&avatarID=f6bfb0d5-5817-414d-978f-8bb242a0be8d&isScale=true&width=192&height=192" alt="">
                </div>
                <div class="point">156</div>
            </div>
            <div class="rate-user-detail top-3">
                <div class="name">Nguyễn Văn Kiên</div>
                <div class="avatar">
                    <img src="https://amismisa.misacdn.net/APIS/PlatformAPI/api/Avatar/56c33c47-78ec-4b3a-92ba-9fdb7830a6d4/misa.jpg?&avatarID=f6bfb0d5-5817-414d-978f-8bb242a0be8d&isScale=true&width=192&height=192" alt="">
                </div>
                <div class="point">156</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-dashboard {
    width: 100vw;
    height: 100vh;
    background-color: #48178E;
    overflow: hidden;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}

.rate-user {
    position: absolute;
    width: 900px;
    height: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.rate-user .rate-user-detail.top-1{
    width: 300px;
    left: 300px;
    z-index: 1;
    height: 60vh;
}

.rate-user .rate-user-detail.top-3{
    width: 300px;
    right: 0;
    height: 40vh
}

.rate-user .rate-user-detail.top-2{
    width: 300px;
    left: 0;
    height: 50vh
}

.rate-user .rate-user-detail {
    background: #864DBE;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    bottom: 0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
}

.rate-user-detail .name {
    position: absolute;
    top: -37px;
    font-size: 21px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    color: white;
}
</style>
