<template>
  <div class="layout-container">
    <!--    路由出口-->
    <router-view/>
    <!--    标签栏-->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" replace to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="comment-o" replace to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
