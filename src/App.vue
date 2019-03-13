<template>
  <div id="app">
    <div class="main-head">
      <div class="head-img">
        <img :src="logo" height="50px" width="50px">
        <span>接口测试系统</span>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  import logo from './assets/logo.jpg'
export default {
  name: 'App',
  data() {
    return {
      logo:logo,
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-head {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 0px;
}
  .head-img{
    font-size: 20px;
    margin-left: 5px;
    margin-top: 0px;
  }

</style>
