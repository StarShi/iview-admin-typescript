<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import Loading from "@/components/Loading.vue";
@Component({
  components: {
    Loading
  }
})
export default class App extends Vue {
  @State showLoading!: boolean;
}
</script>
 
<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: STHeitiSC-Medium, STHeitiSC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  position: relative;
  overflow-x: hidden;
  width: 100%;
}
</style>
