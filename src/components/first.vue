<template>
  <div class="shouye">
      <el-card>
          <div class="form">
         <el-table
    :data="tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )"
    stripe
    style="width: 100%">
    <el-table-column
      
      label="头像"
      width="100px">
      <template  slot-scope="scope">
          <!-- <img :src="this.form.p1" class="photos" /> -->
          <div class="photo1">
          <img :src="scope.row.user_chart">
          </div>
      </template>
    </el-table-column>
    <el-table-column
    width="100px"
      prop="user_name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
    width="100px"
      prop="sys_level"
      label="等级"
      >
    </el-table-column>
    <el-table-column
    width="100px"
      prop="is_sys"
      label="职位"
      >
    </el-table-column>
    <el-table-column
    width="285px"
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
  v-model="scope.row.state"
  @change="userStateChanged(scope.row)"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="启用"
  inactive-text="禁用">
         </el-switch>
</div>
      <!-- 查看按钮 -->
      <div class="btn1">
      <el-button type="primary" size="mini" @click="lookuser(scope.row)">动态查看</el-button>
      </div>
      <div class="btn2">
      <el-button type="primary" size="mini" @click="lookuser1(scope.row)">求助查看</el-button>
      </div>
    </template>
    </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="page1">
  <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
    </div>
      </el-card>
      <!-- 查看动态的对话框 -->
      <el-dialog title="动态记录" :visible.sync="lookDialogVisible">
        <!-- 下拉框 -->
        <div class="Dropdownbox">
      <!-- <el-select v-model="valueA" placeholder="请选择">
      <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select> -->

    <el-select
     v-model="lookForm.created_at"
     style="margin-left: 150px;"
     placeholder="请选择时间">
    <el-option
      v-for="item in options1"
      :key="item.created_at"
      :label="item.created_at"
      :value="item.created_at">
    </el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 20px;" @click="query1" >查询</el-button>
    </div>
      <el-table :data="lookForm">
      <el-table-column property="created_at" label="日期" width="300"></el-table-column>
      <el-table-column property="comment_article" label="动态内容" width="300"></el-table-column>
      <!-- <el-table-column property="" label="求助or动态"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delete1(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- <div class="submit">
      <el-button type="primary" >提交</el-button>
      </div> -->
      </el-dialog>

      <!-- 查看求助的对话框 -->
      <el-dialog title="求助记录" :visible.sync="lookDialogVisible1">
        <!-- 下拉框 -->
        <div class="Dropdownbox">
      <!-- <el-select v-model="valueC" placeholder="请选择">
      <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select> -->

    <el-select
     v-model="lookForm1.created_at"
     style="margin-left: 150px;"
     placeholder="请选择时间">
    <el-option
      v-for="item in options2"
      :key="item.created_at"
      :label="item.created_at"
      :value="item.created_at">
    </el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 20px;" @click="query2">查询</el-button>
    </div>
      <el-table :data="lookForm1">
      <el-table-column property="created_at" label="日期" width="300"></el-table-column>
      <el-table-column property="help_article" label="求助内容" width="300"></el-table-column>
      <!-- <el-table-column property="" label="求助or动态"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delete2(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- <div class="submit">
      <el-button type="primary" >提交</el-button>
      </div> -->
      </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserlist();
    this.lookuser();
    this.lookuser1();
  },
    data() {
        return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
        options1: [],
        options2: [],
        value:{},
             // 控制修改用户对话框的显示与隐藏
      lookDialogVisible: false,
      lookDialogVisible1: false,
              //分页
             value2: true,
             
            tableData:[
                {
                  user_chart:"",
                   user_name:"",
                    sys_level:"",
                    is_sys:"",
                    deviceld:"",
                    userid:"",
                },
                
            ],
            lookForm:[
              {created_at:'',},
            ],
            lookForm1:[
              {created_at:'',},
            ],
            userids:'',
            useridh:'',
            created_at1:'',
            created_at2:''
        }

    },

    methods:{
       async userStateChanged(val4){
         console.log(val4);
         if(val4.state===false){
        // val4.state = 1
        var token = sessionStorage.getItem('token')
        const{data: res1} = await this.$http.post('/api/back/userclose?token='+token,{userid:val4.userid})
        console.log(res1);
        
         }
        if(val4.state===true){
        // val4.state = 0
        var token = sessionStorage.getItem('token')
        const{data: res2} = await this.$http.post('/api/back/useropen?token='+token,{userid:val4.userid})
        console.log(res2);
        
        }
        },
        async query1(){
           var token = sessionStorage.getItem('token')
          const{data: res} = await this.$http.post('/api/back/commentstatelook?token='+token,{userid:this.userids,created_at:this.lookForm.created_at})
          this.lookForm=res.data
        },
         async query2(){
             var token = sessionStorage.getItem('token')
            const{data: res} =await this.$http.post('/api/back/helpstatelook?token='+token,{userid:this.useridh,created_at:this.lookForm1.created_at})
            this.lookForm1=res.data
          },
      async delete1(val2) {
        var token = sessionStorage.getItem('token')
        const{data: res} = await this.$http.post('/api/back/commentdelete?token='+token,{userid:this.userids,created_at:val2.created_at})
        console.log(res);
        // this.lookuser();
       },
       async delete2(val3) {
         var token = sessionStorage.getItem('token')
         const{data: res} = await this.$http.post('/api/back/helpdelete?token='+token,{userid:this.useridh,created_at:val3.created_at})
         console.log(res);
        // this.lookuser1();
       },
       //动态
        async lookuser(val) {
            this.userids = val.userid
            this.lookDialogVisible = true
            var token = sessionStorage.getItem('token')
            const{data: res} = await this.$http.post('/api/back/allcommentlook?token='+token,{userid:val.userid})
            console.log(res);
            this.lookForm=res.data
            //下拉框
            const{data: res1} = await this.$http.post('/api/back/lookcommenttime?token='+token,{userid:val.userid})
            console.log(res1);
            this.options1=res1.data 
            // console.log(this.options1);
        },
     
        //求助
         async lookuser1(val1) {
             this.useridh = val1.userid
             this.lookDialogVisible1 = true
             var token = sessionStorage.getItem('token')
             const{data: res} = await this.$http.post('/api/back/allhelplook?token='+token,{userid:val1.userid})
             this.lookForm1=res.data
            // 下拉框
            const{data: res1} = await this.$http.post('/api/back/lookhelptime?token='+token,{userid:val1.userid})
            this.options2 = res1.data
        },
    // 监听  pagesize 改变的事件
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // // 监听 页码值 改变的事件
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async getuserlist(){
    var token = sessionStorage.getItem('token')
    const {data: res} = await this.$http.post('/api/back/userlook?token='+token)
    console.log(res);
     res.data.forEach(item => {

          if(item.state == 0){

            item.state = false

          }

          else {

            item.state = true

          }

        })
     this.tableData = res.data

    for(var i =0 ; i<res.data.length;i++){
      if(res.data[i].is_sys==0){
        res.data[i].is_sys = '用户'
      }
      else if(res.data[i].is_sys==1) {
        res.data[i].is_sys = '管理员'
      }
    }

      if(res.code == 200){
        this.$message.success("查询成功！");
    }
      if(res.code == 100){
      this.$message.error("查询失败！")
    }
    }
    }


}
</script>

<style scoped>
.photo1{
   height: 70px;
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
.submit{
  margin-top: 10px;
  margin-left: 20rem;
}
.Dropdownbox{
  margin-left: 5rem;
}
.btn2{
 padding-right: 50px !important;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 9px 10px;
}
</style>