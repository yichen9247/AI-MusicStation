/* eslint-disable no-undef */

import config from "./config"
import Cookies from 'js-cookie'
import axiostool from "./axiostool"
import { useRequestStore } from "@/stores/request"
import { useApplicationStore } from "@/stores/application"

const returnRoundColor = () => {
    const colorList = ['#23b7e5','#27c24c','#3a3f51','#fad733','#7266ba','#f05050','#42b883','#fbb9b6','#0099FF','#2AAE67','#FF5967','#26CEAA','#F16C8D','#3296FA','#425AEF','#ff7242'];
    let colorIndex = Math.floor(Math.random() * colorList.length);
    return colorList[colorIndex];
}

const writeClipBoardText = async (text) => {
    try {
        if (!isSecureContext) {
            await ElMessage({type: 'error',message: "未部署安全证书"});
        } else 
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(async () => {
                await ElMessage({type: 'success',message: "复制歌词成功"});
            }).catch(async () => {
                await ElMessage({type: 'error',message: "复制歌词失败"});
            });
        } else {
            await ElMessage({type: 'error',message: "浏览器不支持"});
        }
    } catch (e) {
        await ElMessage({type: 'error',message: "系统功能异常"});
    }
}

export default { config, Cookies, axiostool, useRequestStore, useApplicationStore, returnRoundColor, writeClipBoardText }