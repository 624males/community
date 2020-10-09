<template>
  <div>
    <div class="userhead">
      <el-avatar src="../../static/1.jpg"></el-avatar>
      id:{{items.id}}&nbsp&nbsp
      UserName:{{items.UserName}}&nbsp&nbsp
      邮箱：{{items.Tel}}&nbsp&nbsp
      账号资料上一次修改时间：{{items.updatedAt}}
      &nbsp;&nbsp;
      <el-button @click="drawer = true" type="info" circle icon="el-icon-date"></el-button>
      <router-link :to="{name:'message',params:{UserName:this.$route.params.UserName}}">
        <el-button type="info" circle icon="el-icon-message"></el-button>
      </router-link>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false">
        <el-calendar class="cal"></el-calendar>
      </el-drawer>
    </div>
    <br/>
    <div class="flex">
      <span class="item1">
        <router-link :to="{name:'post',params:{UserName:this.$route.params.UserName}}">
          <el-button type="info" circle style="width:100px;height:100px; font-size: 40px" icon="el-icon-edit-outline"></el-button>
        </router-link><br/>
        <span class="info"><br/>日常水贴</span>
      </span>
      <span class="item2">
        <router-link :to="{name:'rgirl',params:{UserName:this.$route.params.UserName}}">
          <el-button type="info" circle style="width:100px;height:100px; font-size: 40px" icon="el-icon-cold-drink"></el-button>
        </router-link><br/>
        <span class="info"><br/>租借女友</span>
      </span>
      <span class="item3">
          <el-button type="info" circle style="width:100px;height:100px; font-size: 40px" icon="el-icon-baseball"></el-button>
        <br/>
        <span class="info"><br/>球球作战</span>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "User",
      data(){
        return{
          drawer: false,
          items:[],
        }
      },
      mounted() {//挂载时想服务端发送验证token并在服务端解析token
          this.$http.post('http://localhost:3000/user/getuser', {UserName:this.$route.params.UserName}).then(
            (res)=> {
              if (res.data.code === 0) {
                this.$http.post(`http://localhost:3000/users/user/${this.$route.params.UserName}`).then(
                  (res)=>{
                    this.items = res.data;
                  }
                )
              } else if (res.data.code === 1){
                alert('参数错误');
                this.$router.push({name:'Login'});
              } else {
                alert('用户信息已过期，请重新登陆');
                this.$router.push({name:'Login'});
              }
            }
          )
      },
    }
</script>

<style>
.userhead{
  font-family: Arial;
  font-size: 1.5vw;
}
.flex{
  display: flex;
}
.item1,.item2,.item3{
  margin: 1vw;
  width: 20vw;
}

.info{
  color: dimgray;
  font-weight: bold;
  font-size: 1.8vw;
  font-family: 宋体;
  text-shadow: 0.1vw 0.2vh 0.2vw azure;
}
.cal{
  width: 25vw;
  height: 60vw;
}
</style>
