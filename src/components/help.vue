<template>
  <div>
    <el-card>
      <div class="title">求助记录</div>

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
              ></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        style="width:80%"
        class="table"
        border
      >
        <el-table-column
          prop="date"
          label="时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="content"
          label="求助内容"
        ></el-table-column>
        <el-table-column
          prop="person"
          label="求助人"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center"
        >
          <template>
            <el-button
              size="mini"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
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
      tableData: [
        {
          date: "2016-05-02",
          content: "aaaaaa",
          person: "yy",
        },
        {
          date: "2016-05-04",
          content: "bbbbbbb",
          person: "ww",
        },
        {
          date: "2016-05-01",
          content: "cccccccc",
          person: "zz",
        },
      ],
      currentPage: 5,
    };
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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