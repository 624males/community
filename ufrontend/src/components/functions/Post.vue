<template>
  <div class="markdown">
    <el-page-header class="pheader" @back="()=>{this.$router.go(-1)}"></el-page-header>
    <el-select v-model="module" placeholder="请选择板块">
      <el-option v-for="item in options" :key="item.value1" :label="item.label1" :value="item.value1"></el-option>
    </el-select>
    <el-input type="text" v-model="title" placeholder="请输入标题" :style="{'width':'200px'}"></el-input>
    <div class="container">
      <!--@imgAdd属性为添加图片并返回对应链接的方法，需要服务端的如
      multer存储图片到服务器并返回对应地址，@change为当编辑器内容发生变化时调用方法-->
      <mavon-editor v-model="content" ref="md" @imgAdd="imgadd" @change="change" style="min-height: 600px">
      </mavon-editor>
    </div>
    <div :style="{'padding-top':'20px'}">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'//引入markdown编辑器组件，并在components中引入
  import 'mavon-editor/dist/css/index.css'//引入响应样式
    export default {
        name: "post",
      data(){
          return{
            content:'',
            html:'',
            module:'',
            title: '',
            options:[{
              value1: '日常',
              label1: '日常'
            }, {
              value1: '心情',
              label1: '心情'
            }, {
              value1: '技术&经验',
              label1: '技术&经验'
            }, {
              value1: 'Q&A',
              label1: 'Q&A'
            }]
          }
      },
      components: {
        mavonEditor,
      },
      methods:{
        // 将图片上传到服务器，返回地址替换到md中
        imgadd(pos, $file){//第一个参数为原图片地址，第二个参数代表其文件本身
          //将数据放入FormData中,发送到服务端时请求头会自动设置为multipart/form-data
          let formdata = new FormData();
          formdata.append('image', $file);//每段数据可添加对应名字
          this.$http.post('http://localhost:3000/users/photos', formdata).then(res => {
            //将服务端返回的图片地址替换原内容
            this.$refs.md.$img2Url(pos, res.data);
            alert(res.data);
          }).catch(err => {
            console.log(err);
          })
        },
        // 将内容分别存至用户信息表和标题表
        submit(){
          if (this.html != '' && this.module != '' && this.title != ''){
            this.$http.post('http://localhost:3000/users/info',{Content:this.html,UserName:this.$route.params.UserName,Title:this.title,Module:this.module}).then(
              this.$http.post('http://localhost:3000/users/ctitle',{Title:this.title,UserName:this.$route.params.UserName,Module:this.module})
            );
            this.$message.success({
              showClose: true,
              duration: 1500,
              message: '提交成功'+this.html});
          } else {
            alert('无内容不提交哦');
          }
        },
        change(value, render){
          // render 为 markdown 解析后的结果[html]
          this.html = render;
        }
      },
    }
</script>

<style scoped>

</style>
