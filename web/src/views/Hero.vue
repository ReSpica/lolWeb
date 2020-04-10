<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img
        src="../assets/logo.jpg"
        height="30"
      >
      <div class="px-2">
        <div class="text-white fs-ms">lol掌游宝</div>
      </div>
      <div class="px-2 flex-1">
        <div class="text-white fs-ms">攻略站</div>
      </div>
      <router-link
        tag="div"
        :to="`/`"
        class="text-white"
      >
        更多英雄 &gt;
      </router-link>
    </div>
    <div
      class="top"
      :style="{'background-image':`url(${model.picture})`}"
    >
    <div class="bg h-100 w-100">
      <div class="info text-white pl-3 pb-2 ">
        <div class="py-1">{{model.name}}</div>
        <div class="fs-xxl py-2">{{model.title}}</div>
        <div class="py-1">{{model.categories.map(v=>v.name).join(' / ')}}</div>
        <div class="cao">
          <div>
            <span class="mr-2">难度</span>
            <span class="badge bg-primary mr-2">{{model.scores.difficult}}</span>
            <span class="mr-2">推荐</span>
            <span class="badge bg-info mr-2">{{model.scores.worth}}</span>
          </div>
        </div>

      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: {
        picture: null
      },
      categories: [],
      scores: [""]
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
  position: relative;
}
.info {
  position: absolute;
  left: 0;
  bottom: 0;
}
.badge {
  margin: 0 0.25rem;
  display: inline-block;
  height: 1rem;
  width: 1rem;
  line-height:1rem;
  text-align: center;
  border-radius: 30%;
  font-size: 0.8rem;
  border: 1px solid rgba(255,255,255,0.2);
}
.cao{
  display: flex;
  justify-content:space-between;
}
.bg{
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.6));
}
</style>