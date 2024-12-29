
<script setup>
    const config = defineProps({ config: Object });
</script>

<template>
    <div class="notice-card">
        <div class="content-box" v-lazy:background-image="config.config.cover">
            <div class="notice-card-content">
                <p class="notice-card-title">{{ config.config.title }}</p>
                <div class="notice-card-html" v-html="config.config.content"></div>
            </div>
        </div>

        <div class="action-box">
            <el-avatar :size="32" shape="square" :src="config.config.avatar" />
            <span class="username">{{ config.config.author }}</span>
            <span class="create-time">{{ config.config.create }}</span>
        </div>
    </div>
</template>

<style>
    @import url("./assets/BoardModel.css");
</style>