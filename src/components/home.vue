<template>
  <div class="container">
    <el-container class="home-container">
      <!-- 头部导航栏 -->
      <el-header>
        <div class="header">
          <!-- <img
            src="https://www.nsu.edu.cn/img/logo.png"
            alt=""
          > -->
           <span> 钉钉朋友圈 | 后台</span>
        </div>
        <el-button
          type="primary"
          @click="loginout"
        >退出登录</el-button>
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="250px">
          <el-menu
            background-color="#496EE3"
            text-color="#fff"
            active-text-color="#00FFFF"
            unique-opened
            :router="true"
          >
            <!-- 菜单选项 -->
             <el-menu-item index="/first">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

             <el-menu-item index="/trends">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>查看全部动态</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/help">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>查看全部求助</span>
              </template>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    loginout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: #1B3AA4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
}

.header img {
  width: 180px;
}

.el-aside {
  background-color: #496EE3;
}

.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}
.header span {
  color: #fff;
  font-size: 20px;
  margin-left: 49px;
}
</style>