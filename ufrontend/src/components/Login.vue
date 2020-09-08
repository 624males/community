<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="UserName">
        <el-input v-model="form.UserName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="Password">
        <el-input v-model="form.Password" autocomplete="off" show-password=""></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
      <el-button type="primary" @click="login">确 定</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          x1: {
            'text-decoration': 'none',
            'color': '#FFFAFA'
          },
          dialogFormVisible1: false,
          dialogFormVisible2: false,
          form: {
            UserName: '',
            Password: '',
          },
          formLabelWidth: '120px',
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
        clearsession() {
          sessionStorage.clear();
        },
        login() {
          this.$refs.ruleForm.validate((valid)=>{
            if(valid){
              this.$http.post('http://localhost:3000/user/login', this.form).then(
                async (res) => {
                  const that = this
                  if (res.data.code == 0) {
                    await localStorage.setItem('token', res.data.token);
                    await localStorage.setItem('userInfo', res.data.userInfo);
                    await alert(JSON.stringify(res.data.desc))
                    that.$router.push({name: 'user',params: {UserName: that.form.UserName}})
                  } else {
                    alert('登陆错误')
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

<style scoped>

</style>
