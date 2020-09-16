<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" :label-width="'80px'" prop="UserName">
        <el-input v-model="form.UserName" autocomplete="off" :style="{width:'260px'}"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="'80px'" prop="Password">
        <el-input v-model="form.Password" autocomplete="off" show-password=false :style="{width:'260px'}"></el-input>
      </el-form-item>
      <el-form-item :style="{'margin-left':'80px'}">
        <el-button @click="()=>{this.form.UserName='';this.form.Password=''}">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          form: {
            UserName: '',
            Password: '',
          },
          rules: {
            UserName: [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
            ],
            Password: [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
            ],
          },
        }
      },
      methods: {
        login() {
          this.$refs.ruleForm.validate((valid)=>{
            if(valid){
              this.$http.post('http://localhost:3000/user/login', this.form).then(
                async (res) => {
                  const that = this;
                  if (res.data.code === 0) {
                    await localStorage.setItem('token', res.data.token);//当成功登陆时将服务端返回token存储在localstorage或cookie（存储信息较少且有限）中
                    localStorage.setItem('userInfo', res.data.userInfo);
                    alert(res.data.desc);
                    that.$router.push({name: 'user',params: {UserName: that.form.UserName}})
                  } else if (res.data.code === -1) {
                    alert(res.data.desc);
                  } else {
                    alert(res.data.desc);
                  }
                }
              )
            } else {
              alert('输入格式错误')
            }
          })
        },
      },

    }
</script>

<style>

</style>
