<template>
  <div class="login-main-context">
    <div class="login-title">
      系统登录
    </div>
    <el-form :model="rule_form" :rules="rules" ref="ruleForm" label-width="100px" class="login-ruleForm">
      <el-form-item label="用户账号" prop="name">
        <el-input v-model="rule_form.name"></el-input>
      </el-form-item>

      <el-form-item label="用户密码" prop="pwd">
        <el-input type="password" v-model="rule_form.pwd"></el-input>
      </el-form-item>
    </el-form>
    <div class="login-button-class">
      <el-button type="success" @click="login">登录</el-button>
      <el-button type="danger" @click="register">注册</el-button>
    </div>
    </div>
</template>
<script scoped>
import {register,login} from "../requests/user";
import VueCookies from 'vue-cookies'
export default {
  name: 'LogIn',
  data() {
    return {
      rule_form: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    register: function () {
      //发送请求register方法
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          register(this.rule_form.name,this.rule_form.pwd).then(data => {
            if(data.success ==='true'){
              console.log("注册成功")
              let session=data.data.session;
              VueCookies.set('token',session,1209600);
              this.$router.push('/home');
            }
            else{
              this.$message.error("注册失败")
            }
          })
        }
        else{
          console.log("数据验证错误");
          return false
        }
      })

    },
    login: function () {
      //发送login请求,请求调用login方法
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          login(this.rule_form.name,this.rule_form.pwd).then( data => {
              if(data.success === 'true'){
                console.log("登录成功")
                let session=data.data.session;
                VueCookies.set('token',session,1209600);
                this.$router.push('/home');
              }
              else{
                console.log(data.message)
                this.$message.error("登录失败")
              }
            })
        }
        else{
          console.log("数据验证有误");
          return false;
        }

      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-main-context {
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 30px 20px 30px;
    border: 1px solid #a0b1c4;
  }

  .login-title {
    text-align: center;
  }
  .el-form.login-ruleForm {
    margin-bottom:auto
  }

</style>
