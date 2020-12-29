<template>
  <div>
    <el-container class="bigbag">
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#20222a"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
            >
              <el-menu-item index="/">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/menu">菜单管理</el-menu-item>
                  <el-menu-item index="/role">角色管理</el-menu-item>
                  <el-menu-item index="/manage">管理员管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商城管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/cate">商品分类</el-menu-item>
                  <el-menu-item index="/specs">商品规格</el-menu-item>
                  <el-menu-item index="/goods">商品管理</el-menu-item>
                  <el-menu-item index="/member">会员管理</el-menu-item>
                  <el-menu-item index="/banner">轮播图管理</el-menu-item>
                  <el-menu-item index="/seckill">秒杀活动</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{userInfo.username}}</span>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb
            separator="/"
            v-if="$route.name"
            class="index"
          >
            <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"

export default {
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    logout(){
      this.changeUser({});
      this.$router.replace("/login")
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  
  background-color: #20222a;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* height: 100%; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu {
  border: none;
}
.el-col-12 {
  width: 100%;
}
.index{
  line-height: 30px;
}
.bigbag{
  height: 100vh;
}
</style>