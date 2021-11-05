<template>
  <div class="shouye">
      <el-card>
          <div class="form">
         <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="user_chart"
      label="头像"
      width="100px">
      <template>
          <!-- <img :src="this.form.p1" class="photos" /> -->
          <div class="photo1">
          <img src="https://gitee.com/zj095/cloudimg/raw/master/202110230933373.png" alt="">
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="sys_level"
      label="等级"
      >
    </el-table-column>
    <el-table-column
      prop="is_sys"
      label="职位"
      >
    </el-table-column>
    <el-table-column
      prop="deviceld"
      label="设备"
      >
    </el-table-column>
    <el-table-column
      prop="userid"
      label="用户id"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      >
       <template slot-scope="scope">
           <!-- 开关 -->
           <div class="switch">
          <el-switch
  style="display: block"
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="启用"
  inactive-text="禁用">
</el-switch>
</div>
      <!-- 查看按钮 -->
      <div class="btn1">
      <el-button type="primary" size="mini" @click="lookuser(scope.row)">查看</el-button>
  </div>
    </template>
    </el-table-column>
  </el-table>
    <!-- 分页区域 -->
    <div class="page1">
               <el-pagination
               @size-change="handleSizeChange1"
               @current-change="handleCurrentChange1"
               :current-page="currentPage1"
               :page-sizes="[4]"
               :page-size="pageSize1"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total1">
               </el-pagination>
               </div>
  </div>
      </el-card>
      <!-- 查看的对话框 -->
        <el-dialog
         title="评论记录" 
         :visible.sync="lookDialogVisible"
         width="50%"
           >
            <template>
  <el-select v-model="value" placeholder="请选择" style="width:15%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
           <!-- 搜索框 -->
           <el-input
            placeholder="请输入内容"
            clearable
          style="width:85%" >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <el-table :model="lookForm"  label-width="80px">
            <el-table-column prop="user_name" label="时间"></el-table-column>
            <el-table-column prop="user_name" label="评论"></el-table-column>
            <el-table-column prop="user_name" label="求助or动态"></el-table-column>
            <el-table-column prop="user_name" label="操作">
                <template>
                     <el-button type="danger" size="mini" >删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
               <!-- 分页区域 -->
               <div class="page2">
               <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[6]"
               :page-size="pageSize"
               layout="total, sizes, prev, pager, next, jumper"
               :total="total">
               </el-pagination>
               </div>
            <el-button type="primary" @click="addUser()">确定</el-button>
            <!-- @click="addDialogVisible=false" -->
          </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
    data() {

        
        return {
            options:[
                {
                    value:'选项1',
                    label:'动态'
                },
                 {
                    value:'选项2',
                    label:'求助'
                }
            ],
             // 控制修改用户对话框的显示与隐藏
      lookDialogVisible: false,
              //分页
      currentPage: 1,
      pageSize: 6,
      total:0,
      currentPage1: 1,
      pageSize1: 4,
      total1:0,
             value1: true,
             value2: true,
            tableData:[
                {
                    user_chart:"",
                   user_name:"zj",
                    sys_level:"1",
                    is_sys:"1",
                    deviceld:"2",
                    userid:"3",
                },
                {
                    user_chart:"",
                   user_name:"zj",
                    sys_level:"1",
                    is_sys:"1",
                    deviceld:"2",
                    userid:"3",
                },

            ],
            lookForm:[
                
            ]
        }

    },
    methods:{
        lookuser() {
             this.lookDialogVisible = true
        },
         handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
     handleSizeChange1(val) {
      this.pageSize = val;
    },
    handleCurrentChange1(val) {
      this.currentPage = val;
    }
    }


}
</script>

<style scoped>
.photo1{
   height: 100px;
   width: 50px;
}
.photo1 img{
    height: 100%;
    width: 150%;
}
.switch{
    margin-bottom: 10px;
}
.btn1{
    position: absolute;
    right: 88px;
}
.page1{
    text-align: center;
    margin-top: 15px;
}
.page2{
    text-align: center;
}
</style>