
export default {
    app_tit: '逐梦音乐工作站',
    app_api: 'https://music.tiangong.cn/api/sm/',
    app_cos: 'https://music-static-cos.tiangong.cn/',
    app_query: 'https://v-api.xiaokolomi.cn/api/msi/store/query',
    app_store: 'https://v-api.xiaokolomi.cn/api/workstation?type=store',
    app_board: 'https://v-api.xiaokolomi.cn/api/workstation?type=notice',

    app_kotch: {
        topic: 'topic/query', // ?time
        least: 'latest/list', // ?time&last_id
        query: 'default/query', // ?time
        recom: 'home/recommend', // ?time
        alist: 'preferred/list', // ?time&last_id
        topicQuery: 'topic/query/', // :id?time&topic_id
        topicDetail: 'topic/creation/query' // ?time&topic_id
    },

    cookie: { /**（Cookie设置） */
        /**
         * cookie_mb_message: 手机端Cookie提示文案 Type: String
         * cookie_pc_message: 电脑端Cookie提示文案（可用HTML） Type: String
         */
        cookie_mb_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些个人信息。",
        cookie_pc_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些信息，详情请查看<a href='/privacy/'>《隐私政策》</a>"
    }
}