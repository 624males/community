<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" :label-width="'80px'" prop="UserName">
        <el-input v-model="form.UserName" autocomplete="off" :style="{width:'260px'}"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="'80px'" prop="Password">
        <el-input v-model="form.Password" autocomplete="off" show-password=false :style="{width:'260px'}"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="'80px'" prop="Tel">
        <el-input v-model="form.Tel" autocomplete="off" :style="{width:'260px'}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :style="{'margin-left':'80px'}" @click="()=>{this.form.UserName='';this.form.Password='';this.form.Tel=''}">取 消</el-button>
        <el-button type="primary" @click="subform">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Regist",
    data() {
      return {
        form: {
          UserName: '',
          Password: '',
          Tel: '',  //在全程序中以Tel代表邮箱（个人图省事）
        },
        rules: {  //表单验证规则,也可以卸写在对应el-form-item中
          UserName: [//rules下对应表单prop
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}//trigger:'blur'失焦时触发
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
      subform() {
        this.$refs.ruleForm.validate((valid) => {//valid为表单的验证正确性，布尔值
          if (valid) {
            this.$http.post('http://localhost:3000/user/regist', this.form).then(
              async (res) => {
                const that = this;
                if (res.data.code == 0) {
                  await alert('注册成功' + JSON.stringify(res.data));
                  that.$router.push('./login');//注册成功时组件跳转到登录界面，但是此时this指向错误，需要在外部函数中用变量保存this
                } else if (res.data.code == -1) {
                  alert('用户已注册');
                } else {
                  alert('参数不齐全');
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

<style>

</style>
