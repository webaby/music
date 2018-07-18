<template>
    <div class="c-swiper">
  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="goNext">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
        <a :href="item.href" target="_blank">
            <img :src="item.imgSrc">
        </a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev">&lt;</div>
    <div class="swiper-button-next" slot="button-next">&gt;</div>
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
    </div>
</template>

<script>
export default {
    name: 'carrousel',
    props: ["swiperSlides"],
    data() {
      return {
        idx: 0,
        swiperOption: {
            // 所有配置均为可选（同Swiper配置）  
            preventClicks: true,
            autoplay: {delay: 2000},
            loop: true,
            pagination: {
                el: '.swiper-pagination'
            },
            effect : 'fade',
            // paginationClickable: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        }
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      console.log("每次都会出发吗");
      // this.swiper.slideTo(this.idx, 5000, false);
    },
    methods: {
      goNext(){
        this.idx ++;
        console.log(this.idx);
        this.swiper.slideTo(this.idx, 1000, false);
      }
    },
    computed: {
      swiper() {
        console.log(this.$refs.mySwiper.swiper);
        return this.$refs.mySwiper.swiper
      }
    },

}
</script>

<style lang="less" scoped>
    a{
        display: block;
        color: red;
    }
    img{
        width: 100%;
    }
    .swiper-button-prev, .swiper-button-next {
      top: 50%;
      margin-top: -50px;
      width: 60px;
      height: 100px;
      color: rgba(255, 255, 255, 0.3);
      font: 50px/100px "Simsun";
      text-align: center;
      background-image: none;
      border: none;
      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
</style>
