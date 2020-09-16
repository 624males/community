<template>
  <div>
    id:{{items.id}}
    UserName:{{items.UserName}}
    Password:{{items.Password}}
    邮箱：{{items.Tel}}
    账号创建时间：{{items.createdAt}}
    账号资料上一次修改时间：{{items.updatedAt}}
    <div class="markdown">
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
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'//引入markdown编辑器组件，并在components中引入
  import 'mavon-editor/dist/css/index.css'//引入响应样式
    export default {
      name: "User",
      data(){
        return{
          items:[],
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
      methods:{
        // 将图片上传到服务器，返回地址替换到md中
        imgadd(pos, $file){
          let formdata = new FormData();
          formdata.append('image', $file);
          this.$http.post('http://localhost:3000/users/photos', formdata,{headers: {
            "Content-Type": "multipart/form-data"
          }}).then(res => {
            this.$refs.md.$img2Url(pos, res.data);
            alert(res.data)
          }).catch(err => {
            console.log(err)
          })
        },
        // 提交
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
            alert('无内容不提交哦')
          }
        },
        change(value, render){
          // render 为 markdown 解析后的结果[html]
          this.html = render;
        },
      }
    }
</script>

<style scoped>

</style>
