<template>
<div class='update-name-container'>
  <van-nav-bar
    title="昵称"
    left-text="取消"
    right-text="确定"
    @click-left="$emit('close')"
    @click-right="onClickRight"
  />
  <div class="name-wrap">
    <van-field
      v-model="name"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="新昵称"
      show-word-limit
    />
  </div>
</div>
</template>

<script>
import { updateUser } from '@/api/user'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      name: this.username
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUser({
        name: this.name
      })
      this.$toast.success('修改成功')
      // 关闭弹出层
      this.$emit('close')
      this.$emit('update-name', this.name)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang=less scoped>
.name-wrap {
  padding: 10px;
}
</style>
