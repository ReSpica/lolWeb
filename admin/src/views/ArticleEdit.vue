<template>
  <div class="about">
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="所属分类">
        <el-select
          v-model="model.categories"
          multiple
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
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
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();//自带规则
      formData.append("file", file);//file字段（匹配后端，通常都是file）

      const res = await this.$http.post("upload", formData);//传送存有文件的表单数据给后端上传文件接口
      console.log(res.data.url);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);//自带标准，把后端的url给到最好的参数就行
      resetUploader();//自带标准，更新新url的图片
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`respica/articles/${this.id}`, this.model);
        if (res) {
          this.$router.push("/articles/list");
          this.$message({
            type: "success",
            message: "分类修改成功"
          });
        }
      } else {
        res = await this.$http.post("respica/articles", this.model);
        if (res) {
          this.$router.push("/articles/list");
          this.$message({
            type: "success",
            message: "分类添加成功"
          });
        }
      }
    },
    async feach() {
      const res = await this.$http.get(`respica/articles/${this.id}`);
      this.model = res.data;
    },
    async feachCatgories() {
      const res = await this.$http.get(`respica/categories`);
      this.categories = res.data;
    }
  },
  created() {
    this.id && this.feach();
    this.feachCatgories();
  }
};
</script>