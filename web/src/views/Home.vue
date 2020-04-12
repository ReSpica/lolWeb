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
    <respica-card1
      icon="LC_icon_menu_line"
      title="新闻资讯"
      :categories="newsCats"
    >

      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/article/${item._id}`"
          class="py-2 d-flex flex-1 fs-lg"
          v-for="(item,i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{item.title}}</span>
          <span>{{item.date}}</span>
        </router-link>
      </template>

    </respica-card1>
    <!-- 新闻资讯 -->

    <!-- 英雄列表 -->
    <respica-card1
      icon="card-hero"
      title="英雄列表"
      :categories="heroesCats"
    >
      <template #img="">
        <img
          src="../assets/images/hero.jpg"
          alt=""
          width="100%"
        >
      </template>
      <template #items="{category}">
        <div class="d-flex felx-wrap">
          <router-link
          tag="div"
          :to="`/hero/${item._id}`"
            class="py-2 text-center "
            v-for="(item,i) in category.heroes"
            :key="i"
            style="width:20%"
          >
            <div class="mr-3">
              <img
                :src="item.avatar"
                alt=""
                width="100%"
              >
              <div>{{item.name}}</div>
            </div>
          </router-link>
        </div>
      </template>

    </respica-card1>
    <!-- 英雄列表 -->

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
      },
      newsCats: [],
      heroesCats: []
    };
  },
  methods: {
    async fecthNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fecthHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.heroesCats = res.data;
    }
  },
  created() {
    this.fecthNewsCats();
    this.fecthHeroesCats();
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
  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
  .nav-item {
    width: 24%;
    border-left: 1px solid #dddbdb;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}

.text-ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
