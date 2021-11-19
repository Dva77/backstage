<template>

  <div class="Acc_table" >

    <el-card class="box-card">

    <div>

        <el-col :span="8">

              <el-select v-model="value1"  placeholder="请选择">

              <el-option

                v-for="item in options"

                :key="item.value"

                :label="item.label"

                :value="item.value">

              </el-option>

            </el-select>



            <el-button type="primary" icon="el-icon-search" @click="optionsearch(value1)">搜索</el-button>

        </el-col>

        <el-col :span="6"> 

            <el-button type="primary" @click="addpop=true;" class="btn_add">点击添加</el-button>

        </el-col>

    </div>

    <el-table :data="tableData" style="width: 100%" border>

        <el-table-column label="编号" align="center" prop="lab_id"></el-table-column>

        <el-table-column label="实验室名称" align="center" prop="lab_name">

          <template  slot-scope="scope">

                <div v-if = "scope.row.lab_name=='2'">普通实验室</div>

                <div v-else-if = "scope.row.lab_name=='3'">开放实验室</div>

              </template>

        </el-table-column>

        <el-table-column label="实验室状态" align="center" prop="lab_state1">

           <template  slot-scope="scope">

                <div v-if = "scope.row.lab_state1=='0'">

                  <div style="color:green">未借用</div>

                </div>

                <div v-else-if = "scope.row.lab_state1=='1'">

                 <div style="color:red">已借用</div>

                </div>

              </template>

        </el-table-column>

        <el-table-column label="操作" width="400%" align="center">

        <template slot-scope="scope">

            <el-switch v-model="scope.row.lab_state2"  @change="userStateChanged(scope.row)"></el-switch>

            <span v-if="scope.row.lab_state2 == false">

              <div style="color:red">禁用</div>

            </span>



            

            <span v-if="scope.row.lab_state2 == true">

              <div style="color:green">启动</div>

            </span>

        </template>

        </el-table-column>



    





    

  </el-table>



    <!-- 添加弹窗 -->

    <el-dialog title="添加信息" :visible.sync="addpop" width="960px" >

      <el-form :v-model="Addlab" ref="" label-width="80px"  width="200%">

          <el-form-item label="实验室编号"  label-width="160px"  prop="addid">

          <el-input v-model="Addlab.addid"></el-input>

        </el-form-item>  

        <el-form-item label="实验室名称"  label-width="160px"  prop="addname">

          <el-select v-model="addvalue1"  placeholder="请选择">

              <el-option

                v-for="item in addoptions"

                :key="item.value"

                :label="item.label"

                :value="item.value">

              </el-option>

            </el-select>

        </el-form-item>   

        <el-button type="danger" @click="addpop=false">退出</el-button>

        <el-button type="success" @click="addpop=false;Addpeople(Addlab,addvalue1)">

          添加

        </el-button>

      </el-form>

    </el-dialog>

    



    <!-- 分页 -->

    <el-pagination

      @current-change="handleCurrentChange"

      :current-page="queryInfo.pagenum"

      :page-sizes="[100, 200, 300, 400]"

      :page-size="queryInfo.pagesize"

      layout="total, prev, pager, next, jumper"

      :total="total">

    </el-pagination>



    </el-card>

  </div>

</template>



<script>

export default {

  created() {

      this.getUserList()

    },

  data() {

      return {

      //添加弹窗   

      addpop:false,

       // 分页

      currentPage1: 5,

      currentPage2: 5,

      currentPage3: 5,

      currentPage4: 4,



     

      // 添加设备

      Addlab:{

        addid:'',

        addname:'',

        addmodel:'',

        addsum_num: '',

      },

          

     // 表单

      tableData: [],

      

      // 分页

      queryInfo:{

        query:'',

        // 当前页数

        pagenum:1,

        // 每页多少人

        pagesize: 2

      },

      total: 0,



       //通过职位搜索

       options: [{

          value: '2',

          label: '普通实验室'

        },{

          value: '3',

          label: '开放实验室'

        }, ],

        value1: [],

        value2: []

       ,



       //添加实验室

       addoptions: [{

          value: '2',

          label: '普通实验室'

        },],

        addvalue1: [],

        addvalue2: []

       ,



      };

    },

    methods: {

       // 分页

      async handleCurrentChange(newPage) {

        // console.log(`当前页: ${newPage}`);

        this.queryInfo.pagenum = newPage

        

         const { data: res } = await this.$http.post(`api/superadmin/name?page=${newPage}`)

       

        if( res.code !== 200 ) {

        //  console.log('获取用户列表失败！')

        }

        this.tableData = res.data.data

        res.data.data.forEach(item => {

          if(item.lab_state2 == 0){

            item.lab_state2 = false

          }

          else {

            item.lab_state2 = true

          }

        })

        this.total = res.data.total

        // console.log(this.tableData);

        // this.getUserList()

        // this.queryInfo.pagenum = res.data.current_page

        // this.queryInfo.pagesize = res.data.per_page

      

        // console.log(res);

      },

        // 获取所有人显示

      async getUserList() {

        const { data: res } = await this.$http.post('/api/superadmin/name')

       

        if( res.code !== 200 ) {

        //  console.log('获取用户列表失败！')

        }



        this.total = res.data.total

        this.queryInfo.pagenum = res.data.current_page

        this.queryInfo.pagesize = res.data.per_page



          res.data.data.forEach(item => {

          if(item.lab_state2 == 0){

            item.lab_state2 = false

          }

          else {

            item.lab_state2 = true

          }

        })

         this.tableData = res.data.data

        // console.log(res);

      },





      // 表单

      handleEdit(index, row) {

        // console.log(index, row);

      },

      handleDelete(index, row) {

        // console.log(index, row);

      },

      

      // 修改状态按钮

      async userStateChanged(val) {

        // console.log(val);

        const ConfirmResult = await this.$confirm(

        "此操作将修改实验室状态, 是否继续?",

        "提示",

        {

          confirmButtonText: "确定",

          cancelButtonText: "取消",

          type: "warning",

          center:true,

        }

      ).catch((err) => err);

      if (ConfirmResult !== "confirm") {

         val.lab_state2 = !val.lab_state2

        return this.$message.info("已取消修改");

      }

        // console.log(val.lab_state2);

        if (val.lab_state2 == true)

        {

           val.lab_state2 = 1

          //  val.switch_state = true

        }

        else if (val.lab_state2 == false)

        {

           val.lab_state2 = 0

          //  val.switch_state = false

        }

        // console.log(val.lab_state2);

        

    

        const { data: res } = await this.$http({

            method:'post',

            url:'/api/superadmin/enable',

            data:this.$qs.stringify({    //这里是发送给后台的数据

                  lab_id:val.lab_id,

                  lab_state2: val.lab_state2,

            })

        }) 

        if( res.code !== 200 ) {

          this.$message.info("修改失败");

          //  console.log(val);

          // console.log(res);

        //   // console.log(val);

        //  alert("添加失败");

         return

        }

          this.getUserList()

          this.$message.success("修改成功！");

          // val.lab_state2 = val.lab_state2

        // console.log(res);

        //  console.log(val.lab_state2);

      

        

        // console.log(val);

      },



       // 添加人员弹窗

      async Addpass() {

        // console.log(val);

      const ConfirmResult = await this.$confirm(

        "此操作将添加实验室信息, 是否继续?",

        "提示",

        {

          confirmButtonText: "确定",

          cancelButtonText: "取消",

          type: "warning",

          center:true,

        }

      ).catch((err) => err);

      if (ConfirmResult !== "confirm") {

        return this.$message.info("已取消添加");

      }

      this.$message.success("添加成功！");

    

      },



        // 添加人员

     async Addpeople(val,val2) {

       const ConfirmResult = await this.$confirm(

        "此操作将添加实验室信息, 是否继续?",

        "提示",

        {

          confirmButtonText: "确定",

          cancelButtonText: "取消",

          type: "warning",

          center:true,

        }

      ).catch((err) => err);

      if (ConfirmResult !== "confirm") {

        return this.$message.info("已取消添加");

      }

      

           const { data: res } = await this.$http({

                method:'post',

                url:'/api/superadmin/add',

                data:this.$qs.stringify({    //这里是发送给后台的数据

                      lab_id:val.addid,

                      lab_name: val2,

                })

            }) 

            if( res.code !== 200 ) {

              this.$message.info("添加失败");

              //  console.log(val);

              // console.log(res);

            //   // console.log(val);

            //  alert("添加失败");

             return

            }

            this.$message.success("添加成功！");

            // console.log(res);

            this.getUserList();

            

            // console.log(val);

      },



      //按职位搜索

      async optionsearch(val){

       const { data: res } = await this.$http({

           method:'post',

           url:'/api/superadmin/name',

           data:this.$qs.stringify({    //这里是发送给后台的数据

                 lab_name:val,       

           })

       })

        if( res.code !== 200 ) {

          this.$message.info("搜索失败");

         return this.$messaage.error('获取用户列表失败！')

       }

        this.$message.success("搜索成功！");

        // console.log(res);

        res.data.data.forEach(item => {

          if(item.lab_state2 == 0){

            item.lab_state2 = false

          }

          else {

            item.lab_state2 = true

          }

        })

        this.total = res.data.data.total

        this.tableData = res.data.data

      //  console.log(res);

        },



     

      

     



    }

}

</script>



<style scoped>

.Equ_table {

  position: relative;

  height: 100%;

  background-color: #fff;

} 

.el-button {

  display: inline-block;

}

.el-pagination {

  margin-top: 2%;

}

.Equ_logo {

  margin-top: 20px;

  margin-bottom: 10px;

  display: inline-block;

 

}

.Equ_logo p {

  padding-left: 20px;

  padding-top: 20px;

  font-weight: 600;

  font-size: 18px;

  float: right;

}



.el-table--fit {

  margin-top: 50px;

}

select {

  width: 60%;

  height: 40px;

}

.btn_add {

  margin-left: 150%;

}

</style>