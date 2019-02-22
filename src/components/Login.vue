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

export default {
  name: 'LogIn',
  data () {
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
      //发送请求
      let host='http://127.0.0.1:8000/';
      let data=JSON.stringify({"name": this.rule_form.name,"passwd":this.rule_form.pwd})
      fetch(host+'user/register/', {
        method: 'POST',
        body: data
      }).then(response => {
          console.log(response);

        })
        .catch(error => {
          console.log(error);

        });
    },
    login: function () {
      let host='http://127.0.0.1:8000/';
      let data=JSON.stringify({"name":this.rule_form.name,"passwd":this.rule_form.pwd})
      fetch(host+'user/login/',{
        method: 'POST',
        body:data
      }).then(response => {
          console.log(response)
        })
        .catch(error => {
            console.log(error);

          })
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
