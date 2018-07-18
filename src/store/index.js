import createLogger from 'vuex/dist/logger';
import musicStore from './musicStore.js';

const logger = createLogger(); //创建一个logger

export default {
    modules: {
        musicStore
    },
    plugins: [logger]
}