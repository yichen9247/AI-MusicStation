
import "./assets/style.css"
import "./scripts/ready.js"
import 'vant/lib/index.css'

import errorImage from "@/assets/404.gif"
import lazyloadImage from "@/assets/lazyload.jpg"

import { Lazyload } from 'vant'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import Application from './Application.vue'

const application = createApp(Application)

application.use(createPinia());
application.use(router);
application.use(Lazyload, {loading: lazyloadImage, error: errorImage, lazyComponent: true});

application.mount('#application');
