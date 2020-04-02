<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="mixin_uploadUrl"
          :headers="mixin_getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="model.icon"
            :src="model.icon"
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
      model: {}
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`respica/items/${this.id}`, this.model);
        if (res) {
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "分类修改成功"
          });
        }
      } else {
        res = await this.$http.post("respica/items", this.model);
        if (res) {
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "分类添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`respica/items/${this.id}`);
      this.model = res.data;
    },
    async afterUpload(res){
      this.$set(this.model,'icon',res.url);
      this.model.icon = res.url;
    }
  },
  created() {
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>