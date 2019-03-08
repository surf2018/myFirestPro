<template>
<div class="body-status">
  <p>{{current_user}}登录成功</p>
</div>
</template>
<script >
  import {get_user} from "../requests/user";


  export default {
  name: 'Index',
  data() {
    return {
    current_user:{},
    }
  },
  mounted(){
    get_user().then(data => {
      if(data.success === 'true'){
        console.log(data.success)
        this.current_user=data.data;
      }else{
        this.$router.push('/login')
      }
  })
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
.body-status {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

</style>
