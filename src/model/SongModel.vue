
<script setup>
    import utils from '@/scripts/utils'
    import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

    const config = defineProps({config: Object});
    const requestStore = utils.useRequestStore();
    const openDownload = async () => open(config.config.audio);

    const copyLyric = async () => {
        let lyricText = "";
        for (const lyric of config.config.lyric) {
            if (lyric.text == undefined || lyric.text == null || lyric.text == "") {
                continue;
            } else {
                lyricText += `${lyric.text}
`; // 歌词换行
            }
        }
        utils.writeClipBoardText(lyricText);
    }

    const onSongPlay = async () => {
        const src = config.config.audio;
        if (!requestStore.playStstus && requestStore.currentSrc === null) {
            await requestStore.setPlayStatus(true);
            await requestStore.setCurrentSrc(src).then(async () => {
                document.querySelector(".app-player").play();
                document.querySelector(".app-player").addEventListener('ended',async () => {
                    document.querySelector(".app-player").pause();
                    await requestStore.setCurrentSrc(null);
                    await requestStore.setPlayStatus(false);
                });
            });
        } else 
        if (!requestStore.playStstus && requestStore.currentSrc === src) {
            await requestStore.setPlayStatus(true).then(async () => {
                document.querySelector(".app-player").play();
                document.querySelector(".app-player").addEventListener('ended',async () => {
                    document.querySelector(".app-player").pause();
                    await requestStore.setCurrentSrc(null);
                    await requestStore.setPlayStatus(false);
                });
            });
        } else 
        if (requestStore.playStstus && requestStore.currentSrc === src) {
            document.querySelector(".app-player").pause();
            await requestStore.setPlayStatus(false);
        } else
        if (requestStore.playStstus && requestStore.currentSrc !== src) {
            document.querySelector(".app-player").pause();
            await requestStore.setPlayStatus(false);
            await requestStore.setPlayStatus(true);
            await requestStore.setCurrentSrc(src).then(async () => {
                document.querySelector(".app-player").play();
                document.querySelector(".app-player").addEventListener('ended',async () => {
                    document.querySelector(".app-player").pause();
                    await requestStore.setCurrentSrc(null);
                    await requestStore.setPlayStatus(false);
                });
            });
        }
    }
</script>

<template>
    <div class="audio-card">
        <div class="content-box" v-lazy:background-image="config.config.cover">
            <div class="audio-card-content">
                <p class="audio-card-title">{{ config.config.title }}</p>
                <div class="music-dazzling-card-lyrics-paragraph">
                    <p class="music-dazzling-card-lyrics-paragraph" v-for="(item,index) in config.config.lyric" :key="index">{{ item.text }}</p>
                </div>
            </div>
        </div>
        <div class="action-box">
            <el-avatar :size="32" shape="square" :src="config.config.avatar" />
            <span class="username">天工音乐</span>
            <div class="button-group">
                <el-button type="primary" class="play-icon icon-btn" :icon="requestStore.playStstus && requestStore.currentSrc === config.config.audio ? VideoPause : VideoPlay" @click="onSongPlay"/>
                <el-button type="success" class="copy-icon icon-btn" @click="copyLyric">
                    <svg t="1725289668958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11748" width="32" height="32"><path d="M394.666667 106.666667h448a74.666667 74.666667 0 0 1 74.666666 74.666666v448a74.666667 74.666667 0 0 1-74.666666 74.666667H394.666667a74.666667 74.666667 0 0 1-74.666667-74.666667V181.333333a74.666667 74.666667 0 0 1 74.666667-74.666666z m0 64a10.666667 10.666667 0 0 0-10.666667 10.666666v448a10.666667 10.666667 0 0 0 10.666667 10.666667h448a10.666667 10.666667 0 0 0 10.666666-10.666667V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H394.666667z m245.333333 597.333333a32 32 0 0 1 64 0v74.666667a74.666667 74.666667 0 0 1-74.666667 74.666666H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V394.666667a74.666667 74.666667 0 0 1 74.666666-74.666667h74.666667a32 32 0 0 1 0 64h-74.666667a10.666667 10.666667 0 0 0-10.666666 10.666667v448a10.666667 10.666667 0 0 0 10.666666 10.666666h448a10.666667 10.666667 0 0 0 10.666667-10.666666v-74.666667z" fill="#ffffff" p-id="11749"></path></svg>
                </el-button>
                <el-button color="#626aef" class="download-icon icon-btn" @click="openDownload">
                    <svg t="1725289610131" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9753" width="32" height="32"><path d="M512 789.12a42.24 42.24 0 0 1-30.08-12.16l-192-192a42.24 42.24 0 0 1 0-60.16 41.6 41.6 0 0 1 60.16 0L512 686.08l161.92-161.28a41.6 41.6 0 0 1 60.16 0 42.24 42.24 0 0 1 0 60.16l-192 192a42.24 42.24 0 0 1-30.08 12.16z" p-id="9754" fill="#ffffff"></path><path d="M512 789.12a42.88 42.88 0 0 1-42.88-42.24V256A42.88 42.88 0 0 1 512 213.12a42.24 42.24 0 0 1 42.24 42.88v490.88a42.24 42.24 0 0 1-42.24 42.24z" p-id="9755" fill="#ffffff"></path><path d="M512 1002.88A490.88 490.88 0 1 1 1002.88 512 491.52 491.52 0 0 1 512 1002.88z m0-896A405.12 405.12 0 1 0 917.12 512 405.76 405.76 0 0 0 512 106.88z" p-id="9756" fill="#ffffff"></path></svg>
                </el-button>
            </div>
        </div>
    </div>
</template>

<style>
    @import url("./assets/SongModel.css");
</style>

