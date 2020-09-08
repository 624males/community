<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="UserName">
        <el-input v-model="form.UserName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="Password">
        <el-input v-model="form.Password" autocomplete="off" show-password=""></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="Tel">
        <el-input v-model="form.Tel" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="subform">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Regist",
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
          Tel: '',
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
          Tel: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: '邮箱格式错误',
              trigger: 'blur',
            }]
        },
      }
    },
    methods: {
      clearsession() {
        sessionStorage.clear();
      },
      subform() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$http.post('http://localhost:3000/user/regist', this.form).then(
              async (res) => {
                const that = this
                if (res.data.code == 0) {
                  await alert('注册成功' + JSON.stringify(res.data))
                  that.$router.push('./login');
                } else {
                  alert('注册失败')
                }
              })
          } else {
            alert('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
