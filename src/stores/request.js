/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import config from '@/scripts/config'
import axiostool from '@/scripts/axiostool'

export const useRequestStore = defineStore('requestStore', () => {
  
  const storeNum = ref(20), noticeNum = ref(20);
  const currentSrc = ref(null), playStstus = ref(false);
  const siteStoreList = reactive([]), siteBoardList = reactive([]);
  let lastAudioFinaId = 0, lastAudioLeastId = 0, lastTopicQueryId = 0, lastTopicDetailId = 0;
  const loadingFab = reactive({ audioFind: false, audioLeast: false, siteBoard: false, siteStore: false });
  const audioFindList = reactive([]), topicQueryList = reactive([]), audioLeastList = reactive([]), audioTopicList = reactive([]);

  const setPlayStatus = async (value) => playStstus.value = value;
  const setCurrentSrc = async (value) => currentSrc.value = value;
  const setSiteStoreListLast = async () => storeNum.value = storeNum.value + 20;
  const setSiteBoardListLast = async () => noticeNum.value = noticeNum.value + 20;

  const setSiteBoardListFirst = async () => {
    if (siteBoardList.length > 0 || loadingFab.siteBoard) return;
    loadingFab.siteBoard = true;
    await axiostool.sendHttpGet(config.app_board).then((data) => {
      for (const notice of data) siteBoardList.push(notice);
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    }).finally(async () => loadingFab.siteBoard = false);
  }

  const setSiteStoreListFirst = async () => {
    if (siteStoreList.length > 0 || loadingFab.siteStore) return;
    loadingFab.siteStore = true;
    await axiostool.sendHttpGet(config.app_store).then((data) => {
      for (const store of data) siteStoreList.push(store);
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    }).finally(async () => loadingFab.siteStore = false);
  }

  const setAudioFindListFirst = async () => {
    if (audioFindList.length > 0 || loadingFab.audioFind) return;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.alist).then((data) => {
      lastAudioFinaId = data.last_id;
      for (const audio of data.list) {
        audioFindList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    });
  }

  const setAudioFindListLast = async () => {
    if (loadingFab.audioFind) return;
    loadingFab.audioFind = true;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.alist + '?last_id=' + lastAudioFinaId).then((data) => {
      lastAudioFinaId = data.last_id;
      for (const audio of data.list) {
        audioFindList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    }).finally(async () => loadingFab.audioFind = false);
  }

  const setAudioLeastListFirst = async () => {
    if (audioLeastList.length > 0 || loadingFab.audioLeast) return;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.least).then((data) => {
      lastAudioLeastId = data.last_id;
      for (const audio of data.list) {
        audioLeastList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    });
  }

  const setAudioLeastListLast = async () => {
    if (loadingFab.audioLeast) return;
    loadingFab.audioLeast = true;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.least + '?last_id=' + lastAudioLeastId).then((data) => {
      lastAudioLeastId = data.last_id;
      for (const audio of data.list) {
        audioLeastList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    }).finally(async () => loadingFab.audioLeast = false);
  }

  const setTopicQueryListFirst = async () => {
    if (audioFindList.lastTopicQueryId > 0) return;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.topic).then((data) => {
      lastTopicQueryId = data.last_id;
      for (const topic of data.topic_list) topicQueryList.push(topic);
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    });
  }

  const setTopicDetailListFirst = async (id) => {
    audioTopicList.length = 0;
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.topicDetail + "?topic_id=" + id).then((data) => {
      lastTopicDetailId = data.last_id;
      for (const audio of data.list) {
        audioTopicList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    });
  }

  const setTopicDetailListLat = async (id) => {
    await axiostool.sendHttpGet(config.app_api + config.app_kotch.topicDetail + '?last_id=' + lastAudioLeastId + "&topic_id=" + id).then((data) => {
      lastTopicDetailId = data.last_id;
      for (const audio of data.list) {
        audioTopicList.push({
          title: audio.title,
          lyric: audio.detail.lyrics.lyrics_segments[0].row_content,
          cover: config.app_cos + audio.detail.cover_url,
          audio: config.app_cos + audio.detail.music_multi_type_urls.mp3_url,
          avatar: config.app_cos + audio.user_avatar
        });
      }
    }).catch(async () => {
        ElMessage({ message: '请求接口失败', type: 'error', plain: true});
    });
  }

  return { 
    currentSrc, playStstus, setCurrentSrc,setPlayStatus, noticeNum, loadingFab, 
    audioFindList, audioLeastList, topicQueryList, audioTopicList, siteBoardList, siteStoreList, setSiteBoardListLast, setSiteStoreListFirst, setSiteStoreListLast, 
    setAudioFindListFirst, setAudioFindListLast, setAudioLeastListFirst, setAudioLeastListLast, setTopicQueryListFirst, setTopicDetailListFirst, setTopicDetailListLat, setSiteBoardListFirst
  };
});
