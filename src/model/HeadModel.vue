
<script setup>
    import utils from '@/scripts/utils'
    import { useRouter } from 'vue-router'
    import { ArrowLeft } from '@element-plus/icons-vue'

    const router = useRouter();
    const applicationStore = utils.useApplicationStore();
    const config = defineProps({ title: String, back: Boolean });
</script>

<template>
    <header class="app-header" :style="{ width: applicationStore.isDeviceMobile ? 'calc(100% - 20px)' : '450px' }">
        <div class="head-btn back-btn" @click="router.push('/')" v-if="config.back">
            <ArrowLeft/>
        </div>
        <span class="header-title">{{ config.title }}</span>
    </header>
</template>

<style>
    @import url("./assets/HeadModel.css");
</style>