
<template>
  <div class="loading">
    <img src="https://mooma-public.oss-cn-shenzhen.aliyuncs.com/icon/lifetree/loading.gif">
  </div>
</template>
 
<script>
  export default {
    name: 'Loading',
    data () {
      return {}
    },
  }
</script>
<style scoped>
.loading{
  position: fixed;
  top:0;
  left:0;
  z-index:9999;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.loading img{
  width: 50px;
  height: 50px;
  margin-top:300px;
}
</style>