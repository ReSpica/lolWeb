<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}用户名</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
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
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`respica/admin_users/${this.id}`, this.model);
        if (res) {
          this.$router.push("/admin_users/list");
          this.$message({
            type: "success",
            message: "修改成功"
          });
        }
      } else {
        res = await this.$http.post("respica/admin_users", this.model);
        if (res) {
          this.$router.push("/admin_users/list");
          this.$message({
            type: "success",
            message: "添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`respica/admin_users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.feach();
  }
};
</script>