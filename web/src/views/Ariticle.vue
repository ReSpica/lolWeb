<template>
  <div class="page-artice" v-if="model">
    <div class="d-flex py-3 px-2 ai-center bg-white">
      <div class="iconfont icon-fanhui text-info" v-on:click="back"></div>
      <div class="flex-1 px-2 text-ellipsis text-info">
        {{model.title}}
      </div>
      <div class="text-grey">
        2020-04-08
      </div>
    </div>
    <div v-html="model.body" class="body px-2"></div>
  </div>
</template>


<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    back(){
      this.$router.go(-1);
    }
  },
  created() {
    this.fetch()
  }
};
</script>



<style lang="scss">
.text-ellipsis {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body img{
    max-width: 100%;
    height: auto;
}
</style>