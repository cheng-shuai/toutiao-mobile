<template>
<div class='user-profile-container'>
  <!-- 导航栏 -->
  <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
  />
  <input
    type="file"
    hidden
    ref="file"
    accept="image/*"
    @change="onFileChange"
  />
  <van-cell title="头像" is-link center @click="$refs.file.click()">
    <van-image
      width="36"
      height="36"
      fit="cover"
      round
      :src="userProfile.photo"
    />
  </van-cell>
  <van-cell
    title="昵称"
    is-link
    :value="userProfile.name"
    @click="isEditNameShow = true"
  ></van-cell>
  <van-cell
    title="性别"
    is-link
    :value="userProfile.gender === 1 ? '女' : '男' "
    @click="isUpdateGenderShow = true"
  ></van-cell>
  <van-cell
    title="生日"
    is-link
    :value="userProfile.birthday"
    @click="isUpdateBirthdayShow = true"
  ></van-cell>
  <!-- 修改昵称弹出层 -->
  <van-popup
    v-model="isEditNameShow"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <update-name
      v-if="isEditNameShow"
      @close="isEditNameShow = false"
      :username="userProfile.name"
      @update-name="userProfile.name = $event"
    />
  </van-popup>
  <!-- 修改性别弹出层 -->
  <van-popup
    v-model="isUpdateGenderShow"
    position="bottom"
  >
    <update-gender
      @close="isUpdateGenderShow = false"
      :gender="userProfile.gender"
      @update-gender="userProfile.gender = $event"
    />
  </van-popup>
  <!-- 修改生日弹出层 -->
  <van-popup
    v-model="isUpdateBirthdayShow"
    position="bottom"
  >
    <update-birthday
      v-if="isUpdateBirthdayShow"
      v-model="userProfile.birthday"
      @close="isUpdateBirthdayShow = false"
      @input="userProfile.birthday = $event"
    />
  </van-popup>
  <!-- 修改头像弹出层 -->
  <van-popup
    v-model="isUpdatePhotoShow"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <update-photo
      v-if="isUpdatePhotoShow"
      :file="file"
      @close="isUpdatePhotoShow = false"
      @update-photo="userProfile.photo = $event"
    />
  </van-popup>
</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdatePhoto from './components/UpdatePhoto.vue'

export default {
  name: 'UserProfileIndex',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {},
  data () {
    return {
      userProfile: {},
      isEditNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      file: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.userProfile = data.data
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.file = file
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {}
}
</script>
<style lang=less scoped>
.user-profile-container {
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
