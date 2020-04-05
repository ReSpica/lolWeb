<template>
  <div>

    <!-- 轮播图 -->
    <swiper
      :options="swiperOptions"
      :auto-update="true"
      :auto-destroy="true"
    >
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/s1.jpeg"
          alt=""
        >
      </swiper-slide>
      <swiper-slide><img
          class="w-100"
          src="../assets/images/s2.jpeg"
          alt=""
        ></swiper-slide>
      <swiper-slide><img
          class="w-100"
          src="../assets/images/s3.jpeg"
          alt=""
        ></swiper-slide>
      <swiper-slide><img
          class="w-100"
          src="../assets/images/s4.jpeg"
          alt=""
        ></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-2 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- 轮播图 -->

    <!-- 精灵图片 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">

      <div class="d-flex flex-wrap">
        <div
          class="nav-item mb-3"
          v-for="n in 10"
          :key="n"
        >
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>

      <div class="bg-line py-2 d-flex jc-center ai-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>

    </div>
    <!-- 精灵图片 -->

    <!-- 新闻资讯 -->
    
    <!-- 新闻资讯 -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: { delay: 3000 }
        // Some Swiper option/callback...
      }
    };
  }
};
</script>



<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
  }
  .swiper-pagination-bullet-active {
    background: map-get($colors, "primary");
  }
}
.nav-icons {
  border-top:1px solid #b4b4b4;
  border-bottom:1px solid #b4b4b4;
  .nav-item {
    width: 24%;
    border-left: 1px solid #dddbdb;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
</style>
