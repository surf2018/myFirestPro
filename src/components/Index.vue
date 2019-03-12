<template>
<div class="body-status">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple-light">{{current_user}}登录成功</div></el-col>
    </el-row>
    <div>
      <el-menu
        :default-active="activeIndex"
        class="index-menu" @select="handleSelect" :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">接口</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">任务</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">mock</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">调试</span>
        </el-menu-item>
      </el-menu>
      <div class="index-content">
        <servers></servers>
      </div>
  </div>
</div>
</template>
<script >
  import {get_user} from "../requests/user";
  import servers from "./servers";
  export default {
    name: 'Index',
    props:['tab'],
    components:{servers,},
    data() {
      return {
        current_user:{},
        isCollapse:false,
        activeIndex:"1",
      }
    },
    methods:{
      handleSelect:function(index,index_path) {
        this.$router.push('/index/'+index)
      },
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
