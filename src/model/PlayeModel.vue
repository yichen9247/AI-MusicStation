
<script setup>
    const config = defineProps({ src: String });
</script>

<template>
    <audio controls class="app-player">
        <source :src="config.src" type="audio/mpeg">
    </audio>
</template>

<style>
    @import url("./assets/PlayeModel.css");
</style>