<template>
  <div>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <div class="img">
        <img :src="scope.row.user_chart" alt="">
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[]
    }
  },
  created() {
    this.showData();
  },
  methods: {
    async showData() {
      const {data:res} = await this.$http.post('/api/back/userlook')
      console.log(res);
      this.tableData = res.data;
    }
  }
}
</script>

<style scoped>
.img {
  background-size: cover;
  width: 200px;
  height: 150px;
}
</style>