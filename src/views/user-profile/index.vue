<template>
<div class='user-profile-container'>
  <!-- 导航栏 -->
  <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
  />
  <van-cell title="头像" is-link center>
    <van-image
      width="36"
      height="36"
      fit="cover"
      round
      :src="userProfile.photo"
    />
  </van-cell>
  <van-cell title="昵称" is-link :value="userProfile.name"></van-cell>
  <van-cell title="性别" is-link :value="userProfile.gender === 1 ? '女' : '男' "></van-cell>
  <van-cell title="生日" is-link :value="userProfile.birthday"></van-cell>
</div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'UserProfileIndex',
  components: {},
  props: {},
  data () {
    return {
      userProfile: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.userProfile = data.data
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {}
}
</script>
<style lang=less scoped>

</style>
