<template>
  <div class="rent">
    <el-page-header class="pheader" @back="()=>{this.$router.go(-1)}"></el-page-header>
    <div>
      <img src="../../../static/9.jpg" alt="夜神月良心推荐产品"/>
      <el-breadcrumb separator="☆">
        <el-breadcrumb-item><span></span></el-breadcrumb-item>
        <el-breadcrumb-item><a @click="drawer1 = true"><span class="bre">租借女友清单</span></a></el-breadcrumb-item>
        <el-breadcrumb-item><a @click="drawer2 = true"><span class="bre">人气排行榜</span></a></el-breadcrumb-item>
        <el-breadcrumb-item><a @click="drawer3 = true"><span class="bre">最佳新人榜</span></a></el-breadcrumb-item>
        <el-breadcrumb-item><span></span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10vw" class="form">
      <span class="rsubmit">单次租借申请资格提交</span>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" :style="{'width':'8vw'}"></el-input>
        <br>
        <span class="f1">（务必与身份证姓名相同否则无法通过）</span>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input v-model="ruleForm.tel" :style="{'width':'16vw'}"></el-input>
      </el-form-item>
      <el-form-item label="身份证正面照上传">
        <el-upload
          action="" :before-upload="beforeUpload">
          <el-button size="small" type="info" icon="el-icon-user" >点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="预租女友用户名" prop="Gname">
        <el-input v-model="ruleForm.gname" :style="{'width':'10vw'}"></el-input>
      </el-form-item>
      <el-form-item label="租借日期">
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 30%;"></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item label="开始时间">
          <el-form-item prop="btime">
            <el-time-picker v-model="ruleForm.btime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item label="结束时间">
          <el-form-item prop="etime">
            <el-time-picker v-model="ruleForm.etime" placeholder="任意时间点"></el-time-picker>
          </el-form-item>
      </el-form-item>
      <el-form-item label="预计去向" prop="activity">
        <el-checkbox-group v-model="ruleForm.activity">
          <el-checkbox label="美食"></el-checkbox>
          <el-checkbox label="电影"></el-checkbox>
          <el-checkbox label="游乐场"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="租借原因" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-drawer
      :visible.sync="drawer1"
      :with-header="false"
      size="43vw">
      <span class="rlist">♤租借女友清单♤</span>
        <el-table class="t1" :data="tableData" height="90vh" border stripe style="width: 100%">
          <el-table-column prop="UserName" label="用户名"></el-table-column>
          <el-table-column sortable prop="Rate" label="评分" width="50"></el-table-column>
          <el-table-column prop="Price" label="日租价" width="70"></el-table-column>
          <el-table-column prop="Dates" label="租借日(周)" width="120"></el-table-column>
          <el-table-column prop="Types" label="性格特点"></el-table-column>
        </el-table>
    </el-drawer>
    <el-drawer
      :visible.sync="drawer2"
      :with-header="false"
      size="30vw">
      <span class="rankinglist">♡人气排行榜♡</span>
      <el-table class="t1" :data="tableData" height="90vh" border stripe style="width: 100%">
        <el-table-column prop="rank" label="排名" width="60"></el-table-column>
        <el-table-column prop="rate" label="评分" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="evaluation" label="上榜评价"></el-table-column>
      </el-table>
    </el-drawer>
    <el-drawer
      :visible.sync="drawer3"
      :with-header="false"
      size="43vw">
      <span class="mbest">★最佳新人榜★</span>
      <el-table class="t1" :data="tableData" height="90vh" border stripe style="width: 100%">
        <el-table-column prop="rank" label="排名" width="60"></el-table-column>
        <el-table-column prop="rate" label="评分" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="evaluation" label="上榜评价"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
    export default {
      name: "Rent",
      data(){
        return{
          drawer1:false,
          drawer2:false,
          drawer3:false,
          tableData: [],
          ruleForm: {
            name: '',
            tel: '',
            gname: '',
            date: '',
            btime: '',
            etime: '',
            activity: [],
            desc: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 2, message: '请输入正确姓名', trigger: 'blur' }
            ],
            date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            tel:[
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { pattern: /^1[3456789]\d{9}$/, message: '请输入可联系的正确手机号', trigger: 'blur'}
            ],
            btime: [
              { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            etime: [
              { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            activity: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        };
      },
      methods:{
        beforeUpload(file){//参数为源文件
          var uploadForm=new FormData();
          uploadForm.append('image', file);
          this.$http.post('http://localhost:3000/users/photos',uploadForm)
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var x = confirm('请务必确认信息是否提交');
              if (x == true){

                this.$http.post('http://localhost:3000/rgirls/rregist',{
                  Name:this.ruleForm.name,
                  Gname:this.ruleForm.gname,
                  Tel:this.ruleForm.tel,
                  Btime:this.ruleForm.btime,
                  Etime:this.ruleForm.etime,
                  Date:this.ruleForm.date,
                  Desc:this.ruleForm.desc,
                  Activity:this.ruleForm.activity.toString(),
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
        getMessage(){
          this.$http.post('http://localhost:3000/rgirls/messages').then((res)=>{
            this.tableData = res.data;
          })
        }
      },
      beforeMount(){
        this.getMessage();
      }
    }
</script>

<style scoped>

.rent{
  height:40vh ;
}
.pheader{
  float: left;
}
.form{
  margin-top: 4vh;
  width: 80vw;
}
span{
  margin-right: 1.5vw;
  font-size: 2.5vw;
}
span.rsubmit{
  margin: 6vw 6vw;
  color: dimgray;
  font-family: "Bauhaus 93";
  font-weight: bold;
  text-shadow: dimgray 0.1vw 0.1vw 0.1vw;
}
.f1{
  font-size: 1.5vw;
  color: dimgray;
}
.rlist{
  margin-left: 13vw;
  font-weight: bolder;
  color: lightcoral;
}
.rankinglist{
  margin-left: 7vw;
  font-weight: bolder;
  color: deeppink;
}
.mbest{
  margin-left: 12vw;
  font-weight: bolder;
  color: crimson;
}
.t1{
  color: darksalmon;
  font-weight: bolder;
  font-size: 2.3vh;
  font-family: Ebrima;
}
.bre{
  color: dimgray;
}
img{
  width: 60vw;
  height: 60vh;
  position: absolute;
  top: 20vh;
  right: 1vw;
}
</style>
