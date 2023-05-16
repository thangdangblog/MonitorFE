<script setup>
import { ref } from 'vue'
import { Fireworks } from '@fireworks-js/vue'
import UserService from '../services/UserService';
import TaskService from '../services/TaskService';
import Utils from '../common/Util';

const topTalent = ref([]);

const animationClass = ref('');

const showFireWork = ref(true);

const updateResult = (type) => {
    // Theo tuần
    if (type == 1) {
        const { start, end } = Utils.getWeekRange();
        activeMonth.value = false;
        getTopList(start, end);
    } else { // Theo tháng
        const { start, end } = Utils.getStartAndEndOfMonth();
        activeMonth.value = true;
        getTopList(start, end);
    }
}

const turnOffFireWork = () => {
    setTimeout(() => {
        showFireWork.value = false;
    }, 4000)
}

const getTopList = async (start, end) => {

    animationClass.value = ''

    const params = {
        FromDate: start,
        ToDate: end,
    };
    const data = await TaskService.getTopList(params);

    const listTop = data?.Data;

    if (listTop && listTop.length) {
        topTalent.value = [listTop[0], listTop[1], listTop[2]]
    }

    setTimeout(() => {
        animationClass.value = 'show-detail'
    }, 0)

}

const init = () => {
    turnOffFireWork();

    // Theo tháng
    const { start, end } = Utils.getStartAndEndOfMonth();
    getTopList(start, end);
}

const activeMonth = ref(true);
const reloadFrame = ref(true);

// Chạy khởi tạo
init();
</script>

<template>
    <div class="main-dashboard" v-if="reloadFrame">

        <div class="filter-date">
            <div class="item-filter week" :class="activeMonth ? '' : 'active'" @click="updateResult(1)">Tuần</div>
            <div class="item-filter month" :class="activeMonth ? 'active' : ''" @click="updateResult(2)">Tháng</div>
        </div>

        <div class="rate-user">
            <div class="rate-user-detail"
                :class="index == 0 ? `top-1 ${animationClass}` : index == 1 ? `top-2 ${animationClass}` : `top-3 ${animationClass}`"
                v-for="(talent, index) in topTalent" :key="index">
                <div class="name">{{ talent.Name }}</div>
                <div class="avatar">
                    <!-- <img :src="talent.Avatar" :alt="talent.Name"> -->
                </div>
                <div class="point">{{ talent.Point }} Point</div>
            </div>
            <!-- <Fireworks v-if="showFireWork" /> -->
        </div>

    </div>
</template>

<style scoped>
.filter-date {
    position: absolute;
    width: 200px;
    display: flex;
    font-size: 20px;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    justify-content: center;
    z-index: 9999;
}

.filter-date>div.active {
    color: #D4ADFC;
}


.filter-date>div {
    padding: 0 12px;
    color: #5C469C;
    font-weight: bold;
    cursor: pointer !important;
}

.main-dashboard {
    width: 100vw;
    height: 100vh;
    background-color: #48178E;
    overflow: hidden !important;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 30px;
}

.point {
    text-align: center;
    margin-top: 30px;
    font-size: 20px;
    color: white;
    font-weight: bold;
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

.rate-user .rate-user-detail.top-1 {
    width: 300px;
    left: 300px;
    z-index: 1;
    height: 60vh;
}

.rate-user .rate-user-detail.top-3 {
    width: 300px;
    right: 0;
    height: 40vh
}

.rate-user .rate-user-detail.top-2 {
    width: 300px;
    left: 0;
    height: 50vh
}

.rate-user .rate-user-detail {
    background: #864DBE;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    bottom: -800px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
   
}

.rate-user .rate-user-detail.top-1.show-detail {
    bottom: 0;
    transition: 0.8s;
}

.rate-user .rate-user-detail.top-2.show-detail {
    bottom: 0;
    transition: 1s;
}

.rate-user .rate-user-detail.top-3.show-detail {
    bottom: 0;
    transition: 1.1s;
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
    font-weight: bold;
}
</style>
