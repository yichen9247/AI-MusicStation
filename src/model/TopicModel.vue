
<script setup>
    import utils from '@/scripts/utils'
    import { useRouter } from 'vue-router'

    const router = useRouter();
    const config = defineProps({ config: Object });
</script>

<template>
    <div class="topic-card">
        <div class="content-box" :style="{ background: utils.returnRoundColor() }">
            <div class="topic-card-content">
                <p class="topic-card-title">{{ config.config.title }}</p>
            
                <div class="topic-card-desc">
                    <p class="topic-card-desc">{{ config.config.description }}</p>
                </div>
                <p class="topic-detail">{{ `${config.config.creation_count}首作品丨${config.config.user_count}人参与` }}</p>
            </div>
        </div>

        <div class="action-box">
            <el-tag size="large" type="danger">{{ config.config.button_desc }}</el-tag>
            <div class="button-group">
                <el-button type="warning" class="preview" @click="router.push(`/topic-detail?id=${config.config.id}`)">浏览话题</el-button>
            </div>
        </div>
    </div>
</template>

<style>
    @import url("./assets/TopicModel.css");
</style>