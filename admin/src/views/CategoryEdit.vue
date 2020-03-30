<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="上级分类">
        <el-select>
          <el-option v-for = "item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, this.model);
        if (res) {
          this.$router.push("/categories/list");
          this.$message({
            type: "success",
            message: "分类修改成功"
          });
        }
      } else {
        res = await this.$http.post("categories", this.model);
        if (res) {
          this.$router.push("/categories/list");
          this.$message({
            type: "success",
            message: "分类添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model = res.data;
    },
    async feachParents() {
      const res = await this.$http.get(`categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.id && this.feach();
    this.feachParents();
  }
};
</script>