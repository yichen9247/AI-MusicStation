<!-- eslint-disable no-undef -->

<script setup>
    import utils from '@/scripts/utils'
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import SongModel from '@/model/SongModel.vue'
    import HeadModel from '@/model/HeadModel.vue'
    import PlayeModel from '@/model/PlayeModel.vue'
    import NotFouLayout from '@/layout/NotFouLayout.vue'

    const route = useRoute();
    const error = ref(false);
    const config = utils.config;
    const topicDescription = ref(null);
    const requestStore = utils.useRequestStore();

    onMounted(async () => {
        document.title = utils.config.app_tit;
        if (!route.query.id) return error.value = true;
        await requestStore.setTopicDetailListFirst(route.query.id);

        // if (utils.Cookies.get('policy') !== 'true') {
        //     await showDialog({ message: utils.config.cookie.cookie_mb_message, theme: 'round-button', confirmButtonText: '允许存储'}).then(() => utils.Cookies.set('policy', true ,{ expires: 30 }));
        // }

        await utils.axiostool.sendHttpGet(`${config.app_api + config.app_kotch.topicQuery + route.query.id}?topic_id=${route.query.id}`).then(async (data) => {
            topicDescription.value = data.topic.description;
        }).catch(async () => {
            error.value = true;
            ElMessage({ message: '请求接口失败', type: 'error', plain: true});
        });
    });
</script>

<template>
    <HeadModel :title="'灵感话题'" :back="true"/>
    <div class="topic-content" v-if="!error">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o" :text="topicDescription === null ? '正在初始化中' : topicDescription"/>
        <div class="container-list">
            <SongModel v-for="(item,index) in requestStore.audioTopicList" :key="index" :config="item"/>
            <van-button type="primary" class="last-audio" @click="requestStore.setTopicDetailListLat(route.query.id)" v-if="requestStore.audioTopicList.length >= 20">加载更多</van-button>
        </div>
    </div>
    <NotFouLayout v-if="error"/>
    <PlayeModel :src="requestStore.currentSrc" v-if="!error && requestStore.currentSrc !== null && requestStore.playStstus"/>
</template>

<style>
    @import url("./assets/PageTopics.css");
</style>