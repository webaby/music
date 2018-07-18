<template>
    <div class="main">
        <MySwiper :swiperSlides="swiperSlides"></MySwiper>

        <div class="like">
            <div class="title">
                <h3>猜你喜欢</h3>
            </div>
            <div class="like_first"></div>
            <div class="like_ul">
                <Like listname="likelist"></Like>
            </div>
        </div>

    </div>
</template>

<script>
import MySwiper from '../MySwiper/MySwiper.vue';
import Like from '../Like/Like.vue';
export default {
    data(){
        return {
            swiperSlides: [
                {
                    "imgSrc": "//pic.xiami.net/images/common/uploadpic/52/1531123165752.jpg", 
                    "href": "https://www.xiami.com/song/1803602782?spm=a1z1s.6843761.1478643741.1.OSXOZk"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/common/uploadpic/14/1531362681314.jpg", 
                    "href": "https://www.xiami.com/album/2103771869?spm=a1z1s.6843761.1478643741.2.OSXOZk"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/common/uploadpic/46/1531362212846.jpg", 
                    "href": "https://www.xiami.com/song/1803658063?spm=a1z1s.6843761.1478643741.3.OSXOZk"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/common/uploadpic/86/1529897295086.jpg", 
                    "href": "https://www.xiami.com/album/2103720983?spm=a1z1s.6843761.1478643741.4.OSXOZk"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/common/uploadpic/33/1530587510333.jpg", 
                    "href": "https://act.xiami.com/wow/xiami/act/rock18?spm=a1z1s.6843761.1478643741.5.OSXOZk"
                }
            ]
        }
    },
    mounted(){
        // console.log($(".inner_c"));
        // var $lisul_like = $(".like");
        // console.log(this.$store.state.musicStore.lists.like.length)
        // $(".like .like_first").css("width", )

    },
    components: {
        MySwiper,
        Like
    }
}
</script>

<style lang="less" scoped>
    .main{
        height: 500px;
        background: pink;
        padding: 15px;
        .like{
            width: 100%;
            overflow: hidden;
        }
    }
</style>
