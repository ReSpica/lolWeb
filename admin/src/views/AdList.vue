<template>
  <div>
    <h1>广告位列表</h1>
    <el-table
      :data="items"
      stripe
    >

      <el-table-column
        prop="_id"
        label="ID"
        width="250"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="广告位名称"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click="remove(scope.row)"
            type="primary"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("respica/ads");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确认删除?"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`respica/ads/${row._id}`);
        if (res) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        }
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>