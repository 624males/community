<template>
    <div class="serve">
      <el-page-header class="pheader" @back="()=>{this.$router.go(-1)}"></el-page-header>
      <span>☆努力成为闪耀的rgirl吧☆</span>
      <img class="first" src="../../../static/7.jpg">
      <img class="second" src="../../../static/8.jpg">
      <a href="#" @click="drawers = true"><el-icon class="el-icon-reading"></el-icon></a>
      <div class="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10vw" class="form">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" :style="{'width':'8vw'}"></el-input>
          </el-form-item>
          <el-form-item label="身份证正面照上传">
            <el-upload
              action="" :before-upload="beforeUpload">
              <el-button size="small" type="info" icon="el-icon-user" >点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="期待日租价" prop="price">
            <el-select v-model="ruleForm.price" placeholder="请选择" :style="{'width':'10vw'}">
              <el-option label="<200" value="<200"></el-option>
              <el-option label="200~400" value="200~400"></el-option>
              <el-option label="400~600" value="400~600"></el-option>
              <el-option label=">600" value=">600"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="ruleForm.tel" :style="{'width':'16vw'}"></el-input>
          </el-form-item>
          <el-form-item label="选择适合rgirl类型" prop="types">
            <el-select v-model="ruleForm.types" placeholder="请选择你想成为的租借女友类型" :style="{'width':'20vw'}">
              <el-option label="可爱娇小" value="可爱较小"></el-option>
              <el-option label="高冷御姐" value="高冷御姐"></el-option>
              <el-option label="活力辣妹" value="活力辣妹"></el-option>
              <el-option label="安静相处" value="活力辣妹"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可租借时间" prop="dates">
            <el-checkbox-group v-model="ruleForm.dates">
              <el-checkbox label="周一"></el-checkbox>
              <el-checkbox label="周二"></el-checkbox>
              <el-checkbox label="周三"></el-checkbox>
              <el-checkbox label="周四"></el-checkbox>
              <el-checkbox label="周五"></el-checkbox>
              <el-checkbox label="周六"></el-checkbox>
              <el-checkbox label="周日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="成为rgirl的原因" prop="reason">
            <el-input type="textarea" :style="{'width':'25vw'}" v-model="ruleForm.reason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-drawer
          :visible.sync='drawers'
          :with-header="false"
          size="43vw">
          <span style="font-size: 2vw;margin: 0 10vw;color: blanchedalmond">成为租借女友的几条准则</span>
        </el-drawer>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Serve",
      data(){
        return{
          drawers: false,
          ruleForm: {
            types:'',
            price: '',
            name: '',
            tel: '',
            dates: [],
            reason: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 2, message: '请输入正确姓名', trigger: 'blur' }
            ],
            tel:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入可联系的正确手机号', trigger: 'blur'}
            ],
            dates: [
              { type: 'array', required: true, message: '请至少选择一个日期', trigger: 'change' }
            ],
            reason: [
              { required: true, message: '请说明想要成为的rgirl的原因', trigger: 'blur' }
            ]
          }
        };
      },
      methods:{
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var x = confirm('请务必确认信息是否提交');
              if (x == true){
                this.$http.post('http://localhost:3000/rgirls/gregist',{
                  Name:this.ruleForm.name,
                  Types:this.ruleForm.types,
                  Tel:this.ruleForm.tel,
                  Price:this.ruleForm.price,
                  Dates:this.ruleForm.dates.toString(),
                  Reason:this.ruleForm.reason,
                  UserName:this.$route.params.UserName,
                  Times:0,
                  Rate:0
                }).then(async (res)=>{
                  await alert(res.data);
                  this.$router.go(-1);
                })
              }
            } else {
              alert('请输入正确的格式');
            }
          });
        },
        beforeUpload(file){//参数为源文件
          var uploadForm=new FormData();
          uploadForm.append('image', file);
          this.$http.post('http://localhost:3000/users/photos',uploadForm)
        },
      }
    }
</script>

<style scoped>
.serve{
  height: 25vh;
}
span{
  margin: 10vw 32vw;
  font-size: 3vw;
  color: crimson;
  font-family: "Bauhaus 93";
  font-weight: bolder;
  text-shadow: deeppink 0.2vw 0.2vw 0.1vw ;
}
.form{
  font-size: 20px;
  margin:3vh 17vw;
 }
img.first{
  position: absolute;
  top: 22vh;
  left: 0;
  height: 90vh;
  width: 28vw;
}
img.second{
  position: absolute;
  top: 22vh;
  right: 0;
  height: 90vh;
  width: 28vw;
}
i{
  position: absolute;
  top: 25vh;
  right:33vw;
  font-size: 5vw;
}
a{
  color: crimson;
  text-decoration: none;
}
</style>
