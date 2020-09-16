<template>
    <div class="wrap">
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"><a href="http://localhost:8080" :style="nav"><p class="home">首页</p></a></el-menu-item>
        <el-submenu index="1">
          <template slot="title"><b class="el-icon-user">个人</b></template>
          <a href="http://localhost:8080/regist" :style="nav"><el-menu-item index="1-2" >注册</el-menu-item></a>
          <a href="http://localhost:8080/login" :style="nav"><el-menu-item index="1-3" >登陆</el-menu-item></a>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><b class="el-icon-menu">相关</b></template>
          <a href="https://www.mylcz.top/" :style="nav"><el-menu-item index="2-1" >个人博客</el-menu-item></a>
        </el-submenu>
      </el-menu>
    </div>

</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      nav:{
        'text-decoration':'none',
        'color':'#FFFAFA'
      },
      form: {
        UserName: '',
        Password: '',
        Tel:''
      },
      formLabelWidth: '120px'
    }
  },
}
</script>

<style>
.wrap {
  margin: 0 auto;
}
.home{
  font-size:18px;
}
</style>
