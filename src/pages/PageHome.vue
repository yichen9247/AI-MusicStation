<!-- eslint-disable no-undef -->

<script setup>
    import utils from '@/scripts/utils'
    import { onMounted, watch } from 'vue'
    import HeadModel from '@/model/HeadModel.vue'
    import SongModel from '@/model/SongModel.vue'
    import PlayeModel from '@/model/PlayeModel.vue'
    import TopicModel from '@/model/TopicModel.vue'
    import BoardModel from '@/model/BoardModel.vue'
    import StoreModel from '@/model/StoreModel.vue'

    const requestStore = utils.useRequestStore();
    const applicationStore = utils.useApplicationStore();

    onMounted(async () => {
        document.title = utils.config.app_tit;
        await requestStore.setAudioFindListFirst();

        // if (utils.Cookies.get('policy') !== 'true') {
        //     await showDialog({ message: utils.config.cookie.cookie_mb_message, theme: 'round-button', confirmButtonText: '允许存储'}).then(() => utils.Cookies.set('policy', true ,{ expires: 30 }));
        // }
    });

    watch(() => applicationStore.currTabSelect,async () => {
        if (applicationStore.currTabSelect === '服务' && requestStore.siteStoreList.length === 0) await requestStore.setSiteStoreListFirst();
        if (applicationStore.currTabSelect === '公告' && requestStore.siteBoardList.length === 0) await requestStore.setSiteBoardListFirst();
        if (applicationStore.currTabSelect === '最新' && requestStore.audioLeastList.length === 0) await requestStore.setAudioLeastListFirst();
        if (applicationStore.currTabSelect === '话题' && requestStore.topicQueryList.length === 0) await requestStore.setTopicQueryListFirst();
    });
</script>

<template>
    <HeadModel :title="utils.config.app_tit"/>
    <div class="home-content">
        <el-segmented v-model="applicationStore.currTabSelect" :options="applicationStore.tabSelectList" block style="height: 45px; font-size: 1rem; margin-top: 5px; margin-bottom: 10px;" v-if="requestStore.audioFindList.length > 0"/>

        <div class="container-list" v-if="applicationStore.currTabSelect === '发现'">
            <SongModel v-for="(item,index) in requestStore.audioFindList" :key="index" :config="item"/>
            <van-button type="primary" class="last-audio" @click="requestStore.setAudioFindListLast" v-if="requestStore.audioFindList.length >= 20" :loading="requestStore.loadingFab.audioFind" loading-text="正在加载中...">加载更多</van-button>
        </div>

        <div class="container-list" v-if="applicationStore.currTabSelect === '最新'">
            <SongModel v-for="(item,index) in requestStore.audioLeastList" :key="index" :config="item"/>
            <van-button type="primary" class="last-audio" @click="requestStore.setAudioLeastListLast" v-if="requestStore.audioLeastList.length >= 20" :loading="requestStore.loadingFab.audioLeast" loading-text="正在加载中...">加载更多</van-button>
        </div>

        <div class="container-list" v-if="applicationStore.currTabSelect === '话题'">
            <TopicModel v-for="(item,index) in requestStore.topicQueryList" :key="index" :config="item"/>
        </div>

        <div class="container-list" v-if="applicationStore.currTabSelect === '服务'">
            <StoreModel v-for="(item,index) in requestStore.siteStoreList.slice(0, requestStore.storeNum)" :key="index" :config="item"/>
            <van-button type="primary" class="last-audio" @click="requestStore.setSiteStoreListLast" v-if="requestStore.siteStoreList.length > requestStore.storeNum">加载更多</van-button>
        </div>

        <div class="container-list" v-if="applicationStore.currTabSelect === '公告'">
            <BoardModel v-for="(item,index) in requestStore.siteBoardList.slice(0, requestStore.noticeNum)" :key="index" :config="item"/>
            <van-button type="primary" class="last-audio" @click="requestStore.setSiteBoardListLast" v-if="requestStore.siteBoardList.length > requestStore.noticeNum">加载更多</van-button>
        </div>
    </div>
    <PlayeModel :src="requestStore.currentSrc" v-if="requestStore.currentSrc !== null && requestStore.playStstus"/>
</template>

<style>
    @import url("./assets/PageHome.css");
</style>