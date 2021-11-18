<template>
  <div>
    <!--标题-->
    <h2 style="text-align:center">动态记录</h2>
    <!--搜索框-->
      <el-input
      style="width:25%;padding-bottom:5px"
      placeholder="请输入姓名进行搜索"
      v-model="search">
  </el-input>
    <!-- 搜索 -->
    <el-button type="primary" icon="el-icon-search" @click="Search(search)" style="padding:10px;margin:10px">搜索</el-button>
    <!-- 刷新 -->
    <el-button type="primary" icon="el-icon-refresh" @click="refresh" style="padding:10px;margin:10px">刷新</el-button>
    <!--表格-->
    <el-table
      :data="tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
            )"
      style="width: 100%;padding:10px;margin:10px auto">
      <el-table-column
        prop="created_at"
        label="日期"
        width="200">
      </el-table-column>
      <el-table-column
        prop="comment_article"
        label="内容"
        width="600">
      </el-table-column>
      <el-table-column
        prop="comment_name"
        label="姓名"
        width="200">
      </el-table-column>
         <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <br>
    <!--分页组件-->
   <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search:'',
      searchData:'',
      currentPage:1,
      pageSize:7,
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      var token = sessionStorage.getItem('token');
      console.log(token);
      const { data: res } = await this.$http.post('/api/back/commentalldongtai?token='+token);
      console.log(res);
      this.tableData = res.data;
      // console.log(res.data.map(o=>{return[o.comment_name]}));
      sessionStorage.setItem('comment_name', res.data.map(o=>{return[o.comment_name]}));
    },
    async handleDelete(index, row) {
        console.log(index, row);
        console.log(row.userid);
        var token = sessionStorage.getItem('token');
        const { data: res } = await this.$http.post('/api/back/commentdelete',
        {
          token: token,
          userid: row.userid,
          created_at: row.created_at
        })
        console.log(res);
      if(res.code!==200){
        return this.$message.error('删除失败！')
      }else{
      this.$message.success('删除成功！')
      }
      this.$router.go(0);
      console.log(res);
      },
    async Search(search) {
      var token = sessionStorage.getItem('token');
      var comment_name = sessionStorage.getItem('comment_name');
      console.log(comment_name);
      console.log(search);
      const { data:res } = await this.$http.post('/api/back/commentnamedongtai',
      {
        token: token,
        comment_name: search
      })
      console.log(res);
      if(res.code==200) {
        this.tableData = res.data;
      }
    },
    refresh() {
      this.$router.go(0);
    },
      handleSizeChange(val) {
        this.pageSize=val;
      },
      handleCurrentChange(val) {
       this.currentPage=val;
      }
  }
}
</script>

<style scoped>

</style>