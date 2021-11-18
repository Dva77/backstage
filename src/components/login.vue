<template>
  <div class="login_container">
    <div class="login_box">
      <div class="logo">
        <!-- <img src="https://gitee.com/zj095/cloudimg/raw/master/202110141041247.png" alt=""> -->
        <h2>钉钉朋友圈登录</h2>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名(邮箱)"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 忘记密码 -->
        <!-- <el-form-item class="forget">
          <router-link
            :to="{ path: '/forget'}"
            replace
          >忘记密码？</router-link>
        </el-form-item> -->
        <!-- 按钮区域 -->
        <el-form-item class="btn">
          <!-- <el-button
            @click="register"
          >注册</el-button> -->
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
       return {
      loginForm: {
        account: "",
        password: "",
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 4 到 12 个字符', trigger: 'blur' },
           
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    login() {
        this.$refs.loginFormRef.validate(async valid=>{
          if(!valid) return;
          const {data:res} = await this.$http.post('/api/user/login',this.loginForm);
          if(res.code !== 200) return this.$message.error('登录失败');
          this.$message.success('登录成功');
          window.sessionStorage.setItem("token",res.data.token);
          //跳转到后台主页
          this.$router.push("/home");
        });
      }
    //     register() {
    //   this.$router.push('/register')
    // },
    // async login() {
    //   //this.$router.push("/home");
    //    const{data: res} = await this.$http.post('/api/user/adminlogin',this.loginForm)
    //   console.log(res);
    //   if(res.code == 200){
    //     this.$message.success("登录成功！")
    //     this.$router.push('/home')
    //     sessionStorage.setItem('token',res.data.token)
    //   }
    //   if(res.code == 100){
    //   this.$message.error("登录失败！")
    // }
    // },
  },
};
</script>

<style scoped>
.login_container {
  background: url("https://gitee.com/zj095/cloudimg/raw/master/202110141037588.png");
  height: 100%;
}

.login_box {
  width: 450px;
  height: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  top: 34%;
}

.forget a {
  text-decoration: none;
  color: #2b4b6b;
  float: right;
}

.btn {
  display: flex;
  justify-content: center;
}
.logo {
  position: absolute;
  /* height: 100px;
  width: 150px; */
  left: 31%;
  top: 12%;
  /* margin-bottom: 5%; */
}
</style>