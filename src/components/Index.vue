<template>
<div class="body-status">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple-light">{{current_user}}登录成功</div></el-col>
    </el-row>
    <div>
      <el-menu
        default-active="2"
        class="index-menu"
        @open="handleOpen"
        @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
      <div class="index-content">
      </div>
  </div>
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

  .index-menu {
    width: 20%;
    top:20px;
  }
  .index-content {
    width: 80%;
  }
.body-status {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
}

</style>
