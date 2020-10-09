<template>
    <div class="message">
        <div v-for="item in items">
          <span>{{item}}</span>
          <el-button type="info">确认</el-button>
          <el-button type="info">取消</el-button>
        </div>

    </div>
</template>

<script>
    export default {
      name: "Message",
      data() {
        return {
          items: []
        }
      },
      beforeMount(){
        this.getMessage();
      },
      methods:{
        getMessage:function () {
          this.$http.post('http://localhost:3000/rgirls/getmessage',{Gname:this.$route.params.UserName}).then((res)=>{
            this.items = res.data;
          })
        }
      }
    }
</script>

<style scoped>
.message{
  padding-bottom: 20vh;
}
</style>
