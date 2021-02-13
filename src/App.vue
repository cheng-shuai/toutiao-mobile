<template>
  <div id="app">
    <!--    路由的出口-->
    <keep-alive :include="$store.state.cachedPages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['cachedPages'])
  }
}
</script>

<style lang="less">
</style>
