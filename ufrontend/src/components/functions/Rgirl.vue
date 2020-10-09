<template>
  <div class="body">
    <el-page-header class="pheader" @back="()=>{this.$router.go(-1)}"></el-page-header>
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="50vh" :style="{'width':'90vw','margin-left':'4.5vw'}">
        <el-carousel-item v-for="item in items" :key="item.id">
          <img :src="item.url"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="type">
      <span class="item1">
        <router-link :to="{name:'rent',params:{UserName:this.$route.params.UserName}}">
          <el-button type="info" circle style="width:100px;height:100px; font-size: 40px" icon="el-icon-male"></el-button>
        </router-link>
      </span>
      <span class="item2">
        <router-link :to="{name:'serve',params:{UserName:this.$route.params.UserName}}">
          <el-button type="info" circle style="width:100px;height:100px; font-size: 40px" icon="el-icon-female"></el-button>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Rgirl",
      data(){
        return{
          items:[
            {
              id:1,
              url:'../../../static/1.jpg'
            },
            {
              id:2,
              url:'../../../static/2.jpg'
            },
            {
              id:3,
              url:'../../../static/3.jpg'
            },
            {
              id:4,
              url:'../../../static/4.jpg'
            },
            {
              id:5,
              url:'../../../static/5.jpg'
            },
            {
              id:6,
              url:'../../../static/6.jpg'
            },
          ]
        }
      }
    }
</script>

<style scoped>
.body{
  height: 7vh;
}
img{
  width: 60vw;
  height: 50vh;
}
.type{
  display: flex;
  justify-content:space-between ;
}
span{
  margin: 4vw;
}
</style>
