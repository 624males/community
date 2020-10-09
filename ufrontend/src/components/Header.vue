<template>
    <div class="wrap">
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="lightcoral"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"><a href="http://localhost:8080" :style="nav"><b :style="nav">首页</b></a></el-menu-item>
        <el-submenu index="1">
          <template slot="title"><b :style="nav">个人</b></template>
          <a href="http://localhost:8080/regist" :style="nav"><el-menu-item index="1-2" >注册</el-menu-item></a>
          <a href="http://localhost:8080/login" :style="nav"><el-menu-item index="1-3" >登陆</el-menu-item></a>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><b :style="nav">相关</b></template>
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
        'color':'#FFFAFA',
        'font-size':'18px'
      },
      form: {
        UserName: '',
        Password: '',
        Tel:''
      },
    }
  },
}
</script>

<style>
.wrap {
  margin: 0 auto;
}
</style>
