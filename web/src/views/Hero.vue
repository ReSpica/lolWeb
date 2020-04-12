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

    <div class="hero-info bg-white">
      <!-- 英雄初识和进阶攻略 -->
      <div class="d-flex jc-center text-center">
        <div class="info-text mt-3 my-3">
          <span class="active">英雄初识</span>
        </div>
        <div class="info-text mt-3 my-3 ">
          <span class="">进阶攻略</span>
        </div>
      </div>
      <!-- 英雄介绍视频和一图识英雄 -->
      <div class="grup-btn mx-2 py-3 d-flex jc-between text-center">
        <div class="btn py-2 bg-line text-center d-flex jc-center">
          <div
            class="iconfont icon-tupian text-primary"
            style="margin-right:0.5rem"
          />
          <span class="fs-md">英雄介绍视频</span>
        </div>
        <div class="btn py-2 bg-line text-center d-flex jc-center">
          <div
            class="iconfont icon-shipin text-primary"
            style="margin-right:0.5rem"
          />
          <span class="fs-md">一图识英雄</span>
        </div>
      </div>
      <!-- 技能列表 -->
      <div class="skill-goup pt-3 pb-4 d-flex jc-between mx-2">
        <div
          class="skill text-center"
          v-for="(item,i) in model.skills"
          :key="i"
          @click="skillClick(i)"
        >
          <img
            :src="item.icon"
            alt=""
            class="img"
            :class="{active: active === i}"
          />
        </div>
      </div>
      <!-- 循环所有技能和小提示 -->
      <div
        v-for="(item,i) in model.skills"
        :key="i"
        class="hidden"
        :class="{active1:active === i}"
      >
        <!-- 技能说明 -->
        <div class="skill-detail mx-2">
          <div class="fs-xl mb-3">{{item.name}}</div>
          <div class="description py-3 fs-ms">{{item.description}}</div>
        </div>
        <!-- 小提示 -->
        <div class="skill-tip py-3 text-grey1 mx-2">
          <span>小提示：</span>
          <span>{{item.tips}}</span>
        </div>
      </div>
    </div>

    <div class="tab bg-white p-2 mt-4 ">
      <div class="d-flex py-3">
        <div class="iconfont icon-card-hero mr-2"></div>
        <div class="fs-xl">
          使用技巧
        </div>
      </div>
      <div class="fs-lg">
        {{model.usageTip}}
      </div>
    </div>

    <div class="tab bg-white p-2 mt-4 ">
      <div class="d-flex py-3">
        <div class="iconfont icon-card-hero mr-2"></div>
        <div class="fs-xl">
          对抗技巧
        </div>
      </div>
      <div class="fs-lg">
        {{model.battleTip}}
      </div>
    </div>

    <div class="tab bg-white p-2 mt-4 ">
      <div class="d-flex py-3">
        <div class="iconfont icon-card-hero mr-2"></div>
        <div class="fs-xl">
          团战思路
        </div>
      </div>
      <div class="fs-lg">
        {{model.teamTip}}
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
        picture: null,
        categories: [],
        scores: [""]
      },
      active: 0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/hero/${this.id}`);
      this.model = res.data;
    },
    skillClick(i) {
      this.active = i;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.hero-info {
  border: solid 1px #eee;
}
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
  line-height: 1rem;
  text-align: center;
  border-radius: 30%;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.cao {
  display: flex;
  justify-content: space-between;
}
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
}
.hero-info {
  .info-text {
    width: 45%;
    height: 16px;
    font-size: 1.125rem;
    align-items: center;
    border-bottom: 2px solid transparent;
    padding-bottom: 0.2rem;
  }
  .active {
    color: map-get($colors, "primary");
    border-bottom: 2px solid map-get($colors, "primary");
  }
  .grup-btn {
    border-top: 2px solid #eee;
  }
  .btn {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    width: 49%;
    border-radius: 10%;
    border: #eee solid 1px;
  }
  .skill {
    width: 18%;
    border-radius: 50%;
  }
  .img {
    width: 80%;
    height: auto;
    border-radius: 50%;
    &.active {
      border: 3px solid map-get($colors, "primary");
    }
  }
  .description {
    border-bottom: 2px solid #eee;
  }
  .hidden {
    display: none;
  }
  .active1 {
    display: inline;
  }
}
</style>