<template>
<div class='user-chat-container'>
  <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
  />
  <!-- 消息记录 -->
  <div class="message-container">
    <van-cell title="挂了，别想了"></van-cell>
  </div>
  <!-- 底部区域 -->
  <van-cell-group center>
    <van-field
      v-model="message"
      placeholder="请输入消息"
    >
      <van-button
        slot="button"
        type="primary"
        size="small"
      >发送</van-button>
    </van-field>
  </van-cell-group>
</div>
</template>

<script>
// ES6 import or TypeScript
// import { io } from 'socket.io-client'
// const socket = io('http://ttapi.research.itcast.cn')
// socket.on('connection', () => {
//   console.log('链接成功') // prints { token: "abcd" }
// })

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>
.user-chat-container {
  .message-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 53px;
    overflow-y: auto;
  }
  .van-cell-group {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
