<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-tabs
        value="skills"
        type="border-card"
      >

        <el-tab-pane
          label="基本信息"
          name="basic"
        >
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="英雄别称">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL +'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img
                v-if="model.avatar"
                :src="model.avatar"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select
              v-model="model.categories"
              multiple
            >
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              :max="9"
              style="margin-top:0.6rem;"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>

          <el-form-item label="推荐指数">
            <el-rate
              :max="9"
              style="margin-top:0.6rem;"
              show-score
              v-model="model.scores.worth"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select
              v-model="model.items1"
              multiple
            >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select
              v-model="model.items2"
              multiple
            >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              v-model="model.usageTip"
            ></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              v-model="model.battleTip"
            ></el-input>
          </el-form-item>

          <el-form-item label="团战技巧">
            <el-input
              type="textarea"
              v-model="model.teamTip"
            ></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane
          label="技能设置"
          name="skills"
        >
          <el-button @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row
            type="flex"
            style="flex-wrap:wrap"
          >
            <el-col
              :md="12"
              v-for="(item,i) in model.skills"
              :key="i"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL +'/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="avatar"
                  >
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  :rows="7"
                  v-model="item.description"
                ></el-input>
              </el-form-item>
              <el-form-item label="技能小提示">
                <el-input
                  type="textarea"
                  :rows="7"
                  v-model="item.tips"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(i,1)"
                >删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="同类英雄"
          name="partners"
        >
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem;">
        <el-button
          type="primary"
          native-type="submit"
        >保存</el-button>
      </el-form-item>

    </el-form>
  </div>

</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          worth: 0
        },
        usageTip: "",
        battleTip: "",
        teamTip: "",
        skills: []
      },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`respica/heroes/${this.id}`, this.model);
        if (res) {
          this.$router.push("/heroes/list");
          this.$message({
            type: "success",
            message: "分类修改成功"
          });
        }
      } else {
        res = await this.$http.post("respica/heroes", this.model);
        if (res) {
          this.$router.push("/heroes/list");
          this.$message({
            type: "success",
            message: "分类添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`respica/heroes/${this.id}`);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
    },
    async feachCategories() {
      const res = await this.$http.get(`respica/categories`);
      this.categories = res.data;
    },
    async feachItems() {
      const res = await this.$http.get(`respica/items`);
      this.items = res.data;
    },
    async afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
      // this.model.avatar = res.url;
    }
  },
  created() {
    this.feachCategories();
    this.feachItems();
    this.id && this.feach();
  }
};
</script>




<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>