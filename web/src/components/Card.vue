<template>
        <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="fs-xl flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-toggle "></i>
      </div>
      <div class="card-body mb-1 mt-3">
          <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,require:true}
    }
}
</script>


<style lang="scss">
@import '../assets/scss/_variables.scss';
.card{
    .card-header{
        border-bottom: 1px solid #b4b4b4;
    }
    border-top: 1px solid #dddbdb;
    border-bottom: 1px solid #dddbdb;
}
</style>