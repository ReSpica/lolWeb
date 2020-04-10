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
    <div class="top" :style="{'background-image':`url(${model.picture})`}">
        <div class="info text-white p-3">
            <div class="">{{model.name}}</div>
            <div class="fs-xxl py-2">{{model.title}}</div>
            <div>{{model.categories.map(v=>v.name).join(' / ')}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data(){
      return{
          model:{
              picture:null
          }
      }
  },
  methods:{
      async fetch(){
          const res= await this.$http.get(`/hero/${this.id}`)
          this.model = res.data
      }
  },
  created(){
      this.fetch()
  }
};
</script>

<style>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
.top{
    height:50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
}

</style>