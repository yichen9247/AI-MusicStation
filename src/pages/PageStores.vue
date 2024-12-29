<!-- eslint-disable no-undef -->

<script setup>
    import utils from '@/scripts/utils'
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import service from "@/assets/service.png"
    import axiostool from '@/scripts/axiostool'
    import HeadModel from '@/model/HeadModel.vue'
    import NotFouLayout from '@/layout/NotFouLayout.vue'

    const route = useRoute();
    const payment = ref(false);
    const config = utils.config;
    const isLoading = ref(true);
    const storeConfig = ref(null);
    const applicationStore = utils.useApplicationStore();

    onMounted(async () => {
        if (!route.query.id) return setTimeout(async () => {
            storeConfig.value = "404"
        },500);

        await axiostool.sendHttpGet(`${config.app_query}?type=store&id=${route.query.id}`).then((data) => {
            if (data === "404") {
                return setTimeout(async () => {
                    storeConfig.value = data
                },500);
            }
            setTimeout(async () => {
                storeConfig.value = data;
                isLoading.value = !isLoading.value;
            },500);
            document.title = data.name;
        }).catch(async () => ElMessage({ message: '请求接口失败', type: 'error', plain: true}));

        // if (utils.Cookies.get('policy') !== 'true') {
        //     await showDialog({ message: utils.config.cookie.cookie_mb_message, theme: 'round-button', confirmButtonText: '允许存储'}).then(() => utils.Cookies.set('policy', true ,{ expires: 30 }));
        // }
    });
    
    const onPaymentClick = async () => {
        if (storeConfig.value === null) return ElMessage({ message: '前端异常行为', type: 'error', plain: true});
        if (storeConfig.value.disable === true) return ElMessage({ message: '商品已售完', type: 'warning', plain: true});
        payment.value = !payment.value;
    }
</script>

<template>
    <HeadModel :title="storeConfig !== null && !isLoading ? storeConfig.name : config.app_tit" :back="true"/>

    <el-dialog v-model="payment" title="在线支付" align-center :width="applicationStore.isDeviceMobile ? '95%' : '500px'">
        <p class="desc-no">抱歉，我们暂时无法开通在线支付，请联系我们的微信客服进行下单。</p>
        <p class="service-qrcode">
            <img class="service-qrcode" v-lazy="service" alt="客服二维码">
        </p>
    </el-dialog>

    <div class="store-content" v-if="storeConfig !== '404'">
        <el-skeleton :loading="isLoading" animated>
            <template #template>
                <el-skeleton-item variant="image" class="store-cover"/>

                <div class="store-detail-card">
                    <div class="card-title">商品详情</div>
                    <div class="card-content">
                        <el-skeleton-item variant="p" style="width: 50%;"/>
                        <el-skeleton-item variant="p" style="width: 80%;"/>
                        <el-skeleton-item variant="p" style="width: 100%;"/>
                    </div>
                </div>

                <div class="store-detail-card">
                    <div class="card-title">购买须知</div>
                    <div class="card-content">
                        <el-skeleton-item variant="p" style="width: 50%;"/>
                        <el-skeleton-item variant="p" style="width: 80%;"/>
                        <el-skeleton-item variant="p" style="width: 100%;"/>
                    </div>
                </div>
                <van-button class="case-btn" color="#dd524d" :disabled="true">立即下单</van-button>
            </template>

            <template #default>
                <img class="store-cover" v-lazy="storeConfig.cover" :alt="storeConfig.name" v-if="storeConfig !== null">
            
                <div class="store-detail-card" v-if="storeConfig !== null">
                    <div class="card-title">商品详情</div>
                    <div class="card-content">
                        <p class="card-content-text" v-for="(item,index) in storeConfig.detail" :key="index">{{ `${index + 1}、${item}` }}</p>
                    </div>
                </div>

                <div class="store-detail-card" v-if="storeConfig !== null">
                    <div class="card-title">购买须知</div>
                    <div class="card-content">
                        <p class="card-content-text" v-for="(item,index) in storeConfig.notes" :key="index">{{ `${index + 1}、${item}` }}</p>
                    </div>
                </div>
                <van-button class="case-btn" color="#dd524d" :disabled="storeConfig.disable" @click="onPaymentClick" v-if="storeConfig !== null">{{ storeConfig.disable ? '该商品已售完' : `立即下单（￥${storeConfig.price}）` }}</van-button>
            </template>
        </el-skeleton>
    </div>
    <NotFouLayout v-if="storeConfig === '404'"/>
</template>

<style>
    @import url("./assets/PageStores.css");
</style>