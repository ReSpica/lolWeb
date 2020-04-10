<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header d-flex ai-center pb-3">
      <i
        class="iconfont"
        :class="`icon-${icon}`"
      ></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-toggle "></i>
    </div>
    <slot name="img"></slot>
    <div class="card-body mb-1 mt-3">
      <div class="nav d-flex jc-between">
        <div
          class="nav-item"
          :class="{active: active === index}"
          v-for="(category,index) in categories"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
        >
          <div class="nav-link">
            {{category.name}}
          </div>
        </div>
      </div>
      <div class="mt-2">
        <swiper ref="list" @slide-change="()=>active = $refs.list.$swiper.realIndex">
          <swiper-slide
            v-for="(category,index) in categories"
            :key="index"
          >
          <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>


<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid #b4b4b4;
  }
  border-top: 1px solid #dddbdb;
  border-bottom: 1px solid #dddbdb;
}
</style>