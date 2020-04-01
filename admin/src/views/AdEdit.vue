<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}广告位</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告内容">
        <el-button @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加广告内容</el-button>
      </el-form-item>
      <el-row
        type="flex"
        style="flex-wrap:wrap"
      >
        <el-col
          :md="12"
          v-for="(item,i) in model.items"
          :key="i"
        >
          <el-form-item label="链接地址(URL)">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="广告图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL +'/upload'"
              :show-file-list="false"
              :on-success="res=>$set(item,'image',res.url)"
            >
              <img
                v-if="item.image"
                :src="item.image"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="danger"
              @click="model.items.splice(i,1)"
            >删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
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
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`respica/ads/${this.id}`, this.model);
        if (res) {
          this.$router.push("/ads/list");
          this.$message({
            type: "success",
            message: "修改成功"
          });
        }
      } else {
        res = await this.$http.post("respica/ad", this.model);
        if (res) {
          this.$router.push("/ads/list");
          this.$message({
            type: "success",
            message: "添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`respica/ad/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.feach();
    this.feachParents();
  }
};
</script>



<style scoped>
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
  width: 50%;
  height: auto;
  line-height: 10rem;
  text-align: center;
}
.avatar {
  width: 50%;
  height: auto;
  display: block;
}
</style>