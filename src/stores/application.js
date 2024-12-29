
import { ref } from 'vue'
import { defineStore } from 'pinia'

const isMobile = () => {
  return (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || window.innerWidth <= 720);
}

onresize = async () => {
  let state = isMobile();
  const applicationStore = useApplicationStore();
  applicationStore.setIsDeviceMobile(state);
}

export const useApplicationStore = defineStore('applicationStore', () => {

  let tabSelectList = ['发现','最新','话题','服务','公告'];

  const currTabSelect = ref(tabSelectList[0]);
  const isDeviceMobile = ref(isMobile());

  const setIsDeviceMobile = (value) => isDeviceMobile.value = value;

  return { currTabSelect, tabSelectList, isDeviceMobile, setIsDeviceMobile};
});
