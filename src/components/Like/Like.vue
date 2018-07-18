<template>
    <ul>
        <li v-for="(like_item, like_index) in $store.state.musicStore.lists.like">
            <div class="imgbox">
                <img class="today_recommend" v-if="like_index == 0" v-for="item in like_item.todayRecommend" :src="item" alt="">
                <i v-if="like_index == 0" @click="goRecommend"></i>
                <a v-if="like_index != 0" :href="like_item.href" target="_blank">
                    <img :src="like_index!=0 ? like_item.imgSrc : null" alt="">
                </a>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        // console.log($(".like ul").width());
    },
    methods: {
        goRecommend() {
            
        }
    }
}
</script>

<style lang="less" scoped>
    ul{
        width: 100%;
        li{
            width: 18.92%;
            height: 145px;
            float: left;
            margin-right: 1.35%;
            background: olive;
            &:last-child {
                margin: 0;
            }
            .imgbox{
                position: relative;
                width: 100%;
                overflow: hidden;
                .today_recommend{
                    width: 50%;
                    float: left;
                }
                i{
                    position: absolute;
                    z-index: 3;
                    left: 50%;
                    top: 50%;
                    width: 48px;
                    height: 48px;
                    margin-left: -24px;
                    margin-top: -24px;
                    cursor: pointer;
                    background: url(//img.xiami.net/static/img/common/play_icon.png) no-repeat 0 0;
                }
            }
            a{
                display: block;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
