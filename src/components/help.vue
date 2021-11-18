<template>
  <div>
    <el-card>
      <div class="title">求助记录</div>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col
          :span="6"
          :offset="16"
        >
          <div class="ipt">
            <el-input
              placeholder="根据姓名查询"
              v-model="input"
              class="input-with-select"
              clearable
              style="width:250px;"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchName()"
              ></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width:80%"
        class="table"
        border
      >
        <el-table-column
          prop="updated_at"
          label="时间"
        ></el-table-column>
        <el-table-column
          prop="help_article"
          label="求助内容"
        ></el-table-column>
        <el-table-column
          prop="help_name"
          label="求助人"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="removeUserById(scope.row.userid,scope.row.created_at)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async getData() {
      const { data: res } = await this.$http.post("/api/back/helpallqiuzhu");
      if (res.code == 200) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    async searchName() {
      this.currentPage = 1;
      const help_name = this.input;
      const { data: res } = await this.$http.post("/api/back/helpnameqiuzhu", {
        help_name: help_name,
      });
      if (res.code == 200) {
        this.tableData = "";
        this.tableData = res.data;
        this.input = "";
      }
    },
    async removeUserById(id,time) {
      const confirmResult = await this.$confirm(
        "是否要删除该用户的求助动态?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      //如果用户确认删除，则返回值为字符串
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.post("/api/back/helpdelete", {
        userid: id,
        created_at: time,
      });
      
      if (res.code == 200) {
        this.$message.success("已成功删除！");
        this.getData();
      } else {
        return this.$message.error("删除失败!");
      }
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 24px;
}

.ipt {
  margin-top: 30px;
  display: flex;
  min-width: 200px;
}

.el-table {
  margin: 25px auto;
}

.block {
  width: 540px;
  margin: 32px auto;
}
</style>